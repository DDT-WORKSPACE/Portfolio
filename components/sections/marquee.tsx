"use client";
import { useRef, useEffect, useState } from "react";
import { Copy } from "../ui";
export function Marquee({
  items,
  reverse = false,
  logos = false,
}: {
  items: readonly string[];
  reverse?: boolean;
  logos?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null),
    [visible, setVisible] = useState(false),
    [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", change);
    };
  }, []);
  return (
    <div className={`marquee ${logos ? "logo-marquee" : ""}`} ref={ref}>
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{
          animationPlayState: visible && !reduced ? "running" : "paused",
        }}
      >
        {[0, 1].map((n) => (
          <div className="marquee-group" key={n} aria-hidden={n === 1}>
            {items.map((t, i) => (
              <span key={i} className={logos ? "client-logo" : "tech-chip"}>
                <Copy>{t}</Copy>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
