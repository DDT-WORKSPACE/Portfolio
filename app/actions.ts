"use server";
import { projectSchema, type ProjectInput } from "@/content/forms";
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
