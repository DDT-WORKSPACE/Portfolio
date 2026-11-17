// Server-only email delivery (project enquiries and visitor notifications).
// Sends through any SMTP server; with the defaults it uses Gmail and a Gmail App Password.
//
//   SMTP_USER   the mailbox that sends, e.g. devsdevtech@gmail.com
//   SMTP_PASS   a Gmail App Password (Google Account > Security > 2-Step Verification > App passwords)
//   SMTP_HOST   optional, default smtp.gmail.com
//   SMTP_PORT   optional, default 465 (TLS)
//   MAIL_TO     optional, where mail is delivered, default the site email
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/content/site";

let transporter: Transporter | null = null;

export function mailReady() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  return transporter;
}

export type MailSection = { heading: string; rows: [string, string | undefined | null][] };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Builds a clean HTML email (plus a plain-text copy) from labelled sections. */
export function renderMail(title: string, intro: string, sections: MailSection[], note?: string) {
  const blocks = sections
    .map((s) => {
      const rows = s.rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");
      if (!rows.length) return "";
      return `<tr><td style="padding:22px 0 8px;font:700 13px/1.4 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#1f4c4c">${esc(s.heading)}</td></tr>
<tr><td><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e3e8ea;border-radius:10px">
${rows
  .map(
    ([k, v], i) =>
      `<tr><td style="width:34%;padding:9px 14px;font:600 13px/1.5 Arial,sans-serif;color:#5b6b70;vertical-align:top;${i ? "border-top:1px solid #eef1f2;" : ""}">${esc(k)}</td><td style="padding:9px 14px;font:400 14px/1.5 Arial,sans-serif;color:#0f2423;white-space:pre-wrap;word-break:break-word;${i ? "border-top:1px solid #eef1f2;" : ""}">${esc(String(v))}</td></tr>`,
  )
  .join("\n")}
</table></td></tr>`;
    })
    .join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f3f5f6;padding:24px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto">
<tr><td style="padding:22px 24px;border-radius:12px;background:#062121;color:#ffffff">
<div style="font:700 12px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#dcab45">${esc(site.name)} website</div>
<div style="margin-top:6px;font:700 20px/1.35 Arial,sans-serif">${esc(title)}</div>
<div style="margin-top:6px;font:400 14px/1.5 Arial,sans-serif;color:#c4d6d4">${esc(intro)}</div>
</td></tr>
${blocks}
${note ? `<tr><td style="padding:18px 2px 0;font:400 12px/1.5 Arial,sans-serif;color:#7b8a8e">${esc(note)}</td></tr>` : ""}
</table></body></html>`;
  const text = [
    title,
    intro,
    ...sections.map((s) => {
      const rows = s.rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");
      return rows.length ? `\n${s.heading.toUpperCase()}\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}` : "";
    }),
    note ? `\n${note}` : "",
  ].join("\n");
  return { html, text };
}

export async function sendMail(opts: { subject: string; html: string; text: string; replyTo?: string }) {
  if (!mailReady()) return false;
  try {
    await getTransporter().sendMail({
      from: `"${site.name} website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || site.email,
      subject: opts.subject.slice(0, 180),
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    return true;
  } catch (err) {
    console.error("[mail] could not send:", (err as Error).message);
    return false;
  }
}
