import Link from "next/link";
import { services, type Service } from "@/content/services";
import { serviceGuides } from "@/content/service-guides";
import { DeliveryPlan } from "./delivery-plan";
import { AutomationShowcase } from "./home/automation-showcase";
import {
  EditorialContent,
  EditorialHero,
  EditorialLinks,
  EditorialQuestions,
  EditorialRows,
  EditorialSection,
} from "./editorial-detail";

const adjacent: Record<string, string[]> = {
  "web-development": ["ui-ux-design", "apis-integrations"],
  "mobile-apps": ["ui-ux-design", "security-qa"],
  "ui-ux-design": ["mvp-product", "web-development"],
  "ai-automation": ["apis-integrations", "data-analytics"],
  "cloud-devops": ["security-qa", "support-scaling"],
  "apis-integrations": ["ai-automation", "cloud-devops"],
  "security-qa": ["cloud-devops", "support-scaling"],
  "support-scaling": ["security-qa", "cloud-devops"],
  "mvp-product": ["ui-ux-design", "web-development"],
  "e-commerce": ["apis-integrations", "ui-ux-design"],
  "data-analytics": ["apis-integrations", "ai-automation"],
};

export function ServiceDetail({ service }: { service: Service }) {
  const guide = serviceGuides[service.slug];
  const isAutomation = service.slug === "ai-automation";
  const contactHref = `/contact?type=${encodeURIComponent(guide.enquiryType)}`;
  const steps = guide.phases.map((body, i) => ({
    name: ["Scope", "Build and review", "Handover"][i],
    body,
    outcome: [
      "A written scope, review criteria and dependencies.",
      "Working progress to review against the agreed scope.",
      "Release notes, setup information and an agreed support plan.",
    ][i],
  }));

  return (
    <div className="ed-page">
      <EditorialHero
        parent={{ label: "Services", href: "/services" }}
        title={service.name}
        description={guide.intro}
      >
        <aside className="ed-brief">
          <strong>When to bring us in</strong>
          <ul>
            {guide.fit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="ed-button" href={contactHref}>
            Discuss your requirements
          </Link>
        </aside>
      </EditorialHero>
      <EditorialContent
        anchors={[
          { id: "included", label: "What we deliver" },
          ...(isAutomation
            ? [{ id: "automation", label: "Workflow examples" }]
            : []),
          { id: "delivery", label: "Plan the work" },
          { id: "questions", label: "Common questions" },
          { id: "related", label: "Related services" },
        ]}
      >
        <EditorialSection id="included" title="What we deliver">
          <EditorialRows
            rows={service.capabilities.map((title, i) => ({
              title,
              body: guide.details[i],
            }))}
          />
          <div className="ed-note">
            <h3>A typical brief</h3>
            <p>{guide.example}</p>
          </div>
          <div className="ed-inline-facts">
            <div>
              <strong>What you can expect</strong>
              <p>{service.outcome}</p>
            </div>
            <div>
              <strong>Tools we work with</strong>
              <p>{service.stack.join(" · ")}</p>
            </div>
          </div>
        </EditorialSection>
        {isAutomation && <AutomationShowcase embedded />}
        <EditorialSection id="delivery" title="Plan the work">
          <p>
            Select the priorities for your project and take them into your
            enquiry.
          </p>
          <DeliveryPlan
            steps={steps}
            includes={service.capabilities}
            title={service.name}
            type={guide.enquiryType}
          />
        </EditorialSection>
        <EditorialSection id="questions" title="Common questions">
          <EditorialQuestions questions={guide.faqs} />
        </EditorialSection>
        <EditorialSection id="related" title="Related services">
          <EditorialLinks
            links={(adjacent[service.slug] ?? []).map((slug) => {
              const related = services.find((item) => item.slug === slug)!;
              return {
                href: `/services/${slug}`,
                title: related.name,
                description: related.promise,
              };
            })}
          />
        </EditorialSection>
      </EditorialContent>
    </div>
  );
}
