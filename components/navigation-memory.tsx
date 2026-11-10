"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
type Saved = { y: number; index: number; offset: number };
const positions = new Map<string, Saved>();
let returning = false;
function capture() {
  const y = window.scrollY,
    children = [...document.querySelectorAll<HTMLElement>("main > *")];
  let index = children.findIndex((e) => {
    const r = e.getBoundingClientRect();
    return r.top <= 100 && r.bottom > 100;
  });
  if (index < 0) index = 0;
  const el = children[index];
  positions.set(location.pathname + location.search, {
    y,
    index,
    offset: el ? y - (el.getBoundingClientRect().top + y) : 0,
  });
}
export function NavigationMemory() {
  const pathname = usePathname();
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a) return;
      try {
        const url = new URL(a.href, location.href);
        if (
          url.origin === location.origin &&
          url.pathname !== location.pathname
        )
          capture();
      } catch {}
    };
    const pop = () => {
      returning = true;
    };
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop);
    window.addEventListener("pagehide", capture);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop);
      window.removeEventListener("pagehide", capture);
    };
  }, []);
  useEffect(() => {
    if (!returning) return;
    returning = false;
    const saved = positions.get(location.pathname + location.search);
    if (!saved) return;
    let cancelled = false,
      frame = 0;
    const started = performance.now();
    const cancel = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
    const restore = () => {
      if (cancelled) return;
      const el =
        document.querySelectorAll<HTMLElement>("main > *")[saved.index];
      const target = el
        ? el.getBoundingClientRect().top + window.scrollY + saved.offset
        : saved.y;
      window.scrollTo({ top: target, behavior: "instant" });
      if (performance.now() - started < 1200)
        frame = requestAnimationFrame(restore);
    };
    frame = requestAnimationFrame(restore);
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", cancel, { once: true });
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [pathname]);
  return null;
}
