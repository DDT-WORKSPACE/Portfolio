"use client";

import { useEffect, useState } from "react";

export type DetailAnchor = { id: string; label: string };

export function useActiveSection(items: DetailAnchor[], offset: number) {
  const [state, setState] = useState({ current: items[0]?.id, started: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      const first = current ? document.getElementById(current) : null;
      const line = Math.max(offset + 18, innerHeight * 0.27);

      for (const { id } of items) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line)
          current = id;
      }

      const started =
        !!first &&
        first.getBoundingClientRect().top <= Math.max(line, innerHeight * 0.45);
      setState((previous) =>
        previous.current === current && previous.started === started
          ? previous
          : { current, started },
      );
    };
    const sync = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(sync);
    const main = document.getElementById("main");
    if (main) observer.observe(main);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [items, offset]);

  return state;
}

export function SectionNavigation({ items }: { items: DetailAnchor[] }) {
  const { current } = useActiveSection(items, 110);
  return (
    <nav aria-label="On this page">
      <p>On this page</p>
      {items.map(({ id, label }) => (
        <a
          href={`#${id}`}
          key={id}
          aria-current={current === id ? "location" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
