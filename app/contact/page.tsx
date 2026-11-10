import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { InnerHero } from "@/components/inner";
export const metadata: Metadata = { title: "Let’s build together" };
export default function ContactPage() {
  return (
    <>
      <InnerHero
        marker="Contact"
        title="Your next chapter starts here"
        body="Tell us where you are, and where you want to go. We’ll work out the next step together."
        cta={false}
      />
      <Contact calendarUrl={process.env.CALENDAR_EMBED_URL ?? ""} />
    </>
  );
}
