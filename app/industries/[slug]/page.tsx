import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/content/site";
import { industryGuides } from "@/content/industry-guides";
import { services } from "@/content/services";
import { work } from "@/content/work";
import { caseStudies } from "@/content/case-studies";
import {
  EditorialContact,
  EditorialContent,
  EditorialHero,
  EditorialLinks,
  EditorialRows,
  EditorialSection,
} from "@/components/editorial-detail";

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  return { title: industry?.name, description: industryGuides[slug]?.intro };
}

export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  const guide = industryGuides[slug];
  if (!industry || !guide) notFound();
  const project = work.find((item) => item.slug === guide.project);

  return (
    <div className="ed-page ed-industry">
      <EditorialHero
        parent={{ label: "Industries", href: "/#industries" }}
        title={industry.name}
        description={guide.intro}
      >
        <aside className="ed-brief">
          <strong>Where we can help</strong>
          <ul>
            {guide.work.map(({ title }) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </aside>
      </EditorialHero>
      <EditorialContent
        anchors={[
          { id: "opportunities", label: "What we build" },
          ...(project ? [{ id: "example", label: "Portfolio example" }] : []),
          { id: "planning", label: "Planning a project" },
          { id: "related", label: "Related services" },
        ]}
      >
        <EditorialSection
          id="opportunities"
          title={`What we build for ${industry.name.toLowerCase()}`}
        >
          <p>{guide.context}</p>
          <EditorialRows rows={guide.work} />
        </EditorialSection>
        {project && (
          <EditorialSection id="example" title="Portfolio example">
            <Link className="ed-project-example" href={`/work/${project.slug}`}>
              <Image
                {...project.cover}
                sizes="(max-width: 700px) 92vw, 400px"
              />
              <div>
                <h3>{project.projectName}</h3>
                <p>{caseStudies[project.slug].summary}</p>
                <span>Read case study</span>
              </div>
            </Link>
          </EditorialSection>
        )}
        <EditorialSection id="planning" title="Planning a project">
          <p>{guide.priorities}</p>
        </EditorialSection>
        <EditorialSection id="related" title="Related services">
          <EditorialLinks
            links={guide.serviceSlugs.map((serviceSlug) => {
              const service = services.find(
                (item) => item.slug === serviceSlug,
              )!;
              return {
                href: `/services/${service.slug}`,
                title: service.name,
                description: service.promise,
              };
            })}
          />
        </EditorialSection>
        <EditorialContact
          title="Tell us what needs to change"
          text="Share the users, systems and workflow you need to bring together."
          href={`/contact?type=${guide.type}&brief=${encodeURIComponent(`I’m planning a project in ${industry.name}. `)}`}
        />
      </EditorialContent>
    </div>
  );
}
