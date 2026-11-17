"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { X, Mail, ArrowUpRight, Copy, Check, Send } from "lucide-react";
import { site } from "@/content/site";

const StartProjectContext = createContext<{ open: () => void }>({ open: () => {} });
export const useStartProject = () => useContext(StartProjectContext);

const needs = ["Website", "Web app", "Mobile app", "UI/UX design", "Automation & AI", "Not sure yet"];

export function StartProjectProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <StartProjectContext.Provider value={{ open }}>
      {children}
      {isOpen && <StartProjectDialog onClose={() => setOpen(false)} />}
    </StartProjectContext.Provider>
  );
}

/** Opens the visitor's own email (Gmail or their mail app) with a ready-to-send project note. */
function StartProjectDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstItem = items[0],
        lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  const subject = `New project enquiry${picked.length ? `: ${picked.join(", ")}` : ""}`;
  const body = [
    "Hi DevsDen Tech,",
    "",
    message.trim() || "I would like to talk about a new project.",
    "",
    `What we need: ${picked.join(", ") || "Not sure yet"}`,
    "",
    name.trim() ? `Thanks,\n${name.trim()}` : "Thanks",
  ].join("\n");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="dd-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()} data-lenis-prevent>
      <div className="dd-modal-panel" role="dialog" aria-modal="true" aria-labelledby="dd-start-title" ref={panel}>
        <button type="button" className="dd-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="dd-modal-head">
          <span className="dd-modal-icon">
            <Mail size={20} />
          </span>
          <div>
            <h2 id="dd-start-title">Start a project</h2>
            <p>Write a few lines and your email opens ready to send. Nothing is sent until you press send.</p>
          </div>
        </div>
        <div className="dd-modal-body">
          <label className="dd-modal-field">
            <span>Your name</span>
            <input ref={first} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jane Smith" />
          </label>
          <fieldset className="dd-modal-needs">
            <legend>What do you need?</legend>
            <div>
              {needs.map((n) => {
                const on = picked.includes(n);
                return (
                  <button
                    type="button"
                    key={n}
                    aria-pressed={on}
                    className={on ? "is-on" : ""}
                    onClick={() => setPicked(on ? picked.filter((p) => p !== n) : [...picked, n])}
                  >
                    {on && <Check size={13} />}
                    {n}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="dd-modal-field">
            <span>About the project</span>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              placeholder="What would you like to build or improve?"
            />
          </label>
        </div>
        <div className="dd-modal-actions">
          <a href={gmail} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary">
            <Send size={16} /> Send with Gmail
          </a>
          <a href={mailto} className="dd-btn dd-btn-outline">
            <Mail size={16} /> Use my email app
          </a>
        </div>
        <div className="dd-modal-foot">
          <span>
            Or write to us directly at <a href={`mailto:${site.email}`}>{site.email}</a>
            <button type="button" onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </span>
          <Link href="/contact" onClick={onClose}>
            Full project form <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** A button that opens the Start a project panel. */
export function StartProjectButton({ className = "", children }: { className?: string; children: ReactNode }) {
  const { open } = useStartProject();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
