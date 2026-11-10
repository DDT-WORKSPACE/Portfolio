import type { Metadata } from "next";
import { InnerHero } from "@/components/inner";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";
export const metadata: Metadata = { title: "Selected work" };
export default function WorkIndex() {
  return (
    <>
      <InnerHero
        marker="Our work"
        title="Ideas made real"
        body="Explore the outcomes, the decisions and the work along the way."
        cta={false}
      />
      <Work filterable />
      <Contact />
    </>
  );
}
