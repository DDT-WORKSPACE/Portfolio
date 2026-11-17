"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderKanban, Network, Layers3, Route } from "lucide-react";
import { Glyph, type GlyphName } from "./glyph";
import { StartProjectButton } from "@/components/start-project";

const HeroCore = dynamic(() => import("./hero-core").then((m) => m.HeroCore), {
  ssr: false,
  loading: () => <div className="dd-core" />,
});

const pillars: {
  title: string;
  body: string;
  href: string;
  glyph: GlyphName;
  side: "left" | "right";
  y: number;
  x: number;
}[] = [
  { title: "Web platforms", body: "Sites, portals and web apps", href: "/services/web-development", glyph: "web", side: "left", y: 120, x: 0 },
  { title: "Product design", body: "Flows, interfaces and prototypes", href: "/services/ui-ux-design", glyph: "design", side: "left", y: 360, x: 50 },
  { title: "Mobile apps", body: "iOS and Android, built to ship", href: "/services/mobile-apps", glyph: "phone", side: "right", y: 120, x: 0 },
  { title: "AI & automation", body: "Workflows that remove busywork", href: "/services/ai-automation", glyph: "network", side: "right", y: 360, x: 50 },
];

// Light-trail paths in a 1200 x 480 stage, from each card to the core.
const anchors = [
  [282, 120],
  [332, 360],
  [918, 120],
  [868, 360],
];
const trails = [
  "M282 120 C 370 120, 405 190, 488 214",
  "M332 360 C 400 360, 425 300, 488 268",
  "M918 120 C 830 120, 795 190, 712 214",
  "M868 360 C 800 360, 775 300, 712 268",
];
const ambient = [
  "M488 238 C 370 228, 230 270, -20 246",
  "M712 238 C 830 228, 970 270, 1220 246",
  "M498 270 C 410 300, 260 420, 40 480",
  "M702 270 C 790 300, 940 420, 1160 480",
  "M512 205 C 420 150, 300 40, 120 -10",
  "M688 205 C 780 150, 900 40, 1080 -10",
];

const stats = [
  { value: 10, suffix: "", label: "Portfolio projects", icon: FolderKanban },
  { value: 11, suffix: "", label: "Connected services", icon: Network },
  { value: 6, suffix: "", label: "Disciplines in one team", icon: Layers3 },
  { value: 4, suffix: "", label: "Clear steps to launch", icon: Route },
];

const brands = [
  ["talentbadger", "Talent Badger"],
  ["renbite", "Renbite"],
  ["ffp-vault", "FFP Vault"],
  ["evpitch", "Elevator Video Pitch"],
  ["walkthroughz", "Walk Throughz"],
  ["besttrip", "BestTrip"],
];

export function HomeHero() {
  return (
    <section className="dd-hero" id="hero">
      <div className="dd-hero-sky" aria-hidden="true">
        <div className="dd-beams">
          <i />
          <i />
          <i />
        </div>
        <svg className="dd-arcs" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMin slice">
          <defs>
            <linearGradient id="arcBlue" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--dd-blue-light)" }} stopOpacity="1" />
              <stop offset="0.32" style={{ stopColor: "var(--dd-blue)" }} stopOpacity="0.55" />
              <stop offset="0.5" style={{ stopColor: "var(--dd-blue)" }} stopOpacity="0" />
              <stop offset="0.68" style={{ stopColor: "var(--dd-orange)" }} stopOpacity="0.5" />
              <stop offset="1" style={{ stopColor: "var(--dd-orange-light)" }} stopOpacity="1" />
            </linearGradient>
            <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <circle cx="800" cy="1520" r="1420" className="dd-arc-glow" stroke="url(#arcBlue)" filter="url(#arcGlow)" />
          <circle cx="800" cy="1520" r="1420" className="dd-arc" stroke="url(#arcBlue)" />
          <circle cx="800" cy="1560" r="1360" className="dd-arc dd-arc-thin" stroke="url(#arcBlue)" />
        </svg>
        <div className="dd-stars" />
        <div className="dd-hero-glow" />
      </div>

      <div className="dd-container dd-hero-copy">
        <Link href="/work/talentbadger" className="dd-hero-pill">
          <span>New case study</span>
          Inside the Talent Badger marketplace
          <ArrowRight size={14} />
        </Link>
        <h1>
          Digital products and automation{" "}
          <br />
          built to <span className="dd-accent">move you forward</span>
        </h1>
        <p>
          Design, development and practical AI from one senior team, shaped around the way your
          business actually works.
        </p>
        <div className="dd-hero-actions">
          <StartProjectButton className="dd-btn dd-btn-primary">
            Start a project <ArrowUpRight size={17} />
          </StartProjectButton>
          <Link href="#work" className="dd-btn dd-btn-light">
            Explore our work <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div className="dd-container dd-stage-wrap">
        <div className="dd-stage">
          <HeroCore />
          <svg className="dd-trails" viewBox="0 0 1200 480" aria-hidden="true">
            <defs>
              <linearGradient id="trailL" x1="0" x2="1">
                <stop offset="0" style={{ stopColor: "var(--dd-blue-pale)" }} stopOpacity="0.9" />
                <stop offset="1" style={{ stopColor: "var(--dd-blue)" }} stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="trailR" x1="1" x2="0">
                <stop offset="0" style={{ stopColor: "var(--dd-orange-pale)" }} stopOpacity="0.9" />
                <stop offset="1" style={{ stopColor: "var(--dd-orange)" }} stopOpacity="0.12" />
              </linearGradient>
            </defs>
            {ambient.map((d, i) => (
              <path key={d} d={d} className="dd-trail-ambient" stroke={i % 2 ? "url(#trailR)" : "url(#trailL)"} />
            ))}
            {trails.map((d, i) => (
              <g key={d}>
                <path d={d} className="dd-trail" stroke={i < 2 ? "url(#trailL)" : "url(#trailR)"} />
                <path
                  d={d}
                  pathLength={100}
                  className={`dd-trail-pulse ${i < 2 ? "is-blue" : "is-orange"}`}
                  style={{ animationDelay: `${i * -0.9}s` }}
                />
              </g>
            ))}
            {anchors.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" className={`dd-trail-dot ${i < 2 ? "is-blue" : "is-orange"}`} />
            ))}
          </svg>
          {pillars.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className={`dd-orbit-card is-${p.side}`}
              style={
                {
                  "--y": `${(p.y / 480) * 100}%`,
                  "--x": `${(p.x / 1200) * 100}%`,
                } as React.CSSProperties
              }
            >
              <span className="dd-orbit-icon">
                <Glyph name={p.glyph} />
              </span>
              <span className="dd-orbit-text">
                <strong>{p.title}</strong>
                <small>{p.body}</small>
              </span>
            </Link>
          ))}
        </div>

        <div className="dd-stats">
          {stats.map((s) => (
            <div key={s.label} className="dd-stat">
              <span className="dd-stat-icon">
                <s.icon size={20} strokeWidth={1.8} />
              </span>
              <div>
                <strong>
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </strong>
                <small>{s.label}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-hero-logos">
        <p>Products we have designed and built</p>
        <div className="dd-marquee">
          <div className="dd-marquee-track">
            {[0, 1].map((copy) => (
              <div className="dd-marquee-set" key={copy} aria-hidden={copy === 1}>
                {/* Three rounds per set: each set is wider than any screen, so the loop never shows a gap. */}
                {[0, 1, 2].flatMap((round) =>
                  brands.map(([slug, name]) => ({ slug, name, round })),
                ).map(({ slug, name, round }) => (
                  <img
                    key={`${slug}-${round}`}
                    src={`/brands/${slug}-clean.webp`}
                    alt={copy || round ? "" : name}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
