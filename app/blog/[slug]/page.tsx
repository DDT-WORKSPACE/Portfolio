import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { InnerHero } from "@/components/inner";
import { Copy } from "@/components/ui";
import { InsightCard } from "@/components/home/sections";
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
      <section className="dd dd-section dd-insights dd-related">
        <div className="dd-container">
          <div className="dd-heading">
            <span className="dd-badge is-orange">
              <i aria-hidden="true" />
              Keep reading
            </span>
            <h2>More from the studio</h2>
          </div>
          <div className="dd-post-grid is-three">
            {posts
              .filter((x) => x.slug !== p.slug)
              .slice(0, 3)
              .map((x, i) => (
                <InsightCard key={x.slug} slug={x.slug} index={i + 1} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
