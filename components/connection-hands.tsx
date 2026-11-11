"use client";
import { useEffect, useRef } from "react";

export function ConnectionHands() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const canvas = root.querySelector("canvas")!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false,
      frame = 0,
      ready = false,
      start = 0,
      last = 0,
      destroyed = false,
      w = 1,
      h = 1;
    let left: HTMLCanvasElement | null = null,
      right: HTMLCanvasElement | null = null;
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const mask = new Image();
    mask.src = "/artwork/connection-hands.webp";
    const width = innerWidth < 768 ? 640 : 960,
      height = width / 2;
    const paint = () => {
      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const s = source.getContext("2d")!;
      s.drawImage(mask, 0, 0, width, height);
      const pixels = s.getImageData(0, 0, width, height).data;
      const sheets = [
        document.createElement("canvas"),
        document.createElement("canvas"),
      ];
      for (const sheet of sheets) {
        sheet.width = width;
        sheet.height = height;
      }
      const glyphs = ["+", "·", ":", "1", "0", "/"];
      const step = 4;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          if (pixels[i + 3] < 95) continue;
          const l = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765;
          const c = sheets[x < width / 2 ? 0 : 1].getContext("2d")!;
          const blue = x > width * 0.38 && x < width * 0.62;
          c.fillStyle = blue
            ? `rgba(139,179,255,${((0.18 + l * 0.7) * pixels[i + 3]) / 255})`
            : `rgba(223,231,243,${((0.12 + l * 0.64) * pixels[i + 3]) / 255})`;
          c.font = "4px monospace";
          c.fillText(glyphs[(x * 7 + y * 13) % glyphs.length], x, y);
        }
      }
      [left, right] = sheets;
      ready = true;
      root.dataset.ready = "true";
      resize();
      update();
    };
    const resize = () => {
      const b = root.getBoundingClientRect();
      w = b.width;
      h = b.height;
      const d = Math.min(devicePixelRatio, 1.7);
      canvas.width = Math.round(w * d);
      canvas.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = (now: number) => {
      if (destroyed || !visible || document.hidden || media.matches || !ready)
        return;
      frame = requestAnimationFrame(draw);
      if (now - last < 30) return;
      last = now;
      if (!start) start = now;
      const t = (now - start) / 1000;
      const ease = 1 - Math.pow(1 - Math.min(1, t / 2.8), 3);
      current.x += (pointer.x - current.x) * 0.045;
      current.y += (pointer.y - current.y) * 0.045;
      ctx.clearRect(0, 0, w, h);
      const cycle = (Math.sin(t * 0.5 - Math.PI / 2) + 1) / 2;
      const gap = (1 - ease) * w * 0.11 + (1 - cycle) * w * 0.018;
      const aw = w,
        ah = w / 2,
        ay = (h - ah) / 2 + current.y + Math.min(25, window.scrollY * 0.045);
      ctx.globalAlpha = 0.4 + ease * 0.6;
      ctx.drawImage(left!, current.x - gap, ay, aw, ah);
      ctx.drawImage(right!, current.x + gap, ay, aw, ah);
      ctx.globalAlpha = 1;
      const cx = w * 0.5 + current.x,
        cy = h * 0.5 + current.y + Math.min(25, window.scrollY * 0.045);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.12);
      glow.addColorStop(0, `rgba(221,237,255,${0.35 + cycle * 0.45})`);
      glow.addColorStop(0.1, `rgba(106,161,255,${0.22 + cycle * 0.2})`);
      glow.addColorStop(1, "rgba(44,102,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - w * 0.12, cy - w * 0.12, w * 0.24, w * 0.24);
      for (let i = 0; i < 85; i++) {
        const seed = i * 2.399963;
        const orbit = 14 + (i % 17) * 2.8;
        const x = cx + Math.cos(seed + t * 0.2) * orbit * (w / 960),
          y = cy + Math.sin(seed + t * 0.25) * orbit * 0.48 * (w / 960);
        ctx.fillStyle = `rgba(171,205,255,${0.08 + (i % 5) * 0.07})`;
        ctx.fillRect(x, y, 1.2, 1.2);
      }
      if (ease < 1) {
        for (let i = 0; i < 180; i++) {
          const side = i % 2 ? 1 : -1;
          const x =
            w * 0.5 + side * (w * 0.05 + (i % 37) * w * 0.011) * (1 - ease);
          const y = h * 0.5 + Math.sin(i * 9.7 + t) * h * 0.35 * (1 - ease);
          ctx.fillStyle = `rgba(142,179,242,${(1 - ease) * 0.4})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    };
    function update() {
      cancelAnimationFrame(frame);
      root!.dataset.motion =
        visible && !document.hidden && !media.matches ? "running" : "paused";
      if (visible && !document.hidden && !media.matches && ready)
        frame = requestAnimationFrame(draw);
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    io.observe(root);
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const b = root.getBoundingClientRect();
      pointer.x = (e.clientX - b.left - b.width / 2) * 0.025;
      pointer.y = (e.clientY - b.top - b.height / 2) * 0.025;
    };
    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", update);
    media.addEventListener("change", update);
    if (mask.complete) paint();
    else mask.onload = paint;
    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      mask.onload = null;
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", update);
      media.removeEventListener("change", update);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="connection-hands"
      data-motion="paused"
      aria-hidden="true"
    >
      <img
        className="hands-fallback"
        src="/artwork/connection-hands.webp"
        width={1440}
        height={720}
        alt=""
        fetchPriority="high"
      />
      <canvas />
      <div className="connection-flare" />
    </div>
  );
}
