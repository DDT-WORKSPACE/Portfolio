export const industryGuides: Record<
  string,
  {
    intro: string;
    context: string;
    work: { title: string; body: string }[];
    priorities: string;
    serviceSlugs: string[];
    type: string;
    project?: string;
  }
> = {
  fintech: {
    intro:
      "Web and mobile products that help people understand their records, balances and next steps.",
    context:
      "Financial screens have to do two jobs. A customer should be able to see what needs attention at a glance, then find the date, status or underlying record that explains it.",
    work: [
      {
        title: "Records and reminders",
        body: "Organize documents and due dates around the next action, with clear states for automatic and manual payments.",
      },
      {
        title: "Account and activity views",
        body: "Put balances, transaction history and the details of a selected item in one place so users can check an entry without losing their place.",
      },
      {
        title: "Data connections",
        body: "Agree which source owns each field, how often it updates and what the product shows when data is missing or delayed.",
      },
    ],
    priorities:
      "Start with the most important account or record journey. Review access rules, data freshness and how the interface handles a disputed or incomplete entry.",
    serviceSlugs: ["ui-ux-design", "apis-integrations", "security-qa"],
    type: "Web",
    project: "ffp-vault",
  },
  healthcare: {
    intro:
      "Patient-facing tools and staff workflows for intake, bookings and follow-up.",
    context:
      "A patient and a care coordinator need different views of the same appointment. The product should make the next step clear to both and keep sensitive information available only to the people who need it.",
    work: [
      {
        title: "Intake and appointments",
        body: "Collect information in stages, check availability and show patients what to bring or complete before a visit.",
      },
      {
        title: "Staff queues",
        body: "Give coordinators one place to review new requests, spot missing information and reassign exceptions.",
      },
      {
        title: "Approved information",
        body: "Make instructions searchable and easy to update, with staff review for messages that involve individual care decisions.",
      },
    ],
    priorities:
      "Map one visit from booking to follow-up. Agree on data access, retention and escalation with the people responsible for the service.",
    serviceSlugs: ["web-development", "ai-automation", "security-qa"],
    type: "Web",
  },
  "e-commerce-retail": {
    intro:
      "Storefronts, shopping apps and the connections that keep orders moving after checkout.",
    context:
      "A shop has to work for customers who arrive knowing what they want and customers who arrive to browse. Behind both journeys, catalog, stock and order information need to agree.",
    work: [
      {
        title: "Product discovery",
        body: "Combine search, categories, filters and collection pages around the way customers look for products.",
      },
      {
        title: "Checkout and order status",
        body: "Bring delivery options, payment and order updates into a sequence customers can follow.",
      },
      {
        title: "Catalog and fulfilment",
        body: "Connect product, stock and order systems with a clear plan for duplicates, failed updates and changes.",
      },
    ],
    priorities:
      "Walk through a real order before choosing a platform. Include out-of-stock products, payment failure, returns and who handles each exception.",
    serviceSlugs: ["e-commerce", "mobile-apps", "apis-integrations"],
    type: "Web",
    project: "gcl-storefront",
  },
  logistics: {
    intro:
      "Dispatch views, tracking tools and integrations that keep operators and customers informed.",
    context:
      "Operators need to know which deliveries are on track, which need attention and who owns the next action. A tracking view is only as useful as the events feeding it.",
    work: [
      {
        title: "Dispatch and exceptions",
        body: "Give operators a queue for active jobs, missed stops and changes, with an owner and next action on each item.",
      },
      {
        title: "Tracking and notifications",
        body: "Translate status events into useful updates for customers and staff, including delays and delivery attempts.",
      },
      {
        title: "System connections",
        body: "Join order, carrier and warehouse events with rules for late, repeated or conflicting updates.",
      },
    ],
    priorities:
      "Pick a shipment type and map it from order to confirmation. Use actual events and exceptions to decide what should trigger an alert.",
    serviceSlugs: ["apis-integrations", "ai-automation", "data-analytics"],
    type: "Web",
  },
  edtech: {
    intro:
      "Learning platforms that make lessons easy to find and progress easy to understand.",
    context:
      "Learners return after interruptions. From the first screen they should know where they left off, what is due and how to get help. Instructors need progress information they can act on.",
    work: [
      {
        title: "Course navigation",
        body: "Connect lesson sequences, resources and assessments so students can resume the next activity without searching.",
      },
      {
        title: "Content tools",
        body: "Give authors defined roles and a publishing flow for updating lessons and supporting materials.",
      },
      {
        title: "Progress and feedback",
        body: "Show completion and submission states clearly, and give instructors a view of learners who may need help.",
      },
    ],
    priorities:
      "Prototype one learning journey from enrolment to feedback. Review keyboard access, captions and how the experience works on a phone.",
    serviceSlugs: ["ui-ux-design", "web-development", "data-analytics"],
    type: "Web",
  },
  "saas-startups": {
    intro:
      "Early products, self-serve onboarding and the internal tools that support growth.",
    context:
      "A first release is easier to evaluate when it serves a specific user and gives them an action they can complete. That first useful task should guide what goes into the release.",
    work: [
      {
        title: "First release",
        body: "Prototype the core job, test it with representative users and agree what needs to work before launch.",
      },
      {
        title: "Onboarding and permissions",
        body: "Help users reach their first successful task and give account owners the right controls for team access.",
      },
      {
        title: "Product operations",
        body: "Set up events for key actions and connect support, billing or CRM when those tools become part of the workflow.",
      },
    ],
    priorities:
      "Identify who will use the first version, what they can finish with it and how you will tell whether it solves their problem.",
    serviceSlugs: ["mvp-product", "ui-ux-design", "ai-automation"],
    type: "Web",
    project: "talentbadger",
  },
};
