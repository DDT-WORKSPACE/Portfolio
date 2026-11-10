"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { work } from "@/content/work";
import { headings } from "@/content/site";
import { Heading, RoundArrow, TextLink } from "../ui";
type Cover = { src: string; width: number; height: number; alt: string };
export function ProjectArt({
  cover,
  index = 0,
  large = false,
}: {
  cover: Cover;
  index?: number;
  large?: boolean;
}) {
  return (
    <div className={`project-art has-cover project-color-${index % 3}`}>
      <Image
        src={cover.src}
        width={cover.width}
        height={cover.height}
        alt={cover.alt}
        className="work-cover"
        sizes={
          large
            ? "(max-width: 767px) calc(100vw - 48px), 50vw"
            : "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 50vw, 25vw"
        }
        loading="lazy"
      />
    </div>
  );
}
export function Work({ filterable = false }: { filterable?: boolean }) {
  const [filter, setFilter] = useState("All work");
  const available = filterable ? work : work.slice(0, 6);
  const list =
    filter === "All work"
      ? available
      : available.filter((w) => w.industry === filter);
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <div className="heading-split">
          <Heading {...headings.work} />
          {!filterable && <TextLink href="/work">Explore our work</TextLink>}
        </div>
        {filterable && (
          <div className="filter-chips" aria-label="Filter case studies">
            {["All work", ...new Set(work.map((w) => w.industry))].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}
        <div className="work-grid">
          {list.map((w, i) => (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              className={`work-card ${i < 2 ? "large" : ""}`}
            >
              <ProjectArt cover={w.cover} index={i} large={i < 2} />
              <div className="work-meta">
                <span>{w.industry}</span>
                <span>{w.projectName}</span>
              </div>
              <div className="work-title">
                <h3>{w.title}</h3>
                <RoundArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
