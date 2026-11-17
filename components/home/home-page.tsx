"use client";
import { useRef } from "react";
import { HomeHero } from "./hero";
import {
  IntroShowcase,
  ServicesHub,
  StartBanner,
  Pillars,
  SelectedWork,
  Process,
  Ecosystem,
  Industries,
  Faq,
  PhotoCta,
  Insights,
} from "./sections";
import { useScrollMotion } from "./motion";

export function HomePage() {
  const scope = useRef<HTMLDivElement>(null);
  useScrollMotion(scope);
  return (
    <div className="dd dd-home" ref={scope}>
      <HomeHero />
      <IntroShowcase />
      <ServicesHub />
      <StartBanner />
      <Pillars />
      <SelectedWork />
      <Process />
      <Ecosystem />
      <Industries />
      <Faq />
      <PhotoCta />
      <Insights />
    </div>
  );
}
