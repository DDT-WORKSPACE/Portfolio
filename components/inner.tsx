import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Marker, Copy, TextLink, Icon } from "./ui";
import { services, type Service } from "@/content/services";
import { stages } from "@/content/site";
import { ServiceGlyph } from "./service-glyph";
export function InnerHero({
  marker,
  title,
  body,
  cta = true,
  children,
}: {
  marker: string;
  title: string;
  body?: string;
  cta?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="dd-page-hero">
      <div className="dd-page-sky" aria-hidden="true">
        <div className="dd-beams is-soft">
          <i />
          <i />
          <i />
        </div>
        <svg
          className="dd-arcs"
          viewBox="0 0 1600 700"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <linearGradient id="pageArc" x1="0" x2="1">
              <stop offset="0" style={{ stopColor: "var(--dd-blue-light)" }} />
              <stop
                offset="0.4"
                style={{ stopColor: "var(--dd-blue)" }}
                stopOpacity="0.4"
              />
              <stop
                offset="0.5"
                style={{ stopColor: "var(--dd-blue)" }}
                stopOpacity="0"
              />
              <stop
                offset="0.62"
                style={{ stopColor: "var(--dd-orange)" }}
                stopOpacity="0.4"
              />
              <stop
                offset="1"
                style={{ stopColor: "var(--dd-orange-light)" }}
              />
            </linearGradient>
          </defs>
          <circle
            cx="800"
            cy="1500"
            r="1380"
            className="dd-arc"
            stroke="url(#pageArc)"
          />
        </svg>
        <div className="dd-stars" />
      </div>
      <div className="dd-container dd-page-hero-inner">
        <nav className="dd-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{marker}</span>
        </nav>
        <span className="dd-badge is-dark">
          <i aria-hidden="true" />
          {marker}
        </span>
        <h1>
          <Copy>{title.replace(/\.$/, "")}</Copy>
        </h1>
        {body && (
          <p className="dd-page-lead">
            <Copy>{body}</Copy>
          </p>
        )}
        {cta && (
          <div className="dd-page-actions">
            <Button>Book a free strategy call</Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
export function ServiceList({ items }: { items: Service[] }) {
  return (
    <ul className="service-catalog-rows">
      {items.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            aria-labelledby={`service-${service.slug}`}
          >
            <span className="service-catalog-icon">
              <ServiceGlyph name={service.icon} />
            </span>
            <div>
              <h3 id={`service-${service.slug}`}>{service.name}</h3>
              <p>{service.promise}</p>
            </div>
            <ul>
              {service.capabilities.slice(0, 2).map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export function ShortProcess() {
  return (
    <section className="section">
      <div className="container">
        <Marker>how we get there</Marker>
        <h2>A clear path. Together.</h2>
        <div className="capability-grid">
          {stages.slice(0, 3).map((s, i) => (
            <div key={s.name}>
              <span>
                0{i + 1} / {s.time}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function RelatedServices({ exclude }: { exclude?: string }) {
  return (
    <section className="section">
      <div className="container">
        <Marker>better together</Marker>
        <h2>The rest of your team.</h2>
        <div className="related-grid">
          {services
            .filter((s) => s.slug !== exclude)
            .slice(0, 3)
            .map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <Icon name={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.promise}</p>
                <span className="text-link">
                  Explore {s.name.toLowerCase()}
                  <Icon name="connect" size={16} />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
