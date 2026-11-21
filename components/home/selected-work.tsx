"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/content/case-studies";
import { work } from "@/content/work";

const selected = [
  { slug: "talentbadger", approach: 1 },
  { slug: "renbite", approach: 1 },
  { slug: "ffp-vault", approach: 0 },
  { slug: "besttrip", approach: 0 },
].map(({ slug, approach }) => ({
  project: work.find((entry) => entry.slug === slug)!,
  study: caseStudies[slug],
  decision: caseStudies[slug].approach[approach],
}));

const transitions = selected.length - 1;
const enterAt = 0.06;
const settleAt = 0.9;
const finalHold = 0.2;

export function SelectedWork() {
  const deck = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = deck.current;
    const pin = stage.current;
    if (!root || !pin) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add(
      "(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        root.dataset.stacked = "";
        const slides = gsap.utils.toArray<HTMLElement>(
          ".portfolio-slide",
          root,
        );
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: () => `top ${getComputedStyle(pin).top}`,
            end: () =>
              `+=${root.offsetHeight - pin.offsetHeight - innerHeight * finalHold}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
        let current = 0;
        setActive(current);
        setStacked(true);

        slides.slice(1).forEach((slide, index) => {
          const artwork = slide.querySelector(".portfolio-art");
          const start = index + enterAt;
          const duration = settleAt - enterAt;

          gsap.set(slide, { visibility: "hidden" });
          timeline.set(slide, { visibility: "visible" }, start);
          timeline.fromTo(
            slide,
            { x: () => (innerWidth + slide.offsetWidth) / 2 + 12 },
            { x: 0, duration, ease: "sine.inOut", immediateRender: false },
            start,
          );
          timeline.fromTo(
            artwork,
            { x: 24, y: 9, scale: 1.025 },
            {
              x: 0,
              y: 0,
              scale: 1,
              duration,
              ease: "power1.out",
              immediateRender: false,
            },
            start,
          );

          // Leave a visible edge on each card that has settled behind the foreground card.
          slides.slice(0, index + 1).forEach((previous, previousIndex) => {
            const depth = index + 1 - previousIndex;
            timeline.to(
              previous,
              {
                x: () => -depth * (innerWidth < 1140 ? 21 : 28),
                scale: 1 - depth * 0.014,
                duration: settleAt - 0.17,
                ease: "sine.inOut",
              },
              index + 0.17,
            );
          });
        });

        // Reserve the end of each step for reading the card before the next one enters.
        timeline.to(
          { progress: 0 },
          { progress: 1, duration: transitions, ease: "none" },
          0,
        );
        timeline.eventCallback("onUpdate", () => {
          const next = Math.min(
            transitions,
            Math.floor(timeline.time() + (1 - settleAt)),
          );
          if (current !== next) {
            current = next;
            setActive(next);
          }
        });

        return () => {
          delete root.dataset.stacked;
          setStacked(false);
        };
      },
    );

    return () => motion.revert();
  }, []);

  return (
    <section
      className="portfolio-section"
      id="work"
      aria-labelledby="selected-work-title"
    >
      <span id="projects" className="dd-anchor" />
      <div className="dd-container">
        <header className="portfolio-heading">
          <div>
            <span className="ed-label">Selected work</span>
            <h2 id="selected-work-title">Work from the studio</h2>
            <p>See how we approached the decisions behind each product.</p>
          </div>
          <Link className="dd-btn dd-btn-outline" href="/work">
            All projects
          </Link>
        </header>
        <div
          className="portfolio-deck"
          ref={deck}
          style={
            {
              "--portfolio-transitions": transitions,
              "--portfolio-hold": `${finalHold * 100}vh`,
            } as CSSProperties
          }
        >
          <div className="portfolio-stage" ref={stage}>
            <div className="portfolio-slides">
              {selected.map(({ project, study, decision }, index) => (
                <article
                  className="portfolio-slide"
                  key={project.slug}
                  inert={stacked && index !== active}
                >
                  <Link
                    className="portfolio-card"
                    href={`/work/${project.slug}`}
                    aria-label={`Read the ${project.projectName} case study`}
                  >
                    <div className="portfolio-copy">
                      <div className="portfolio-card-meta">
                        <span className="portfolio-index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span>{project.industry}</span>
                          <span>{study.platform}</span>
                        </div>
                      </div>
                      <div className="portfolio-overview">
                        <h3>{project.projectName}</h3>
                        <p>{study.summary}</p>
                      </div>
                      <div className="portfolio-decision">
                        <h4>{decision.title}</h4>
                        <p>{decision.body}</p>
                      </div>
                      <ul className="portfolio-focus" aria-label="Design focus">
                        {project.stack.slice(0, 2).map((focus) => (
                          <li key={focus}>{focus}</li>
                        ))}
                      </ul>
                      <span className="portfolio-link-label">
                        Read case study
                      </span>
                    </div>
                    <figure className="portfolio-image">
                      <div className="portfolio-art">
                        <Image
                          {...project.cover}
                          sizes="(max-width: 760px) 86vw, (max-width: 1310px) 51vw, 690px"
                        />
                      </div>
                    </figure>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
