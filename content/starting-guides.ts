export const startingGuides: Record<
  string,
  {
    type: string;
    steps: { name: string; body: string; outcome: string }[];
    answers: string[];
  }
> = {
  "ai-agent-starter": {
    type: "Automation",
    steps: [
      {
        name: "Map the enquiry",
        body: "Review where messages arrive, the questions asked most often and what the team needs before a useful conversation. Agree which requests should go directly to a person.",
        outcome:
          "A defined channel, qualification checklist and handoff owner.",
      },
      {
        name: "Connect the follow-up",
        body: "Connect the selected inbox, CRM or calendar. Set triggers for capturing details, suggesting a next step and preparing follow-up actions. Keep approval rules explicit.",
        outcome: "A reviewable workflow tested with representative enquiries.",
      },
      {
        name: "Test the exceptions",
        body: "Try incomplete messages, repeated enquiries and unavailable tools. Review how the system identifies uncertainty, records failures and routes exceptions back to the team.",
        outcome:
          "An operating guide, agreed boundaries and a first release checklist.",
      },
    ],
    answers: [
      "Start with the channels your team already receives enquiries through. We review their integration options and choose one manageable entry point for the first workflow.",
      "Use a reviewed set of business information, such as services, booking rules and common questions. The workflow should request clarification or hand off when that information is insufficient.",
      "Agree a named person or queue, the context they receive and the actions that require approval. Automation should make this handoff easier to operate.",
    ],
  },
  "document-search": {
    type: "AI",
    steps: [
      {
        name: "Choose the sources",
        body: "Identify the documents worth searching, who owns them and how access is managed. Remove outdated or duplicated material from the initial source set where practical.",
        outcome: "A bounded collection with agreed access and update rules.",
      },
      {
        name: "Build sourced answers",
        body: "Connect retrieval and a search interface. Show relevant source references, respect the agreed access boundaries and distinguish an answer from an unsupported assumption.",
        outcome: "A searchable prototype with traceable references.",
      },
      {
        name: "Evaluate usefulness",
        body: "Build a set of questions the team actually asks. Review missing information, irrelevant results and source freshness, then agree how to report and improve poor answers.",
        outcome:
          "A review set, feedback route and documented operating limits.",
      },
    ],
    answers: [
      "Choose a small, useful collection first: process documents, product guides or reviewed internal knowledge. More documents are not automatically more useful if their ownership and quality are unclear.",
      "The access design follows the sources and user roles. We review whether the connected tools can enforce the required permissions before deciding the first scope.",
      "The workflow should acknowledge that a supported answer is unavailable, show relevant material where useful and give the user a way to request help or flag a gap.",
    ],
  },
  "mvp-launch": {
    type: "Web",
    steps: [
      {
        name: "Choose the first journey",
        body: "Identify who needs the product, the task they need to complete and the assumption worth testing. Separate essential release work from features that can wait.",
        outcome:
          "A focused release brief with explicit priorities and exclusions.",
      },
      {
        name: "Make it reviewable",
        body: "Prototype the journey, resolve the important product decisions and build the core experience in working increments. Include the operational steps needed behind the screens.",
        outcome: "A concrete design direction and a working core journey.",
      },
      {
        name: "Release and learn",
        body: "Check the essential paths, prepare access and handover, and choose what to observe after release. Use real feedback to decide the next improvement instead of extending the wishlist automatically.",
        outcome: "A release checklist and a practical feedback plan.",
      },
    ],
    answers: [
      "Choose a specific audience and a recurring task before expanding to everyone the product might eventually serve. Existing customer conversations can help make that decision concrete.",
      "It is the smallest complete journey that delivers a useful result and tests an important assumption. The scope includes the supporting operations required for that journey to work.",
      "Agree what useful behavior looks like and how feedback will be collected. Review usage, questions and failures together before committing to the next release.",
    ],
  },
  "commerce-launch": {
    type: "Web",
    steps: [
      {
        name: "Map the store operations",
        body: "Review product information, pricing, stock, payment options and fulfillment. Identify which tools own each part and the customer journey the first release needs to support.",
        outcome: "A platform decision and a mapped catalog-to-order workflow.",
      },
      {
        name: "Connect the purchase",
        body: "Build the essential storefront and checkout direction, then connect order records and customer notifications. Review actual product examples and payment states.",
        outcome:
          "A reviewable purchase journey with clear integration boundaries.",
      },
      {
        name: "Prepare to operate",
        body: "Exercise failed payments, stock changes and order updates. Document the steps the store team owns and verify the information a customer receives after purchase.",
        outcome:
          "A release checklist and a documented order-handling workflow.",
      },
    ],
    answers: [
      "Identify a single source of truth for product data and stock where possible. We review its export or API options and define how updates reach the storefront.",
      "Select the payment and fulfillment options essential to your customers and operating region. Provider availability, account requirements and fees are confirmed during scoping.",
      "Typical candidates include confirmation, payment status and fulfillment notifications. Each update needs a reliable trigger and a clear owner when it cannot be completed automatically.",
    ],
  },
};
