export const site = {
  name: "DevsDen Tech",
  description:
    "One connected team for product design, software development and practical business automation—from understanding the problem to putting the solution to work.",
  hero: {
    label: "Better products. Less busywork.",
    title: "One team from first idea to launch",
    description:
      "Websites, apps and business automation. Built around the way your business actually works.",
    announcement: "Inside the Talent Badger marketplace",
    proof:
      "10 portfolio projects. 11 connected services. One shared direction.",
  },
  email: "devsdevtech@gmail.com",
  phone: "",
  whatsapp: "",
  offices: "Working together, wherever the project takes us.",
  reply:
    "Every enquiry starts with a conversation about your goals, scope and next steps.",
  clients: [
    "Talent Badger",
    "Renbite",
    "FFP Vault",
    "Elevator Video Pitch",
    "Walk Throughz",
    "BestTrip",
  ],
  stats: [
    { value: "10", label: "Portfolio projects" },
    { value: "11", label: "Connected services" },
    { value: "6", label: "Product disciplines" },
    { value: "4", label: "Stages to launch" },
  ],
  partners:
    "We choose platforms for the job, without claiming formal partner status.",
  team: "Product thinking, thoughtful design and dependable engineering belong in the same conversation. We bring those perspectives together around the work, with clear responsibilities and a shared direction.",
  story:
    "DevsDen Tech exists to close the gap between an idea and a useful working system. Sometimes that means a website or an app. Sometimes it means finding the manual work slowing a business down, then connecting its tools and automating the repetitive parts. The starting point is the same: understand what people need, make the next step clear, and build something the business can keep using.",
  legal: {
    privacy:
      "This website presents DevsDen Tech’s services and portfolio. You can browse without creating an account. A project enquiry asks for your name, email, project interests, budget and message so the studio can understand your request. Do not include passwords, payment information or confidential customer records. Enquiry delivery, newsletter signup, external analytics and calendar booking require configuration; an unavailable feature reports that it has not submitted your information. When booking with an external calendar provider, review that provider’s privacy information before continuing. Website hosting may process technical request information needed to deliver and secure the site. For a privacy request, use the contact method published by the studio when it is available.",
    terms:
      "The information on this website introduces DevsDen Tech’s capabilities and portfolio. Examples and illustrations are provided for discussion; they are not a guarantee of a particular business result. Browsing this website or sending an enquiry does not create a service engagement. Scope, deliverables, pricing, ownership, confidentiality, support and acceptance criteria must be agreed separately in a written project agreement. Third-party product names and marks belong to their respective owners. Portfolio images should not be interpreted as an endorsement of every service described on this site. Do not submit sensitive or confidential information before the appropriate arrangements are in place.",
  },
  newsletter: "",
  social: "",
} as const;
export const headings = {
  services: {
    marker: "services we provide",
    title: "Everything you need to ship",
    body: "Build a product, improve an existing platform, or automate the work behind the scenes. Bring the problem; we’ll work out the right combination of design, software and automation.",
  },
  handoffs: {
    marker: "less friction. more forward",
    title: "Clarity before complexity.",
    body: "A better product starts with a better understanding of the problem.",
  },
  process: {
    marker: "how we build",
    title: "Clear steps. Tangible work.",
    body: "Understand the problem. Shape the experience. Build, test and improve. A process you can follow—and work you can actually see.",
  },
  engagement: {
    marker: "built around you",
    title: "The right kind of help, at the right stage.",
  },
  industries: {
    marker: "where we make a difference",
    title: "Different industries. Different challenges.",
  },
  work: {
    marker: "selected work",
    title: "Good ideas. Real-world impact.",
    body: "A selection of product interfaces, apps and platforms from the portfolio. Explore the thinking behind each experience.",
  },
  testimonials: {
    marker: "in their words",
    title: "The idea, in a few words.",
  },
  accelerators: {
    marker: "a head start",
    title: "A practical place to begin.",
    body: "Start with a focused problem and a reusable foundation. Shape the first release around the workflow that matters most.",
  },
  insights: {
    marker: "notes from the studio",
    title: "Useful thinking for your next decision.",
    body: "Short, practical guides to scoping a product, choosing an automation opportunity and keeping a project moving.",
  },
  faq: { marker: "good questions", title: "Before we get started." },
  contact: {
    marker: "let’s make it real",
    title: "What would you like to make easier?",
    body: "A new product, a better customer experience, or a business process that takes too much time. Tell us what is happening today and what you want to change.",
  },
} as const;
export const roles = [
  "Strategy",
  "Design",
  "Engineering",
  "QA",
  "DevOps",
  "Data",
];
export const stages = [
  {
    name: "Discover",
    time: "Understand the business",
    title: "Start with the real problem.",
    body: "Map the people, the current workflow and the point where progress slows down. Agree what a useful first outcome looks like.",
    items: ["The problem", "The people", "The opportunity"],
  },
  {
    name: "Design",
    time: "Make the direction tangible",
    title: "See it before you build it.",
    body: "Turn the important decisions into flows and a concrete visual direction. Review the experience before committing to the full build.",
    items: ["User journeys", "A clear interface", "A reviewable direction"],
  },
  {
    name: "Build",
    time: "Turn decisions into software",
    title: "Working software, one step at a time.",
    body: "Implement the agreed experience in manageable increments. Connect the systems, test the important paths and keep progress visible.",
    items: ["Product engineering", "Connected systems", "Quality checks"],
  },
  {
    name: "Launch and grow",
    time: "Put it to work",
    title: "Launch with a way forward.",
    body: "Prepare the release, hand over the essentials and agree what to monitor. Use what happens next to guide the next improvement.",
    items: ["Release readiness", "A clear handover", "The next iteration"],
  },
];
export const models = [
  {
    name: "Team extension",
    question: "Have a team, but need another pair of hands?",
    body: "Bring design or engineering support into a project with an existing roadmap and way of working.",
    best: "An established team with a clear backlog.",
    shape: "Specialists matched to the work",
    start: "Align the role, availability and working rhythm.",
    icon: "people",
  },
  {
    name: "Dedicated squad",
    question: "Have a product that needs a focused team?",
    body: "Bring the disciplines together around a shared backlog, a clear product goal and a named point of contact.",
    best: "A product that needs steady, cross-functional attention.",
    shape: "Product, design, engineering and quality",
    start: "Define the first milestone and the people it needs.",
    icon: "layers",
  },
  {
    name: "End-to-end delivery",
    question: "Have a problem you want to hand over?",
    body: "Work through discovery, design, development and release with one delivery partner coordinating the moving parts.",
    best: "A new product or a business workflow ready for a rethink.",
    shape: "One team from scope to handover",
    start: "Map the outcome, boundaries and delivery plan.",
    icon: "orbit",
  },
];
export const industries = [
  {
    slug: "fintech",
    name: "Fintech",
    description: "Make complex money matters feel simple.",
    icon: "wallet",
    art: "/artwork/industry-phone.webp",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Give people more room to care.",
    icon: "heart",
    art: "/artwork/healthcare-v2.webp",
  },
  {
    slug: "e-commerce-retail",
    name: "E-commerce and retail",
    description: "Make the path from discovery to purchase feel easy.",
    icon: "bag",
    art: "/artwork/commerce-v2.webp",
  },
  {
    slug: "logistics",
    name: "Logistics",
    description: "Keep every moving part connected.",
    icon: "truck",
    art: "/artwork/logistics-v2.webp",
  },
  {
    slug: "edtech",
    name: "EdTech",
    description: "Make the next thing easier to learn.",
    icon: "book",
    art: "/artwork/education-v2.webp",
  },
  {
    slug: "saas-startups",
    name: "SaaS and startups",
    description: "Turn a promising idea into a useful product.",
    icon: "rocket",
    art: "/artwork/saas-v2.webp",
  },
];
export const faqs = [
  {
    question: "How do we get started?",
    answer:
      "Tell us what you want to change, who it affects and what is happening today. An existing product link, a rough workflow or a short written brief is enough to start. The next step is to clarify the scope, dependencies and a sensible first milestone before discussing a delivery schedule.",
  },
  {
    question: "Will we own the code and design files?",
    answer:
      "Ownership and handover should be explicit in the project agreement. We’ll identify the custom work, the design and source files to be handed over, and any third-party software or licences involved. Bring your ownership requirements into the first scope discussion so they can be included in the agreement.",
  },
  {
    question: "How do you price a project?",
    answer:
      "The right model depends on how clear the work is. A well-defined deliverable can be scoped as a project; an evolving product may suit ongoing capacity or milestones. We first discuss the outcome, complexity, integrations and constraints, then propose a structure with clear assumptions and review points.",
  },
  {
    question: "Can you work with our existing team or product?",
    answer:
      "Yes—team extension is one of the engagement models we offer. Start by sharing the product context, stack and backlog. We can then discuss the design or engineering responsibilities to cover, how access will work, and how decisions and progress will be communicated.",
  },
  {
    question: "What does business automation include?",
    answer:
      "It starts by finding repetitive work or a broken handoff. Examples include capturing and qualifying enquiries, reception and appointment workflows, sales follow-ups, CRM updates, order notifications and reporting. We map the workflow first, connect the relevant tools, and decide where AI is useful and where a simpler rule or a human review is better.",
  },
  {
    question: "How are security, confidentiality and time zones handled?",
    answer:
      "Discuss confidential material before sharing it. An NDA, access controls, data-handling requirements and security checks can be included in the scope. Working hours, meeting overlap, support expectations and communication channels should also be agreed before the engagement begins.",
  },
];
export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "n8n",
  "OpenAI",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Figma",
  "Playwright",
];
export const accelerators = [
  {
    slug: "ai-agent-starter",
    name: "Reception & lead follow-up",
    body: "Capture enquiries, route the right information and keep the next conversation from falling through the cracks.",
    time: "Enquiry → qualification → follow-up",
  },
  {
    slug: "document-search",
    name: "Search your business knowledge",
    body: "Give a team a clear way to find answers across its own documents, with sources and appropriate access.",
    time: "Documents → answers → sources",
  },
  {
    slug: "mvp-launch",
    name: "A focused first product",
    body: "Start with the core user journey, essential integrations and a release small enough to learn from.",
    time: "Scope → prototype → first release",
  },
  {
    slug: "commerce-launch",
    name: "A connected commerce workflow",
    body: "Bring the storefront, checkout and order workflow into one considered customer experience.",
    time: "Discover → purchase → fulfil",
  },
];
export const projectTypes = [
  "Web",
  "Mobile",
  "Automation",
  "AI",
  "Data",
  "Cloud",
  "Design",
  "Not sure yet",
];
export const budgets = [
  "Let’s figure it out",
  "Under $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k–$100k",
  "$100k+",
];
export const values = [
  {
    title: "Understand before adding.",
    body: "Map the problem and the people affected by it before choosing tools or writing a feature list.",
  },
  {
    title: "Keep the work visible.",
    body: "Make decisions concrete, review the actual experience and keep responsibilities clear.",
  },
  {
    title: "Leave room to keep building.",
    body: "Think about handover, maintainability and the next improvement from the beginning.",
  },
];
