import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui";
import { HeroMotion } from "../hero-motion";

export function Hero() {
  return (
    <section className="hero hero-v3 hero-v4" id="hero">
      <HeroMotion />
      <div className="hero-studio-art" aria-hidden="true">
        <div className="hero-alignment-frame">
          <i className="hero-edge-guide edge-guide-left" />
          <i className="hero-edge-guide edge-guide-right" />
          <svg className="hero-alignment-arc" viewBox="0 0 440 310">
            <path
              d="M0 286C210 286 355 166 440 0"
              fill="none"
              stroke="currentColor"
            />
          </svg>
        </div>
        <div className="hero-ribbon-sculpture">
          <span className="hero-piece city-base" />
          <span className="hero-piece city-upper" />
          <span className="hero-piece city-column" />
          <span className="hero-piece city-step" />
          <span className="hero-piece city-tile" />
        </div>
        <div className="hero-orbit-sculpture">
          <span className="hero-piece city-right-base" />
          <span className="hero-piece city-right-upper" />
          <span className="hero-piece city-right-crown" />
          <span className="hero-piece city-right-float" />
        </div>
        <svg
          className="hero-connection-line"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90H165Q205 90 225 68L255 35Q275 12 310 12H505M935 12H1120Q1150 12 1175 40L1205 73Q1220 90 1255 90H1440"
            fill="none"
            stroke="currentColor"
          />
          <circle cx="505" cy="12" r="3" fill="currentColor" />
          <circle cx="935" cy="12" r="3" fill="currentColor" />
          <path
            className="hero-curve-signal"
            d="M0 90H165Q205 90 225 68L255 35Q275 12 310 12H505M935 12H1120Q1150 12 1175 40L1205 73Q1220 90 1255 90H1440"
            fill="none"
          />
        </svg>
      </div>
      <div className="container hero-v3-inner">
        <div className="hero-v3-copy">
          <p className="hero-v3-eyebrow">
            <span className="hero-studio-sigil" aria-hidden="true">
              <i />
              <i />
            </span>
            {site.hero.label}
          </p>
          <h1>
            <span className="hero-headline-line">One team from</span>
            <span className="hero-headline-line">
              first idea to <span className="hero-launch-word">launch</span>
              <span className="period">.</span>
            </span>
          </h1>
          <p className="hero-v3-description">{site.hero.description}</p>
          <div className="hero-v3-buttons">
            <Button>Book a free strategy call</Button>
            <Link href="/work" className="hero-work-link" prefetch={false}>
              Explore our work
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-studio-foot">
          <Link
            className="hero-v3-announcement"
            href="/work/talentbadger"
            prefetch={false}
          >
            <span className="hero-announcement-mark">
              <img
                src="/brands/talentbadger-clean.webp"
                width={320}
                height={64}
                alt=""
              />
            </span>
            <span>{site.hero.announcement}</span>
            <ArrowRight size={17} />
          </Link>
          <p className="hero-v3-proof">{site.hero.proof}</p>
        </div>
      </div>
    </section>
  );
}
