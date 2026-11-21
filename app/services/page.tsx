import type { Metadata } from "next";
import {
  EditorialContent,
  EditorialSection,
} from "@/components/editorial-detail";
import { InnerHero, ServiceList } from "@/components/inner";
import { Contact } from "@/components/sections/contact";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Explore DevsDen Tech’s services across product design, web and mobile development, automation, and ongoing support.",
};

const groups = [
  {
    id: "product-design",
    label: "Product and design",
    intro:
      "Define what to ship and test how it works before committing to a full build.",
    slugs: ["ui-ux-design", "mvp-product"],
  },
  {
    id: "platforms-and-apps",
    label: "Web, mobile and commerce",
    intro: "Build the sites, apps and stores your customers use.",
    slugs: ["web-development", "mobile-apps", "e-commerce"],
  },
  {
    id: "automation-and-data",
    label: "Automation and data",
    intro:
      "Connect your systems, reduce manual handoffs and make reporting easier to trust.",
    slugs: ["ai-automation", "apis-integrations", "data-analytics"],
  },
  {
    id: "reliability-and-support",
    label: "Cloud, testing and support",
    intro:
      "Prepare for release, monitor what is live and plan how it will improve.",
    slugs: ["cloud-devops", "security-qa", "support-scaling"],
  },
];

export default function Services() {
  return (
    <>
      <InnerHero
        marker="Services"
        title="Design, build and connect your products"
        body="Choose a service by what your team needs to do next, from defining a first release to supporting a live product."
      />
      <div className="ed-page services-catalog">
        <EditorialContent anchors={groups}>
          {groups.map((group) => (
            <EditorialSection key={group.id} id={group.id} title={group.label}>
              <p>{group.intro}</p>
              <ServiceList
                items={group.slugs.map((slug) =>
                  services.find((service) => service.slug === slug)!,
                )}
              />
            </EditorialSection>
          ))}
        </EditorialContent>
      </div>
      <Contact />
    </>
  );
}
