import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { InnerHero, RelatedServices } from "@/components/inner";
import { ServiceDetail } from "@/components/service-detail";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return { title: s?.name, description: s?.promise };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <InnerHero marker={s.name} title={s.name} body={s.promise} />
      <ServiceDetail service={s} />
      <RelatedServices exclude={s.slug} />
    </>
  );
}
