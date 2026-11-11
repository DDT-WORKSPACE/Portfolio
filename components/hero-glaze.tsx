"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { projectBrands } from "@/content/experience";

/** A moving, halftone light field styled in royal blue & amber orange. */
export function HeroGlaze() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const canvas = root.querySelector("canvas")!;
    const ctx = canvas.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      visible = false,
      last = 0;
    const width = 640,
      height = 360;
    canvas.width = width;
    canvas.height = height;
    const tile = document.createElement("canvas");
    tile.width = 4;
    tile.height = 4;
    const tileContext = tile.getContext("2d")!;
    tileContext.fillStyle = "#fff";
    tileContext.fillRect(0, 0, 1.5, 1.5);
    tileContext.fillRect(2, 2, 1.5, 1.5);
    const pattern = ctx.createPattern(tile, "repeat")!;
    const paint = (time: number) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0)";
      ctx.fillRect(0, 0, width, height);
      const t = time * 0.00048;
      const ribbon = (
        x: number,
        y: number,
        angle: number,
        alpha: number,
        isOrange: boolean = false,
      ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(2.5, 0.42);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 160);
        if (isOrange) {
          glow.addColorStop(0, `rgba(255,111,0,${alpha * 0.85})`);
          glow.addColorStop(0.22, `rgba(255,145,0,${alpha * 0.65})`);
          glow.addColorStop(0.6, `rgba(255,180,50,${alpha * 0.24})`);
          glow.addColorStop(1, "rgba(255,111,0,0)");
        } else {
          glow.addColorStop(0, `rgba(3,95,232,${alpha * 0.92})`);
          glow.addColorStop(0.22, `rgba(45,130,245,${alpha * 0.7})`);
          glow.addColorStop(0.6, `rgba(90,165,255,${alpha * 0.28})`);
          glow.addColorStop(1, "rgba(3,95,232,0)");
        }
        ctx.fillStyle = glow;
        ctx.fillRect(-160, -160, 320, 320);
        ctx.restore();
      };
      ribbon(
        210 + Math.sin(t) * 150,
        180 + Math.cos(t * 0.8) * 100,
        -0.62 + Math.sin(t * 0.7) * 0.18,
        0.85,
        false, // Royal Blue Ribbon
      );
      ribbon(
        430 + Math.cos(t * 0.8) * 110,
        160 + Math.sin(t) * 85,
        -0.7 + Math.cos(t) * 0.25,
        0.75,
        true, // Amber Orange Ribbon
      );
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      root.dataset.ready = "true";
    };
    const draw = (now: number) => {
      if (!visible || document.hidden || reduced.matches) return;
      frame = requestAnimationFrame(draw);
      if (now - last < 40) return;
      last = now;
      paint(now);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      const running = visible && !document.hidden && !reduced.matches;
      root.dataset.motion = running ? "running" : "paused";
      if (running) frame = requestAnimationFrame(draw);
      else if (reduced.matches) paint(4200);
    };
    paint(4200);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    const parallax = () => {
      if (visible)
        root.style.setProperty(
          "--hero-parallax",
          `${reduced.matches ? 0 : Math.min(60, scrollY * 0.08)}px`,
        );
    };
    window.addEventListener("scroll", parallax, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      window.removeEventListener("scroll", parallax);
    };
  }, []);
  return (
    <div ref={ref} className="hero-glaze" aria-hidden="true">
      <div className="hero-glaze-haze" />
      <canvas />
      <div className="hero-glaze-shade" />
    </div>
  );
}

export function PortfolioMarquee() {
  return (
    <div className="st-logo-marquee" aria-label="Projects from our portfolio">
      <div className="st-logo-track">
        {[0, 1, 2, 3].map((copy) => (
          <div
            className="st-logo-group"
            key={copy}
            aria-hidden={copy > 0 ? true : undefined}
          >
            {projectBrands.map((b) => (
              <Link
                key={b.slug}
                href={`/work/${b.slug}`}
                tabIndex={copy > 0 ? -1 : 0}
                className={`st-logo st-logo-${b.slug}`}
                aria-label={`Explore ${b.name}`}
              >
                <img
                  src={b.logo}
                  width={b.width}
                  height={b.height}
                  alt={copy > 0 ? "" : b.name}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
