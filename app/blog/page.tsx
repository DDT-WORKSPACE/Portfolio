import type { Metadata } from "next";
import { InnerHero } from "@/components/inner";
import { InsightCard } from "@/components/home/sections";
import { Contact } from "@/components/sections/contact";
import { posts } from "@/content/posts";
export const metadata: Metadata = { title: "Insights and field notes" };
export default function Blog() {
  return (
    <>
      <InnerHero
        marker="Insights"
        title="Notes from the studio"
        body="Practical guides on scoping products, choosing what to automate and keeping projects moving."
        cta={false}
      />
      <section className="dd dd-section dd-insights dd-blog-index">
        <div className="dd-container">
          <div className="dd-post-grid is-index">
            {posts.map((p, i) => (
              <InsightCard key={p.slug} slug={p.slug} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
