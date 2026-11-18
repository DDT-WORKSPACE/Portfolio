"use server";
import { headers } from "next/headers";
import { z } from "zod";
import { projectSchema, type ProjectInput } from "@/content/forms";
import { mailReady, renderMail, sendMail, type MailSection } from "@/lib/mail";
import { clientIp, lookupGeo, mapLink, parseUserAgent, placeName } from "@/lib/visitor";

/** Where the enquiry came from: IP, approximate place and device, for the studio's email. */
async function senderContext(): Promise<{ section: MailSection; place: string }> {
  const h = await headers();
  const ip = clientIp(h) || "unknown";
  const ua = h.get("user-agent") ?? "";
  const geo = await lookupGeo(h, ip);
  const dev = parseUserAgent(ua);
  const place = placeName(geo);
  return {
    place,
    section: {
      heading: "Sent from",
      rows: [
        ["Place (approximate)", place || "Unknown"],
        ["Map", mapLink(geo)],
        ["IP address", ip],
        ["Device", [dev.model, dev.type].filter(Boolean).join(" · ")],
        ["Browser", `${dev.browser} on ${dev.os}`],
        ["Page", h.get("referer") ?? undefined],
      ],
    },
  };
}

async function mailEnquiry(opts: {
  name: string;
  email: string;
  topic: string;
  rows: [string, string | undefined][];
  message: string;
}) {
  const ctx = await senderContext();
  const { html, text } = renderMail(
    `New enquiry from ${opts.name || opts.email}`,
    "Reply to this email to answer the visitor directly.",
    [
      {
        heading: "Contact",
        rows: [
          ["Name", opts.name],
          ["Email", opts.email],
        ],
      },
      { heading: "Project", rows: [...opts.rows, ["Message", opts.message]] },
      ctx.section,
    ],
  );
  return sendMail({
    subject: `New enquiry · ${opts.name || opts.email}${opts.topic ? ` · ${opts.topic}` : ""}${ctx.place ? ` · ${ctx.place}` : ""}`,
    html,
    text,
    replyTo: opts.email,
  });
}

const quickSchema = z.object({
  name: z.string().trim().max(100),
  email: z.email().max(254),
  needs: z.array(z.string().max(40)).max(8),
  message: z.string().trim().max(2000),
  website: z.string().max(0),
});

/** The Start a project panel: emails the studio directly when mail is configured. */
export async function sendQuickEnquiry(
  input: z.infer<typeof quickSchema>,
): Promise<{ ok: boolean; message?: string; needsEmail?: boolean }> {
  const parsed = quickSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Please add a valid email address so we can reply." };
  const d = parsed.data;
  if (!d.message && !d.needs.length) return { ok: false, message: "Tell us a little about the project first." };
  if (!mailReady()) return { ok: false, needsEmail: true };
  const sent = await mailEnquiry({
    name: d.name,
    email: d.email,
    topic: d.needs.join(", "),
    rows: [["What they need", d.needs.join(", ") || "Not sure yet"]],
    message: d.message || "(no message)",
  });
  return sent
    ? { ok: true }
    : { ok: false, needsEmail: true, message: "We could not send it just now. Please use your email instead." };
}
export async function subscribeNewsletter(
  email: string,
): Promise<{ message: string }> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return { message: "Please enter a valid email address." };
  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint || !endpoint.startsWith("https://"))
    return {
      message:
        "Newsletter signup is not configured yet. Your email has not been saved.",
    };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        email: email.trim(),
        source: "studio-newsletter",
      }),
      signal: AbortSignal.timeout(10000),
    });
    return {
      message: response.ok
        ? "Thanks. You’re on the list."
        : "Could not subscribe. Please try again.",
    };
  } catch {
    return { message: "Could not subscribe. Please try again." };
  }
}
export async function sendProject(
  input: ProjectInput,
): Promise<{ ok: boolean; message?: string; needsEmail?: boolean }> {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: "Please check the form and try again." };
  if (mailReady()) {
    const p = parsed.data;
    const sent = await mailEnquiry({
      name: p.name,
      email: p.email,
      topic: p.types.join(", "),
      rows: [
        ["Building", p.types.join(", ")],
        ["Budget", p.budget],
      ],
      message: p.message,
    });
    if (sent) return { ok: true };
  }
  const endpoint = process.env.PROJECT_WEBHOOK_URL;
  if (!endpoint)
    return {
      ok: false,
      needsEmail: true,
      message:
        "Your brief is ready. Open an email draft to send it to the studio.",
    };
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:")
      return {
        ok: false,
        message: "Project delivery is temporarily unavailable.",
      };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.PROJECT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.PROJECT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...parsed.data,
        website: undefined,
        source: "website",
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok)
      return {
        ok: false,
        message: "Your message could not be delivered. Please try again.",
      };
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Your message could not be delivered. Please try again.",
    };
  }
}
