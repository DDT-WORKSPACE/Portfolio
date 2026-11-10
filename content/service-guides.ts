export type ServiceGuide = {
  intro: string;
  fit: string[];
  example: string;
  details: [string, string, string];
  phases: [string, string, string];
  faqs: { question: string; answer: string }[];
  enquiryType: string;
};
export const serviceGuides: Record<string, ServiceGuide> = {
  "web-development": {
    intro:
      "Your website should make the next action clear, and your web application should make everyday work easier. We connect content, interface design and engineering around the journeys that matter, with a structure your team can maintain after release.",
    fit: [
      "A new company or product website",
      "A customer portal or internal web application",
      "An existing site that needs a stronger foundation",
    ],
    example:
      "A service business needs visitors to understand its offer, find relevant work and send a useful enquiry. We shape that complete journey, including content management and the handoff to the team receiving it.",
    details: [
      "Structure pages around the visitor’s task, with reusable content patterns and responsive layouts rather than disconnected one-off screens.",
      "Plan crawlable content, accessible navigation, image delivery and loading behavior as part of the build, then verify the important journeys.",
      "Create shared components and clear content-editing boundaries so future pages can follow the same design and technical conventions.",
    ],
    phases: [
      "Review the audience, existing content and conversion paths. Agree a sitemap, required integrations and the pages needed for a useful first release.",
      "Build reusable page patterns and connect the content or application data. Review working screens at realistic desktop and mobile sizes.",
      "Check navigation, forms, redirects and key user journeys. Prepare deployment, content handover and the next set of improvements.",
    ],
    faqs: [
      {
        question: "Can you improve an existing website?",
        answer:
          "Yes. We first review its framework, content, hosting and current limitations. The scope can be a focused improvement, a redesign on the existing foundation or a migration when that has a clear benefit.",
      },
      {
        question: "Will our team be able to edit content?",
        answer:
          "We can include a content management workflow. Together we decide which pages and fields your team should control, then document that workflow as part of handover.",
      },
    ],
    enquiryType: "Web",
  },
  "mobile-apps": {
    intro:
      "A useful mobile app handles the real conditions people use it in: smaller screens, interruptions, unreliable connections and different devices. We plan the core journey alongside permissions, data synchronization and the steps needed for release.",
    fit: [
      "A customer-facing iOS or Android app",
      "A mobile tool for a field or operations team",
      "An app that needs a more consistent experience",
    ],
    example:
      "A booking app needs more than a list of appointments. A coherent scope connects availability, confirmation, reminders and changes, with clear behavior when a connection drops or an appointment is no longer available.",
    details: [
      "Choose cross-platform or platform-specific development around device requirements, existing code and the experience your users need.",
      "Define permission requests, offline states, payment handoffs and notification behavior before they become last-minute release surprises.",
      "Prepare store assets and submission requirements, release environments and an update process under the accounts agreed for the project.",
    ],
    phases: [
      "Identify the essential mobile task, supported platforms and device features. Map screens, states and the backend connections required for the first version.",
      "Develop the journey in reviewable increments. Test on relevant device sizes and validate permissions, errors and synchronization behavior.",
      "Work through store readiness and release checks. Handover includes setup information and a clear way to collect issues for later updates.",
    ],
    faqs: [
      {
        question: "Do we need separate iOS and Android builds?",
        answer:
          "That depends on the product. A shared codebase can suit many apps; device-specific capabilities or existing native code may call for a different approach. We make that decision during discovery.",
      },
      {
        question: "Can you connect an app to our existing backend?",
        answer:
          "Yes, after reviewing the API, authentication, data contracts and access requirements. Any backend changes needed for the app become explicit parts of the scope.",
      },
    ],
    enquiryType: "Mobile",
  },
  "ui-ux-design": {
    intro:
      "Design starts with what a person is trying to do. We turn research, business constraints and content into journeys and interfaces your team can review before committing to a build, with clear decisions behind the visual direction.",
    fit: [
      "An early idea that needs a concrete direction",
      "A product with confusing or inconsistent journeys",
      "A growing interface that needs reusable patterns",
    ],
    example:
      "An onboarding flow can fail because the next step is unclear, the requested information is premature or errors are difficult to resolve. We examine the full sequence and prototype a clearer route to the first useful action.",
    details: [
      "Map the audience, tasks and current pain points. Use available research and stakeholder input to make assumptions visible and prioritize the right journey.",
      "Explore the structure and interaction before refining visuals. Link screens into a prototype that shows states and transitions worth discussing.",
      "Document component variants, layouts and behavior so engineering receives more than a set of polished screenshots.",
    ],
    phases: [
      "Review the product, audience and existing evidence. Agree the journeys, constraints and decisions the design work needs to resolve.",
      "Move from flows and structure into interface concepts. Review the prototype with stakeholders and include user feedback when the scope allows it.",
      "Refine states, responsive behavior and reusable components. Prepare design files and walk engineering through the decisions and remaining questions.",
    ],
    faqs: [
      {
        question: "Can you work with an existing brand or design system?",
        answer:
          "Yes. We review existing assets, components and constraints first, reuse what works and identify any gaps that need to be addressed for the new experience.",
      },
      {
        question: "Does design include development?",
        answer:
          "Design can be a standalone engagement or part of a connected build. The agreement makes clear whether the output is a prototype and design handover, production code or both.",
      },
    ],
    enquiryType: "Design",
  },
  "ai-automation": {
    intro:
      "The starting point is the business bottleneck, not an AI feature. We map the manual work, connect the tools involved and add interpretation where it helps, with explicit rules for approvals, exceptions and human takeover.",
    fit: [
      "Missed enquiries or inconsistent reception",
      "Sales follow-ups spread across inboxes and spreadsheets",
      "Repeated operational work between existing tools",
    ],
    example:
      "An incoming enquiry can be captured, checked for essential information, added to a CRM and routed to the right person. The automation can prepare a response or appointment step while unfamiliar or sensitive requests go to a human.",
    details: [
      "Collect relevant details, answer agreed questions and route appointments or enquiries without hiding where a person needs to take over.",
      "Connect CRM records, follow-up reminders and operational updates with explicit triggers, ownership and duplicate handling.",
      "Define source boundaries, logging and review criteria. Use AI for interpretation where justified, and deterministic rules where the workflow needs certainty.",
    ],
    phases: [
      "Walk through the current workflow with its owner. Identify repeated work, failure points, available tools and the outcome worth automating first.",
      "Connect a bounded workflow and test it against representative examples. Review ambiguous inputs, failed integrations and the human handoff.",
      "Agree approval rules and monitoring. Release the workflow with an owner, clear operating instructions and a way to refine it from actual use.",
    ],
    faqs: [
      {
        question: "Can automation work with the tools we already use?",
        answer:
          "Often, yes. We review available APIs, permissions, webhooks and data formats first. Integration gaps and third-party subscription requirements are identified before committing to the workflow.",
      },
      {
        question: "Will AI make every decision automatically?",
        answer:
          "No. We agree which actions can run automatically, which need approval and which should always go to a person. A useful system should have clear limits and visible failures.",
      },
    ],
    enquiryType: "Automation",
  },
  "cloud-devops": {
    intro:
      "Reliable delivery needs a repeatable path from code to a running service. We organize environments, deployment and visibility around your application, with access and ownership your team can understand.",
    fit: [
      "A product moving beyond ad-hoc deployments",
      "A cloud migration or environment review",
      "A team needing better monitoring and release controls",
    ],
    example:
      "A team currently deploys changes manually and discovers failures through customer messages. A focused improvement can introduce a tested deployment pipeline, separate environments and alerts that identify who should respond.",
    details: [
      "Review runtime requirements, existing workloads and data movement before choosing services or planning a migration sequence.",
      "Define environment configuration and repeatable deployment steps, with review gates and a documented rollback approach.",
      "Add signals for important application failures and resource usage. Decide who receives alerts and how infrastructure spending is reviewed.",
    ],
    phases: [
      "Audit environments, deployment steps, access and operational risks. Agree the migration or delivery goals and the ownership model.",
      "Implement configuration, deployment automation and necessary observability. Validate the release path in a non-production environment.",
      "Exercise deployment and rollback procedures. Document accounts, access, monitoring and routine maintenance responsibilities.",
    ],
    faqs: [
      {
        question: "Can infrastructure stay in our cloud account?",
        answer:
          "Yes. Access and account ownership should be agreed before work begins. We can work within your accounts with the permissions required for the project.",
      },
      {
        question: "Does this include ongoing incident response?",
        answer:
          "Ongoing operations and response coverage are separate scope decisions. We agree support hours, responsibilities and escalation expectations rather than assuming round-the-clock coverage.",
      },
    ],
    enquiryType: "Cloud",
  },
  "apis-integrations": {
    intro:
      "An integration is useful when the right information arrives in the right system and failures are visible. We define data ownership, authentication and recovery alongside the successful request, so your connected workflow is easier to operate.",
    fit: [
      "Manual copying between CRM, payments or operations tools",
      "A product that needs a reliable external API",
      "Disconnected systems with inconsistent data",
    ],
    example:
      "A paid order can trigger an internal record and customer notification. The integration must also handle repeated webhook delivery, invalid data and a temporary failure without creating duplicate orders.",
    details: [
      "Define clear requests, responses, authentication and error contracts, with documentation for the team consuming the API.",
      "Review the third-party systems, permissions and source of truth. Map data explicitly instead of relying on matching field names.",
      "Plan retries, deduplication, queue behavior and reconciliation so operators can recognize and recover from incomplete synchronization.",
    ],
    phases: [
      "Map systems, data contracts and access. Agree the source of truth, update frequency and behavior when a dependency is unavailable.",
      "Build the connection and exercise success, duplicate, timeout and invalid-data cases. Add visibility for failures that require action.",
      "Document credentials handling, endpoints and recovery steps. Release the workflow with a known owner and operational checks.",
    ],
    faqs: [
      {
        question: "What if a tool has no public API?",
        answer:
          "We review supported alternatives such as exports, approved connectors or a different workflow. We explain limitations before recommending an approach rather than assuming every system can be connected.",
      },
      {
        question: "Can you document an API for another development team?",
        answer:
          "Yes. The scope can include request and response examples, authentication instructions, error behavior and setup notes so another team can build against a clear contract.",
      },
    ],
    enquiryType: "Web",
  },
  "security-qa": {
    intro:
      "Quality work should concentrate on the journeys and risks that matter to the product. We combine exploratory review, repeatable checks and release criteria so a team can make better-informed decisions about shipping.",
    fit: [
      "An application approaching a significant release",
      "Important user journeys with recurring regressions",
      "A team building a more repeatable quality process",
    ],
    example:
      "A checkout journey needs checks for a successful payment, a rejected payment, an interrupted request and a repeated callback. The goal is to verify the behavior that affects customers and operations, not merely increase a test count.",
    details: [
      "Choose useful automated coverage and complement it with exploratory review of usability, errors and device behavior.",
      "Review agreed security boundaries and access paths within written authorization. Report observations with context and practical remediation steps.",
      "Make important checks repeatable in the delivery process and define which results should prevent a release.",
    ],
    phases: [
      "Agree the target systems, access, authorization and critical risks. Establish the test environment and release criteria.",
      "Review important journeys and implement selected repeatable checks. Record reproducible findings with their impact and supporting evidence.",
      "Retest agreed fixes and hand over the checks, findings and remaining risks so release decisions have a clear basis.",
    ],
    faqs: [
      {
        question: "Does testing guarantee there are no defects?",
        answer:
          "No. Testing provides evidence about the scope reviewed. We document the environment, coverage and limitations, including areas that were not assessed.",
      },
      {
        question: "Can you add checks to our existing pipeline?",
        answer:
          "Yes, after reviewing the repository, environments and current checks. We prioritize tests that protect meaningful behavior and can be maintained by the team.",
      },
    ],
    enquiryType: "Not sure yet",
  },
  "support-scaling": {
    intro:
      "After launch, a product needs a way to collect issues, prioritize improvements and release changes safely. We can join that rhythm with a defined backlog and responsibilities, while investigating the actual causes of reliability or performance problems.",
    fit: [
      "A live product needing an ongoing improvement rhythm",
      "A team dealing with repeated operational issues",
      "A growing application with measured capacity constraints",
    ],
    example:
      "A product becomes slow during its busiest workflow. We start with measurements and error evidence, identify the bottleneck and agree a focused change before introducing more infrastructure or a broad rewrite.",
    details: [
      "Define the roles, review rhythm and available scope. Keep requests in a visible backlog with clear priorities and ownership.",
      "Investigate concrete signals such as slow paths, failed requests and operational incidents before choosing a technical change.",
      "Break improvements into reviewable releases and keep documentation, dependencies and handover information current.",
    ],
    phases: [
      "Review the application, access, open issues and existing support arrangements. Agree priorities and response expectations.",
      "Work through the agreed backlog, investigate recurring issues and review changes in context with the product owner.",
      "Release and monitor improvements. Revisit priorities using operational evidence and adjust the next cycle of work.",
    ],
    faqs: [
      {
        question: "Can you support software built by another team?",
        answer:
          "Potentially. We begin with a review of the codebase, infrastructure, documentation and access before agreeing the responsibilities we can take on.",
      },
      {
        question: "Are support response times fixed?",
        answer:
          "They are defined in the engagement agreement. Coverage, severity levels, escalation paths and response expectations should be explicit for your product and team.",
      },
    ],
    enquiryType: "Not sure yet",
  },
  "mvp-product": {
    intro:
      "A first release should answer a real product question while delivering something useful. We help separate the essential journey from the wider wishlist and connect discovery, design and engineering around a scope you can review.",
    fit: [
      "An early idea needing a focused first scope",
      "A new product direction inside an existing business",
      "A team with too many features and unclear priorities",
    ],
    example:
      "A marketplace idea might begin with one clear route from a user’s request to a relevant match. Administrative support and manual steps can be intentional first-release choices when they help test the core experience.",
    details: [
      "Define the audience, problem and assumptions. Agree what the first release needs to show and which features can wait.",
      "Shape a complete core journey, including the operational work required behind the interface, instead of shipping disconnected features.",
      "Plan what to observe after launch and how the team will use feedback to decide the next improvement.",
    ],
    phases: [
      "Identify the first user, important task and product assumption. Prioritize the release around a useful outcome and explicit exclusions.",
      "Review a prototype, build the core journey and test the essential integrations and operational steps.",
      "Prepare the release and feedback loop. Handover includes the current product decisions and a prioritized view of what to investigate next.",
    ],
    faqs: [
      {
        question: "How do you decide what belongs in an MVP?",
        answer:
          "We consider the user’s essential task, the assumption being tested and the work needed to support that experience. A feature earns its place when it contributes directly to those goals.",
      },
      {
        question: "Can the first version grow into a larger product?",
        answer:
          "We plan a maintainable foundation for the agreed scope while avoiding speculative complexity. The roadmap and observed use then guide which parts should be extended.",
      },
    ],
    enquiryType: "Web",
  },
  "e-commerce": {
    intro:
      "A store is both a customer experience and an operational workflow. We connect catalog discovery, checkout and the work that follows an order, with clear treatment of product data, payments and customer updates.",
    fit: [
      "A new online store or a storefront redesign",
      "Disconnected stock, order or notification workflows",
      "A commerce experience needing more flexible interfaces",
    ],
    example:
      "A customer selects a product, pays and expects a useful order update. The scope needs to cover the storefront and the systems responsible for stock, payment status and fulfillment information.",
    details: [
      "Choose the storefront approach around catalog needs, content control, existing operations and the maintenance your team can support.",
      "Plan payment states and supported gateways, including cancellation, failure and confirmation behavior across the customer journey.",
      "Define which system owns catalog, inventory and orders, then connect updates and notifications with visible exception handling.",
    ],
    phases: [
      "Map the catalog, customer journey and order operations. Agree platform constraints, payment requirements and the source of product data.",
      "Build the storefront and essential connections. Review real catalog examples and exercise successful and unsuccessful order flows.",
      "Check shipping, stock, notifications and payment settings. Prepare the operating workflow and release handover for the store team.",
    ],
    faqs: [
      {
        question: "Can you work with Shopify or WooCommerce?",
        answer:
          "Yes. Platform choice depends on the existing store, catalog, integrations and control required. A custom or headless approach should have a specific practical benefit.",
      },
      {
        question: "Are payment and platform subscriptions included?",
        answer:
          "Third-party fees and account requirements are identified during scoping. Ownership, billing and the services included in the engagement are agreed separately.",
      },
    ],
    enquiryType: "Web",
  },
  "data-analytics": {
    intro:
      "A useful reporting system starts with clear definitions and reliable inputs. We connect business questions to data sources, transformations and reports, making the meaning and limitations of the numbers easier to understand.",
    fit: [
      "Reports assembled manually from several systems",
      "Teams working from conflicting metric definitions",
      "A business needing a clearer operational dashboard",
    ],
    example:
      "A sales report can disagree with finance because records use different dates, statuses or definitions. We trace the sources and definitions before building a dashboard that makes those choices explicit.",
    details: [
      "Identify data sources, refresh requirements and transformation rules. Add validation for missing, repeated or unexpected records.",
      "Organize reports around decisions and agreed definitions, with appropriate filters, source context and visibility of freshness.",
      "Evaluate whether enough suitable data exists before proposing a model. Compare against a practical baseline and document uncertainty and review needs.",
    ],
    phases: [
      "Agree the business questions, metric definitions, access and available source data. Review quality and refresh limitations.",
      "Build the required transformations and reporting views. Validate the outputs against representative source records with the business owner.",
      "Document definitions and operating steps. Release the reporting workflow with checks for refresh failures and a clear path for changes.",
    ],
    faqs: [
      {
        question: "Can you combine spreadsheets and existing business tools?",
        answer:
          "Yes, when the necessary access and export or integration options are available. We first establish consistent definitions and ownership so combined data remains interpretable.",
      },
      {
        question: "Do we need machine learning for better reporting?",
        answer:
          "Usually not as a starting point. Reliable inputs, clear definitions and useful reporting often address the immediate need. We consider modeling only when it answers a specific question and can be evaluated.",
      },
    ],
    enquiryType: "Data",
  },
};
