"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks top-level page sections that are off screen with data-offscreen, which pauses their
 * decorative CSS animations (see the rule at the end of app/brand.css). Only what the visitor
 * can see keeps animating, so scrolling stays smooth on slower devices.
 * While the page is scrolling it also shows one transparent shield over the content, so cards
 * sliding under a still mouse do not restyle on every frame. Toggling a single element is cheap;
 * a class on <html> would restyle the whole page each time scrolling starts.
 */
export function OffscreenPause() {
  const pathname = usePathname();
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const shield = document.createElement("div");
    shield.className = "dd-scroll-shield";
    shield.setAttribute("aria-hidden", "true");
    document.body.appendChild(shield);
    let timer = 0;
    const onScroll = () => {
      if (!timer) shield.classList.add("is-on");
      else clearTimeout(timer);
      timer = window.setTimeout(() => {
        shield.classList.remove("is-on");
        timer = 0;
      }, 140);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      shield.remove();
    };
  }, []);
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("main section, footer")].filter(
      (el) => !el.parentElement?.closest("main section"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.removeAttribute("data-offscreen");
          else el.setAttribute("data-offscreen", "");
        }
      },
      { rootMargin: "150px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, [pathname]);
  return null;
}
