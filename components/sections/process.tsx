"use client";
import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ProcessView } from "./process-view";
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const manualTarget = useRef<{ index: number; until: number } | null>(null);
  const commit = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };
  useEffect(() => {
    const release = () => {
      manualTarget.current = null;
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    return () => {
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    };
  }, []);
  const [pinnable, setPinnable] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 768px) and (min-height: 760px), (max-width: 767px) and (min-height: 800px)",
    );
    const update = () => setPinnable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const pinned = pinnable && !reduced;
  useEffect(() => {
    if (!pinned) return;
    const frame = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const start = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - innerHeight;
      if (range > 0)
        commit(
          Math.min(
            3,
            Math.max(0, Math.floor(((window.scrollY - start) / range) * 4)),
          ),
        );
    });
    return () => cancelAnimationFrame(frame);
  }, [pinned]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned ? ["start start", "end end"] : ["start 70%", "end 30%"],
  });
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.45,
  });
  useMotionValueEvent(easedProgress, "change", (progress) => {
    if (reduced) return;
    const target = manualTarget.current;
    if (target) {
      if (
        Math.abs(progress - (target.index + 0.5) / 4) < 0.02 ||
        performance.now() > target.until
      )
        manualTarget.current = null;
      else return;
    }
    const next = Math.min(3, Math.max(0, Math.floor(progress * 4)));
    const previous = activeRef.current;
    if (next > previous && progress < (previous + 1) / 4 + 0.008) return;
    if (next < previous && progress > previous / 4 - 0.008) return;
    if (next !== previous) commit(next);
  });
  const select = (index: number) => {
    commit(index);
    const el = ref.current;
    if (pinned && el) {
      manualTarget.current = { index, until: performance.now() + 1800 };
      window.scrollTo({
        top:
          el.getBoundingClientRect().top +
          window.scrollY +
          (el.offsetHeight - innerHeight) * ((index + 0.5) / 4),
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      ref={ref}
      className="process-scroll-shell"
      data-scroll-follow={!reduced}
    >
      <ProcessView active={active} onSelect={select} />
    </div>
  );
}
