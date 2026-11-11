"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ArrowRight,
  Layers,
  Code2,
  Workflow,
  Users,
} from "lucide-react";
import { integrations } from "@/content/integrations";
import { work } from "@/content/work";
import { services } from "@/content/services";

const about = [
  {
    title: "One team. A shared direction.",
    body: "Designers, developers and automation specialists working around the same product goal.",
    type: "team",
    icon: Users,
  },
  {
    title: "Good thinking. Working software.",
    body: "Turn the important journeys into clear interfaces and connected, maintainable systems.",
    type: "product",
    icon: Code2,
  },
  {
    title: "Less repetitive work.",
    body: "Bring the everyday tools together, with clear checks and human review where it matters.",
    type: "flow",
    icon: Workflow,
  },
  {
    title: "Made to keep moving.",
    body: "Useful documentation, a considered handover and room for your next improvement.",
    type: "delivery",
    icon: Layers,
  },
];
export function AboutBento() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!,
      grid = root.querySelector<HTMLElement>(".ab-bento")!;
    const reduced = matchMedia("(prefers-reduced-motion:reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = grid.getBoundingClientRect();
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      const spread = reduced.matches
        ? 1
        : Math.max(0, Math.min(1, (p - 0.08) / 0.29, (0.99 - p) / 0.15));
      root.style.setProperty("--bento-spread", String(spread));
      root.dataset.spread = spread.toFixed(3);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      grid.querySelectorAll<HTMLElement>(".ab-card").forEach((el) => {
        el.style.setProperty(
          "--bento-x",
          `${grid.clientWidth / 2 - el.offsetLeft - el.offsetWidth / 2}px`,
        );
        el.style.setProperty(
          "--bento-y",
          `${grid.clientHeight / 2 - el.offsetTop - el.offsetHeight / 2}px`,
        );
      });
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(grid);
    addEventListener("scroll", schedule, { passive: true });
    reduced.addEventListener("change", schedule);
    measure();
    const counters = new Map<HTMLElement, number>();
    let countFrame = 0;
    const count = (now: number) => {
      counters.forEach((start, el) => {
        const p = Math.min(1, (now - start) / 1600),
          target = Number(el.dataset.countTarget);
        el.textContent = String(Math.round(target * p)).padStart(2, "0");
        if (p === 1) counters.delete(el);
      });
      if (counters.size) countFrame = requestAnimationFrame(count);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (reduced.matches) return;
          el.textContent = "00";
          counters.set(el, performance.now());
          if (!countFrame || counters.size === 1) {
            cancelAnimationFrame(countFrame);
            countFrame = requestAnimationFrame(count);
          }
        });
      },
      { threshold: 0.6 },
    );
    root
      .querySelectorAll<HTMLElement>("[data-count-target]")
      .forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(countFrame);
      resize.disconnect();
      io.disconnect();
      removeEventListener("scroll", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div className="ab-bento-wrap" ref={ref}>
      <div className="ab-bento">
        {about.map((a, i) => (
          <article className={`ab-card ab-${a.type}`} key={a.title}>
            <div className="ab-card-copy">
              <span
                className="ab-index"
                data-count-target={i + 1}
                aria-label={`Card ${i + 1}`}
              >
                0{i + 1}
              </span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
            <div className="ab-mini" aria-hidden="true">
              {a.type === "team" ? (
                <>
                  <span className="ab-mini-label">One shared workspace</span>
                  {[
                    "Product thinking",
                    "Design & development",
                    "Connected operations",
                  ].map((n, j) => (
                    <div className="ab-team-row" key={n}>
                      <i>{j + 1}</i>
                      <span>{n}</span>
                      <Check size={12} />
                    </div>
                  ))}
                </>
              ) : a.type === "product" ? (
                <>
                  <div className="ab-mini-browser">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="ab-mini-chart">
                    {[35, 62, 48, 85, 69, 92].map((n, j) => (
                      <i
                        key={j}
                        style={{
                          height: `${n}%`,
                          animationDelay: `${j * -0.45}s`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="ab-mini-caption">
                    Small releases. Clear progress.
                  </span>
                </>
              ) : a.type === "flow" ? (
                <>
                  <span className="ab-mini-label">Everyday workflow</span>
                  <div className="ab-flow">
                    <i />
                    <ArrowRight size={15} />
                    <a.icon size={27} />
                    <ArrowRight size={15} />
                    <span>
                      <Check size={17} />
                    </span>
                  </div>
                  <span className="ab-mini-caption">
                    Connect. Review. Move forward.
                  </span>
                </>
              ) : (
                <>
                  <span className="ab-mini-label">
                    Ready for your next chapter
                  </span>
                  {[
                    "Your source code",
                    "Useful documentation",
                    "A clear next step",
                  ].map((n) => (
                    <div className="ab-delivery-row" key={n}>
                      <Check size={12} />
                      {n}
                    </div>
                  ))}
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="ab-counts">
        {[
          [String(work.length).padStart(2, "0"), "Projects in our portfolio"],
          [String(services.length), "Connected services"],
          ["04", "Disciplines working together"],
          ["01", "Team from idea to everyday"],
        ].map(([n, label]) => (
          <div key={label}>
            <strong
              data-count-target={Number(n)}
              aria-label={String(Number(n))}
            >
              {n}
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const phases = [
  {
    name: "Understand",
    title: "Start with the right question.",
    body: "We listen to your goals, the people using your product and the work slowing the team down. Together, we choose a useful direction and a realistic first step.",
    outcome: "A shared brief, priorities and a clear scope.",
  },
  {
    name: "Explore",
    title: "Make the idea tangible.",
    body: "We map the important journeys and turn possible directions into something you can see and try. Your feedback shapes the experience before the bigger build begins.",
    outcome: "A reviewed design direction and a usable prototype.",
  },
  {
    name: "Create",
    title: "Build it together, in useful steps.",
    body: "Design and engineering stay connected. We share working progress, test the important paths and connect the systems around your product.",
    outcome: "Working previews, shared decisions and tested journeys.",
  },
  {
    name: "Evolve",
    title: "Launch with a path forward.",
    body: "We prepare the release and handover, explain how the product works and agree on the next priorities. Real feedback guides what happens after launch.",
    outcome: "A considered launch, your code and the next improvement.",
  },
];
export function StudioApproach() {
  const [active, setActive] = useState(0);
  return (
    <section id="approach" className="st-section sa-section">
      <div className="st-container">
        <div className="sa-heading">
          <div className="ag-section-heading">
            <span className="st-badge">Our approach</span>
            <h2>
              A clear path.
              <br />
              From idea to everyday.
            </h2>
            <p>
              Small steps. Close collaboration.
              <br />
              Something useful at the end of every stage.
            </p>
          </div>
          <a href="#contact" className="ag-link">
            Let's talk about your idea <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="sa-panels">
          {phases.map((p, i) => (
            <article
              className={`sa-panel ${active === i ? "is-open" : ""}`}
              key={p.name}
              onClick={() => setActive(i)}
            >
              <button
                id={`approach-trigger-${i}`}
                aria-expanded={active === i}
                aria-controls={`approach-content-${i}`}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                <strong>{p.name}</strong>
                <ArrowUpRight size={18} />
              </button>
              <div
                className="sa-panel-content"
                id={`approach-content-${i}`}
                role="region"
                aria-labelledby={`approach-trigger-${i}`}
                aria-hidden={active !== i}
              >
                <div>
                  <span className="sa-rule" />
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <span className="sa-outcome">
                    <Check size={14} />
                    {p.outcome}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioIntegrations() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      data-live={live}
      id="integrations"
      className="st-section si-section"
    >
      <div className="st-container">
        <div className="ag-section-heading">
          <span className="st-badge">Integrations</span>
          <h2>
            Your essential tools.
            <br />
            Better together.
          </h2>
          <p>
            Connect your product with the tools your team already uses.
            <br />A clearer workflow, from the first event to the next step.
          </p>
          <Link className="ag-link" href="/integrations">
            Explore integrations <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="si-map">
          <svg
            viewBox="0 0 1100 390"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {integrations.map((_, i) => {
              const left = i < 5,
                x = left ? 100 : 1000,
                y = 42 + (i % 5) * 76;
              return (
                <g key={i}>
                  <path
                    d={`M${x} ${y}H${left ? 280 : 820}Q${left ? 330 : 770} ${y} ${left ? 380 : 720} ${(y + 195) / 2}T550 195`}
                    className="si-line"
                  />
                  <path
                    d={`M${x} ${y}H${left ? 280 : 820}Q${left ? 330 : 770} ${y} ${left ? 380 : 720} ${(y + 195) / 2}T550 195`}
                    className="si-signal"
                    style={{ animationDelay: `${i * -0.7}s` }}
                  />
                </g>
              );
            })}
          </svg>
          <div className="si-core">
            <Workflow size={35} />
            <span>Your workflow</span>
          </div>
          {integrations.map((tool, i) => (
            <Link
              key={tool.slug}
              href={`/integrations/${tool.slug}`}
              className={`si-tool si-tool-${i}`}
              style={
                {
                  "--tool-color": tool.color,
                  "--float-delay": `${i * -0.45}s`,
                  left:
                    i < 5 ? `${8 + (i % 2) * 17}%` : `${92 - (i % 2) * 17}%`,
                  top: `${11 + (i % 5) * 19}%`,
                } as React.CSSProperties
              }
            >
              <span>
                <img
                  src={`/integrations/${tool.slug}.svg`}
                  alt=""
                  width={25}
                  height={25}
                />
              </span>
              <strong>{tool.name}</strong>
              <ArrowUpRight size={11} />
            </Link>
          ))}
        </div>
        <p className="si-note">
          Connections are scoped to your tools, permissions and workflow.
        </p>
      </div>
    </section>
  );
}
