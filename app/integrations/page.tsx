import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Headphones,
  Mail,
  Receipt,
  ShoppingBag,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { InnerHero } from "@/components/inner";
import { SolutionNav } from "@/components/solution-nav";
import { StartProjectButton } from "@/components/start-project";
import { integrations } from "@/content/integrations";
import { deliverySteps, solutions, solutionsForTool, type Solution } from "@/content/solutions";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Solutions and connected tools",
  description:
    "Commerce, email automation, CRM, helpdesk and accounting solutions, and the everyday tools we connect so information moves without copying and chasing.",
};

const icons: Record<Solution["icon"], LucideIcon> = {
  cart: ShoppingBag,
  mail: Mail,
  users: Users,
  headset: Headphones,
  receipt: Receipt,
};

function ToolChip({ name, slug }: { name: string; slug?: string }) {
  const inner = (
    <>
      {slug ? (
        <img src={`/integrations/${slug}.svg`} width={18} height={18} alt="" />
      ) : (
        <span className="dd-tool-dot" aria-hidden="true" />
      )}
      {name}
      {slug && <ArrowUpRight size={13} className="dd-tool-go" />}
    </>
  );
  return slug ? (
    <Link href={`/integrations/${slug}`} className="dd-tool-chip is-link">
      {inner}
    </Link>
  ) : (
    <span className="dd-tool-chip">{inner}</span>
  );
}

export default function IntegrationsPage() {
  const nav = [...solutions.map((s) => ({ id: s.slug, label: s.title })), { id: "tools", label: "All tools" }];
  return (
    <div className="dd dd-solutions-page">
      <InnerHero
        marker="Solutions"
        title="One connected business, from storefront to accounts."
        body="Five solution areas we design, build and connect. Each one links the tools you already use, so information moves on its own instead of being copied and chased."
        cta={false}
      >
        <div className="dd-solx-overview">
          {solutions.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <a key={s.slug} href={`#${s.slug}`} className={`dd-solx-card is-${s.tone}`}>
                <span className="dd-solx-card-icon">
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <small>0{i + 1}</small>
                <strong>{s.title}</strong>
                <span>{s.short}</span>
              </a>
            );
          })}
        </div>
      </InnerHero>

      <SolutionNav items={nav} />

      {solutions.map((s, i) => {
        const Icon = icons[s.icon];
        const project = s.work ? work.find((w) => w.slug === s.work) : undefined;
        return (
          <section key={s.slug} id={s.slug} className={`dd-solx is-${s.tone} ${i % 2 ? "is-alt" : ""}`}>
            <div className="dd-container dd-solx-grid">
              <div className="dd-solx-main">
                <div className="dd-solx-head">
                  <span className="dd-solx-icon">
                    <Icon size={24} strokeWidth={1.9} />
                  </span>
                  <span className="dd-solx-num">
                    Solution 0{i + 1} of 0{solutions.length}
                  </span>
                </div>
                <h2>{s.title}</h2>
                <p className="dd-solx-intro">{s.intro}</p>
                <h3>What we build</h3>
                <ul className="dd-solx-builds">
                  {s.builds.map((b) => (
                    <li key={b}>
                      <Check size={16} strokeWidth={2.4} />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="dd-solx-outcome">
                  <Sparkles size={18} />
                  {s.outcome}
                </p>
                <div className="dd-solx-actions">
                  <StartProjectButton className="dd-btn dd-btn-primary dd-btn-sm">
                    Start a project like this <ArrowUpRight size={15} />
                  </StartProjectButton>
                  <Link href={s.service.href} className="dd-btn dd-btn-outline dd-btn-sm">
                    {s.service.label} service <ArrowRight size={15} />
                  </Link>
                </div>
                {project && (
                  <Link href={`/work/${project.slug}`} className="dd-solx-work">
                    <small>Related work</small>
                    <strong>{project.projectName}</strong>
                    <span>{project.title}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>

              <aside className="dd-solx-side">
                <div className="dd-solx-panel">
                  <small>How it flows</small>
                  <ol className="dd-solx-flow">
                    {s.flow.map((step, n) => (
                      <li key={step}>
                        <span>{n + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="dd-solx-panel">
                  <small>Tools we connect</small>
                  <div className="dd-solx-tools">
                    {s.tools.map((t) => (
                      <ToolChip key={t.name} {...t} />
                    ))}
                  </div>
                  <p className="dd-solx-note">Plus your own systems through their APIs.</p>
                </div>
              </aside>
            </div>
          </section>
        );
      })}

      <section id="tools" className="dd-section dd-tools">
        <div className="dd-container">
          <div className="dd-heading is-center">
            <span className="dd-badge">
              <i aria-hidden="true" />
              All tools
            </span>
            <h2>
              The tools we connect, <span className="dd-blue">and where they fit</span>
            </h2>
            <p>Open a tool to see an example workflow, what we connect and how access is agreed.</p>
          </div>
          <div className="dd-tools-grid">
            {integrations.map((t) => {
              const used = solutionsForTool(t.slug);
              return (
                <Link key={t.slug} href={`/integrations/${t.slug}`} className="dd-tool-card">
                  <span className="dd-tool-logo">
                    <img src={`/integrations/${t.slug}.svg`} width={26} height={26} alt="" />
                  </span>
                  <ArrowUpRight size={18} className="dd-tool-card-go" />
                  <small>{t.category}</small>
                  <strong>{t.name}</strong>
                  <p>{t.summary}</p>
                  {used.length > 0 && (
                    <span className="dd-tool-used">
                      {used.map((u) => (
                        <em key={u.slug} className={`is-${u.tone}`}>
                          {u.tag}
                        </em>
                      ))}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dd-case-section is-tinted">
        <div className="dd-container">
          <div className="dd-heading is-center">
            <span className="dd-badge is-orange">
              <i aria-hidden="true" />
              How we deliver
            </span>
            <h2>Every connection, the same careful way</h2>
          </div>
          <ol className="dd-case-steps">
            {deliverySteps.map((step, n) => (
              <li key={step.title}>
                <span className="dd-case-step-num">0{n + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="dd-case-result dd-solx-cta">
            <div>
              <span className="dd-badge is-dark">
                <i aria-hidden="true" />
                Not sure where to start?
              </span>
              <p>Tell us which tools you use today and where work gets stuck. We will suggest the first connection worth building.</p>
            </div>
            <div className="dd-case-result-actions">
              <StartProjectButton className="dd-btn dd-btn-white">
                Start a project <ArrowUpRight size={16} />
              </StartProjectButton>
              <Link href="/contact" className="dd-btn dd-btn-ghost">
                Talk to us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
