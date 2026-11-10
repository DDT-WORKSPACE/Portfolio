import { Hero } from "@/components/sections/hero";
import { DeferredSequence } from "@/components/deferred-sequence";
import {
  HandoffFallback,
  ServicesFallback,
  ProcessFallback,
} from "@/components/sections/sequence-fallbacks";
import { Engagement } from "@/components/sections/engagement";
import { Industries } from "@/components/sections/industries";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import {
  ClientStrip,
  Results,
  Technology,
  Accelerators,
} from "@/components/sections/editorial";
import { FAQ } from "@/components/sections/faq";
import { Contact, MobileBooking } from "@/components/sections/contact";
export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <DeferredSequence kind="handoffs">
        <HandoffFallback />
      </DeferredSequence>
      <DeferredSequence kind="services">
        <ServicesFallback />
      </DeferredSequence>
      <DeferredSequence kind="process">
        <ProcessFallback />
      </DeferredSequence>
      <Engagement />
      <Industries />
      <Results />
      <Work />
      <Testimonials />
      <Technology />
      <Accelerators />
      <FAQ />
      <Contact />
      <MobileBooking />
    </>
  );
}
