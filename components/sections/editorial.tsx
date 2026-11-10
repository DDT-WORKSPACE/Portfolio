import Link from "next/link";
import { ArrowUpRight, Code2, Command, Braces } from "lucide-react";
import { posts } from "@/content/posts";
import { accelerators, headings, site, stack } from "@/content/site";
import { Copy, Heading, TextLink, Icon, RoundArrow, Marker } from "../ui";
import { Marquee } from "./marquee";
import { ProjectLogos } from "./project-logos";
import { experience } from "@/content/experience";
import { TechnologyOrbit } from "./technology-orbit";
export { Results } from "./results";
export function Technology() {
  return (
    <section className="section technology-section technology-v2">
      <div className="container">
        <div className="technology-intro">
          <div className="tech-heading">
            <Marker>the right tools for the right job</Marker>
            <h2>{experience.technology.title}</h2>
            <p>{experience.technology.body}</p>
          </div>
          <TechnologyOrbit />
        </div>
        <div className="technology-groups">
          {experience.technology.groups.map((g, i) => (
            <div key={g.name}>
              <span className="tech-group-icon">
                <Icon name={g.icon} size={25} />
              </span>
              <span className="tech-group-number">0{i + 1}</span>
              <h3>{g.name}</h3>
              <p className="tech-group-description">
                {
                  [
                    "Interfaces, websites and apps built around the people using them.",
                    "Connect the workflow, automate repetitive steps and use AI where interpretation helps.",
                    "APIs, deployment and quality checks that support the working product.",
                  ][i]
                }
              </p>
              <div className="tech-tool-list">
                {g.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Marquee items={stack} />
      <div className="container technology-bottom">
        <span className="status-dot" />
        <p>{experience.technology.caption}</p>
        <Link href="/services">
          Explore the capabilities
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
export function Accelerators() {
  return (
    <section className="section accelerator-section">
      <div className="container">
        <Heading {...headings.accelerators} />
        <div className="accelerator-list">
          {accelerators.map((a, i) => (
            <Link
              key={a.slug}
              href={`/starting-points/${a.slug}`}
              className="accelerator-row"
            >
              <span className="row-number">0{i + 1}</span>
              <div>
                <h3>
                  <Copy>{a.name}</Copy>
                </h3>
                <p>{a.body}</p>
              </div>
              <span className="accelerator-time">
                <Copy>{a.time}</Copy>
              </span>
              <span className="accelerator-preview">
                <Icon name={["spark", "book", "rocket", "bag"][i]} size={28} />
              </span>
              <RoundArrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Insights() {
  return (
    <section className="section insights-section">
      <div className="container">
        <div className="heading-split">
          <Heading {...headings.insights} />
          <TextLink href="/blog">More from the studio</TextLink>
        </div>
        <div className="insights-grid">
          {posts.map((p, i) => (
            <Link
              href={`/blog/${p.slug}`}
              className="insight-card"
              key={p.slug}
            >
              <div
                className={`insight-cover insight-${p.color}`}
                aria-hidden="true"
              >
                <span className="insight-grid" />
                {i === 0 ? (
                  <Command size={76} strokeWidth={1} />
                ) : i === 1 ? (
                  <Braces size={90} strokeWidth={1} />
                ) : (
                  <Code2 size={88} strokeWidth={1} />
                )}
                <span className="insight-cover-caption">
                  Field notes / 0{i + 1}
                </span>
                <ArrowUpRight className="insight-cover-arrow" size={22} />
              </div>
              <span className="insight-category">
                {p.category} <span>{p.readingTime}</span>
              </span>
              <h3>{p.title}</h3>
              <p className="insight-byline">
                <Copy>{p.author}</Copy>
                <span> / </span>
                <Copy>{p.date}</Copy>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ClientStrip() {
  return <ProjectLogos />;
}
