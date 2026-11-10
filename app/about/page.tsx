import type { Metadata } from "next";
import { site, values } from "@/content/site";
import { InnerHero } from "@/components/inner";
import { Copy, Marker } from "@/components/ui";
import { Results } from "@/components/sections/editorial";
import { Contact } from "@/components/sections/contact";
export const metadata: Metadata = { title: "About DevsDen Tech" };
export default function About() {
  return (
    <>
      <InnerHero
        marker="Our company"
        title="Good people, building what’s next"
        body={site.description}
      />
      <section className="section">
        <div className="container">
          <div className="about-story">
            <Marker>our story</Marker>
            <h2>
              Close to the idea.
              <br />
              Closer as a team.
            </h2>
            <p>
              <Copy>{site.story}</Copy>
            </p>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
          <div className="team-pending">
            <h3>The people behind the work.</h3>
            <p>
              <Copy>{site.team}</Copy>
            </p>
          </div>
          <div className="team-pending">
            <h3>Where we build.</h3>
            <p>
              <Copy>{site.offices}</Copy>
            </p>
          </div>
        </div>
      </section>
      <Results />
      <Contact />
    </>
  );
}
