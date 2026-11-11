"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Play, RotateCcw } from "lucide-react";

export function HeroStatement() {
  const words = [
    "Your next website.",
    "Your next app.",
    "Your smarter workflow.",
  ];
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0,
      count = words[0].length,
      deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (deleting) {
        count--;
        setText(words[index].slice(0, count));
        if (count === 0) {
          deleting = false;
          index = (index + 1) % words.length;
        }
      } else {
        count++;
        setText(words[index].slice(0, count));
        if (count === words[index].length) deleting = true;
      }
      timer = setTimeout(
        tick,
        count === words[index].length
          ? 2300
          : count === 0
            ? 250
            : deleting
              ? 35
              : 65,
      );
    };
    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <h1 className="st-typed-heading">
      <span className="sr-only">
        Your next website, app or smarter workflow. Built to move you forward.
      </span>
      <span aria-hidden="true" className="st-type-line">
        {text}
        <i />
      </span>
      <span aria-hidden="true">Built to move you forward.</span>
    </h1>
  );
}

/** Scroll-linked scenes reverse naturally. Layout is preserved when JS or motion is unavailable. */
export function ScrollScene({
  children,
  className = "",
  mode = "scatter",
}: {
  children: ReactNode;
  className?: string;
  mode?: "scatter" | "expand";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect(),
        vh = innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh + rect.height)),
      );
      const spread = reduced.matches
        ? 1
        : Math.max(
            0,
            Math.min(1, (progress - 0.1) / 0.23, (0.94 - progress) / 0.19),
          );
      root.style.setProperty("--spread", String(spread));
      root.style.setProperty(
        "--panel-scale",
        String(
          reduced.matches
            ? 1
            : 0.82 + 0.18 * Math.min(1, Math.max(0, (progress - 0.08) / 0.25)),
        ),
      );
      root.style.setProperty(
        "--parallax",
        `${reduced.matches ? 0 : (progress - 0.5) * 55}px`,
      );
      root.dataset.progress = progress.toFixed(3);
      root.dataset.spread = spread.toFixed(3);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const measure = () => {
      root.querySelectorAll<HTMLElement>("[data-scatter]").forEach((el) => {
        const parent = el.offsetParent as HTMLElement | null;
        if (!parent) return;
        const centered = el.classList.contains("st-tool");
        el.style.setProperty(
          "--from-x",
          `${parent.clientWidth / 2 - el.offsetLeft - (centered ? 0 : el.offsetWidth / 2)}px`,
        );
        el.style.setProperty(
          "--from-y",
          `${parent.clientHeight / 2 - el.offsetTop - (centered ? 0 : el.offsetHeight / 2)}px`,
        );
      });
      schedule();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    const children = new MutationObserver(measure);
    children.observe(root, { childList: true, subtree: true });
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", measure);
    reduced.addEventListener("change", schedule);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      children.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", measure);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div ref={ref} className={`st-scroll-scene scene-${mode} ${className}`}>
      {children}
    </div>
  );
}

/** Original SVG character, with separate limbs/screens for code-native motion. */
export function StudioIllustration({ kind = "web" }: { kind?: string }) {
  return (
    <svg
      className={`studio-illustration art-${kind}`}
      viewBox="0 0 440 330"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`screen-${kind}`}
          x1="90"
          y1="80"
          x2="330"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d0f4df" />
          <stop offset="1" stopColor="#8fc7aa" />
        </linearGradient>
      </defs>
      <ellipse
        cx="222"
        cy="293"
        rx="152"
        ry="14"
        fill="#174a2c"
        opacity=".08"
      />
      <g className="art-window">
        <rect
          x="128"
          y="65"
          width="240"
          height="174"
          rx="17"
          fill="#f4fbf6"
          stroke="#80ab91"
          strokeWidth="2"
        />
        <path d="M128 96H368" stroke="#abcbb8" />
        <circle cx="145" cy="81" r="3" fill="#438e66" />
        <circle cx="156" cy="81" r="3" fill="#98bea6" />
        <circle cx="167" cy="81" r="3" fill="#bad2c2" />
        {kind === "mobile" ? (
          <>
            <rect
              x="216"
              y="107"
              width="68"
              height="115"
              rx="13"
              fill="#153d2a"
            />
            <rect
              x="222"
              y="117"
              width="56"
              height="91"
              rx="5"
              fill="#b9e9cd"
            />
            <circle cx="250" cy="149" r="17" fill="#76b88e" />
            <path
              d="M231 179H268M231 189H257"
              stroke="#477c5c"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        ) : kind === "automation" ? (
          <>
            <path
              className="art-flow"
              d="M169 156H220V191H314M220 156V124H314"
              stroke="#448562"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            {[
              [167, 156],
              [220, 156],
              [314, 124],
              [314, 191],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect
                  x={x - 15}
                  y={y - 15}
                  width="30"
                  height="30"
                  rx="8"
                  fill={i === 1 ? "#22573b" : "#c5e8d2"}
                />
                <path
                  d={`M${x - 5} ${y}l4 4 7-8`}
                  stroke={i === 1 ? "#c5e8d2" : "#22573b"}
                  strokeWidth="2"
                />
              </g>
            ))}
          </>
        ) : kind === "design" ? (
          <>
            <rect
              x="148"
              y="114"
              width="70"
              height="103"
              rx="7"
              fill="#d1e7d8"
            />
            <circle cx="183" cy="145" r="20" fill="#8db99c" />
            <rect
              x="231"
              y="114"
              width="116"
              height="44"
              rx="7"
              fill="#86b899"
            />
            <path
              d="M233 177H343M233 190H315M233 203H327"
              stroke="#b4d0bd"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M296 146L320 168L308 170L304 183Z"
              fill="#174c31"
              stroke="#fff"
              strokeWidth="2"
            />
          </>
        ) : (
          <>
            <rect
              x="147"
              y="112"
              width="202"
              height="52"
              rx="7"
              fill={`url(#screen-${kind})`}
            />
            <rect
              x="147"
              y="178"
              width="58"
              height="41"
              rx="6"
              fill="#d7eade"
            />
            <rect
              x="218"
              y="178"
              width="59"
              height="41"
              rx="6"
              fill="#b1d5bd"
            />
            <rect
              x="290"
              y="178"
              width="59"
              height="41"
              rx="6"
              fill="#d7eade"
            />
            <path
              d="M167 133H265M167 145H233"
              stroke="#4f8765"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
      <g className="art-character">
        <path
          d="M96 226L81 270M129 225L145 270"
          stroke="#204b33"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M80 275H64M146 275H162"
          stroke="#163724"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <rect
          x="70"
          y="158"
          width="84"
          height="80"
          rx="25"
          fill="#77b88c"
          stroke="#28583a"
          strokeWidth="2"
        />
        <path
          className="art-arm"
          d="M143 180Q179 192 189 163"
          stroke="#28583a"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M75 181L53 210"
          stroke="#28583a"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <rect
          x="68"
          y="91"
          width="88"
          height="67"
          rx="25"
          fill="#d8f1df"
          stroke="#28583a"
          strokeWidth="2"
        />
        <rect x="79" y="107" width="66" height="35" rx="15" fill="#173f2a" />
        <g className="art-eyes">
          <path
            d="M96 122V127M126 122V127"
            stroke="#c1f9d5"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
        <path d="M108 91V80" stroke="#28583a" strokeWidth="3" />
        <circle cx="108" cy="76" r="5" fill="#67b985" />
        <path
          d="M100 193L109 202L124 184"
          stroke="#d6f4df"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <g className="art-spark">
        <path
          d="M366 42V58M358 50H374M42 134V146M36 140H48"
          stroke="#5d9d77"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="326" cy="274" r="7" stroke="#86b99a" strokeWidth="2" />
      </g>
    </svg>
  );
}

const offers = [
  {
    name: "Websites & software",
    slug: "web-development",
    type: "web",
    body: "Websites, platforms and tools built for your business.",
  },
  {
    name: "Mobile apps",
    slug: "mobile-apps",
    type: "mobile",
    body: "Useful iOS and Android products, wherever life happens.",
  },
  {
    name: "Product design",
    slug: "ui-ux-design",
    type: "design",
    body: "Clear journeys. Thoughtful interfaces. Clickable prototypes.",
  },
  {
    name: "AI & automation",
    slug: "ai-automation",
    type: "automation",
    body: "Connected workflows that take repetitive work off your team.",
  },
];
export function VisualCapabilities() {
  return (
    <div className="st-offer-grid">
      {offers.map((o, i) => (
        <Link
          key={o.slug}
          href={`/services/${o.slug}`}
          className={`st-offer offer-${o.type}`}
        >
          <div className="st-offer-art">
            <StudioIllustration kind={o.type} />
          </div>
          <div className="st-offer-copy">
            <span>0{i + 1}</span>
            <h3>{o.name}</h3>
            <p>{o.body}</p>
            <ArrowUpRight size={21} />
          </div>
        </Link>
      ))}
    </div>
  );
}

const phases = [
  {
    name: "Discover",
    label: "Find the right problem.",
    nodes: ["Your idea", "People & needs", "A clear brief"],
    type: "design",
  },
  {
    name: "Design",
    label: "Try it before we build it.",
    nodes: ["User journey", "Prototype", "Your feedback"],
    type: "design",
  },
  {
    name: "Build",
    label: "Connect the working pieces.",
    nodes: ["Interface", "Data & APIs", "Working product"],
    type: "web",
  },
  {
    name: "Launch",
    label: "Test it. Ship it. Keep improving.",
    nodes: ["Quality checks", "Go live", "Learn & improve"],
    type: "automation",
  },
];
export function DeliveryLab() {
  const [active, setActive] = useState(0),
    [playing, setPlaying] = useState(false);
  const root = useRef<HTMLElement>(null),
    manual = useRef(false);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((n) => (n + 1) % 4), 2400);
    return () => clearInterval(t);
  }, [playing]);
  useEffect(() => {
    const el = root.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (
        manual.current ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.65 - r.top) / (r.height * 0.8);
      if (p >= 0 && p <= 1) setActive(Math.min(3, Math.floor(p * 4)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
    };
  }, []);
  const phase = phases[active];
  return (
    <section ref={root} className="st-section st-delivery" id="process">
      <div className="st-container">
        <div className="st-centered-heading">
          <span className="st-eyebrow">How we build</span>
          <h2>
            From a first thought.
            <br />
            To a working thing.
          </h2>
          <p>Explore the journey. Watch the pieces come together.</p>
        </div>
        <div className="st-delivery-lab">
          <div className="st-lab-toolbar">
            <span>
              <i /> Project playground
            </span>
            <button
              aria-pressed={playing}
              onClick={() => {
                manual.current = true;
                setPlaying(!playing);
              }}
            >
              {playing ? (
                "Pause simulation"
              ) : (
                <>
                  <Play size={13} /> Play the journey
                </>
              )}
            </button>
            <button
              aria-label="Reset simulation"
              onClick={() => {
                manual.current = false;
                setPlaying(false);
                setActive(0);
              }}
            >
              <RotateCcw size={15} />
            </button>
          </div>
          <div className="st-lab-scene" data-stage={active} key={active}>
            <div className="st-lab-grid" />
            <div className="st-lab-art">
              <StudioIllustration kind={phase.type} />
            </div>
            <div className="st-lab-pipeline">
              {phase.nodes.map((n, i) => (
                <div
                  className="st-lab-node"
                  key={n}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span>{i === 2 ? <Check size={17} /> : i + 1}</span>
                  {n}
                </div>
              ))}
            </div>
            <div className="st-lab-status" role="status">
              <span>0{active + 1} / 04</span>
              <strong>{phase.label}</strong>
              <i />
            </div>
          </div>
          <div
            role="tablist"
            aria-label="Delivery stages"
            className="st-lab-tabs"
          >
            {phases.map((p, i) => (
              <button
                key={p.name}
                id={`lab-tab-${i}`}
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => {
                  manual.current = true;
                  setPlaying(false);
                  setActive(i);
                }}
                onKeyDown={(e) => {
                  if (
                    !["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                  )
                    return;
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 3
                        : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                  manual.current = true;
                  setPlaying(false);
                  setActive(n);
                  document.getElementById(`lab-tab-${n}`)?.focus();
                }}
              >
                <span>0{i + 1}</span>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
