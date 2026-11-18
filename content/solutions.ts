// The five solution areas shown on the homepage ("Your business, one connected ecosystem")
// and detailed on /integrations. Tools with a slug have their own page under /integrations/<slug>;
// tools without one are common platforms we connect through their APIs.

export type SolutionTool = { name: string; slug?: string };
export type Solution = {
  slug: string;
  title: string;
  /** One-word label used on tool cards. */
  tag: string;
  short: string;
  icon: "cart" | "mail" | "users" | "headset" | "receipt";
  tone: "blue" | "orange" | "sky" | "navy" | "amber";
  intro: string;
  builds: string[];
  flow: string[];
  tools: SolutionTool[];
  outcome: string;
  service: { label: string; href: string };
  work?: string;
};

export const solutions: Solution[] = [
  {
    slug: "commerce",
    title: "Commerce platforms",
    tag: "Commerce",
    short: "Storefronts, catalogues, checkout and order flows.",
    icon: "cart",
    tone: "blue",
    intro:
      "An online store is more than the storefront. We design and build the shop your customers see, then connect it to payments, stock and the people who pack and ship every order.",
    builds: [
      "Storefronts and product catalogues",
      "Checkout, payments and subscriptions",
      "Order, stock and fulfilment updates",
      "Customer accounts, offers and order tracking",
    ],
    flow: ["A customer places an order", "The payment is confirmed", "Stock and the order record update", "Your team and the customer are notified"],
    tools: [
      { name: "Shopify", slug: "shopify" },
      { name: "Stripe", slug: "stripe" },
      { name: "Google Sheets", slug: "googlesheets" },
      { name: "Slack", slug: "slack" },
      { name: "WooCommerce" },
      { name: "Custom storefronts" },
    ],
    outcome: "Orders move from checkout to the packing table without anyone retyping them.",
    service: { label: "E-commerce", href: "/services/e-commerce" },
    work: "shopmart",
  },
  {
    slug: "email",
    title: "Email and automation",
    tag: "Email",
    short: "Follow-ups, notifications and inbox workflows.",
    icon: "mail",
    tone: "orange",
    intro:
      "Teams lose hours to the same emails: confirmations, reminders and follow-ups. We automate the predictable ones, route the rest to the right person and keep a clear record of what was sent.",
    builds: [
      "Automatic confirmations and reminders",
      "Lead follow-up sequences",
      "Inbox sorting and routing to the right person",
      "AI-drafted replies with human review",
    ],
    flow: ["An enquiry or event arrives", "The right rule or template is chosen", "The email is sent, or drafted for review", "The result is logged against the contact"],
    tools: [
      { name: "Gmail", slug: "gmail" },
      { name: "Zapier", slug: "zapier" },
      { name: "n8n", slug: "n8n" },
      { name: "HubSpot", slug: "hubspot" },
      { name: "Outlook" },
      { name: "Mailchimp" },
    ],
    outcome: "Every enquiry gets a timely reply and nothing waits unseen in an inbox.",
    service: { label: "Business automation & AI", href: "/services/ai-automation" },
  },
  {
    slug: "crm",
    title: "CRM and sales",
    tag: "CRM",
    short: "Leads, pipelines and customer records in one place.",
    icon: "users",
    tone: "sky",
    intro:
      "Leads arrive from your website, forms, calls and messages. We bring them into one customer record, keep the pipeline current and give the team a clear next step for every deal.",
    builds: [
      "Website and form leads straight into the CRM",
      "Pipeline stages with automatic tasks",
      "Customer records kept in sync across tools",
      "Sales dashboards and simple reports",
    ],
    flow: ["A lead fills in a form", "A contact and a deal are created", "The owner gets a task and an alert", "Progress appears on the pipeline report"],
    tools: [
      { name: "HubSpot", slug: "hubspot" },
      { name: "Google Sheets", slug: "googlesheets" },
      { name: "Slack", slug: "slack" },
      { name: "Gmail", slug: "gmail" },
      { name: "Salesforce" },
      { name: "Pipedrive" },
    ],
    outcome: "No lead gets lost between the website and the sales team.",
    service: { label: "APIs and integrations", href: "/services/apis-integrations" },
  },
  {
    slug: "support",
    title: "Helpdesk and support",
    tag: "Helpdesk",
    short: "Tickets, chat and AI assistants with human handoff.",
    icon: "headset",
    tone: "navy",
    intro:
      "Customers expect quick answers. We connect your chat, email and helpdesk so every question becomes a tracked ticket, and add AI assistants that answer the simple ones and pass the rest to a person.",
    builds: [
      "Website chat connected to your helpdesk",
      "Ticket routing by topic and priority",
      "An AI assistant that answers from your own content",
      "Handoff to a person with the full conversation",
    ],
    flow: ["A customer asks a question", "The assistant answers or opens a ticket", "The ticket reaches the right person", "The customer is kept updated until it is solved"],
    tools: [
      { name: "Slack", slug: "slack" },
      { name: "Notion", slug: "notion" },
      { name: "Gmail", slug: "gmail" },
      { name: "n8n", slug: "n8n" },
      { name: "Zendesk" },
      { name: "Intercom" },
    ],
    outcome: "Simple questions are answered at once, and complex ones reach the right person with the whole story.",
    service: { label: "Business automation & AI", href: "/services/ai-automation" },
  },
  {
    slug: "accounting",
    title: "Accounting and ERP links",
    tag: "Accounting",
    short: "Invoices, payments and stock synced with your tools.",
    icon: "receipt",
    tone: "amber",
    intro:
      "When sales, payments and stock live in different systems, someone ends up copying numbers between them. We connect them so invoices, payments and inventory stay in step and month-end gets calmer.",
    builds: [
      "Invoices created from orders and project milestones",
      "Payments matched to invoices",
      "Stock levels synced across sales channels",
      "Finance reports built from live data",
    ],
    flow: ["A sale or milestone is completed", "An invoice is created and sent", "The payment is matched when it arrives", "Reports update on their own"],
    tools: [
      { name: "Stripe", slug: "stripe" },
      { name: "Google Sheets", slug: "googlesheets" },
      { name: "Shopify", slug: "shopify" },
      { name: "QuickBooks" },
      { name: "Xero" },
      { name: "Odoo" },
    ],
    outcome: "Finance works from one set of numbers instead of three spreadsheets.",
    service: { label: "APIs and integrations", href: "/services/apis-integrations" },
  },
];

/** Solutions a tool (by integrations slug) is used in. */
export const solutionsForTool = (slug: string) => solutions.filter((s) => s.tools.some((t) => t.slug === slug));

/** How a connection is delivered, shared by every solution. */
export const deliverySteps = [
  { title: "Map the workflow", body: "We follow one real task from start to finish and agree what should happen at each step." },
  { title: "Agree access", body: "We list the accounts, permissions and data each tool needs, and nothing more." },
  { title: "Build and test", body: "We build the connection, then test it with real examples, including failures and edge cases." },
  { title: "Hand over and watch", body: "Your team gets a short guide and we keep an eye on the first weeks of live use." },
];
