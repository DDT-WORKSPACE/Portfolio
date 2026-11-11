"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function StudioReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const q = matchMedia("(prefers-reduced-motion:reduce)");
    if (q.matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.visible = "true";
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`studio-reveal ${className}`}
      data-visible="pending"
    >
      {children}
    </div>
  );
}
