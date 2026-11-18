"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  X,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Loader2,
  CircleCheck,
} from "lucide-react";
import { site } from "@/content/site";
import { sendQuickEnquiry } from "@/app/actions";

const StartProjectContext = createContext<{ open: () => void }>({
  open: () => {},
});
export const useStartProject = () => useContext(StartProjectContext);

const needs = [
  "Website",
  "Web app",
  "Mobile app",
  "UI/UX design",
  "Automation & AI",
  "Not sure yet",
];

export function StartProjectProvider({
  children,
  mailReady = false,
}: {
  children: ReactNode;
  mailReady?: boolean;
}) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <StartProjectContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <StartProjectDialog
          onClose={() => setOpen(false)}
          mailReady={mailReady}
        />
      )}
    </StartProjectContext.Provider>
  );
}

/**
 * Start a project. With email delivery configured (SMTP_USER and SMTP_PASS) the note is sent
 * straight to the studio inbox; otherwise, or if sending fails, the visitor's own email (Gmail or
 * their mail app) opens with the note ready to send.
 */
function StartProjectDialog({
  onClose,
  mailReady,
}: {
  onClose: () => void;
  mailReady: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "fallback"
  >(mailReady ? "idle" : "fallback");
  const [error, setError] = useState("");
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Please add your email so we can reply.");
    if (!message.trim() && !picked.length)
      return setError("Tell us a little about the project first.");
    setStatus("sending");
    try {
      const res = await sendQuickEnquiry({
        name,
        email: email.trim(),
        needs: picked,
        message,
        website: trap,
      });
      if (res.ok) return setStatus("sent");
      if (res.needsEmail) {
        setStatus("fallback");
        if (res.message) setError(res.message);
        return;
      }
      setStatus("idle");
      setError(res.message ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("fallback");
      setError("We could not send it just now. Please use your email instead.");
    }
  };

  return (
    <div
      className="dd-modal"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      data-lenis-prevent
    >
      <div
        className="dd-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dd-start-title"
        ref={panel}
      >
        <button
          type="button"
          className="dd-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="dd-modal-head">
          <span className="dd-modal-icon">
            <Mail size={20} />
          </span>
          <div>
            <h2 id="dd-start-title">Start a project</h2>
            <p>
              {mailReady && status !== "fallback"
                ? "Write a few lines and send. It goes straight to our team and we reply by email."
                : "Write a few lines and your email opens ready to send. Nothing is sent until you press send."}
            </p>
          </div>
        </div>
        {status === "sent" ? (
          <div className="dd-modal-sent" role="status">
            <span className="dd-modal-sent-icon">
              <CircleCheck size={30} />
            </span>
            <h3>
              Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}. Your
              message is with us.
            </h3>
            <p>We read every enquiry and will reply to {email.trim()} soon.</p>
            <button
              type="button"
              className="dd-btn dd-btn-primary dd-btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="dd-modal-body">
              <div className="dd-modal-row">
                <label className="dd-modal-field">
                  <span>Your name</span>
                  <input
                    ref={first}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Jane Smith"
                  />
                </label>
                {mailReady && (
                  <label className="dd-modal-field">
                    <span>Your email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                    />
                  </label>
                )}
              </div>
              <input
                className="dd-hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                name="website"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
              />
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
                        onClick={() =>
                          setPicked(
                            on ? picked.filter((p) => p !== n) : [...picked, n],
                          )
                        }
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
            {error && (
              <p className="dd-modal-error" role="alert">
                {error}
              </p>
            )}
            {mailReady && status !== "fallback" ? (
              <div className="dd-modal-actions">
                <button
                  type="submit"
                  className="dd-btn dd-btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <Loader2 size={16} className="dd-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                <a
                  href={gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dd-btn dd-btn-outline"
                >
                  <Mail size={16} /> Use Gmail instead
                </a>
              </div>
            ) : (
              <div className="dd-modal-actions">
                <a
                  href={gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dd-btn dd-btn-primary"
                >
                  <Send size={16} /> Send with Gmail
                </a>
                <a href={mailto} className="dd-btn dd-btn-outline">
                  <Mail size={16} /> Use my email app
                </a>
              </div>
            )}
          </form>
        )}
        <div className="dd-modal-foot">
          <span>
            Or write to us directly at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
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
export function StartProjectButton({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useStartProject();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
