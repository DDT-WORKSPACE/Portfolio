"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { industries, headings } from "@/content/site";
import { experience } from "@/content/experience";
import { Heading, Icon, RoundArrow } from "../ui";
export function Industries() {
  const ref = useRef<HTMLDivElement>(null),
    section = useRef<HTMLElement>(null),
    drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null),
    suppress = useRef(0),
    resumeAt = useRef(0);
  const [progress, setProgress] = useState(0),
    [visible, setVisible] = useState(false),
    [hover, setHover] = useState(false),
    [focus, setFocus] = useState(false),
    [paused, setPaused] = useState(false),
    [reduced, setReduced] = useState(false);
  const step = () =>
    ((ref.current?.firstElementChild as HTMLElement)?.offsetWidth ?? 480) + 24;
  const move = (dir: number) => {
    resumeAt.current = Date.now() + 8000;
    ref.current?.scrollBy({
      left: dir * step(),
      behavior: reduced ? "instant" : "smooth",
    });
  };
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    if (section.current) io.observe(section.current);
    return () => {
      media.removeEventListener("change", change);
      io.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!visible || hover || focus || paused || reduced) return;
    const timer = setInterval(() => {
      const el = ref.current;
      if (
        !el ||
        document.hidden ||
        Date.now() < resumeAt.current ||
        drag.current
      )
        return;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({
        left:
          el.scrollLeft >= max - 8 ? 0 : Math.min(max, el.scrollLeft + step()),
        behavior: "smooth",
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [visible, hover, focus, paused, reduced]);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = drag.current,
        el = ref.current;
      if (!d || !el) return;
      const delta = e.clientX - d.x;
      if (Math.abs(delta) > 7) d.moved = true;
      if (d.moved) {
        e.preventDefault();
        el.scrollLeft = d.scroll - delta;
        el.classList.add("is-dragging");
      }
    };
    const end = () => {
      if (drag.current?.moved) suppress.current = Date.now() + 250;
      drag.current = null;
      ref.current?.classList.remove("is-dragging");
      resumeAt.current = Date.now() + 8000;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);
  return (
    <section
      className="section industries-section industries-v4"
      id="industries"
      ref={section}
    >
      <div className="container">
        <div className="heading-split">
          <Heading {...headings.industries} />
          <div className="carousel-controls">
            <button
              aria-label={
                paused ? "Play industry slideshow" : "Pause industry slideshow"
              }
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              onClick={() => move(-1)}
              aria-label="Previous industry"
              disabled={progress <= 0}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next industry"
              disabled={progress >= 0.99}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div
          className="industries-carousel"
          ref={ref}
          tabIndex={0}
          aria-label="Industries: swipe, drag or use arrow keys"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocusCapture={() => setFocus(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
          }}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button === 0)
              drag.current = {
                x: e.clientX,
                scroll: e.currentTarget.scrollLeft,
                moved: false,
              };
          }}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (Date.now() < suppress.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onScroll={() => {
            const el = ref.current;
            if (el)
              setProgress(
                el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth),
              );
          }}
          onKeyDown={(e) => {
            if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
              e.preventDefault();
              move(e.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          {industries.map((ind, i) => (
            <Link
              href={`/industries/${ind.slug}`}
              key={ind.slug}
              className={`industry-card industry-v2 industry-${i % 3}`}
              draggable={false}
            >
              <div className="industry-top">
                <span>{ind.name}</span>
                <RoundArrow />
              </div>
              <div className="industry-art industry-art-v2" aria-hidden="true">
                <div className="industry-art-grid" />
                <Image
                  src={ind.art}
                  width={800}
                  height={800}
                  alt=""
                  sizes="(max-width:767px) 80vw,400px"
                  className="industry-phone"
                  draggable={false}
                />
                <span className="industry-floating-icon">
                  <Icon name={ind.icon} size={25} />
                </span>
              </div>
              <h3>{ind.description}</h3>
              <p>{experience.industryNotes[i].body}</p>
              <div className="industry-proof">
                <div className="industry-tags">
                  {experience.industryNotes[i].tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="industry-project-label">
                  Explore this industry
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="carousel-progress">
          <span style={{ transform: `translateX(${progress * 200}%)` }} />
        </div>
        <p className="carousel-hint">
          Swipe or drag to explore. The slideshow pauses while you interact.
        </p>
      </div>
    </section>
  );
}
