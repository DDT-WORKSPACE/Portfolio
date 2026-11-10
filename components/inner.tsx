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
    <section className="inner-hero">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{marker}</span>
        </div>
        <Marker>{marker.toLowerCase()}</Marker>
        <h1>
          <Copy>{title.replace(/\.$/, "")}</Copy>
          <span className="period">.</span>
        </h1>
        {body && (
          <p className="lead">
            <Copy>{body}</Copy>
          </p>
        )}
        {cta && <Button>Book a free strategy call</Button>}
        {children}
      </div>
    </section>
  );
}
export function ServiceGrid({ items = services }: { items?: Service[] }) {
  return (
    <div className="service-index">
      {items.map((s) => (
        <Link key={s.slug} href={`/services/${s.slug}`}>
          <span className="service-icon">
            <ServiceGlyph name={s.icon} />
          </span>
          <h2>{s.name}</h2>
          <p>{s.promise}</p>
          <span className="text-link">
            Explore service
            <Icon name="connect" size={16} />
          </span>
        </Link>
      ))}
    </div>
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
