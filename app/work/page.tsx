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
        title="A closer look at our work."
        body="Web platforms, mobile experiences and useful digital products. Explore the projects and the thinking behind them."
        cta={false}
      />
      <Work filterable />
      <Contact />
    </>
  );
}
