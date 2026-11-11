export const servicePreviews: Record<
  string,
  { description: string; includes: [string, string]; scope: string }
> = {
  "web-development": {
    description:
      "We design and build websites, customer portals and web applications around the way your business works. Visitors get a clear journey; your team gets a product it can manage and keep improving.",
    includes: [
      "Responsive pages and reusable components",
      "Content, forms and agreed system connections",
    ],
    scope:
      "Content entry, migrations and ongoing maintenance are included when agreed in the project scope.",
  },
  "mobile-apps": {
    description:
      "We turn your core service into a practical iOS or Android experience. From the first screen to everyday use, we connect interface design, app development and release preparation.",
    includes: [
      "Mobile journeys, screens and app development",
      "Agreed device features, data sync and release support",
    ],
    scope:
      "Device support and offline features are scoped together. App-store approval remains with the platform.",
  },
  "ui-ux-design": {
    description:
      "We make complex products easier to understand and use. We map the important tasks, design clear screens and create prototypes so you can review the experience before development starts.",
    includes: [
      "User journeys and interactive prototypes",
      "Interface design and reusable Figma components",
    ],
    scope:
      "Research, testing and production development are agreed separately according to what your product needs.",
  },
  "ai-automation": {
    description:
      "We find repetitive work and connect the steps into a useful workflow. Enquiries, appointments, customer follow-ups and internal updates can move between your tools with less copying and chasing.",
    includes: [
      "Workflow mapping, integrations and practical AI",
      "Review points, exception handling and handover",
    ],
    scope:
      "We confirm tool access and limits first. Sensitive decisions keep the human review you agree with us.",
  },
  "cloud-devops": {
    description:
      "We create a clearer path from code to a running product. Your team gets organized environments, repeatable deployments and visibility into the parts that need attention.",
    includes: [
      "Cloud setup and deployment workflows",
      "Monitoring, environment guidance and documentation",
    ],
    scope:
      "Hosting costs, response coverage and availability targets are agreed explicitly; they are not assumed guarantees.",
  },
  "apis-integrations": {
    description:
      "We connect your website or app to the systems your business already uses. Information follows a defined route, so your team spends less time repeating updates across separate tools.",
    includes: [
      "API and webhook connections with field mapping",
      "Validation, retries and clear failure handling",
    ],
    scope:
      "Connections depend on available APIs, account permissions and third-party plan limits, which we check first.",
  },
  "security-qa": {
    description:
      "We test the journeys and access boundaries that matter to your product. The aim is to catch issues before release and give your team clear, actionable findings.",
    includes: [
      "Functional, device and regression checks",
      "Access review, issue reporting and release guidance",
    ],
    scope:
      "The review covers an agreed scope. Formal certification or specialist penetration testing requires a separate engagement.",
  },
  "support-scaling": {
    description:
      "We help keep an existing product useful after launch. Together we prioritize fixes, performance improvements and the next features, with a clear way to track progress.",
    includes: [
      "Agreed maintenance and improvement work",
      "A shared backlog and regular product reviews",
    ],
    scope:
      "Hours, response times and incident coverage are defined in the support plan; round-the-clock cover is not assumed.",
  },
  "mvp-product": {
    description:
      "We help turn an early idea into a focused first product. Instead of building every possible feature, we choose the essential journey and a release that gives you something useful to learn from.",
    includes: [
      "Product scope, priorities and a first-release plan",
      "Design, development and launch preparation",
    ],
    scope:
      "Timeline and budget depend on the agreed release. Market adoption and revenue are not promised outcomes.",
  },
  "e-commerce": {
    description:
      "We build clear shopping experiences, from finding a product to placing an order. Catalog structure, product pages and the checkout journey work together around your customers and operations.",
    includes: [
      "Storefront, product discovery and checkout setup",
      "Agreed payment, order and business-tool connections",
    ],
    scope:
      "Catalog migration, fulfilment work and provider fees are scoped separately. Sales results depend on more than the build.",
  },
  "data-analytics": {
    description:
      "We help your team turn scattered information into a clearer view of the business. We organize the relevant sources and create reporting that answers specific operational questions.",
    includes: [
      "Data connections and agreed reporting models",
      "Dashboards, useful metrics and documented definitions",
    ],
    scope:
      "Reporting depends on source quality and access. Forecasts are estimates, not guaranteed future results.",
  },
};
