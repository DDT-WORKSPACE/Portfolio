export const startingPoints = [
  {
    slug: "ai-agent-starter",
    name: "Reception & lead follow-up",
    description: "Turn a missed enquiry into a clear next conversation.",
    icon: "spark",
    problem:
      "Enquiries arrive through different channels. Details are copied between tools. Follow-ups depend on someone remembering the next step.",
    approach:
      "Map the enquiry flow, decide which information to capture and connect it to the right inbox, CRM or calendar. Add AI only where understanding the message makes the workflow more useful.",
    includes: [
      "An enquiry and qualification flow",
      "Routing to the right team or tool",
      "Appointment and follow-up steps",
      "Human handoff and failure handling",
    ],
    questions: [
      "Where do enquiries arrive today?",
      "Which questions can be answered consistently?",
      "Who should take over when the request needs judgement?",
    ],
    deliverable:
      "A scoped workflow, an agreed integration plan and a first automation to review against real examples.",
  },
  {
    slug: "document-search",
    name: "Search your business knowledge",
    description: "A clearer way for a team to find the answer and its source.",
    icon: "book",
    problem:
      "Useful information lives in documents, shared drives and people’s memory. Searching takes time, and a confident answer is not necessarily a sourced one.",
    approach:
      "Choose the documents and access rules first. Build a retrieval workflow that points back to relevant sources, handles missing information and gives the team a way to flag a poor answer.",
    includes: [
      "Document and access review",
      "Search and retrieval foundation",
      "Source references in answers",
      "A feedback and evaluation workflow",
    ],
    questions: [
      "Which sources should be included?",
      "Who is allowed to see each source?",
      "What should happen when the answer is not in the material?",
    ],
    deliverable:
      "A searchable knowledge workflow with a defined source set, access boundaries and review criteria.",
  },
  {
    slug: "mvp-launch",
    name: "A focused first product",
    description: "One useful journey, ready to learn from.",
    icon: "rocket",
    problem:
      "An early product idea can become a long feature list before the most important assumption has been tested.",
    approach:
      "Identify the first user and the task that matters. Shape a coherent release around that journey, review the design and plan the integrations and operational work needed to support it.",
    includes: [
      "A focused scope and user journey",
      "A reviewable visual direction",
      "Core product and integration planning",
      "Release and handover checklist",
    ],
    questions: [
      "Who needs this first?",
      "What is the smallest outcome worth delivering?",
      "How will we know what to improve after release?",
    ],
    deliverable:
      "A staged plan for a first release, with a clear scope and a practical way to review the working product.",
  },
  {
    slug: "commerce-launch",
    name: "A connected commerce workflow",
    description: "Bring the customer journey and the order workflow together.",
    icon: "bag",
    problem:
      "A storefront can look complete while product data, payments, stock updates and customer notifications still require disconnected manual work.",
    approach:
      "Map the journey from discovery to purchase and the operational steps that follow. Agree the platform, payment options and systems to connect before expanding the visual design.",
    includes: [
      "Catalog and customer journey review",
      "Storefront and checkout direction",
      "Order and notification workflow",
      "Integration and release plan",
    ],
    questions: [
      "Where does product information live?",
      "Which payment and fulfilment steps are essential?",
      "Which order updates should happen automatically?",
    ],
    deliverable:
      "A commerce scope that connects the customer experience to the work happening behind it.",
  },
];
