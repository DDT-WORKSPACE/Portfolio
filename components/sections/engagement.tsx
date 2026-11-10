import { models, headings } from "@/content/site";
import { Heading, Icon, Copy, RoundArrow } from "../ui";
import Link from "next/link";
export function Engagement() {
  return (
    <section className="section engagement-section" id="engagement">
      <div className="container">
        <Heading {...headings.engagement} />
        <div className="engagement-grid">
          {models.map((m, i) => (
            <Link
              key={m.name}
              href={`/contact?model=${encodeURIComponent(m.name)}`}
              className={`engagement-card ${i === 1 ? "featured" : ""}`}
            >
              <div className="engagement-top">
                <span className="engagement-icon">
                  <Icon name={m.icon} size={32} />
                </span>
                <span>0{i + 1}</span>
              </div>
              <p className="model-name">{m.name}</p>
              <h3>{m.question}</h3>
              <p>{m.body}</p>
              <div className="engagement-details">
                <p>
                  <strong>Best for</strong>
                  {m.best}
                </p>
                <p>
                  <strong>Team shape</strong>
                  {m.shape}
                </p>
                <p>
                  <strong>First, we</strong>
                  <Copy>{m.start}</Copy>
                </p>
              </div>
              <div className="model-footer">
                <span>Find your fit</span>
                <RoundArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
