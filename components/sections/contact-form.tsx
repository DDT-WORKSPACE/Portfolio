"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useInView } from "motion/react";
import Link from "next/link";
import { projectSchema, type ProjectInput, formCopy } from "@/content/forms";
import { projectTypes, budgets, headings, site } from "@/content/site";
import { sendProject } from "@/app/actions";
import { Copy, Marker } from "../ui";
export function Contact({
  calendarUrl,
  embedded = false,
}: {
  calendarUrl?: string;
  embedded?: boolean;
}) {
  const [success, setSuccess] = useState(false),
    [serverError, setServerError] = useState(""),
    [calendar, setCalendar] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<ProjectInput | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      email: "",
      types: [],
      budget: budgets[0],
      message: "",
      website: "",
    },
  });
  const types = watch("types");
  useEffect(() => {
    if (success) result.current?.focus();
  }, [success]);
  const submit = async (data: ProjectInput) => {
    setServerError("");
    setDraft(null);
    try {
      const res = await sendProject(data);
      if (res.ok) setSuccess(true);
      else if (res.needsEmail) setDraft(data);
      else setServerError(res.message ?? formCopy.missing);
    } catch {
      setServerError("Unable to send your project. Please try again.");
    }
  };
  useEffect(() => {
    if (draft) draftRef.current?.focus();
  }, [draft]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brief = params.get("brief");
    if (brief) setValue("message", brief.slice(0, 5000));
    const type = params.get("type");
    if (type && projectTypes.some((t) => t === type))
      setValue("types", [type as (typeof projectTypes)[number]]);
  }, [setValue]);
  const subject = draft ? `Project enquiry: ${draft.types.join(", ")}` : "";
  const body = draft
    ? `Name: ${draft.name}\nReply email: ${draft.email}\nProject: ${draft.types.join(", ")}\nBudget: ${draft.budget}\n\n${draft.message}`
    : "";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const safeCalendar =
    calendarUrl && /^https:\/\/(cal\.com|calendly\.com)\//.test(calendarUrl)
      ? calendarUrl
      : undefined;
  return (
    <section
      className={`contact-section contact-refined ${embedded ? "contact-embedded" : ""}`}
    >
      <div className="container contact-layout">
        <div className="contact-copy">
          <Marker>
            {embedded ? "Start your project" : headings.contact.marker}
          </Marker>
          <h2>
            {embedded
              ? "What would you like to make easier?"
              : headings.contact.title}
          </h2>
          <p>
            {embedded
              ? "A new product, a better customer experience, or a business process that takes too much time. Tell us where you are and where you want to go."
              : headings.contact.body}
          </p>
          <div className="contact-details">
            {[
              [Mail, site.email],
              [Phone, site.phone],
              [MessageCircle, site.whatsapp],
            ]
              .filter(([, value]) => Boolean(value))
              .map(([I, value], i) => {
                const Icon = I as typeof Mail;
                return (
                  <div key={i}>
                    <Icon size={18} />
                    {Icon === Mail ? (
                      <a href={`mailto:${value}`}>{value as string}</a>
                    ) : (
                      <Copy>{value as string}</Copy>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="contact-reply">
            <span />
            <Copy>{site.reply}</Copy>
          </div>
          {calendarUrl !== undefined && (
            <div className="calendar-section">
              {safeCalendar ? (
                <>
                  <button
                    className="button secondary"
                    onClick={() => setCalendar(!calendar)}
                  >
                    {calendar ? "Close calendar" : "Prefer to book a call?"}
                    <ArrowUpRight size={16} />
                  </button>
                  {calendar && (
                    <iframe
                      title="Book a strategy call"
                      src={safeCalendar}
                      loading="lazy"
                      className="calendar-embed"
                    />
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
        <div className="contact-form-panel">
          {success ? (
            <div className="form-success" tabIndex={-1} ref={result}>
              <span>
                <Check size={30} />
              </span>
              <h3>{formCopy.successTitle}</h3>
              <p>{formCopy.successBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)} noValidate>
              <h3>A good place to start.</h3>
              <p className="form-intro">{formCopy.note}</p>
              <div className="form-two-col">
                {(["name", "email"] as const).map((k) => (
                  <div key={k} className="field">
                    <input
                      id={`project-${k}`}
                      type={k === "email" ? "email" : "text"}
                      autoComplete={k === "email" ? "email" : "name"}
                      placeholder=" "
                      {...register(k)}
                      aria-invalid={!!errors[k]}
                      aria-describedby={errors[k] ? `error-${k}` : undefined}
                    />
                    <label htmlFor={`project-${k}`}>{formCopy[k]}</label>
                    {errors[k] && (
                      <small role="alert" id={`error-${k}`}>
                        {errors[k]?.message}
                      </small>
                    )}
                  </div>
                ))}
              </div>
              <fieldset className="project-types">
                <legend>{formCopy.types}</legend>
                <div>
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={types.includes(t) ? "selected" : ""}
                      aria-pressed={types.includes(t)}
                      onClick={() =>
                        setValue(
                          "types",
                          types.includes(t)
                            ? types.filter((v) => v !== t)
                            : [...types, t],
                          { shouldValidate: true },
                        )
                      }
                    >
                      {t}
                      {types.includes(t) && <Check size={12} />}
                    </button>
                  ))}
                </div>
                {errors.types && (
                  <small role="alert">{errors.types.message}</small>
                )}
              </fieldset>
              <div className="field field-select">
                <label htmlFor="project-budget">{formCopy.budget}</label>
                <select id="project-budget" {...register("budget")}>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <textarea
                  id="project-message"
                  placeholder=" "
                  rows={3}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "error-message" : undefined
                  }
                />
                <label htmlFor="project-message">{formCopy.message}</label>
                {errors.message && (
                  <small role="alert" id="error-message">
                    {errors.message.message}
                  </small>
                )}
              </div>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Leave this empty
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </label>
              </div>
              {draft && (
                <div
                  className="email-draft"
                  ref={draftRef}
                  tabIndex={-1}
                  role="status"
                >
                  <h4>Your project brief is ready.</h4>
                  <p>
                    Nothing has been sent yet. Open your draft, review it, then
                    press Send in Gmail or your email app.
                  </p>
                  <div>
                    <a href={gmail} target="_blank" rel="noopener noreferrer">
                      Continue in Gmail <ArrowUpRight size={16} />
                    </a>
                    <a href={mailto}>
                      Use email app <Mail size={15} />
                    </a>
                  </div>
                  <small>Sending to {site.email}</small>
                </div>
              )}
              {serverError && (
                <p role="alert" className="form-error">
                  {serverError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button primary submit-button"
              >
                {isSubmitting
                  ? formCopy.pending
                  : draft
                    ? "Update email draft"
                    : formCopy.submit}
                {isSubmitting ? (
                  <LoaderCircle size={18} className="spinner" />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </button>
              <p className="form-privacy">
                We use your details to respond to this enquiry. Read our{" "}
                <Link href="/legal/privacy">privacy policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
export function MobileBooking() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero"),
      form = document.getElementById("contact");
    if (!hero) return;
    let heroVisible = true,
      formVisible = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === form) formVisible = e.isIntersecting;
      }
      setShow(!heroVisible && !formVisible);
    });
    io.observe(hero);
    if (form) io.observe(form);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`mobile-booking ${show ? "show" : ""}`} inert={!show}>
      <Link href="/contact" className="button primary">
        Book a free strategy call
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
