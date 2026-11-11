"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X, Check } from "lucide-react";
import { services } from "@/content/services";
import { ServiceGlyph } from "@/components/service-glyph";
import { traces } from "./traces";
import { servicePreviews } from "@/content/service-previews";

export function ServiceNetwork() {
  const [active, setActive] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const place = () => {
    if (
      !root.current ||
      !popup.current ||
      matchMedia("(pointer: coarse)").matches
    )
      return;
    const r = root.current.getBoundingClientRect(),
      card = popup.current.getBoundingClientRect();
    const scale = r.width / root.current.offsetWidth;
    const point = pointer.current ?? {
      x: r.left + r.width * 0.5,
      y: r.top + r.height * 0.3,
    };
    let x = point.x + 22;
    if (x + card.width > Math.min(innerWidth - 18, r.right))
      x = point.x - card.width - 22;
    x = Math.max(Math.max(18, r.left), x);
    const y = Math.max(
      Math.max(95, r.top),
      Math.min(
        point.y - 35,
        innerHeight - card.height - 18,
        r.bottom - card.height,
      ),
    );
    popup.current.style.left = `${(x - r.left) / scale}px`;
    popup.current.style.top = `${(y - r.top) / scale}px`;
  };
  useLayoutEffect(place, [active]);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => {
      io.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const select = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(i);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 180);
  };
  const selected = active === null ? null : services[active];
  const detail = selected ? servicePreviews[selected.slug] : null;
  return (
    <div
      className="sn-network"
      ref={root}
      data-live={live}
      onMouseLeave={leave}
      onKeyDown={(e) => {
        if (e.key === "Escape") setActive(null);
      }}
    >
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        className="sn-connections"
        aria-hidden="true"
      >
        {traces.map((t, i) => (
          <g key={i}>
            <path
              d={t.path}
              className={active === i ? "sn-path is-active" : "sn-path"}
            />
            <path
              d={t.path}
              className="sn-packet"
              style={{ animationDelay: `${i * -0.8}s` }}
            />
          </g>
        ))}
      </svg>
      <svg
        viewBox="0 0 360 670"
        preserveAspectRatio="none"
        className="sn-connections-mobile"
        aria-hidden="true"
      >
        {[
          "M50 80H105Q120 80 120 95V265Q120 285 140 285",
          "M50 194H100Q115 194 115 214V285Q115 300 140 300",
          "M50 322H140",
          "M50 442H100Q120 442 120 422V337Q120 322 140 322",
          "M310 80H255Q240 80 240 95V265Q240 285 220 285",
          "M310 194H260Q245 194 245 214V285Q245 300 220 300",
          "M310 322H220",
          "M310 442H260Q240 442 240 422V337Q240 322 220 322",
          "M65 569V500Q65 480 85 480H150Q165 480 165 460V345",
          "M180 569V345",
          "M295 569V500Q295 480 275 480H210Q195 480 195 460V345",
        ].map((d, i) => (
          <path d={d} key={i} className="sn-path" />
        ))}
      </svg>
      <div className="sn-center">
        <div className="sn-center-rings" />
        <img src="/Logo/logo.png" alt="" width={55} height={58} />
        <span>One connected team</span>
      </div>
      {services.map((s, i) => (
        <Link
          href={`/services/${s.slug}`}
          key={s.slug}
          className={`sn-node ${active === i ? "is-active" : ""}`}
          style={{ left: `${traces[i].x}%`, top: `${traces[i].y}%` }}
          onMouseEnter={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            select(i);
          }}
          onMouseMove={(e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            place();
          }}
          onMouseLeave={leave}
          onFocus={(e) => {
            const b = e.currentTarget.getBoundingClientRect();
            pointer.current = { x: b.right, y: b.top + b.height / 2 };
            select(i);
          }}
          onBlur={(e) => {
            if (!root.current?.contains(e.relatedTarget)) leave();
          }}
          aria-describedby={active === i ? "network-detail" : undefined}
          onKeyDown={(e) => {
            if (
              !["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(
                e.key,
              )
            )
              return;
            e.preventDefault();
            const next =
              (i +
                (["ArrowRight", "ArrowDown"].includes(e.key)
                  ? 1
                  : services.length - 1)) %
              services.length;
            root.current
              ?.querySelectorAll<HTMLAnchorElement>(".sn-node")
              [next]?.focus();
          }}
          onClick={(e) => {
            if (matchMedia("(pointer: coarse)").matches) {
              e.preventDefault();
              select(i);
            }
          }}
        >
          <span className="sn-icon">
            <ServiceGlyph name={s.icon} />
          </span>
          <strong>{s.name}</strong>
        </Link>
      ))}
      {selected && (
        <div
          ref={popup}
          className={`sn-detail ${active !== null && active < 4 ? "detail-right" : "detail-left"}`}
          id="network-detail"
          onMouseEnter={() => {
            if (timer.current) clearTimeout(timer.current);
          }}
          onMouseLeave={leave}
        >
          <button
            className="sn-close"
            aria-label="Close service preview"
            onClick={() => setActive(null)}
          >
            <X size={15} />
          </button>
          <h3>{selected.name}</h3>
          <p>{detail?.description}</p>
          <ul className="sn-included">
            {detail?.includes.map((item) => (
              <li key={item}>
                <Check size={13} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="sn-scope">
            <strong>Scope, made clear.</strong> {detail?.scope}
          </p>
          <Link href={`/services/${selected.slug}`}>
            See the service <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
      <p className="sn-help">Hover, focus or tap a service to explore.</p>
    </div>
  );
}

export function AboutSpread({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const reduced = matchMedia("(prefers-reduced-motion:reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, (innerHeight - r.top) / (innerHeight + r.height)),
      );
      const spread = reduced.matches
        ? 1
        : Math.max(0, Math.min(1, (p - 0.06) / 0.28, (0.98 - p) / 0.16));
      root.style.setProperty("--about-spread", String(spread));
      root.dataset.spread = spread.toFixed(3);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const measure = () => {
      const grid = root.querySelector<HTMLElement>(".st-about-bento");
      if (grid)
        grid.querySelectorAll<HTMLElement>(".st-bento-card").forEach((el) => {
          el.style.setProperty(
            "--fan-x",
            `${grid.clientWidth / 2 - el.offsetLeft - el.offsetWidth / 2}px`,
          );
        });
      schedule();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    addEventListener("scroll", schedule, { passive: true });
    reduced.addEventListener("change", schedule);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("scroll", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div className="about-spread" ref={ref}>
      {children}
    </div>
  );
}
