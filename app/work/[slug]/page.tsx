import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/content/work";
import { InnerHero } from "@/components/inner";
import { ProjectArt } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";
import { ProjectExperience } from "@/components/project-experience";
import { Copy, RoundArrow } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((w) => w.slug === slug);
  return { title: w?.title, description: w?.challenge };
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = work.findIndex((w) => w.slug === slug);
  if (i < 0) notFound();
  const w = work[i],
    next = work[(i + 1) % work.length];
  return (
    <>
      <InnerHero
        marker={w.industry}
        title={w.title}
        body={w.projectName}
        cta={false}
      >
        <div className="case-hero-art">
          <ProjectArt cover={w.cover} index={i} large />
        </div>
      </InnerHero>
      <section className="section">
        <div className="container case-layout">
          <aside className="case-sidebar">
            <div>
              <h3>Industry</h3>
              <p>{w.industry}</p>
            </div>
            <div>
              <h3>Project</h3>
              <Copy>{w.client}</Copy>
            </div>
            <div>
              <h3>Focus areas</h3>
              <div className="chips">
                {w.stack.map((s) => (
                  <span key={s}>
                    <Copy>{s}</Copy>
                  </span>
                ))}
              </div>
            </div>
          </aside>
          <div className="case-prose">
            {[
              ["The challenge", w.challenge],
              ["Our approach", w.approach],
              ["The experience", w.result],
            ].map(([heading, body]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>
                  <Copy>{body}</Copy>
                </p>
              </section>
            ))}
            <Link href={`/work/${next.slug}`} className="case-next">
              <div>
                <span>Next case study</span>
                <h3>
                  <Copy>{next.title}</Copy>
                </h3>
              </div>
              <RoundArrow />
            </Link>
          </div>
        </div>
      </section>
      <ProjectExperience slug={w.slug} name={w.projectName} focus={w.stack} />
      <Contact />
    </>
  );
}
