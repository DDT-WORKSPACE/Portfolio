"use client";

import { useEffect, useRef } from "react";

// Tools that orbit the footer rings (the same logos as the Solutions page).
const tiles = ["shopify", "slack", "notion", "stripe", "hubspot", "gmail", "zapier", "googlesheets", "n8n", "github", "openai", "slack"];

/**
 * Two soft grooved rings behind the footer with tool tiles travelling along the outer one.
 * The rings never move; each small tile animates on its own (cheap compositor transforms),
 * and everything pauses while the footer is off screen.
 */
export function FooterOrbit() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el.parentElement ?? el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="dd-orbit" ref={root} aria-hidden="true">
      <div className="dd-orbit-ring is-outer">
        {tiles.map((t, i) => (
          <span key={i} className="dd-orbit-tile" style={{ ["--a" as string]: `${(i * 360) / tiles.length}deg` }}>
            <img src={`/integrations/${t}.svg`} width={26} height={26} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
      <div className="dd-orbit-ring is-inner" />
    </div>
  );
}
