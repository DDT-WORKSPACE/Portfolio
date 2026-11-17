"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemedImage, emeraldVariant } from "@/components/themed-image";
import { useTheme } from "@/components/theme";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
  PenTool,
  Code2,
  Rocket,
  Plus,
  Mail,
  Users,
  Eye,
  Sprout,
  ShieldCheck,
  MessagesSquare,
  Layers3,
  ShoppingBag,
  Headphones,
  Receipt,
  Workflow,
  Compass,
  CalendarDays,
  Handshake,
  Smartphone,
  Send,
} from "lucide-react";
import { work } from "@/content/work";
import { faqs, industries, site, stages } from "@/content/site";
import { posts } from "@/content/posts";
import { ServiceNetwork } from "@/components/sections/service-network";
import { services } from "@/content/services";
import { StartProjectButton } from "@/components/start-project";
import { Glyph, type GlyphName } from "./glyph";

function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "orange" | "dark" }) {
  return (
    <span className={`dd-badge is-${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Intro showcase                                                      */
/* ------------------------------------------------------------------ */
export function IntroShowcase() {
  const chips = [
    { icon: Users, title: "One connected team", body: "Design, code and automation together" },
    { icon: Eye, title: "Work you can see", body: "Reviewable progress at every stage" },
    { icon: Sprout, title: "Built to keep growing", body: "Handover and room for what comes next" },
  ];
  return (
    <section className="dd-section dd-intro" id="studio">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge>About DevsDen Tech</Badge>
          <h2>
            Your whole product journey,
            <br />
            <span className="dd-blue">handled by one team</span>
          </h2>
          <p>
            Designers, developers and automation specialists working around the same goal, from the first
            conversation to launch and the next improvement.
          </p>
        </div>
        <div className="dd-intro-chips" data-reveal-group>
          {chips.map((c) => (
            <div className="dd-chip-card" key={c.title} data-reveal-item>
              <span className="dd-chip-icon">
                <c.icon size={20} strokeWidth={1.8} />
              </span>
              <span>
                <strong>{c.title}</strong>
                <small>{c.body}</small>
              </span>
            </div>
          ))}
        </div>

        <div className="dd-showcase" data-reveal>
          <div className="dd-blob is-blue" data-parallax="0.35" aria-hidden="true" />
          <div className="dd-blob is-orange" data-parallax="-0.3" aria-hidden="true" />
          <div className="dd-sphere is-a" data-parallax="0.6" aria-hidden="true" />
          <div className="dd-sphere is-b" data-parallax="-0.5" aria-hidden="true" />
          <div className="dd-showcase-frame" data-tilt="3">
            <div className="dd-showcase-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>devsden.tech / work / talent-badger</span>
            </div>
            <ThemedImage
              src="/Projects/brand/talentbadger.webp"
              width={1280}
              height={853}
              alt="Talent Badger engineering marketplace shown on desktop and mobile"
              sizes="(max-width: 900px) 92vw, 960px"
            />
          </div>
          <div className="dd-float-card is-left" data-parallax="-0.8">
            <Glyph name="design" />
            <span>
              <strong>Product design</strong>
              <small>Flows reviewed before build</small>
            </span>
          </div>
          <div className="dd-float-card is-right" data-parallax="0.9">
            <Glyph name="network" />
            <span>
              <strong>Automation</strong>
              <small>Lead to CRM to follow-up</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services hub (kept as the team asked, shown larger)                 */
/* ------------------------------------------------------------------ */
export function ServicesHub() {
  return (
    <section className="dd-section dd-hub" id="features">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge>Our services</Badge>
          <h2>
            The right expertise,
            <br />
            <span className="dd-blue">connected around you</span>
          </h2>
          <p>Bring us the challenge. We bring the people, the process and the tools.</p>
        </div>
        <div className="dd-hub-surface" data-reveal>
          <ServiceNetwork />
        </div>
        <div className="dd-center-link">
          <Link href="/services" className="dd-btn dd-btn-outline">
            Explore all {services.length} services <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ready to get started banner                                         */
/* ------------------------------------------------------------------ */
export function StartBanner() {
  const bars = [38, 62, 46, 88, 54, 120, 72, 98, 58, 140, 84, 66];
  return (
    <section className="dd-banner-wrap">
      <div className="dd-container">
        <div className="dd-banner" data-reveal>
          <div className="dd-banner-grid" aria-hidden="true" />
          <div className="dd-banner-bars" aria-hidden="true">
            {bars.map((h, i) => (
              <i key={i} style={{ height: h, animationDelay: `${i * -0.35}s` }} />
            ))}
          </div>
          <div className="dd-banner-copy">
            <h2>Ready to get started?</h2>
            <p>
              Websites, apps and automations that keep up with your business. Tell us what you need and we will
              shape the first step together.
            </p>
            <div className="dd-banner-actions">
              <StartProjectButton className="dd-btn dd-btn-white">
                Start your journey <ArrowRight size={16} />
              </StartProjectButton>
              <Link href="/contact" className="dd-btn dd-btn-ghost">
                <MessagesSquare size={16} /> Talk to an expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */
const pillarCards: {
  title: string;
  body: string;
  glyph: GlyphName;
  tone: "blue" | "orange" | "navy";
  href: string;
  items: string[];
}[] = [
  {
    title: "Product design",
    body: "Interfaces people understand the first time they use them.",
    glyph: "design",
    tone: "blue",
    href: "/services/ui-ux-design",
    items: ["Research and user flows", "Clickable prototypes", "UI and design systems", "MVP and product scoping", "Figma handover"],
  },
  {
    title: "Web and mobile engineering",
    body: "Fast, maintainable products your team can keep building on.",
    glyph: "web",
    tone: "orange",
    href: "/services/web-development",
    items: ["Web platforms and portals", "iOS and Android apps", "E-commerce storefronts", "APIs and integrations", "Cloud and DevOps"],
  },
  {
    title: "AI and business automation",
    body: "Find the bottleneck, then build the workflow that removes it.",
    glyph: "network",
    tone: "navy",
    href: "/services/ai-automation",
    items: ["Lead capture and follow-up", "CRM and system connections", "AI assistants with human review", "Data and reporting", "Support after launch"],
  },
];
export function Pillars() {
  return (
    <section className="dd-section dd-pillars">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge tone="orange">What we do</Badge>
          <h2>
            Three disciplines.
            <span className="dd-orange"> One direction.</span>
          </h2>
          <p>Whether you need a new product, a better platform or less manual work, we cover the full picture.</p>
        </div>
        <div className="dd-pillar-grid" data-reveal-group>
          {pillarCards.map((p) => (
            <article className={`dd-pillar is-${p.tone}`} key={p.title} data-reveal-item data-tilt="4">
              <svg className="dd-pillar-wave" viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`wave-a-${p.tone}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" className="dd-wave-stop-a" stopOpacity="0.34" />
                    <stop offset="1" className="dd-wave-stop-a" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id={`wave-b-${p.tone}`} x1="1" x2="0" y1="0" y2="1">
                    <stop offset="0" className="dd-wave-stop-b" stopOpacity="0.4" />
                    <stop offset="1" className="dd-wave-stop-b" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                <path d="M0 62 C 70 18, 150 118, 240 74 S 360 38, 400 68 V150 H0 Z" fill={`url(#wave-a-${p.tone})`} />
                <path d="M0 108 C 90 68, 170 134, 260 102 S 360 72, 400 94 V150 H0 Z" fill={`url(#wave-b-${p.tone})`} />
              </svg>
              <div className="dd-pillar-art">
                <span className="dd-pedestal" aria-hidden="true" />
                <Glyph name={p.glyph} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="dd-btn dd-btn-pillar">
                Learn more <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Selected work: compact interactive showcase                         */
/* ------------------------------------------------------------------ */
// 3:2 mockups fill the stage; 4:3 mockups (the two apps) float whole as a card on a soft stage.
const showcase: { slug: string; line: string }[] = [
  { slug: "talentbadger", line: "A curated marketplace for senior engineering talent." },
  { slug: "evpitch", line: "Video pitches that help jobseekers and recruiters connect." },
  { slug: "renbite", line: "Coffee and food ordering in a few simple taps." },
  { slug: "ffp-vault", line: "Financial records, due dates and reminders in one calm place." },
];
const platform: Record<string, string> = {
  dashboard: "Web platform",
  mobile: "Mobile app",
  commerce: "E-commerce",
};
export function SelectedWork() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const previous = useRef(0);
  const items = showcase.map((s) => ({ ...s, p: work.find((w) => w.slug === s.slug)! }));
  const current = items[active];

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const from = previous.current;
    previous.current = active;
    if (first.current) {
      first.current = false;
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slide = root.querySelector<HTMLElement>(`[data-slide="${active}"]`);
    const outgoing = from !== active ? root.querySelector<HTMLElement>(`[data-slide="${from}"]`) : null;
    const caption = root.querySelector<HTMLElement>(".dd-show-caption");
    const tl = gsap.timeline();
    // A full-bleed mockup would show around a smaller app card while it wipes in,
    // so clear it away first and then reveal the card on the empty stage.
    const clearFirst = !!outgoing && outgoing.dataset.ratio === "wide" && slide?.dataset.ratio !== "wide";
    if (clearFirst) {
      // The slide's own CSS opacity transition is delayed; switch it off so the fade runs now.
      gsap.set(outgoing, { transition: "none", opacity: 1 });
      tl.to(outgoing, { opacity: 0, duration: 0.3, ease: "power1.out" }, 0);
      tl.add(() => gsap.set(outgoing, { clearProps: "opacity,transition" }));
    }
    if (slide) {
      tl.fromTo(
        slide,
        { clipPath: "inset(0% 0% 0% 100% round 20px)" },
        { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 0.9, ease: "power3.inOut" },
        clearFirst ? 0.16 : 0,
      );
      const imgs = slide.querySelectorAll("img");
      if (imgs.length) {
        if (slide.dataset.ratio === "wide")
          tl.fromTo(imgs, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out" }, 0);
        else tl.fromTo(imgs, { scale: 0.94, y: 18 }, { scale: 1, y: 0, duration: 1.1, ease: "power3.out" }, 0.1);
      }
    }
    if (caption)
      tl.fromTo(
        caption.children,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power2.out" },
        0.25,
      );
    return () => {
      tl.kill();
      if (clearFirst) gsap.set(outgoing, { clearProps: "opacity,transition" });
    };
  }, [active]);

  return (
    <section className="dd-section dd-work" id="work">
      <span id="projects" className="dd-anchor" />
      <div className="dd-container">
        <div className="dd-heading is-split" data-reveal>
          <div>
            <Badge>Selected work</Badge>
            <h2>
              Real products.
              <span className="dd-blue"> Out in the world.</span>
            </h2>
          </div>
          <Link href="/work" className="dd-btn dd-btn-outline">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>
        <div
          className={`dd-show ${paused ? "is-paused" : ""}`}
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="dd-show-list" role="tablist" aria-label="Selected projects">
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                role="tab"
                id={`show-tab-${i}`}
                aria-selected={i === active}
                aria-controls="show-panel"
                className={`dd-show-item ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="dd-show-num">0{i + 1}</span>
                <span className="dd-show-text">
                  <strong>{it.p.projectName}</strong>
                  <small>
                    {it.p.industry} · {platform[it.p.type] ?? "Digital product"}
                  </small>
                  <span className="dd-show-line">{it.line}</span>
                </span>
                <ArrowUpRight size={18} className="dd-show-go" />
                {i === active && (
                  <span className="dd-show-progress" aria-hidden="true">
                    <span onAnimationEnd={() => setActive((a) => (a + 1) % items.length)} />
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="dd-show-stage" ref={stage} id="show-panel" role="tabpanel" aria-labelledby={`show-tab-${active}`}>
            <div className="dd-show-frame">
              {items.map((it, i) => (
                <div
                  key={it.slug}
                  className={`dd-show-slide ${i === active ? "is-active" : ""}`}
                  data-slide={i}
                  aria-hidden={i !== active}
                  data-ratio={it.p.cover.width / it.p.cover.height > 1.4 ? "wide" : "tall"}
                >
                  <ThemedImage
                    src={it.p.cover.src}
                    width={it.p.cover.width}
                    height={it.p.cover.height}
                    alt={it.p.cover.alt}
                    sizes="(max-width: 1020px) 92vw, 720px"
                  />
                </div>
              ))}
            </div>
            <div className="dd-show-caption">
              <div>
                <h3>{current.p.title}</h3>
                <p>{current.p.stack.join(" · ")}</p>
              </div>
              <Link href={`/work/${current.slug}`} className="dd-btn dd-btn-primary dd-btn-sm">
                View case study <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process with notched cards                                          */
/* ------------------------------------------------------------------ */
function notchPath(w: number, h: number, R: number, r: number, f: number) {
  const cx = w / 2;
  const d = Math.sqrt((r + f) ** 2 - f ** 2);
  const n = (v: number) => Math.round(v * 100) / 100;
  const lx = cx - (r * d) / (r + f),
    ly = (r * f) / (r + f),
    rx = cx + (r * d) / (r + f);
  return [
    `M0 ${R}`,
    `A${R} ${R} 0 0 1 ${R} 0`,
    `L${n(cx - d)} 0`,
    `A${f} ${f} 0 0 1 ${n(lx)} ${n(ly)}`,
    `A${r} ${r} 0 0 0 ${n(rx)} ${n(ly)}`,
    `A${f} ${f} 0 0 1 ${n(cx + d)} 0`,
    `L${w - R} 0`,
    `A${R} ${R} 0 0 1 ${w} ${R}`,
    `L${w} ${h - R}`,
    `A${R} ${R} 0 0 1 ${w - R} ${h}`,
    `L${R} ${h}`,
    `A${R} ${R} 0 0 1 0 ${h - R}`,
    "Z",
  ].join(" ");
}
/** A card whose top edge curves down around a centred number badge. */
function NotchCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`dd-notch ${size ? "is-ready" : ""} ${className}`}>
      {size && (
        <svg className="dd-notch-bg" viewBox={`0 0 ${size.w} ${size.h}`} width={size.w} height={size.h} aria-hidden="true">
          <path d={notchPath(size.w, size.h, 30, 48, 16)} />
        </svg>
      )}
      {children}
    </div>
  );
}
const stageStyle = [
  { icon: Search, tone: "blue" },
  { icon: PenTool, tone: "orange" },
  { icon: Code2, tone: "navy" },
  { icon: Rocket, tone: "sky" },
] as const;
export function Process() {
  return (
    <section className="dd-section dd-process" id="approach">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge>Our process</Badge>
          <h2>
            How we <span className="dd-blue">work with you</span>
          </h2>
          <p>Understand the problem, shape the experience, build in steps and launch with a way forward.</p>
        </div>
        <div className="dd-process-track" data-draw-scope>
          <svg className="dd-process-lines" viewBox="0 0 1200 210" preserveAspectRatio="none" aria-hidden="true">
            {[0, 1, 2].map((i) => {
              const x = 150 + i * 300;
              return (
                <g key={i}>
                  <path
                    data-draw
                    className={`dd-process-path is-${stageStyle[i].tone}`}
                    d={`M${x + 20} 200 C ${x + 50} 168, ${x + 100} 160, ${x + 150} 160 S ${x + 245} 150, ${x + 268} 110`}
                  />
                  <circle cx={x + 150} cy={160} r="5" className={`dd-process-dot is-${stageStyle[i].tone}`} />
                </g>
              );
            })}
          </svg>
          <div className="dd-process-grid" data-reveal-group>
            {stages.map((s, i) => {
              const St = stageStyle[i];
              return (
                <article key={s.name} className={`dd-step is-${St.tone}`} data-reveal-item>
                  <div className="dd-step-orb">
                    <span className="dd-step-icon">
                      <St.icon size={28} strokeWidth={1.8} />
                    </span>
                  </div>
                  <NotchCard className="dd-step-card">
                    <span className="dd-step-num">0{i + 1}</span>
                    <h3>{s.name}</h3>
                    <p>{s.body}</p>
                    <span className="dd-step-pill">{s.time}</span>
                  </NotchCard>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ecosystem: the systems we build and connect                         */
/* ------------------------------------------------------------------ */
const solutions = [
  { title: "Commerce platforms", body: "Storefronts, catalogues, checkout and order flows.", icon: ShoppingBag, tone: "blue", href: "/services/e-commerce", pos: "tl" },
  { title: "Email and automation", body: "Follow-ups, notifications and inbox workflows.", icon: Mail, tone: "orange", href: "/services/ai-automation", pos: "tr" },
  { title: "CRM and sales", body: "Leads, pipelines and customer records in one place.", icon: Users, tone: "sky", href: "/services/apis-integrations", pos: "ml" },
  { title: "Helpdesk and support", body: "Tickets, chat and AI assistants with human handoff.", icon: Headphones, tone: "navy", href: "/services/ai-automation", pos: "mr" },
  { title: "Accounting and ERP links", body: "Invoices, payments and stock synced with your tools.", icon: Receipt, tone: "amber", href: "/services/apis-integrations", pos: "bc" },
] as const;
const ringStopsBrand = ["#035fe8", "#2f86ff", "#7db6ff", "#ff9a4d", "#ff6f00", "#1f74ff"];
// Same ramp through scripts/emerald-palette.mjs for the Emerald & gold theme.
const ringStopsEmerald = ["#21615e", "#32958f", "#6dcec9", "#e4aa3a", "#a67517", "#2c837e"];
function ringColor(t: number, ringStops: string[]) {
  const pos = t * (ringStops.length - 1);
  const i = Math.min(ringStops.length - 2, Math.floor(pos));
  const k = pos - i;
  const a = parseInt(ringStops[i].slice(1), 16),
    b = parseInt(ringStops[i + 1].slice(1), 16);
  const ch = (sh: number) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}
export function Ecosystem() {
  const ringStops = useTheme() === "emerald" ? ringStopsEmerald : ringStopsBrand;
  const segments = Array.from({ length: 28 });
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const arrows = [
    { d: "M520 236 C 470 196, 420 176, 306 176", tone: "blue" },
    { d: "M680 236 C 730 196, 780 176, 894 176", tone: "orange" },
    { d: "M520 384 C 470 424, 420 444, 306 444", tone: "sky" },
    { d: "M680 384 C 730 424, 780 444, 894 444", tone: "navy" },
    { d: "M600 446 L 600 538", tone: "amber" },
  ];
  return (
    <section className="dd-section dd-eco" id="integrations">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge tone="orange">Solutions</Badge>
          <h2>
            Your business,
            <span className="dd-orange"> one connected ecosystem</span>
          </h2>
          <p>The systems we design, build and connect, so information moves between them without copying and chasing.</p>
        </div>
        <div className="dd-eco-map">
          <svg className="dd-eco-lines" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              {["blue", "orange", "sky", "navy", "amber"].map((t) => (
                <marker key={t} id={`arrow-${t}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 Z" className={`dd-eco-head is-${t}`} />
                </marker>
              ))}
            </defs>
            {arrows.map((a) => (
              <path key={a.d} d={a.d} className={`dd-eco-path is-${a.tone}`} markerEnd={`url(#arrow-${a.tone})`} />
            ))}
          </svg>
          <div className="dd-eco-core" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="dd-eco-ring">
              {segments.map((_, i) => {
                const deg = (i / segments.length) * 360;
                const a = (deg * Math.PI) / 180;
                const x = r2(100 + Math.cos(a) * 88),
                  y = r2(100 + Math.sin(a) * 88);
                return (
                  <rect
                    key={i}
                    x={r2(x - 4.5)}
                    y={r2(y - 2.6)}
                    width="9"
                    height="5.2"
                    rx="1.4"
                    fill={ringColor(i / segments.length, ringStops)}
                    transform={`rotate(${r2(deg + 90)} ${x} ${y})`}
                  />
                );
              })}
            </svg>
            <div className="dd-eco-logo">
              <img className="dd-th-brand" src="/Logo/logo.png" alt="" width={64} height={67} />
              <img loading="lazy" className="dd-th-emerald" src="/Logo/logo-emerald.png" alt="" width={64} height={67} />
            </div>
          </div>
          {solutions.map((s, i) => (
            <Link key={s.title} href={s.href} className={`dd-sol is-${s.pos} is-${s.tone}`} data-reveal data-reveal-delay={String(0.08 * i)}>
              <span className="dd-sol-icon">
                <s.icon size={22} strokeWidth={1.9} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="dd-sol-link">
                Explore solution <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
        <div className="dd-center-link">
          <Link href="/integrations" className="dd-btn dd-btn-outline">
            Tools we connect <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */
export function Industries() {
  return (
    <section className="dd-section dd-industries" id="industries">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge>Industries</Badge>
          <h2>
            Different industries.
            <span className="dd-blue"> The same care.</span>
          </h2>
          <p>Every sector has its own users, rules and pressure points. We design around them.</p>
        </div>
        <div className="dd-industry-grid" data-reveal-group>
          {industries.map((ind, i) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="dd-industry" data-reveal-item data-tilt="5">
              <span className="dd-industry-art" style={{ animationDelay: `${i * -0.7}s` }}>
                <img className="dd-th-brand" src={ind.art} alt="" width={220} height={220} loading="lazy" decoding="async" />
                <img
                  className="dd-th-emerald"
                  src={emeraldVariant(ind.art) ?? ind.art}
                  alt=""
                  width={220}
                  height={220}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <h3>{ind.name}</h3>
              <p>{ind.description}</p>
              <span className="dd-industry-link">
                Explore <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="dd-section dd-faq" id="faq">
      <div className="dd-container dd-faq-grid">
        <div className="dd-faq-side" data-reveal>
          <Badge>Questions</Badge>
          <h2>
            Good questions,
            <br />
            <span className="dd-blue">straight answers</span>
          </h2>
          <p>The things teams usually ask before we start working together.</p>
          <div className="dd-faq-help">
            <span className="dd-faq-help-icon">
              <MessagesSquare size={20} />
            </span>
            <div>
              <strong>Still have a question?</strong>
              <a href={`mailto:${site.email}`}>
                <Mail size={14} /> {site.email}
              </a>
            </div>
          </div>
        </div>
        <div className="dd-faq-list" data-reveal-group>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`dd-faq-item ${isOpen ? "is-open" : ""}`} key={f.question} data-reveal-item>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`dd-faq-${i}`}
                    id={`dd-faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.question}</span>
                    <i aria-hidden="true">
                      <Plus size={18} />
                    </i>
                  </button>
                </h3>
                <div className="dd-faq-answer" id={`dd-faq-${i}`} role="region" aria-labelledby={`dd-faq-q-${i}`}>
                  <div>
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Photo call to action                                                */
/* ------------------------------------------------------------------ */
export function PhotoCta() {
  const points = [
    { icon: Layers3, text: "Design, code and automation in one team" },
    { icon: CalendarDays, text: "Scope agreed before we build" },
    { icon: Eye, text: "Progress you can review" },
    { icon: ShieldCheck, text: "NDA when you need it" },
  ];
  return (
    <section className="dd-photo" id="get-started">
      {/* Photo: Unsplash, free licence. Office photo by Proxyclick. */}
      <div className="dd-photo-media" aria-hidden="true">
        <div className="dd-photo-img" data-zoom />
      </div>
      <div className="dd-photo-shade" aria-hidden="true" />
      <div className="dd-container dd-photo-inner" data-reveal>
        <h2>
          Ready to build
          <br />
          <span>what comes next?</span>
        </h2>
        <p>Tell us where you are and where you want to go. One senior team will help you shape the first step.</p>
        <div className="dd-photo-actions">
          <StartProjectButton className="dd-btn dd-btn-white">
            <Send size={16} /> Start a project
          </StartProjectButton>
          <Link href="/contact" className="dd-btn dd-btn-ghost">
            <CalendarDays size={16} /> Book a free consultation
          </Link>
        </div>
        <ul className="dd-photo-points">
          {points.map((p) => (
            <li key={p.text}>
              <p.icon size={16} /> {p.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Insights with curved image cards                                    */
/* ------------------------------------------------------------------ */
const postArt: Record<string, { glyph: GlyphName; tone: string; icon: typeof Workflow }> = {
  "website-web-app-or-mobile-app": { glyph: "phone", tone: "blue", icon: Smartphone },
  "signs-your-crm-needs-automation": { glyph: "chart", tone: "orange", icon: Workflow },
  "what-a-good-handover-looks-like": { glyph: "shield", tone: "navy", icon: Handshake },
  "ai-that-earns-its-place": { glyph: "network", tone: "sky", icon: Workflow },
  "before-the-first-sprint": { glyph: "rocket", tone: "orange", icon: Compass },
  "design-and-engineering": { glyph: "design", tone: "navy", icon: PenTool },
};
const shapes = ["wave", "swoop", "point", "slope"];
export function InsightCard({ slug, index }: { slug: string; index: number }) {
  const p = posts.find((x) => x.slug === slug)!;
  const art = postArt[p.slug] ?? { glyph: "spark" as GlyphName, tone: "blue", icon: Workflow };
  const shape = shapes[index % shapes.length];
  return (
    <Link href={`/blog/${p.slug}`} className={`dd-post is-${art.tone}`} data-reveal-item>
      <span className="dd-post-media">
        <span className={`dd-post-art is-${shape}`}>
          <Glyph name={art.glyph} />
          <span className="dd-post-cat">{p.category}</span>
        </span>
        <span className={`dd-post-badge is-${shape}`}>
          <art.icon size={20} />
        </span>
      </span>
      <span className="dd-post-body">
        <small>
          {p.date} · {p.readingTime}
        </small>
        <strong>{p.title}</strong>
        <span>{p.description}</span>
        <b>
          Read article
          <span className="dd-post-go">
            <ArrowRight size={14} />
          </span>
        </b>
      </span>
    </Link>
  );
}
export function Insights() {
  return (
    <section className="dd-section dd-insights" id="insights">
      <div className="dd-container">
        <div className="dd-heading is-center" data-reveal>
          <Badge tone="orange">Insights</Badge>
          <h2>
            Stay informed with
            <span className="dd-orange"> our insights</span>
          </h2>
          <p>Practical notes on scoping products, choosing what to automate and keeping projects moving.</p>
        </div>
        <div className="dd-post-grid" data-reveal-group>
          {posts.slice(0, 4).map((p, i) => (
            <InsightCard key={p.slug} slug={p.slug} index={i} />
          ))}
        </div>
        <div className="dd-center-link">
          <Link href="/blog" className="dd-btn dd-btn-primary">
            Explore all insights <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
