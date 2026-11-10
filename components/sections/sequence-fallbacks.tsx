import { ProcessView } from "./process-view";
import { headings, roles, stages } from "@/content/site";
import { services } from "@/content/services";
import { Heading, Icon, Copy } from "../ui";
import { traces } from "./traces";
import { ServiceGlyph } from "../service-glyph";
import { experience } from "@/content/experience";
import { Marker } from "../ui";
export function HandoffFallback() {
  return (
    <section className="clarity-section" id="handoffs">
      <div className="container clarity-sticky">
        <div className="clarity-intro">
          <div>
            <Marker>less friction. more forward</Marker>
            <h2>
              Less noise.
              <br />A clearer way forward.
            </h2>
          </div>
          <p>
            Before we add features, we remove uncertainty. Every conversation
            should bring the work closer to a useful outcome.
          </p>
        </div>
        <div className="decision-list">
          {[
            [
              "Too many priorities.",
              "One problem worth solving.",
              "Decide what actually needs to change.",
            ],
            [
              "An idea in everyone?s head.",
              "A direction everyone can see.",
              "Make the important decisions tangible.",
            ],
            [
              "Updates about the work.",
              "A product you can put to work.",
              "Review the experience, not just a status report.",
            ],
          ].map(([before, after, note]) => (
            <div className="decision-row" key={after}>
              <div className="decision-before">{before}</div>
              <div className="decision-connector">
                <i />
                <span />
              </div>
              <div className="decision-after">
                <h3>{after}</h3>
                <p>{note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="clarity-footer">
          <span>A shared understanding changes the work.</span>
          <span>Clarity before complexity</span>
        </div>
      </div>
    </section>
  );
}
export function ServicesFallback() {
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="heading-split">
          <Heading {...headings.services} />
          <p className="interaction-hint">
            Explore a service.
            <br />
            See how it all connects.
          </p>
        </div>
        <div className="services-stage is-visible">
          <svg className="traces-svg" viewBox="0 0 1200 900" aria-hidden="true">
            {traces.map((t) => (
              <path className="trace" pathLength="1" d={t.path} key={t.path} />
            ))}
          </svg>
          <div className="services-center">
            <div className="service-logo-placeholder">
              <img
                src="/Logo/logo.png"
                alt="DevsDen Tech logo"
                width={64}
                height={67}
              />
            </div>
            <div className="hub-ports">
              <i />
              <i />
              <i />
            </div>
            <span className="hub-caption">One team. Connected.</span>
          </div>
          {services.map((s, i) => (
            <a
              key={s.slug}
              href={`/services/${s.slug}`}
              className="service-node"
              style={{ left: `${traces[i].x}%`, top: `${traces[i].y}%` }}
            >
              <span className={`service-icon tone-${i % 3}`}>
                <ServiceGlyph name={s.icon} />
              </span>
              <span className="service-node-label">{s.name}</span>
            </a>
          ))}
        </div>
        <div className="mobile-service-list">
          <div className="mobile-service-hub">
            <Icon name="connect" />
            One team. Every discipline.
          </div>
          {services.map((s) => (
            <div key={s.slug} className="mobile-service">
              <a className="fallback-service-link" href={`/services/${s.slug}`}>
                <span className="service-icon">
                  <ServiceGlyph name={s.icon} />
                </span>
                {s.name}
              </a>
            </div>
          ))}
        </div>
        <div className="service-bottom">
          <span>Connected expertise, from the first conversation.</span>
          <a href="/services">
            All eleven services
            <Icon name="connect" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function ProcessFallback() {
  return (
    <div className="process-scroll-shell">
      <ProcessView active={0} />
    </div>
  );
}
