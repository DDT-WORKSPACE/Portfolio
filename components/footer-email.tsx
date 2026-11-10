"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/content/site";
export function FooterEmail() {
  const [copied, setCopied] = useState(false),
    [failed, setFailed] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFailed(true);
    }
  };
  return (
    <div className="footer-email-control">
      <a className="footer-address" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <span className="footer-copy-status" role="status">
        {copied
          ? "Copied!"
          : failed
            ? "Use the email link to get in touch."
            : ""}
      </span>
    </div>
  );
}
