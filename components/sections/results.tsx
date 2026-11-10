"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/experience";
import { Marker } from "../ui";
export function Results() {
  const ref = useRef<HTMLElement>(null),
    [progress, setProgress] = useState(1);
  useEffect(() => {
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1);
          return;
        }
        let started = 0;
        const tick = (now: number) => {
          if (!started) started = now;
          const p = Math.min(1, (now - started) / 1100);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section className="results-section results-v2" ref={ref}>
      <div className="container">
        <div className="results-heading">
          <Marker>proof, in practice</Marker>
          <p>A little perspective on the work.</p>
        </div>
        <div className="stats-grid">
          {experience.results.map((s, i) => (
            <Link href={s.href} key={s.label}>
              <span className="stat-index">
                0{i + 1}
                <ArrowUpRight size={16} />
              </span>
              <strong>
                {Math.round(s.value * progress)}
                <span>{s.suffix}</span>
              </strong>
              <span className="stat-label">{s.label}</span>
              <small>{s.detail}</small>
              <div className="stat-bars" aria-hidden="true">
                {Array.from({ length: 16 }, (_, j) => (
                  <i
                    style={{
                      height: `${14 + ((j * 7 + i * 11) % 30)}px`,
                      opacity: j < s.value ? 0.8 : 0.18,
                    }}
                    key={j}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
