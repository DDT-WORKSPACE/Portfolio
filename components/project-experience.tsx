import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
const journeys: Record<
  string,
  { intro: string; steps: string[]; details: [string, string][] }
> = {
  talentbadger: {
    intro:
      "A focused marketplace for advanced engineering expertise, designed to help a company find a specialist or shape a team around a specific challenge.",
    steps: [
      "Explore expertise",
      "Find a specialist or team",
      "Start a relevant conversation",
    ],
    details: [
      [
        "Different needs, clear routes",
        "Company and specialist paths are distinct. Expertise categories make it easier to approach the marketplace with a particular engineering need.",
      ],
      [
        "Context before a conversation",
        "The responsive presentation explains the product's role and keeps the main next actions visible across desktop and mobile.",
      ],
    ],
  },
  renbite: {
    intro:
      "A mobile coffee-and-food discovery experience that connects nearby restaurants, favourites and ordering in a familiar everyday flow.",
    steps: [
      "Find nearby favourites",
      "Explore food and coffee",
      "Place and follow an order",
    ],
    details: [
      [
        "Discovery built around the moment",
        "Search, restaurant categories and nearby recommendations help a customer move from an open-ended browse to something specific.",
      ],
      [
        "Familiar mobile navigation",
        "Home, search, favourites and profile remain easy to find. Product images, offers and order cues support the next action.",
      ],
    ],
  },
  "ffp-vault": {
    intro:
      "A personal organization app bringing financial documents, upcoming dates and reminders into one considered mobile experience.",
    steps: [
      "Organize records",
      "Review upcoming dates",
      "Follow the next reminder",
    ],
    details: [
      [
        "Dates with a clear context",
        "A calendar and upcoming reminders make due dates visible. Distinct status cues help separate scheduled items from work needing attention.",
      ],
      [
        "A focused product boundary",
        "The experience is for personal organization. It is not presented as banking, investment, credit or financial-advice functionality.",
      ],
    ],
  },
  besttrip: {
    intro:
      "A travel website that puts the practical search task beside destination discovery, making room for both planning and inspiration.",
    steps: [
      "Choose a travel service",
      "Set the journey details",
      "Explore relevant options",
    ],
    details: [
      [
        "Search first",
        "Flight type, travellers, route and dates are grouped in one prominent area, with the search action clearly separated from supporting information.",
      ],
      [
        "Room to explore",
        "Hotel, visa and Umrah navigation sit alongside destination offers, giving visitors different routes into planning.",
      ],
    ],
  },
  "crypto-wallet": {
    intro:
      "A dashboard concept for reading asset balances, recent transactions and the context behind an individual activity in a single workspace.",
    steps: [
      "Choose an asset",
      "Review balance and activity",
      "Inspect transaction status",
    ],
    details: [
      [
        "An overview and its details",
        "The asset list, chart and transaction area divide a dense information space into useful levels of attention.",
      ],
      [
        "Status matters",
        "Pending and completed entries are visibly separated. Transaction details stay near the activity being reviewed.",
      ],
    ],
  },
};
export function ProjectExperience({
  slug,
  name,
  focus,
}: {
  slug: string;
  name: string;
  focus: string[];
}) {
  const j = journeys[slug] ?? {
    intro: `${name} brings ${focus.join(", ").toLowerCase()} together around a clear product journey.`,
    steps: [
      "Explore the experience",
      "Find relevant information",
      "Take the next step",
    ],
    details: [
      [
        "A considered hierarchy",
        `The supplied ${name} design organizes content around the most important user tasks, using familiar navigation and a clear visual hierarchy.`,
      ],
      [
        "A connected experience",
        "Supporting details and relevant actions stay close to the task so visitors can move forward with context.",
      ],
    ] as [string, string][],
  };
  return (
    <section className="project-experience detail-section">
      <div className="container">
        <div className="ag-section-heading">
          <span className="st-badge">Inside the experience</span>
          <h2>What makes this product useful.</h2>
          <p>{j.intro}</p>
        </div>
        <div className="pe-journey">
          {j.steps.map((step, i) => (
            <div key={step}>
              <span>0{i + 1}</span>
              <strong>{step}</strong>
              {i < 2 && <ArrowRight size={18} />}
            </div>
          ))}
        </div>
        <div className="pe-details">
          {j.details.map(([title, body]) => (
            <article key={title}>
              <Check size={20} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="pe-next">
          <div>
            <h3>Exploring a similar challenge?</h3>
            <p>
              Tell us about the people, tasks and systems your product needs to
              connect.
            </p>
          </div>
          <Link
            className="ag-link"
            href={`/contact?type=${slug === "renbite" || slug === "ffp-vault" ? "Mobile" : "Web"}&brief=${encodeURIComponent(`I would like to discuss a product inspired by the ${name} experience. My idea is: `)}`}
          >
            Discuss your product
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
