"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function register() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/**
 * Declarative scroll motion for a page scope.
 *   data-reveal            fade + rise when entering (data-reveal-delay optional)
 *   data-reveal-group      children with [data-reveal-item] stagger in
 *   data-parallax="0.15"   scrubbed vertical drift (fraction of element height)
 *   data-count="11"        number counts up when visible
 *   data-draw              svg path draws as it scrolls into view
 *   data-tilt              pointer-driven 3D tilt (fine pointers only)
 */
export function useScrollMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    register();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (reduced || Number.isNaN(end)) {
          el.textContent = String(end);
          return;
        }
        const state = { v: 0 };
        el.textContent = "0";
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      if (reduced) return;

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 46, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 0.12;
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.22, yPercent: -7 },
          {
            scale: 1.04,
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });

      root.querySelectorAll<SVGPathElement>("[data-draw]").forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path.closest("[data-draw-scope]") ?? path,
              start: "top 80%",
              end: "top 35%",
              scrub: 0.8,
            },
          },
        );
      });
    }, root);

    if (!reduced && fine) {
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const strength = Number(el.dataset.tilt) || 6;
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(el, { transformPerspective: 900 });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
          rx(-((e.clientY - r.top) / r.height - 0.5) * strength * 2);
          el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Images and fonts change layout after load; keep trigger positions accurate.
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    const t = setTimeout(refresh, 1200);
    return () => {
      clearTimeout(t);
      removeEventListener("load", refresh);
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, [scope]);
}
