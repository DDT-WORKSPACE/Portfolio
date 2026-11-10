"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { experience } from "@/content/experience";
import { Marker } from "../ui";
export function Testimonials() {
  const [active, setActive] = useState(0);
  const s = experience.stories[active];
  return (
    <section className="section testimonial-section stories-v2">
      <div className="container">
        <div className="heading-split">
          <div className="section-heading">
            <Marker>in their words</Marker>
            <h2>
              The idea,
              <br />
              in a few words.
            </h2>
          </div>
          <p className="stories-intro">
            The words behind the products.
            <br />A closer look at two projects in the portfolio.
          </p>
        </div>
        <div className="project-story" key={s.slug}>
          <div className="project-story-copy">
            <span className="story-category">{s.category}</span>
            <Quote className="story-quote-icon" size={36} strokeWidth={1} />
            <blockquote>“{s.quote}”</blockquote>
            <img
              className="story-wordmark"
              src={s.logo}
              width={220}
              height={64}
              alt={s.name}
              loading="lazy"
            />
            <p>{s.context}</p>
            <Link href={`/work/${s.slug}`} className="text-link">
              Inside {s.name}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <Link href={`/work/${s.slug}`} className="project-story-cover">
            <Image
              src={s.cover}
              width={1280}
              height={960}
              sizes="(max-width:767px) 100vw, 50vw"
              alt={`${s.name} supplied project presentation`}
            />
            <span className="story-cover-action">
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
        <div className="story-controls">
          <span>
            0{active + 1}
            <i />0{experience.stories.length}
          </span>
          <div>
            {experience.stories.map((p, i) => (
              <button
                key={p.slug}
                aria-label={`Read ${p.name} story`}
                aria-pressed={i === active}
                className={i === active ? "active" : ""}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <div>
            <button
              aria-label="Previous project story"
              onClick={() =>
                setActive(
                  (active + experience.stories.length - 1) %
                    experience.stories.length,
                )
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Next project story"
              onClick={() =>
                setActive((active + 1) % experience.stories.length)
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
