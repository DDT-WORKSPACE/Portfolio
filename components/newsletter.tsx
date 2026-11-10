"use client";
import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions";
export function Newsletter() {
  const [pending, setPending] = useState(false),
    [message, setMessage] = useState("");
  return (
    <form
      className="newsletter"
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending) return;
        const data = new FormData(e.currentTarget);
        setPending(true);
        try {
          const result = await subscribeNewsletter(
            String(data.get("email") ?? ""),
          );
          setMessage(result.message);
        } catch {
          setMessage("Could not subscribe. Please try again.");
        } finally {
          setPending(false);
        }
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email for studio updates
      </label>
      <div>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe to studio updates"
        >
          {pending ? (
            <LoaderCircle size={16} className="spinner" />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </button>
      </div>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
