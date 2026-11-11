"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Smartphone,
  PenTool,
  Workflow,
  Cloud,
  ShieldCheck,
  Database,
  Code2,
  Play,
  RotateCcw,
  Mail,
} from "lucide-react";
import { work } from "@/content/work";
import { services } from "@/content/services";
import { ServiceNetwork } from "./service-network";
import { Contact as ContactForm } from "./contact-form";
import { industries } from "@/content/site";

const disciplines = [
  {
    name: "Web platforms",
    slug: "web-development",
    icon: Globe,
    title: "A better place to do business.",
    body: "Websites, customer portals and software your team can build on.",
    points: [
      "Clear user journeys",
      "Connected data & payments",
      "A foundation that grows",
    ],
    type: "web",
  },
  {
    name: "Mobile apps",
    slug: "mobile-apps",
    icon: Smartphone,
    title: "Made for life on the move.",
    body: "Useful iOS and Android experiences, designed around your users.",
    points: [
      "Thoughtful mobile design",
      "Device features & notifications",
      "Support through release",
    ],
    type: "mobile",
  },
  {
    name: "Product design",
    slug: "ui-ux-design",
    icon: PenTool,
    title: "Make the next step feel obvious.",
    body: "From the first user journey to a prototype you can try.",
    points: [
      "Research & user flows",
      "Interfaces & design systems",
      "Interactive prototypes",
    ],
    type: "design",
  },
  {
    name: "AI & automation",
    slug: "ai-automation",
    icon: Workflow,
    title: "Less busywork. More useful work.",
    body: "Connect everyday tools and give repetitive tasks a better route.",
    points: [
      "Enquiry & lead workflows",
      "CRM & system connections",
      "Human review where it matters",
    ],
    type: "automation",
  },
];

function RobotSpeech() {
  const [message, setMessage] = useState(0);
  const lines = [
    "Hello! What could we make easier?",
    "Repetitive tasks? Let’s connect the tools.",
    "Need a review? Your team stays in control.",
  ];
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const t = setInterval(
      () => setMessage((i) => (i + 1) % lines.length),
      4200,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="robot-speech">
      <span key={message}>{lines[message]}</span>
      <button
        aria-label="Next robot message"
        onClick={() => setMessage((i) => (i + 1) % lines.length)}
      >
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

function Preview({ type }: { type: string }) {
  const [variant, setVariant] = useState(0),
    [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
  }, [type]);
  return (
    <div className={`ag-preview real-preview preview-${type}`}>
      {type === "web" ? (
        <div className="real-web-preview">
          <Image
            src="/Projects/talentbadger.jpg"
            width={1280}
            height={853}
            alt="Original supplied Talent Badger project mockup, with its desktop and mobile website designs"
            sizes="(max-width:767px) 90vw, 45vw"
            unoptimized
            quality={100}
          />
          <Link href="/work/talentbadger">
            Explore the real project <ArrowUpRight size={13} />
          </Link>
        </div>
      ) : type === "mobile" ? (
        <div className="real-mobile-preview">
          <Image
            src="/previews/renbite-screen.webp"
            width={387}
            height={849}
            alt="Actual Renbite mobile screen with nearby restaurants, coffee discovery and orders"
            sizes="220px"
            unoptimized
            quality={100}
          />
        </div>
      ) : type === "design" ? (
        <div className="design-workspace">
          <div className="design-tool-strip">
            <span>Layers</span>
            <i />
            <i />
            <i />
            <small>Navigation</small>
            <small>Hero section</small>
            <small>Product cards</small>
          </div>
          <div className={`design-artboard layout-${variant}`}>
            <div className="design-artboard-nav">
              <span>studio.</span>
              <i />
              <i />
            </div>
            <div className="design-artboard-hero">
              <span>A little more possibility.</span>
              <strong>
                A clearer path
                <br />
                to your next idea.
              </strong>
              <div className="design-artboard-cta">
                Explore the experience <ArrowRight size={11} />
              </div>
            </div>
            <div className="design-artboard-cards">
              <div />
              <div />
              <div />
            </div>
            <div className="design-selection-handles">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="design-inspector">
            <span>Design</span>
            <i />
            <i />
            <i />
            <div />
            <div />
            <small>Layout · Auto</small>
          </div>
          <button
            className="design-variant-control"
            onClick={() => setVariant((n) => (n ? 0 : 1))}
          >
            <PenTool size={13} />{" "}
            {variant ? "View desktop layout" : "Try another layout"}
          </button>
        </div>
      ) : (
        <div className="robot-workflow">
          <RobotSpeech />
          <div
            className={`robot-figure robot-stage-${step}`}
            aria-hidden="true"
          >
            <div className="robot-antenna">
              <i />
            </div>
            <div className="robot-head">
              <div className="robot-eyes">
                <i />
                <i />
              </div>
            </div>
            <div className="robot-arm arm-left" />
            <div className="robot-body">
              <Workflow size={25} />
              <span />
            </div>
            <div className="robot-arm arm-right" />
            <div className="robot-platform" />
          </div>
        </div>
      )}
    </div>
  );
}

export function AgencyDisciplines() {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    if (active === displayed) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setDisplayed(active);
      setTransitioning(false);
      return;
    }
    setTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayed(active);
      setTransitioning(false);
    }, 180);
    return () => clearTimeout(timer);
  }, [active, displayed]);
  const d = disciplines[displayed];
  return (
    <section className="st-section ag-disciplines" id="services">
      <div className="st-container">
        <div className="ag-section-heading">
          <span className="st-badge">Our disciplines</span>
          <h2>
            Good ideas.
            <br />
            Built into useful products.
          </h2>
          <p>Design, development and automation. One connected team.</p>
        </div>
        <div
          className="ag-discipline-tabs"
          role="tablist"
          aria-label="Our disciplines"
        >
          {disciplines.map((s, i) => (
            <button
              id={`discipline-${i}`}
              key={s.slug}
              role="tab"
              aria-selected={active === i}
              aria-controls="discipline-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 3
                      : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setActive(n);
                document.getElementById(`discipline-${n}`)?.focus();
              }}
            >
              <s.icon size={18} />
              {s.name}
            </button>
          ))}
        </div>
        <div
          id="discipline-panel"
          role="tabpanel"
          aria-labelledby={`discipline-${displayed}`}
          aria-busy={transitioning}
          className="ag-discipline-panel"
          data-discipline={d.type}
          data-transition={transitioning ? "leaving" : "settled"}
        >
          <div className="ag-discipline-copy" key={d.slug}>
            <span className="ag-small-label">0{active + 1} / 04</span>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <ul>
              {d.points.map((p) => (
                <li key={p}>
                  <Check size={15} />
                  {p}
                </li>
              ))}
            </ul>
            <Link href={`/services/${d.slug}`} className="ag-link">
              Explore {d.name.toLowerCase()}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <Preview key={d.type} type={d.type} />
        </div>
        <div className="ag-industries" id="industries">
          <span>Built around your world</span>
          <div>
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`}>
                {i.name}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projectDescriptions: Record<string, string> = {
  talentbadger:
    "A specialist talent marketplace connecting companies with senior engineers and designers. Find expertise, build a team and start the right conversation in one place.",
  renbite:
    "A coffee and food-ordering app for finding nearby restaurants, discovering favourites and placing an order. Offers, payments and order tracking bring the everyday journey together.",
  "ffp-vault":
    "A personal organizer for financial records, important documents and upcoming due dates. A calendar and reminders help people keep everyday commitments in one place.",
  besttrip:
    "A travel discovery platform bringing flight searches, hotel stays, Umrah and visa options together. Compare travel details and explore offers before planning the next trip.",
  "crypto-wallet":
    "A digital-asset dashboard presenting balances, market movement and transaction status in one view. Clear navigation connects asset selection with send, receive and activity screens.",
};
const selectedProjects = [
  "talentbadger",
  "renbite",
  "ffp-vault",
  "besttrip",
  "crypto-wallet",
];
export function AgencyProjects() {
  return (
    <section className="st-section ag-projects" id="projects">
      <span id="work" className="ag-anchor" />
      <div className="st-container">
        <div className="ag-heading-split">
          <div className="ag-section-heading">
            <span className="st-badge">Selected work</span>
            <h2>
              Real ideas.
              <br />
              Out in the world.
            </h2>
          </div>
          <Link href="/work" className="ag-link">
            All projects
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="ag-project-stack">
          {selectedProjects.map((slug, i) => {
            const p = work.find((w) => w.slug === slug)!;
            return (
              <article
                className={`ag-project project-${i}`}
                key={slug}
                style={{ "--project-index": i } as React.CSSProperties}
              >
                <div className="ag-project-info">
                  <div className="ag-project-meta">
                    <span>0{i + 1} / 05</span>
                    <span>{p.industry}</span>
                  </div>
                  <h3>{p.projectName}</h3>
                  <p>{projectDescriptions[slug]}</p>
                  <Link href={`/work/${slug}`} className="ag-link">
                    Explore the project
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
                <Link
                  href={`/work/${slug}`}
                  className="ag-project-visual"
                  aria-label={`Explore ${p.projectName}`}
                >
                  <Image
                    src={p.cover.src}
                    width={p.cover.width}
                    height={p.cover.height}
                    alt={p.cover.alt}
                    sizes="(max-width:767px) 90vw, 60vw"
                  />
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function useSectionScale() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const reduced = matchMedia("(prefers-reduced-motion:reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, (innerHeight * 0.92 - r.top) / (innerHeight * 0.6)),
      );
      root.style.setProperty(
        "--service-scale",
        String(reduced.matches ? 1 : 0.87 + p * 0.13),
      );
      root.dataset.revealed = p > 0.6 ? "true" : "false";
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return ref;
}
export function AgencyServices() {
  const ref = useSectionScale();
  return (
    <section ref={ref} className="ag-services-wrap" id="features">
      <div className="ag-service-surface">
        <div className="st-container">
          <div className="ag-section-heading">
            <span className="st-badge">Our services</span>
            <h2>
              The right expertise.
              <br />
              For your next chapter.
            </h2>
            <p>
              Bring us the challenge. We will bring the people and the tools.
            </p>
          </div>
          <ServiceNetwork />
          <Link href="/services" className="ag-link">
            Explore all {services.length} services
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AgencyCTA() {
  return (
    <section className="st-section ag-inline-contact" id="contact">
      <div className="st-container">
        <ContactForm embedded />
      </div>
    </section>
  );
}
