import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { InnerHero } from "@/components/inner";
import { Copy } from "@/components/ui";
import { Insights } from "@/components/sections/editorial";
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  return { title: p?.title, description: p?.description };
}
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  const safeBody = p.body
    .replace(
      /\{\{[^}]+\}\}/g,
      (match) =>
        `<span className="placeholder">${match.replaceAll("{", "&#123;").replaceAll("}", "&#125;")}</span>`,
    )
    .replace(/^# .+\n/, "");
  return (
    <>
      <InnerHero marker={p.category} title={p.title} cta={false}>
        <div className="article-meta">
          <Copy>{p.author}</Copy>
          <Copy>{p.date}</Copy>
          <span>{p.readingTime}</span>
        </div>
      </InnerHero>
      <div className="container">
        <article className="article">
          <MDXRemote source={safeBody} />
        </article>
      </div>
      <Insights />
    </>
  );
}
