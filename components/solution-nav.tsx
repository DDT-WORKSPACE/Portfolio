"use client";

import { useEffect, useRef, useState } from "react";

/** Sticky jump links for /integrations that highlight the section currently in view. */
export function SolutionNav({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = innerHeight * 0.35;
      let id = items[0]?.id ?? "";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) id = it.id;
      }
      setCurrent(id);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Keep the active pill visible when the bar scrolls sideways on small screens.
  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(".is-active");
    const root = bar.current;
    if (!el || !root || root.scrollWidth <= root.clientWidth) return;
    root.scrollTo({ left: el.offsetLeft - root.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [current]);

  return (
    <nav className="dd-solnav" aria-label="Solutions on this page">
      <div className="dd-solnav-inner" ref={bar}>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className={current === it.id ? "is-active" : ""} aria-current={current === it.id ? "location" : undefined}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
