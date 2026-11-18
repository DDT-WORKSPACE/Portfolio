// Visit notifications. components/visitor-tracker.tsx posts here:
//   kind "arrival"  once per browser session: who arrived, from where, on what device
//   kind "activity" when the visitor leaves or hides the tab: pages viewed and what they clicked
// Each becomes an email to the studio (see lib/mail.ts). Emails are capped per session and per IP
// so a busy day or a misbehaving client cannot flood the inbox. Set VISITOR_EMAILS=off to stop them.
import { after } from "next/server";
import { mailReady, renderMail, sendMail, type MailSection } from "@/lib/mail";
import { clientIp, isBot, lookupGeo, mapLink, parseUserAgent, placeName } from "@/lib/visitor";

type Ev = { t: "view" | "click"; at: string; page: string; label?: string; href?: string };
type Payload = {
  kind: "arrival" | "activity";
  vid: string;
  sid: string;
  visitNo?: number;
  firstSeen?: string;
  page?: string;
  title?: string;
  referrer?: string;
  utm?: Record<string, string>;
  device?: Record<string, string | number | boolean | undefined>;
  events?: Ev[];
  startedAt?: string;
  seconds?: number;
};

const perIp = new Map<string, number[]>();
const perSession = new Map<string, { arrival: boolean; activity: number }>();
const IP_LIMIT = 40; // emails per IP per hour
const ACTIVITY_LIMIT = 6; // activity emails per session

function allow(ip: string, sid: string, kind: Payload["kind"]) {
  const now = Date.now();
  const hits = (perIp.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (hits.length >= IP_LIMIT) return false;
  const s = perSession.get(sid) ?? { arrival: false, activity: 0 };
  if (kind === "arrival" && s.arrival) return false;
  if (kind === "activity" && s.activity >= ACTIVITY_LIMIT) return false;
  if (kind === "arrival") s.arrival = true;
  else s.activity++;
  if (perSession.size > 5000) perSession.clear();
  if (perIp.size > 5000) perIp.clear();
  perSession.set(sid, s);
  perIp.set(ip, [...hits, now]);
  return true;
}

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max) : undefined);
const id = (v: unknown) => (typeof v === "string" && /^[a-z0-9-]{8,64}$/i.test(v) ? v : null);
const when = (iso?: string, tz?: string) => {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  try {
    return d.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "medium", timeZone: tz || "Asia/Dhaka" }) + ` (${tz || "Asia/Dhaka"})`;
  } catch {
    return d.toISOString();
  }
};

export async function POST(request: Request) {
  if (process.env.VISITOR_EMAILS === "off") return new Response(null, { status: 204 });
  const raw = await request.text();
  if (raw.length > 60_000) return new Response(null, { status: 413 });
  let body: Payload;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  const vid = id(body.vid);
  const sid = id(body.sid);
  if (!vid || !sid || (body.kind !== "arrival" && body.kind !== "activity")) return new Response(null, { status: 400 });

  const h = request.headers;
  const ua = h.get("user-agent") ?? "";
  if (isBot(ua)) return new Response(null, { status: 204 });
  const ip = clientIp(h) || "unknown";
  if (body.kind === "activity" && !(body.events ?? []).length) return new Response(null, { status: 204 });
  if (!allow(ip, sid, body.kind)) return new Response(null, { status: 204 });

  after(async () => {
    const geo = await lookupGeo(h, ip);
    const dev = parseUserAgent(ua);
    const d = body.device ?? {};
    const place = placeName(geo) || "Unknown location";
    const deviceLine = [d.model || dev.model, dev.type].filter(Boolean).join(" · ");
    const who: MailSection = {
      heading: "Visitor",
      rows: [
        ["Visitor ID", vid],
        ["Visit number", body.visitNo ? `${body.visitNo}${body.visitNo === 1 ? " (first visit)" : " (returning visitor)"}` : undefined],
        ["First seen", when(str(body.firstSeen), str(d.timezone))],
        ["Session ID", sid],
      ],
    };
    const where: MailSection = {
      heading: "Location (approximate, from IP address)",
      rows: [
        ["Place", place],
        ["Postal code", geo.postal],
        ["Coordinates", geo.lat && geo.lon ? `${geo.lat}, ${geo.lon}` : undefined],
        ["Map", mapLink(geo)],
        ["Network", geo.network],
        ["IP address", ip],
        ["Visitor time zone", str(d.timezone)],
      ],
    };
    const device: MailSection = {
      heading: "Device",
      rows: [
        ["Device", deviceLine || dev.type],
        ["Operating system", d.platformVersion ? `${dev.os} (${d.platformVersion})` : dev.os],
        ["Browser", dev.browser],
        ["Screen", str(d.screen)],
        ["Window", str(d.viewport)],
        ["Pixel ratio", d.dpr ? String(d.dpr) : undefined],
        ["Touch screen", d.touch === undefined ? undefined : d.touch ? "Yes" : "No"],
        ["CPU cores", d.cores ? String(d.cores) : undefined],
        ["Memory", d.memory ? `${d.memory} GB or more` : undefined],
        ["Connection", str(d.connection)],
        ["Languages", str(d.languages)],
        ["Colour scheme", str(d.colorScheme)],
        ["Site theme", str(d.theme)],
        ["User agent", ua.slice(0, 400)],
      ],
    };

    let subject: string;
    let title: string;
    let intro: string;
    let sections: MailSection[];
    if (body.kind === "arrival") {
      const utm = body.utm ?? {};
      subject = `New visitor · ${place} · ${dev.browser.split(" ")[0]} on ${dev.os.split(" ")[0]}${body.visitNo && body.visitNo > 1 ? ` · visit ${body.visitNo}` : ""}`;
      title = body.visitNo && body.visitNo > 1 ? "A returning visitor is on the website" : "A new visitor is on the website";
      intro = `${when(new Date().toISOString())} · landed on ${str(body.page) || "/"}`;
      sections = [
        {
          heading: "Arrival",
          rows: [
            ["Landing page", str(body.page)],
            ["Page title", str(body.title)],
            ["Came from", str(body.referrer) || "Direct (typed address, bookmark or app)"],
            ["Campaign", Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(", ") || undefined],
          ],
        },
        where,
        device,
        who,
      ];
    } else {
      const events = (body.events ?? []).slice(0, 120);
      const views = events.filter((e) => e.t === "view");
      const clicks = events.filter((e) => e.t === "click");
      const tz = str(d.timezone);
      const time = (e: Ev) => {
        const t = new Date(e.at);
        return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString("en-GB", { timeZone: tz || "Asia/Dhaka" });
      };
      subject = `Visitor activity · ${views.length} page${views.length === 1 ? "" : "s"}, ${clicks.length} click${clicks.length === 1 ? "" : "s"} · ${place}`;
      title = "What a visitor did on the website";
      const secs = Number(body.seconds) || 0;
      intro = `Time on site so far: ${secs >= 60 ? `${Math.floor(secs / 60)} min ${secs % 60} s` : `${secs} s`}`;
      sections = [
        {
          heading: "Pages viewed",
          rows: views.map((e, i) => [`${i + 1}. ${time(e)}`, str(e.page)]),
        },
        {
          heading: "Clicks",
          rows: clicks.map((e) => [
            `${time(e)} on ${str(e.page, 80)}`,
            [str(e.label, 120) || "(no label)", e.href ? `→ ${str(e.href, 200)}` : ""].filter(Boolean).join(" "),
          ]),
        },
        where,
        { heading: "Device", rows: device.rows.slice(0, 3) },
        who,
      ];
    }
    const { html, text } = renderMail(title, intro, sections, "Location is estimated from the IP address and is usually accurate to the city.");
    if (mailReady()) await sendMail({ subject, html, text });
    else console.log(`[visit] ${subject} (email not configured: set SMTP_USER and SMTP_PASS)`);
  });

  return new Response(null, { status: 202 });
}
