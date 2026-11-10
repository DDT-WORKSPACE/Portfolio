"use client";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentType,
} from "react";
const sequences = {
  handoffs: () => import("./sections/handoffs").then((m) => m.Handoffs),
  services: () => import("./sections/services-hub").then((m) => m.ServicesHub),
  process: () => import("./sections/process").then((m) => m.Process),
};
export function DeferredSequence({
  kind,
  children,
}: {
  kind: keyof typeof sequences;
  children: ReactNode;
}) {
  const [Sequence, setSequence] = useState<ComponentType | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          void sequences[kind]().then((component) => {
            if (!cancelled) setSequence(() => component);
          });
          observer.disconnect();
        }
      },
      {
        rootMargin: kind === "services" ? "500px 0px" : "0px",
        threshold: 0.03,
      },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [kind]);
  return (
    <div ref={ref} data-sequence={kind}>
      {Sequence ? <Sequence /> : children}
    </div>
  );
}
