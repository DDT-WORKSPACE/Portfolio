import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { startingPoints } from "@/content/starting-points";
import { startingGuides } from "@/content/starting-guides";
import { DeliveryPlan } from "@/components/delivery-plan";
import {
  EditorialContact,
  EditorialContent,
  EditorialHero,
  EditorialLinks,
  EditorialQuestions,
  EditorialSection,
} from "@/components/editorial-detail";

export const dynamicParams = false;
export function generateStaticParams() {
  return startingPoints.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const point = startingPoints.find((item) => item.slug === slug);
  return { title: point?.name, description: point?.description };
}

export default async function StartingPoint({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const point = startingPoints.find((item) => item.slug === slug);
  if (!point) notFound();
  const guide = startingGuides[slug];

  return (
    <div className="ed-page ed-start">
      <EditorialHero
        parent={{ label: "Services", href: "/services" }}
        title={point.name}
        description={point.description}
      >
        <aside className="ed-brief">
          <strong>What you leave with</strong>
          <p>{point.deliverable}</p>
          <a className="ed-button" href="#delivery">
            Plan your scope
          </a>
        </aside>
      </EditorialHero>
      <EditorialContent
        anchors={[
          { id: "overview", label: "The brief" },
          { id: "delivery", label: "Scope and handover" },
          { id: "questions", label: "Common questions" },
        ]}
      >
        <EditorialSection id="overview" title="The brief">
          <p>{point.problem}</p>
          <p>{point.approach}</p>
          <div className="ed-note">
            <h3>What the first phase can cover</h3>
            <ul>
              {point.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </EditorialSection>
        <EditorialSection id="delivery" title="Scope and handover">
          <DeliveryPlan
            steps={guide.steps}
            includes={point.includes}
            title={point.name}
            type={guide.type}
          />
        </EditorialSection>
        <EditorialSection id="questions" title="Common questions">
          <EditorialQuestions
            questions={point.questions.map((question, index) => ({
              question,
              answer: guide.answers[index],
            }))}
          />
        </EditorialSection>
        <EditorialSection id="related" title="Other starting points">
          <EditorialLinks
            links={startingPoints
              .filter((item) => item.slug !== slug)
              .map((item) => ({
                href: `/starting-points/${item.slug}`,
                title: item.name,
                description: item.description,
              }))}
          />
        </EditorialSection>
        <EditorialContact
          title="Bring us your brief"
          text="Share the problem, what you already have and what you need the first release to do."
          href={`/contact?type=${encodeURIComponent(guide.type)}`}
        />
      </EditorialContent>
    </div>
  );
}
