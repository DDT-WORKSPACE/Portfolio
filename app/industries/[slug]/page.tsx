import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/content/site";
import { InnerHero, ShortProcess, RelatedServices } from "@/components/inner";
import { Contact } from "@/components/sections/contact";
import { Work } from "@/components/sections/work";
import { Copy, Marker } from "@/components/ui";
import { experience } from "@/content/experience";
import Image from "next/image";
export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((i) => i.slug === slug);
  return { title: i?.name, description: i?.description };
}
export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = industries.find((i) => i.slug === slug);
  if (!i) notFound();
  const note =
    experience.industryNotes[industries.findIndex((ind) => ind.slug === slug)];
  return (
    <>
      <InnerHero
        marker={i.name}
        title={i.description.replace(/\.$/, "")}
        body="One connected team to help you understand the opportunity, design the experience and build the right product."
      />
      <section className="section">
        <div className="container industry-detail-v2">
          <Image
            src={i.art}
            width={800}
            height={800}
            alt={`${i.name} product illustration`}
            sizes="(max-width:767px) 100vw, 400px"
          />
          <div>
            <Marker>the opportunity</Marker>
            <h2>{i.description}</h2>
            <p>{note.body}</p>
            <div className="industry-tags">
              {note.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a className="text-link" href={note.href}>
              {note.project}
            </a>
          </div>
        </div>
      </section>
      <ShortProcess />
      <RelatedServices />
      <Work />
      <Contact />
    </>
  );
}
