import type { Metadata } from "next";
import { InnerHero } from "@/components/inner";
import { Insights } from "@/components/sections/editorial";
import { Contact } from "@/components/sections/contact";
export const metadata: Metadata = { title: "Insights and field notes" };
export default function Blog() {
  return (
    <>
      <InnerHero
        marker="Studio journal"
        title="A little thinking, out loud"
        body="Ideas, practical notes and perspectives from where design, engineering and AI meet."
        cta={false}
      />
      <Insights />
      <Contact />
    </>
  );
}
