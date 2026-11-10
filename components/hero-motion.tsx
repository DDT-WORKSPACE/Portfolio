"use client";
import { useEffect } from "react";
export function HeroMotion() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    let visible = true;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      (hero.dataset.motion =
        visible && !document.hidden && !media.matches ? "playing" : "paused");
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    io.observe(hero);
    document.addEventListener("visibilitychange", update);
    media.addEventListener("change", update);
    update();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      media.removeEventListener("change", update);
    };
  }, []);
  return null;
}
