"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
export type DeliveryStep = { name: string; body: string; outcome: string };
export function DeliveryPlan({
  steps,
  includes,
  title,
  type,
}: {
  steps: DeliveryStep[];
  includes: string[];
  title: string;
  type: string;
}) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<string[]>(includes.slice(0, 2));
  const brief = `I would like to discuss ${title}.\n\nMy initial priorities:\n${selected.map((t) => `- ${t}`).join("\n")}\n\nThe problem I want to solve: `;
  return (
    <div className="delivery-explorer">
      <div
        className="delivery-tabs"
        role="tablist"
        aria-label="Delivery stages"
      >
        {steps.map((step, i) => (
          <button
            key={step.name}
            id={`delivery-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`delivery-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight") next = (i + 1) % steps.length;
              else if (e.key === "ArrowLeft")
                next = (i + steps.length - 1) % steps.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = steps.length - 1;
              else return;
              e.preventDefault();
              setActive(next);
              document.getElementById(`delivery-tab-${next}`)?.focus();
            }}
          >
            <span>0{i + 1}</span>
            {step.name}
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      {steps.map((step, i) => (
        <div
          key={step.name}
          id={`delivery-panel-${i}`}
          className="delivery-panel"
          role="tabpanel"
          aria-labelledby={`delivery-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
        >
          <div>
            <span className="detail-kicker">Step 0{i + 1}</span>
            <h3>{step.name}</h3>
            <p>{step.body}</p>
          </div>
          <aside>
            <Check size={20} />
            <span className="detail-kicker">A useful outcome</span>
            <p>{step.outcome}</p>
          </aside>
        </div>
      ))}
      <div className="scope-builder">
        <div>
          <span className="detail-kicker">Shape your starting point</span>
          <h3>What should we focus on first?</h3>
          <p>
            Select your priorities to carry them into your enquiry. Scope and
            pricing are agreed after we understand the work.
          </p>
        </div>
        <div className="scope-options">
          {includes.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() =>
                  setSelected((v) =>
                    v.includes(item)
                      ? v.filter((x) => x !== item)
                      : [...v, item],
                  )
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="scope-summary">
          <span aria-live="polite">
            {selected.length}{" "}
            {selected.length === 1 ? "priority" : "priorities"} selected
          </span>
          <Link
            aria-disabled={selected.length === 0}
            href={
              selected.length
                ? `/contact?type=${encodeURIComponent(type)}&brief=${encodeURIComponent(brief)}`
                : "#delivery"
            }
            onClick={(e) => {
              if (!selected.length) e.preventDefault();
            }}
          >
            Discuss this scope <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
