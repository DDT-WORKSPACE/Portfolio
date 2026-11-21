import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/project-cover";
import { caseStudies } from "@/content/case-studies";
import { work } from "@/content/work";
import {
  EditorialContact,
  EditorialContent,
  EditorialHero,
  EditorialRows,
  EditorialSection,
} from "@/components/editorial-detail";

const editorial: Record<string, { title: string; takeaway: string }> = {
  talentbadger: {
    title: "Finding the right engineering specialist",
    takeaway:
      "A hiring team can start with a domain such as embedded firmware, while a specialist has a separate route to join. Each sees the information needed to take the next step.",
  },
  renbite: {
    title: "From a coffee craving to an order",
    takeaway:
      "Search, nearby restaurants and favourites give customers different places to start. The order status gives them a reason to stay in the app after checkout.",
  },
  "crypto-wallet": {
    title: "Reading a wallet without losing the transaction",
    takeaway:
      "The selected asset stays in view as someone checks its chart, compares entries or opens the details of a transaction.",
  },
  "ffp-vault": {
    title: "Putting due dates next to the records they belong to",
    takeaway:
      "The calendar foregrounds the date. Status labels explain whether the user needs to act, and the corresponding record stays close by.",
  },
  besttrip: {
    title: "Planning a trip from one search",
    takeaway:
      "Travellers can start with dates and a route, or browse destinations and offers when their plans are still open.",
  },
  "gcl-storefront": {
    title: "Making a large catalogue easier to shop",
    takeaway:
      "Search and categories stay easy to find while the campaign area changes. A customer looking for a specific product has a direct route past the promotion.",
  },
  evpitch: {
    title: "Giving a candidate room to introduce themselves",
    takeaway:
      "Candidates can see how to submit an introduction. Recruiters and employers can go directly to the part of the site that explains how to find people.",
  },
  walkthroughz: {
    title: "Turning a city guide into a walk",
    takeaway:
      "Destination pages give visitors a place to start. Routes and nearby recommendations turn a broad city browse into a plan.",
  },
  beardfriends: {
    title: "Finding a barber by more than distance",
    takeaway:
      "Distance is a starting point. Language, ratings and payment preferences let customers narrow the list before they visit a shop profile.",
  },
  shopmart: {
    title: "Browsing fashion on a small screen",
    takeaway:
      "The same home screen supports a search for a specific product, an offer-led visit and a browse by collection. Prices and ratings help shoppers compare the products they find.",
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((item) => item.slug === slug);
  return {
    title: project ? `${project.projectName} case study` : "Case study",
    description: caseStudies[slug]?.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = work.findIndex((item) => item.slug === slug);
  const study = caseStudies[slug];
  if (index < 0 || !study) notFound();

  const project = work[index];
  const next = work[(index + 1) % work.length];
  const notes = editorial[slug];

  return (
    <article className="ed-page ed-case">
      <EditorialHero
        parent={{ label: "All projects", href: "/work" }}
        title={project.projectName}
        description={study.summary}
      >
        <dl className="ed-brief ed-case-facts">
          <div>
            <dt>Industry</dt>
            <dd>{project.industry}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{study.platform}</dd>
          </div>
          <div>
            <dt>Project focus</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </EditorialHero>
      <ProjectCover projectName={project.projectName} cover={project.cover} />
      <EditorialContent
        anchors={[
          { id: "brief", label: "The brief" },
          { id: "decisions", label: "Design decisions" },
          { id: "features", label: "What the product includes" },
          { id: "takeaway", label: "Design takeaway" },
          { id: "next-project", label: "Next project" },
        ]}
      >
        <EditorialSection id="brief" title={notes.title}>
          <p>{study.challenge}</p>
          <div className="ed-note">
            <h3>Project goal</h3>
            <p>{study.goal}</p>
          </div>
        </EditorialSection>
        <EditorialSection id="decisions" title="Design decisions">
          <EditorialRows rows={study.approach} />
        </EditorialSection>
        <EditorialSection id="features" title="What the product includes">
          <ul className="ed-feature-list">
            {study.features.map(({ title, body }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
          <div className="ed-inline-facts">
            <div>
              <strong>Disciplines</strong>
              <p>{study.expertise.join(" · ")}</p>
            </div>
            {study.tech && (
              <div>
                <strong>Technologies</strong>
                <p>{study.tech.join(" · ")}</p>
              </div>
            )}
          </div>
        </EditorialSection>
        <EditorialSection id="takeaway" title="Design takeaway">
          <p>{notes.takeaway}</p>
        </EditorialSection>
        <EditorialContact
          title="Working on a similar product?"
          text="Tell us how people use it today and what you want to make easier."
          href={`/contact?type=${project.type === "mobile" ? "Mobile" : "Web"}`}
        />
        <EditorialSection id="next-project" title="Next project">
          <Link className="ed-project-example" href={`/work/${next.slug}`}>
            <Image
              {...next.cover}
              alt=""
              sizes="(max-width: 700px) 92vw, 360px"
            />
            <div>
              <h3>{next.projectName}</h3>
              <p>{caseStudies[next.slug].summary}</p>
              <span>Read case study</span>
            </div>
          </Link>
        </EditorialSection>
      </EditorialContent>
    </article>
  );
}
