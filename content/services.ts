export type Service = {
  slug: string;
  name: string;
  promise: string;
  capabilities: [string, string, string];
  stack: string[];
  outcome: string;
  icon: string;
};
export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web development",
    promise:
      "Fast, accessible sites and web apps your team can keep building on.",
    capabilities: [
      "Marketing sites and web apps",
      "Server-rendered, SEO-ready builds",
      "Design systems and component libraries",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    outcome: "A maintainable foundation for the next release.",
    icon: "code",
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    promise: "iOS and Android apps that feel native and ship to both stores.",
    capabilities: [
      "Cross-platform and native builds",
      "Offline mode, notifications and payments",
      "Store release and updates",
    ],
    stack: ["React Native", "Swift", "Kotlin", "Expo"],
    outcome: "One considered experience across mobile screens.",
    icon: "phone",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX design",
    promise: "Interfaces people understand on the first try.",
    capabilities: [
      "Research and user flows",
      "Prototypes you can click before we build",
      "Design systems handed over in Figma",
    ],
    stack: ["Figma", "Storybook", "Tailwind"],
    outcome: "A reviewable direction before production code.",
    icon: "design",
  },
  {
    slug: "ai-automation",
    name: "Business automation & AI",
    promise:
      "Find the business bottleneck. Build the workflow that removes it.",
    capabilities: [
      "Reception, lead capture and appointment workflows",
      "Sales follow-ups, CRM updates and connected operations",
      "AI assistants with monitoring and human handoff",
    ],
    stack: ["Python", "OpenAI", "Anthropic", "n8n"],
    outcome: "Less manual work, with clear controls and human oversight.",
    icon: "spark",
  },
  {
    slug: "cloud-devops",
    name: "Cloud and DevOps",
    promise: "Infrastructure that scales and stays up.",
    capabilities: [
      "Cloud setup and migration",
      "CI/CD and infrastructure as code",
      "Monitoring, alerts and cost control",
    ],
    stack: ["AWS", "Google Cloud", "Docker", "Terraform"],
    outcome: "A deployment foundation with visibility and control.",
    icon: "cloud",
  },
  {
    slug: "apis-integrations",
    name: "APIs and integrations",
    promise: "Your systems talking to each other, reliably.",
    capabilities: [
      "REST and GraphQL APIs",
      "Payment, CRM and ERP integrations",
      "Webhooks, queues and sync jobs",
    ],
    stack: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
    outcome: "Reliable connections between the tools you already use.",
    icon: "connect",
  },
  {
    slug: "security-qa",
    name: "Security and QA",
    promise: "Ship with confidence, not crossed fingers.",
    capabilities: [
      "Automated and manual testing",
      "Security reviews and penetration checks",
      "Release gates in your CI",
    ],
    stack: ["Playwright", "Cypress", "OWASP", "GitHub Actions"],
    outcome: "Critical journeys checked before release.",
    icon: "shield",
  },
  {
    slug: "support-scaling",
    name: "Support and scaling",
    promise: "A team that stays after launch.",
    capabilities: [
      "Monthly retainers with a named team",
      "Performance and reliability work",
      "New features on a steady cadence",
    ],
    stack: ["Sentry", "Datadog", "Vercel", "AWS"],
    outcome: "Support scope and response expectations agreed together.",
    icon: "support",
  },
  {
    slug: "mvp-product",
    name: "MVP and product",
    promise: "From idea to a product real users can pay for.",
    capabilities: [
      "Scope and roadmap workshop",
      "The smallest version that tests the idea",
      "Launch, measure, iterate",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
    outcome: "A focused first release built around the core idea.",
    icon: "rocket",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    promise: "Stores that load fast and convert.",
    capabilities: [
      "Custom and headless storefronts",
      "Checkout, payments and local gateways",
      "Catalog, inventory and order integrations",
    ],
    stack: ["Shopify", "Next.js", "Stripe", "WooCommerce"],
    outcome: "A clear path from discovery to checkout.",
    icon: "bag",
  },
  {
    slug: "data-analytics",
    name: "Data and analytics",
    promise: "One trusted view of your numbers.",
    capabilities: [
      "Pipelines and warehouses",
      "Dashboards and reporting",
      "Forecasting and machine-learning models",
    ],
    stack: ["Python", "SQL", "dbt", "BigQuery"],
    outcome: "A clearer view of the information your business needs.",
    icon: "chart",
  },
];
