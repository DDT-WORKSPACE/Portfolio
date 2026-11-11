"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers, Cpu, Zap } from "lucide-react";
import { HeroStatement } from "@/components/studio-motion";
import { HeroGlaze, PortfolioMarquee } from "@/components/hero-glaze";
import {
  AboutBento,
  StudioApproach,
  StudioIntegrations,
} from "./studio-additions";
import { faqs } from "@/content/site";
import {
  AgencyDisciplines,
  AgencyProjects,
  AgencyServices,
  AgencyCTA,
} from "./agency-sections";
export function StudioHero() {
  return (
    <section className="st-hero st-dot-pattern" id="hero">
      <div className="st-ambient-glaze">
        <div className="st-glaze-blue" style={{ top: "-10%", left: "15%" }} />
        <div className="st-glaze-orange" style={{ top: "30%", right: "10%" }} />
      </div>

      <div className="st-hero-copy">
        <HeroStatement />
        <p className="st-hero-description">
          Websites, mobile apps and autonomous AI workflows. <br />
          Architected, designed, and deployed by one senior team.
        </p>
        <div className="st-hero-actions">
          <Link className="st-button" href="/contact">
            Let's build what's next <ArrowUpRight size={18} />
          </Link>
          <Link className="st-hero-work" href="#projects">
            Explore our work <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      <HeroGlaze />
      <div className="st-hero-bottom">
        <p className="hero-proof-label">
          The businesses and products behind our work
        </p>
        <PortfolioMarquee />
      </div>
    </section>
  );
}

export function StudioAbout() {
  return (
    <section className="st-section st-about-section" id="studio">
      <div className="st-container">
        <div className="st-section-header">
          <span className="st-badge">About DevsDen Tech</span>
          <h2>
            Your digital product.
            <br />
            Our shared craft.
          </h2>
          <p className="st-section-lead">
            A connected team of designers, developers and automation
            specialists. We make useful technology for the people using it.
          </p>
        </div>
        <AboutBento />
      </div>
    </section>
  );
}

export function StudioFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="st-section st-faq-section" id="faq">
      <div className="st-container">
        <div className="st-section-header">
          <div className="st-badge">
            <span className="st-badge-dot" />
            Frequently Asked
          </div>
          <h2>
            Answers to common <br />
            questions about working with us.
          </h2>
        </div>

        <div className="st-faq-accordion">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                className={`st-faq-item st-card-glaze ${isOpen ? "open" : ""}`}
                key={i}
              >
                <button
                  className="st-faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.question}</span>
                </button>
                {isOpen && (
                  <div className="st-faq-answer" id={`faq-answer-${i}`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StudioHome() {
  return (
    <div className="studio-home-light">
      <StudioHero />
      <StudioAbout />
      <AgencyDisciplines />
      <AgencyProjects />
      <AgencyServices />
      <StudioIntegrations />
      <StudioApproach />
      <StudioFAQ />
      <AgencyCTA />
    </div>
  );
}
