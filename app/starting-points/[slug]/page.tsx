import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { startingPoints } from "@/content/starting-points";
import { InnerHero } from "@/components/inner";
import { Marker, Icon } from "@/components/ui";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { DeliveryPlan } from "@/components/delivery-plan";
import { startingGuides } from "@/content/starting-guides";
import { site } from "@/content/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return startingPoints.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = startingPoints.find((s) => s.slug === slug);
  return { title: s?.name, description: s?.description };
}
export default async function StartingPoint({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = startingPoints.find((s) => s.slug === slug);
  if (!s) notFound();
  const guide = startingGuides[slug];
  return (
    <>
      <InnerHero
        marker="A head start"
        title={s.name}
        body={s.description}
        cta={false}
      />
      <div className="detail-subnav">
        <nav className="container" aria-label="On this starting point page">
          <a href="#overview">The opportunity</a>
          <a href="#delivery">Plan your scope</a>
          <a href="#questions">Questions</a>
        </nav>
      </div>
      <section className="detail-section" id="overview">
        <div className="container detail-overview">
          <div>
            <span className="detail-kicker">One focused place to begin</span>
            <h2>A clear problem. A useful first step.</h2>
            <p>{s.problem}</p>
            <p>{s.approach}</p>
          </div>
          <aside>
            <Icon name={s.icon} size={28} />
            <h3>What this can include</h3>
            <ul>
              {s.includes.map((t) => (
                <li key={t}>
                  <Check size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <span className="detail-kicker">The starting outcome</span>
            <p>{s.deliverable}</p>
          </aside>
        </div>
      </section>
      <section className="detail-section detail-tinted" id="delivery">
        <div className="container">
          <span className="detail-kicker">A head start, with a plan</span>
          <h2>See how the work takes shape.</h2>
          <p className="detail-lead">
            Explore each step and choose the priorities to carry into your
            enquiry.
          </p>
          <DeliveryPlan
            steps={guide.steps}
            includes={s.includes}
            title={s.name}
            type={guide.type}
          />
        </div>
      </section>
      <section className="detail-section detail-questions" id="questions">
        <div className="container">
          <div>
            <span className="detail-kicker">Decisions worth making early</span>
            <h2>Before the first step.</h2>
            <a href={`mailto:${site.email}`}>
              Ask another question <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="detail-faqs">
            {s.questions.map((q, i) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{guide.answers[i]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="detail-section detail-related">
        <div className="container">
          <span className="detail-kicker">Other ways to begin</span>
          <h2>Find the right starting point.</h2>
          <div className="related-grid">
            {startingPoints
              .filter((p) => p.slug !== s.slug)
              .map((p) => (
                <Link key={p.slug} href={`/starting-points/${p.slug}`}>
                  <Icon name={p.icon} />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <span className="text-link">
                    Explore this scope <ArrowUpRight size={16} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
