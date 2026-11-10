"use client";
import { Contact as ContactForm } from "./contact-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Contact({ calendarUrl }: { calendarUrl?: string }) {
  return (
    <div id="contact">
      <ContactForm calendarUrl={calendarUrl} />
    </div>
  );
}
export function MobileBooking() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero"),
      form = document.getElementById("contact"),
      process = document.querySelector('[data-sequence="process"]');
    if (!hero) return;
    let heroVisible = true,
      formVisible = false,
      processVisible = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === form) formVisible = e.isIntersecting;
        if (e.target === process) processVisible = e.isIntersecting;
      }
      setShow(!heroVisible && !formVisible && !processVisible);
    });
    io.observe(hero);
    if (form) io.observe(form);
    if (process) io.observe(process);
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
