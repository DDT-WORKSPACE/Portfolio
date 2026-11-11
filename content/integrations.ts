export const integrations = [
  {
    slug: "slack",
    name: "Slack",
    color: "#6d417d",
    category: "Team communication",
    summary: "Keep your team informed when important work moves forward.",
    example:
      "A new qualified enquiry creates a message in the right team channel, with a link back to the customer record.",
    actions: [
      "Route alerts to the right channel",
      "Share context from your website or CRM",
      "Make approvals and follow-up easier",
    ],
    boundary:
      "Workspace permissions, channel access and notification rules are agreed before connecting.",
  },
  {
    slug: "notion",
    name: "Notion",
    color: "#1b2738",
    category: "Knowledge & operations",
    summary:
      "Connect structured project information with your team's workspace.",
    example:
      "An approved project brief becomes a structured workspace entry so the team can review the same source of information.",
    actions: [
      "Organize incoming project briefs",
      "Keep operational records in sync",
      "Link knowledge with everyday workflows",
    ],
    boundary:
      "Only selected pages or databases are connected. Ownership and editing permissions stay with your team.",
  },
  {
    slug: "stripe",
    name: "Stripe",
    color: "#635bff",
    category: "Payments & commerce",
    summary: "Bring payment events into your product and operations.",
    example:
      "A confirmed payment updates an order and starts the next step in fulfilment, with a clear record for your team.",
    actions: [
      "Connect checkout with your product",
      "Route payment and subscription events",
      "Keep order status understandable",
    ],
    boundary:
      "We define event verification, failure handling and testing with your account. Payment-provider fees and requirements remain separate.",
  },
  {
    slug: "shopify",
    name: "Shopify",
    color: "#56822e",
    category: "Commerce operations",
    summary: "Connect your storefront with the systems behind each order.",
    example:
      "A new store order updates the operations view and sends the relevant details to the team preparing it.",
    actions: [
      "Connect orders and product data",
      "Reduce repeated manual updates",
      "Coordinate fulfilment notifications",
    ],
    boundary:
      "Store access, available APIs, plan limits and the source of truth for each field are checked first.",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    color: "#d8542c",
    category: "Customer relationships",
    summary: "Give enquiries a clear route from your website to your CRM.",
    example:
      "A website enquiry becomes a contact and follow-up task, carrying the context the visitor already provided.",
    actions: [
      "Capture enquiries with useful context",
      "Route contacts and follow-up tasks",
      "Keep customer stages consistent",
    ],
    boundary:
      "We review account access, field mapping, duplicate handling and any subscription requirements before implementation.",
  },
  {
    slug: "googlesheets",
    name: "Google Sheets",
    color: "#18804b",
    category: "Data & reporting",
    summary: "Turn useful spreadsheet data into part of a connected workflow.",
    example:
      "A scheduled summary updates a shared operational sheet while exceptions are sent to a person for review.",
    actions: [
      "Connect structured operational data",
      "Create useful reporting handoffs",
      "Reduce repetitive copying between tools",
    ],
    boundary:
      "Sheet permissions, field structure, update direction and expected data volume are defined together.",
  },
  {
    slug: "gmail",
    name: "Gmail",
    color: "#c33932",
    category: "Email workflows",
    summary: "Connect the right email step without losing human control.",
    example:
      "A qualified request creates a reply draft with relevant context for a team member to review before sending.",
    actions: [
      "Prepare contextual reply drafts",
      "Route incoming requests",
      "Link email follow-up with your systems",
    ],
    boundary:
      "Mailbox authorization, data access and sending rules are explicit. Review steps are agreed before automated sending is enabled.",
  },
  {
    slug: "zapier",
    name: "Zapier",
    color: "#c64d05",
    category: "Workflow automation",
    summary:
      "Connect everyday business tools around a clear event and next action.",
    example:
      "A completed form starts a coordinated sequence across your CRM, project tracker and internal notifications.",
    actions: [
      "Connect event-driven workflows",
      "Transform and route useful fields",
      "Add clear checks and exception paths",
    ],
    boundary:
      "Connector support, task usage, third-party costs and error recovery are checked against the actual workflow.",
  },
  {
    slug: "n8n",
    name: "n8n",
    color: "#cf4164",
    category: "Custom workflows",
    summary: "Build connected workflows with room for custom logic and review.",
    example:
      "An incoming enquiry is normalized, checked and sent to the right customer record, with uncertain cases handed to a person.",
    actions: [
      "Connect APIs and webhooks",
      "Add custom routing and transformations",
      "Make exceptions visible to your team",
    ],
    boundary:
      "Hosting, credentials, retries, monitoring and human approval points are part of the agreed scope.",
  },
  {
    slug: "github",
    name: "GitHub",
    color: "#222b38",
    category: "Engineering delivery",
    summary: "Connect development events with a clearer release workflow.",
    example:
      "A reviewed change triggers the agreed checks and shares a preview or release update with the product team.",
    actions: [
      "Connect repository and delivery events",
      "Make review and release progress visible",
      "Keep handover information close to the work",
    ],
    boundary:
      "Repository access, environments, branch rules and deployment permissions remain explicit and under your ownership.",
  },
];
