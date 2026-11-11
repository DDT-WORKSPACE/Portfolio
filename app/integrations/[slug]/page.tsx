import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { integrations } from "@/content/integrations";
import { InnerHero } from "@/components/inner";
export const dynamicParams = false;
export function generateStaticParams() {
  return integrations.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = integrations.find((t) => t.slug === slug);
  return { title: `${tool?.name} integration`, description: tool?.summary };
}
export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = integrations.find((t) => t.slug === slug);
  if (!tool) notFound();
  return (
    <>
      <InnerHero
        marker={tool.category}
        title={`${tool.name}, connected to your business.`}
        body={tool.summary}
        cta={false}
      />
      <section className="detail-section">
        <div className="container integration-detail">
          <aside>
            <img
              src={`/integrations/${tool.slug}.svg`}
              width={62}
              height={62}
              alt={`${tool.name} logo`}
            />
            <h2>{tool.name}</h2>
            <p>{tool.category}</p>
            <Link href="/integrations">
              All integrations <ArrowUpRight size={15} />
            </Link>
          </aside>
          <div>
            <h2>A useful connection starts with a real task.</h2>
            <p>{tool.example}</p>
            <h3>What we can connect</h3>
            <ul>
              {tool.actions.map((a) => (
                <li key={a}>
                  <Check size={17} />
                  {a}
                </li>
              ))}
            </ul>
            <h3>Access and boundaries</h3>
            <p>{tool.boundary}</p>
            <h3>How we work through it</h3>
            <ol>
              <li>
                Map the event, the data needed and the next useful action.
              </li>
              <li>Confirm access, field mapping and human review points.</li>
              <li>
                Test the connection, failure paths and an understandable
                handover.
              </li>
            </ol>
            <div className="integration-detail-cta">
              <h3>Have a workflow in mind?</h3>
              <p>
                Tell us what happens today and what you would like to make
                easier.
              </p>
              <Link
                className="ag-link"
                href={`/contact?type=Automation&brief=${encodeURIComponent(`I would like to discuss a ${tool.name} integration. The workflow is: `)}`}
              >
                Discuss a {tool.name} workflow <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
