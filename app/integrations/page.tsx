import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InnerHero } from "@/components/inner";
import { integrations } from "@/content/integrations";
export const metadata = {
  title: "Connected business tools",
  description:
    "Explore practical integrations for your product, team and everyday workflows.",
};
export default function IntegrationsPage() {
  return (
    <>
      <InnerHero
        marker="Integrations"
        title="Make your everyday tools work together."
        body="Explore where a useful connection can remove repeated work. We scope the workflow, access and handoff around your business."
        cta={false}
      />
      <section className="detail-section">
        <div className="container integration-directory">
          {integrations.map((t) => (
            <Link href={`/integrations/${t.slug}`} key={t.slug}>
              <img
                src={`/integrations/${t.slug}.svg`}
                width={30}
                height={30}
                alt=""
              />
              <span>{t.category}</span>
              <h2>{t.name}</h2>
              <p>{t.summary}</p>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
