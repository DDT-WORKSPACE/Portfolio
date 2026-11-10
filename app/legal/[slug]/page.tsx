import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { InnerHero } from "@/components/inner";
import { Copy } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "privacy" }, { slug: "terms" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug === "privacy" ? "Privacy policy" : "Terms of service" };
}
export default async function Legal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "privacy" && slug !== "terms") notFound();
  return (
    <>
      <InnerHero
        marker="Legal"
        title={slug === "privacy" ? "Privacy policy" : "Terms of service"}
        cta={false}
      />
      <section className="legal-content">
        <div className="container">
          <p>
            <Copy>{site.legal[slug]}</Copy>
          </p>
        </div>
      </section>
    </>
  );
}
