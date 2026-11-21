"use client";

import { useEffect, useRef } from "react";
import { solutions } from "@/content/solutions";
import { useActiveSection } from "./section-navigation";

const items = [
  ...solutions.map(({ slug, title }) => ({ id: slug, label: title })),
  { id: "tools", label: "All tools" },
];

export function SolutionNav() {
  const { current, started } = useActiveSection(items, 136);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = bar.current;
    const link = root?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!link || !root || !started || root.scrollWidth <= root.clientWidth)
      return;
    const track = root.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.left >= track.left + 5 && item.right <= track.right - 5) return;
    root.scrollTo({
      left:
        root.scrollLeft +
        item.left -
        track.left +
        (item.width - track.width) / 2,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [current, started]);

  return (
    <nav
      className="dd-solnav"
      aria-label="Solutions on this page"
      hidden={!started}
    >
      <div className="dd-solnav-inner" ref={bar} data-lenis-prevent-horizontal>
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={current === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
