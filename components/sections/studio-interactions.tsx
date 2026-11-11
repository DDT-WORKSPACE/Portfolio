"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Code2,
  Smartphone,
  PenTool,
  Workflow,
  Check,
  Mail,
  Database,
  Cloud,
  GitBranch as Github,
  MessageSquare as Slack,
  Calendar,
  Play,
  Pause,
  Quote,
} from "lucide-react";
import { ScrollScene } from "@/components/studio-motion";
import { site } from "@/content/site";

const capabilities = [
  {
    name: "Websites & software",
    slug: "web-development",
    icon: Code2,
    body: "Fast websites, customer platforms and tools your team can keep building on.",
    note: "From the first click to the everyday details.",
    steps: [
      "A clear experience",
      "A connected platform",
      "Ready for the next release",
    ],
    type: "web",
  },
  {
    name: "Mobile experiences",
    slug: "mobile-apps",
    icon: Smartphone,
    body: "Thoughtful iOS and Android experiences, built around the people using them.",
    note: "A useful product. Wherever life happens.",
    steps: [
      "Designed for real use",
      "Connected to your systems",
      "Prepared for release",
    ],
    type: "mobile",
  },
  {
    name: "Product design",
    slug: "ui-ux-design",
    icon: PenTool,
    body: "Clear journeys, considered interfaces and prototypes you can try before you build.",
    note: "Make the important decisions tangible.",
    steps: [
      "Understand the journey",
      "Explore the direction",
      "Review the experience",
    ],
    type: "design",
  },
  {
    name: "Business automation",
    slug: "ai-automation",
    icon: Workflow,
    body: "Reception, sales follow-up and connected workflows that take repetitive work off your plate.",
    note: "Let good work flow. Keep people in control.",
    steps: [
      "Capture the enquiry",
      "Connect the next step",
      "Hand over when it matters",
    ],
    type: "automation",
  },
];
export function CapabilityExplorer() {
  const [active, setActive] = useState(0);
  const c = capabilities[active];
  const Icon = c.icon;
  return (
    <div className="st-capability-explorer">
      <div
        className="st-capability-list"
        role="tablist"
        aria-label="Explore our capabilities"
      >
        {capabilities.map((item, i) => (
          <button
            key={item.slug}
            id={`capability-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="capability-preview"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key))
                return;
              e.preventDefault();
              const n =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? 3
                    : (i + (e.key === "ArrowDown" ? 1 : 3)) % 4;
              setActive(n);
              document.getElementById(`capability-tab-${n}`)?.focus();
            }}
          >
            <span className="st-cap-number">0{i + 1}</span>
            <span>
              <strong>{item.name}</strong>
              <span>{item.body}</span>
            </span>
            <ArrowUpRight size={21} />
          </button>
        ))}
      </div>
      <div
        className={`st-capability-preview preview-${c.type}`}
        id="capability-preview"
        role="tabpanel"
        aria-labelledby={`capability-tab-${active}`}
      >
        <span className="st-preview-label">
          <Icon size={16} />
          {c.name}
        </span>
        <div className="st-capability-diagram" key={c.slug}>
          <div className="st-diagram-core">
            <Icon size={39} strokeWidth={1.2} />
          </div>
          {c.steps.map((step, i) => (
            <div className="st-diagram-step" key={step}>
              <span>
                <Check size={14} />
              </span>
              <span>{step}</span>
              <i />
            </div>
          ))}
        </div>
        <div className="st-cap-preview-bottom">
          <h3>{c.note}</h3>
          <Link href={`/services/${c.slug}`}>
            Explore {c.name.toLowerCase()} <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
const toolGroups = [
  {
    name: "Build",
    caption: "Interfaces, data and a dependable foundation.",
    tools: [
      ["React", Code2],
      ["Next.js", Code2],
      ["Figma", PenTool],
      ["PostgreSQL", Database],
      ["GitHub", Github],
      ["Cloud", Cloud],
    ],
  },
  {
    name: "Automate",
    caption: "Connect the tools. Let the workflow do the travelling.",
    tools: [
      ["n8n", Workflow],
      ["OpenAI", Workflow],
      ["CRM", Database],
      ["Calendar", Calendar],
      ["Email", Mail],
      ["Slack", Slack],
    ],
  },
  {
    name: "Operate",
    caption: "Keep releases visible and the next improvement within reach.",
    tools: [
      ["GitHub", Github],
      ["Cloud", Cloud],
      ["Data", Database],
      ["Alerts", Mail],
      ["Slack", Slack],
      ["Analytics", Workflow],
    ],
  },
] as const;
export function IntegrationMap() {
  const [active, setActive] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  return (
    <ScrollScene className="st-integration-scatter">
      <div className="st-integration" ref={root} data-live={live}>
        <div
          className="st-integration-tabs"
          role="tablist"
          aria-label="Tool groups"
        >
          {toolGroups.map((g, i) => (
            <button
              key={g.name}
              role="tab"
              aria-selected={active === i}
              aria-controls="integration-map"
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % 3;
                else if (e.key === "ArrowLeft") next = (i + 2) % 3;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 2;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`integration-tab-${next}`)?.focus();
              }}
              id={`integration-tab-${i}`}
              onClick={() => setActive(i)}
            >
              {g.name}
            </button>
          ))}
        </div>
        <div
          className="st-integration-map"
          id="integration-map"
          role="tabpanel"
          aria-labelledby={`integration-tab-${active}`}
        >
          <svg
            viewBox="0 0 1100 330"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              "M140 65H325Q350 65 350 90V145Q350 165 380 165H505",
              "M140 265H325Q350 265 350 240V185Q350 165 380 165H505",
              "M350 165H505",
              "M960 65H775Q750 65 750 90V145Q750 165 720 165H595",
              "M960 265H775Q750 265 750 240V185Q750 165 720 165H595",
              "M750 165H595",
            ].map((d, i) => (
              <g key={d}>
                <path d={d} className="st-tool-line" />
                <path
                  d={d}
                  className="st-tool-signal"
                  style={{ animationDelay: `${i * -1.7}s` }}
                />
              </g>
            ))}
          </svg>
          <div className="st-integration-core">
            <span className="st-active-status">
              <i /> ACTIVE
            </span>
            <Workflow size={30} />
            <strong>
              {toolGroups[active].name === "Automate"
                ? "AI & automation"
                : toolGroups[active].name === "Build"
                  ? "Websites & apps"
                  : "Cloud & delivery"}
            </strong>
            <small>
              {active === 1
                ? "Enquiry → CRM → follow-up"
                : active === 0
                  ? "Design → code → product"
                  : "Test → deploy → improve"}
            </small>
          </div>
          {toolGroups[active].tools.map(([name, I], i) => (
            <div
              key={`${active}-${name}`}
              data-scatter
              className={`st-tool st-tool-${i}`}
            >
              <span>
                <I size={25} strokeWidth={1.5} />
              </span>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
        <p className="st-integration-caption">{toolGroups[active].caption}</p>
        <Link href="/services/apis-integrations" className="st-text-link">
          Explore integrations <ArrowUpRight size={16} />
        </Link>
      </div>
    </ScrollScene>
  );
}
const perspectives = [
  {
    slug: "talentbadger",
    name: "Talent Badger",
    label: "Talent marketplace",
    text: "The right specialist. The right team. On demand.",
    logo: "/brands/talentbadger-clean.webp",
  },
  {
    slug: "renbite",
    name: "Renbite",
    label: "Mobile commerce",
    text: "Your coffee moment, perfected.",
    logo: "/brands/renbite-clean.webp",
  },
  {
    slug: "ffp-vault",
    name: "FFP Vault",
    label: "Personal finance",
    text: "Documents, due dates and reminders in one considered mobile experience.",
    logo: "/brands/ffp-vault-clean.webp",
  },
  {
    slug: "besttrip",
    name: "BestTrip",
    label: "Travel discovery",
    text: "A clear route from the first search to the next destination.",
    logo: "/brands/besttrip-clean.webp",
  },
];
export function ProjectPerspectives() {
  const sectionRef = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setLive(visible && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const [active, setActive] = useState(0),
    [paused, setPaused] = useState(false);
  const p = perspectives[active];
  return (
    <section
      ref={sectionRef}
      data-live={live}
      className="st-section st-perspectives"
      id="perspectives"
    >
      <div className="st-container st-perspectives-layout">
        <div className="st-perspective-feature">
          <span className="st-eyebrow">Project perspectives</span>
          <h2>
            Different ideas.
            <br />
            Shared ambition.
          </h2>
          <p className="st-muted">A few of the products in our portfolio.</p>
          <div className="st-feature-quote" key={p.slug}>
            <Quote size={28} strokeWidth={1.1} />
            <p>{p.text}</p>
            <span>
              {p.name} <i> / {p.label}</i>
            </span>
            <Link href={`/work/${p.slug}`}>
              Explore the project <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="st-perspective-controls">
            <button
              aria-label="Previous project perspective"
              onClick={() => setActive((active + 3) % 4)}
            >
              <ArrowLeft size={18} />
            </button>
            <span>0{active + 1} / 04</span>
            <button
              aria-label="Next project perspective"
              onClick={() => setActive((active + 1) % 4)}
            >
              <ArrowRight size={18} />
            </button>
            <button
              aria-label={
                paused
                  ? "Play project perspectives"
                  : "Pause project perspectives"
              }
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </div>
          <small className="st-perspective-source">
            Product positioning and experiences from our portfolio.
          </small>
        </div>
        <div className="st-perspective-window" data-paused={paused}>
          <div className="st-perspective-columns">
            {[0, 1].map((column) => (
              <div
                className={`st-perspective-column column-${column}`}
                key={column}
              >
                {[0, 1].map((repeat) => (
                  <div
                    key={repeat}
                    className="st-perspective-group"
                    aria-hidden={repeat === 1}
                  >
                    {[
                      ...perspectives.slice(column * 2),
                      ...perspectives.slice(0, column * 2),
                    ].map((item, i) => (
                      <button
                        className="st-perspective-card"
                        key={item.slug}
                        tabIndex={repeat === 1 ? -1 : 0}
                        onClick={() => setActive(perspectives.indexOf(item))}
                      >
                        <span className="st-perspective-brand">
                          <img src={item.logo} alt="" width={150} height={45} />
                        </span>
                        <p>{item.text}</p>
                        <span>
                          {item.label}
                          <ArrowUpRight size={15} />
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function GetStarted() {
  const [active, setActive] = useState(0);
  const intents = [
    {
      name: "Build something new",
      type: "Web",
      brief:
        "I would like to discuss a new website, app or software product. My idea is: ",
    },
    {
      name: "Improve a product",
      type: "Design",
      brief:
        "I would like to improve an existing product. The current challenge is: ",
    },
    {
      name: "Automate a workflow",
      type: "Automation",
      brief:
        "I would like to automate a business workflow. The manual work slowing us down is: ",
    },
  ];
  return (
    <section className="st-get-started" id="contact">
      <div className="st-cta-orbit" aria-hidden="true" />
      <div className="st-container">
        <span className="st-eyebrow">Get started</span>
        <h2>
          Good things start
          <br />
          with a conversation.
        </h2>
        <p>
          Tell us what you have in mind.
          <br />
          We’ll find the most useful next step, together.
        </p>
        <Link
          className="st-button"
          href={`/contact?type=${intents[active].type}&brief=${encodeURIComponent(intents[active].brief)}`}
        >
          Let’s talk about it <ArrowUpRight size={18} />
        </Link>
        <a className="st-cta-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
      <div className="st-browser-brief">
        <div className="st-browser-top" aria-hidden="true">
          <span />
          <span />
          <span />
          <i>DevsDen Tech · Your next chapter</i>
        </div>
        <div className="st-browser-bar" aria-hidden="true">
          <ArrowLeft size={17} />
          <ArrowRight size={17} />
          <span>devsden.tech / your-next-project</span>
          <Check size={16} />
        </div>
        <div className="st-browser-body">
          <span className="st-eyebrow">A clear place to begin</span>
          <h3>What would you like to move forward?</h3>
          <p>Choose a direction. We’ll help you shape the rest.</p>
          <div
            className="st-intent-options"
            aria-label="Choose your project goal"
          >
            {intents.map((intent, i) => (
              <button
                key={intent.type}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {intent.name}
              </button>
            ))}
          </div>
          <Link
            className="st-brief-link"
            href={`/contact?type=${intents[active].type}&brief=${encodeURIComponent(intents[active].brief)}`}
          >
            Start your{" "}
            {intents[active].type === "Automation"
              ? "automation"
              : intents[active].type === "Design"
                ? "product improvement"
                : "new project"}{" "}
            brief <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
