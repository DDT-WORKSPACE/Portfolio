import type { Metadata } from "next";
import { InnerHero, ServiceGrid } from "@/components/inner";
import { Contact } from "@/components/sections/contact";
export const metadata: Metadata = {
  title: "Our services",
  description:
    "Eleven connected disciplines in design, engineering and AI. Explore what DevsDen Tech can build with you.",
};
export default function Services() {
  return (
    <>
      <InnerHero
        marker="Services"
        title="Everything you need to ship"
        body="One senior team across design, engineering and AI, so your product moves from first idea to launch without the handoffs."
      />
      <section className="section">
        <div className="container">
          <ServiceGrid />
        </div>
      </section>
      <Contact />
    </>
  );
}
