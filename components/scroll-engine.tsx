"use client";
import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth wheel scrolling (Lenis) driven by GSAP's ticker, so smooth scrolling and every
 * scroll-linked animation update in the same frame instead of two competing loops.
 */
export default function ScrollEngine() {
  const ref = useRef<LenisRef>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let frame = 0;
    let cleanup = () => {};
    // The Lenis instance is created by ReactLenis; wait a frame or two for it.
    const attach = (tries: number) => {
      const lenis = ref.current?.lenis;
      if (!lenis) {
        if (tries < 60) frame = requestAnimationFrame(() => attach(tries + 1));
        return;
      }
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const off = lenis.on("scroll", ScrollTrigger.update);
      cleanup = () => {
        gsap.ticker.remove(tick);
        off?.();
      };
    };
    attach(0);
    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, []);
  return <ReactLenis root ref={ref} options={{ lerp: 0.12, anchors: true, autoRaf: false }} />;
}
