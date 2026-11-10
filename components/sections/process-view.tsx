"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { stages } from "@/content/site";

const outputs = [
  [
    "A focused project brief",
    "A map of the current workflow",
    "A prioritised first release",
  ],
  [
    "User journeys and key screens",
    "A testable prototype",
    "A shared design direction",
  ],
  [
    "Reviewable working increments",
    "Connected tools and data",
    "Checks for the critical paths",
  ],
  [
    "A prepared release",
    "Documentation and handover",
    "A plan for the next improvement",
  ],
];

export function ProcessView({
  active,
  onSelect,
}: {
  active: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <section className="build-chapters" id="process">
      <div className="container">
        <div className="chapters-intro">
          <div>
            <span className="chapter-eyebrow">How we build</span>
            <h2>
              Good work starts
              <br />
              with a clear direction<span>.</span>
            </h2>
          </div>
          <p>
            Four connected stages. A shared view of the work. And a useful
            outcome at every step.
          </p>
        </div>
        <div
          className="chapter-tabs"
          style={{ "--chapter-index": active } as CSSProperties}
          role="tablist"
          aria-label="Project stages"
        >
          {stages.map((s, i) => (
            <button
              key={s.name}
              id={`chapter-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls="chapter-detail"
              tabIndex={i === active ? 0 : -1}
              onClick={() => onSelect?.(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % 4;
                else if (e.key === "ArrowLeft") next = (i + 3) % 4;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 3;
                else return;
                e.preventDefault();
                onSelect?.(next);
                document.getElementById(`chapter-tab-${next}`)?.focus();
              }}
            >
              <span className="chapter-tab-number">0{i + 1}</span>
              <span className="chapter-tab-name">
                {i === 3 ? "Launch" : s.name}
              </span>
              <ArrowUpRight size={22} />
            </button>
          ))}
        </div>
        <div
          id="chapter-detail"
          className="chapter-detail"
          role="tabpanel"
          aria-labelledby={`chapter-tab-${active}`}
          tabIndex={0}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={`chapter-scene ${index === active ? "is-current" : ""}`}
              aria-hidden={index !== active}
              inert={index !== active}
            >
              <div className="chapter-index" aria-hidden="true">
                0{index + 1}
                <span>/ 04</span>
              </div>
              <div className="chapter-story">
                <span className="chapter-eyebrow">{stage.time}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                <Link href="/contact">
                  Let?s find your starting point <ArrowUpRight size={18} />
                </Link>
              </div>
              <div className="chapter-outputs">
                <span className="chapter-eyebrow">What you leave with</span>
                <ul>
                  {outputs[index].map((item) => (
                    <li key={item}>
                      <ArrowRight size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="chapter-next">
                  <span>
                    {index === 3
                      ? "Then, keep improving"
                      : `Up next: ${stages[index + 1].name}`}
                  </span>
                  <span className="chapter-small-track">
                    <i style={{ width: `${(index + 1) * 25}%` }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chapters-footnote">
          <span>A connected process. Room to adapt.</span>
          <p>
            Already have a product or a team? We start where the work needs us.
          </p>
        </div>
      </div>
    </section>
  );
}
