"use client";
import dynamic from "next/dynamic";
import { NavigationMemory } from "./navigation-memory";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const HeaderScrollContext = createContext({ compact: false, hidden: false });
export const useHeaderScroll = () => useContext(HeaderScrollContext);
const ScrollEngine = dynamic(() => import("./scroll-engine"), { ssr: false });
export function Providers({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState(false);
  const [header, setHeader] = useState({ compact: false, hidden: false });
  const previous = useRef(0);
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !matchMedia("(pointer: fine)").matches
    )
      return;
    let active: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    const reset = () => {
      active?.style.removeProperty("--magnet-x");
      active?.style.removeProperty("--magnet-y");
      active = null;
      bounds = null;
    };
    const over = (event: PointerEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".button")
          : null;
      if (target && target !== active) {
        reset();
        active = target;
        bounds = target.getBoundingClientRect();
      }
    };
    const move = (event: PointerEvent) => {
      if (!active || !bounds) return;
      active.style.setProperty(
        "--magnet-x",
        `${Math.max(-6, Math.min(6, (event.clientX - bounds.x - bounds.width / 2) * 0.08))}px`,
      );
      active.style.setProperty(
        "--magnet-y",
        `${Math.max(-6, Math.min(6, (event.clientY - bounds.y - bounds.height / 2) * 0.08))}px`,
      );
    };
    const out = (event: PointerEvent) => {
      if (
        active &&
        (!(event.relatedTarget instanceof Node) ||
          !active.contains(event.relatedTarget))
      )
        reset();
    };
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    return () => {
      reset();
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next = { compact: y > 40, hidden: y > 600 && y > previous.current };
      previous.current = y;
      setHeader((old) =>
        old.compact === next.compact && old.hidden === next.hidden ? old : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const start = () => {
      if (
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        matchMedia("(pointer: fine)").matches
      )
        setScroll(true);
    };
    window.addEventListener("wheel", start, { once: true, passive: true });
    return () => window.removeEventListener("wheel", start);
  }, []);
  return (
    <HeaderScrollContext.Provider value={header}>
      <NavigationMemory />
      {children}
      {scroll && <ScrollEngine />}
    </HeaderScrollContext.Provider>
  );
}
