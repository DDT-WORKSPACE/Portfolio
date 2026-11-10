import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { type Service } from "@/content/services";
import { serviceGuides } from "@/content/service-guides";
import { site } from "@/content/site";
import { AutomationDetail } from "./sections/automation-detail";
import { DeliveryPlan } from "./delivery-plan";
export function ServiceDetail({ service: s }: { service: Service }) {
  const guide = serviceGuides[s.slug];
  const steps = guide.phases.map((body, i) => ({
    name: ["Define the work", "Make it tangible", "Release & hand over"][i],
    body,
    outcome: [
      `A scoped ${s.name.toLowerCase()} brief with priorities, dependencies and review criteria.`,
      `Working progress reviewed against the agreed ${s.name.toLowerCase()} scope.`,
      "Release notes, setup information and an agreed plan for the next improvement.",
    ][i],
  }));
  return (
    <>
      <div className="detail-subnav">
        <nav className="container" aria-label="On this service page">
          <a href="#overview">Overview</a>
          <a href="#included">What’s included</a>
          <a href="#delivery">How it works</a>
          <a href="#questions">Questions</a>
        </nav>
      </div>
      <section className="detail-section" id="overview">
        <div className="container detail-overview">
          <div>
            <span className="detail-kicker">Built around the problem</span>
            <h2>What this service helps you do.</h2>
            <p>{guide.intro}</p>
          </div>
          <aside>
            <h3>A good fit when you need</h3>
            <ul>
              {guide.fit.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <span className="detail-kicker">The intended outcome</span>
            <p>{s.outcome}</p>
          </aside>
        </div>
      </section>
      <section className="detail-section detail-tinted" id="included">
        <div className="container">
          <span className="detail-kicker">What we bring</span>
          <h2>Clear work. Concrete deliverables.</h2>
          <div className="detail-capabilities">
            {s.capabilities.map((c, i) => (
              <article key={c}>
                <span>0{i + 1}</span>
                <h3>{c}</h3>
                <p>{guide.details[i]}</p>
              </article>
            ))}
          </div>
          <div className="detail-example">
            <span className="detail-kicker">A typical starting point</span>
            <p>{guide.example}</p>
          </div>
          <div className="detail-tools">
            <span>Tools we can work with</span>
            <div>
              {s.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p>
              The final stack follows your requirements and existing systems.
            </p>
          </div>
        </div>
      </section>
      {s.slug === "ai-automation" && <AutomationDetail />}
      <section className="detail-section" id="delivery">
        <div className="container">
          <span className="detail-kicker">From scope to something useful</span>
          <h2>A plan you can follow.</h2>
          <p className="detail-lead">
            Explore the stages, then choose the priorities you want to discuss.
          </p>
          <DeliveryPlan
            steps={steps}
            includes={s.capabilities}
            title={s.name}
            type={guide.enquiryType}
          />
        </div>
      </section>
      <section className="detail-section detail-questions" id="questions">
        <div className="container">
          <div>
            <span className="detail-kicker">Before we start</span>
            <h2>A few useful answers.</h2>
            <Link href={`mailto:${site.email}`}>
              Ask another question <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="detail-faqs">
            {guide.faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <span>+</span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
            <details>
              <summary>
                What happens after I get in touch?<span>+</span>
              </summary>
              <p>
                We review your goal, current systems and constraints, then
                discuss the smallest useful scope. Deliverables,
                responsibilities, access and commercial terms are agreed before
                work begins.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
