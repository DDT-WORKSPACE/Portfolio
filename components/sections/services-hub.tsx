"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  m,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  LazyMotion,
  domAnimation,
} from "motion/react";
import { X, ArrowUpRight, Plus } from "lucide-react";
import { services, type Service } from "@/content/services";
import { headings } from "@/content/site";
import { Copy, Heading, Icon, TextLink } from "../ui";
import { traces } from "./traces";
import { ServiceGlyph } from "../service-glyph";
function Detail({ service }: { service: Service }) {
  return (
    <>
      <h3>{service.name}</h3>
      <p>{service.promise}</p>
      <ul>
        {service.capabilities.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="chips">
        {service.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <p className="service-outcome">
        <Copy>{service.outcome}</Copy>
      </p>
      <TextLink href={`/services/${service.slug}`}>
        Explore {service.name.toLowerCase()}
      </TextLink>
    </>
  );
}
export function ServicesHub() {
  return (
    <LazyMotion features={domAnimation} strict>
      <ServicesSequence />
    </LazyMotion>
  );
}
function ServicesSequence() {
  const [packet, setPacket] = useState(0);
  const [active, setActive] = useState<number | null>(null),
    [touch, setTouch] = useState(false),
    [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  useLayoutEffect(() => {
    if (active === null || touch || !ref.current || !card.current) return;
    const place = () => {
      const stage = ref.current,
        popup = card.current;
      if (!stage || !popup) return;
      const w = stage.clientWidth,
        h = stage.clientHeight;
      const desiredX = w * (active < 4 ? 0.3 : active < 8 ? 0.42 : 0.36);
      const desiredY =
        h *
        (active < 8
          ? Math.min(0.46, Math.max(0.03, (traces[active].y - 15) / 100))
          : 0.43);
      setPosition({
        left: Math.max(16, Math.min(w - popup.offsetWidth - 16, desiredX)),
        top: Math.max(16, Math.min(h - popup.offsetHeight - 16, desiredY)),
      });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(ref.current);
    observer.observe(card.current);
    return () => observer.disconnect();
  }, [active, touch]);
  const seen = useInView(ref, { once: true, amount: 0.35 }),
    reduced = useReducedMotion(),
    live = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const spread = useTransform(
    scrollYProgress,
    [0, 0.08, 0.3, 0.7, 0.92, 1],
    reduced ? [1, 1, 1, 1, 1, 1] : [0, 0, 1, 1, 0, 0],
  );
  const constellationOpacity = useTransform(spread, [0, 0.35, 1], [0, 0.65, 1]);
  const [unfolded, setUnfolded] = useState(false);
  useMotionValueEvent(spread, "change", (value) => {
    setUnfolded(value > 0.96);
    if (value < 0.95) setActive(null);
  });
  useEffect(() => {
    if (!live || reduced) return;
    const interval = setInterval(
      () => setPacket((previous) => previous + 1),
      2000,
    );
    return () => clearInterval(interval);
  }, [live, reduced]);
  useEffect(() => {
    setTouch(matchMedia("(pointer: coarse)").matches);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const select = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 80);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 150);
  };
  const close = () => {
    if (timer.current) clearTimeout(timer.current);
    setActive(null);
  };
  const keyboard = (e: React.KeyboardEvent<HTMLAnchorElement>, i: number) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      const next =
        (i +
          (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) +
          services.length) %
        services.length;
      ref.current
        ?.querySelector<HTMLAnchorElement>(`[data-tile="${next}"]`)
        ?.focus();
    }
  };
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="heading-split">
          <Heading {...headings.services} />
          <p className="interaction-hint">
            <span className="status-dot" />
            Explore a service.
            <br />
            See how it all connects.
          </p>
        </div>
        <div
          className={`services-stage ${seen ? "is-visible" : ""} ${active !== null ? "has-active" : ""}`}
          ref={ref}
          onMouseLeave={leave}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <div className="services-center">
            <div className="service-logo-placeholder">
              <img
                src="/Logo/logo.png"
                alt="DevsDen Tech logo"
                width={64}
                height={67}
              />
            </div>
            <div className="hub-ports">
              <i className={active !== null ? "lit" : ""} />
              <i className={active !== null ? "lit" : ""} />
              <i className={active !== null ? "lit" : ""} />
            </div>
            <span className="hub-caption">One team. Connected.</span>
          </div>
          <m.div
            className="service-constellation"
            style={{ scale: spread, opacity: constellationOpacity }}
            inert={!reduced && !unfolded}
          >
            <svg
              viewBox="0 0 1200 900"
              className="traces-svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="trace-active">
                  <stop stopColor="#1A62FF" />
                  <stop offset="1" stopColor="#FF6A00" />
                </linearGradient>
              </defs>
              {traces.map((t, i) => (
                <g key={i}>
                  <path
                    className={`trace ${active === i ? "active" : ""}`}
                    d={t.path}
                    pathLength="1"
                    style={{
                      transitionDelay: active === null ? `${i * 60}ms` : "0ms",
                    }}
                  />
                  {live &&
                    (active === i || (active === null && packet % 11 === i)) &&
                    !reduced && (
                      <circle
                        className="service-packet"
                        key={`${packet}-${active}`}
                        r="4"
                        fill="#FF6A00"
                        opacity="0"
                      >
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          keyTimes="0;.1;.85;1"
                          dur="1.6s"
                        />
                        <animateMotion
                          dur="1.6s"
                          path={t.path}
                          keyPoints={
                            Math.floor(packet / 11) % 2 ? "1;0" : "0;1"
                          }
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    )}
                </g>
              ))}
            </svg>
            {services.map((s, i) => (
              <a
                href={`/services/${s.slug}`}
                key={s.slug}
                data-tile={i}
                className={`service-node ${active === i ? "active" : ""}`}
                style={{
                  left: `${traces[i].x}%`,
                  top: `${traces[i].y}%`,
                  transitionDelay: seen ? `${i * 60}ms` : "0ms",
                }}
                aria-describedby={active === i ? `detail-${i}` : undefined}
                onFocus={() => {
                  if (timer.current) clearTimeout(timer.current);
                  setActive(i);
                }}
                onBlur={(e) => {
                  if (
                    !e.relatedTarget ||
                    !ref.current?.contains(e.relatedTarget)
                  )
                    leave();
                }}
                onMouseEnter={() => select(i)}
                onMouseLeave={leave}
                onKeyDown={(e) => keyboard(e, i)}
                onClick={(e) => {
                  if (touch) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <span className={`service-icon tone-${i % 3}`}>
                  <ServiceGlyph name={s.icon} />
                </span>
                <span className="service-node-label">{s.name}</span>
              </a>
            ))}
          </m.div>
          <AnimatePresence>
            {active !== null && (
              <m.div
                ref={(node) => {
                  if (node) card.current = node;
                }}
                key={active}
                id={`detail-${active}`}
                className={`service-detail ${touch ? "touch-sheet" : ""}`}
                style={
                  !touch
                    ? (position ?? {
                        left: active < 4 ? "30%" : active < 8 ? "42%" : "36%",
                        top:
                          active < 8
                            ? `${Math.min(46, Math.max(3, traces[active].y - 15))}%`
                            : "43%",
                      })
                    : undefined
                }
                initial={{
                  opacity: 0,
                  scale: reduced ? 1 : 0.96,
                  y: reduced ? 0 : 8,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => {
                  if (timer.current) clearTimeout(timer.current);
                }}
                onMouseLeave={leave}
              >
                <button
                  className="detail-close"
                  onClick={close}
                  aria-label="Close service details"
                >
                  <X size={16} />
                </button>
                <Detail service={services[active]} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mobile-service-list">
          <div className="mobile-service-hub">
            <Icon name="connect" />
            <span>One team. Every discipline.</span>
          </div>
          {services.map((s, i) => (
            <div
              className={`mobile-service ${mobileOpen === i ? "open" : ""}`}
              key={s.slug}
            >
              <button
                aria-expanded={mobileOpen === i}
                aria-controls={`mobile-service-${i}`}
                onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
              >
                <span className="service-icon">
                  <ServiceGlyph name={s.icon} />
                </span>
                {s.name}
                <Plus size={18} />
              </button>
              <div
                id={`mobile-service-${i}`}
                className="accordion-content"
                inert={mobileOpen !== i}
              >
                <div>
                  <Detail service={s} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="service-bottom">
          <span>Connected expertise, from the first conversation.</span>
          <Link href="/services">
            All eleven services
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
