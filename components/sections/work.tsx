"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
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
  if (filterable) return <ProjectDirectory />;
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

function ProjectDirectory() {
  const [industry, setIndustry] = useState("All projects");
  const [query, setQuery] = useState("");
  const categories = ["All projects", ...new Set(work.map((p) => p.industry))];
  const list = work.filter(
    (p) =>
      (industry === "All projects" || p.industry === industry) &&
      `${p.projectName} ${p.title} ${p.industry} ${p.stack.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const reset = () => {
    setIndustry("All projects");
    setQuery("");
  };
  return (
    <section className="project-directory" id="work">
      <div className="st-container">
        <div className="pd-toolbar">
          <div>
            <span className="pd-eyebrow">THE PORTFOLIO</span>
            <h2>Find your next point of inspiration.</h2>
          </div>
          <div className="pd-search">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="project-search">
              Search projects
            </label>
            <input
              id="project-search"
              type="search"
              placeholder="Search projects or industries"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label="Clear project search"
                onClick={() => setQuery("")}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
        <div
          className="pd-filters"
          role="group"
          aria-label="Filter projects by industry"
        >
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={industry === category}
              onClick={() => setIndustry(category)}
            >
              {category}
              <span>
                {category === "All projects"
                  ? work.length
                  : work.filter((p) => p.industry === category).length}
              </span>
            </button>
          ))}
        </div>
        <div className="pd-results-bar">
          <p role="status" aria-live="polite">
            {list.length} {list.length === 1 ? "project" : "projects"}
            {industry !== "All projects" ? ` in ${industry}` : " to explore"}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
          {(industry !== "All projects" || query) && (
            <button onClick={reset}>
              Reset filters <X size={12} />
            </button>
          )}
        </div>
        <div className="pd-grid">
          {list.map((p) => (
            <Link
              className="pd-card work-card"
              href={`/work/${p.slug}`}
              key={p.slug}
            >
              <div className={`pd-cover pd-cover-${p.type}`}>
                <Image
                  src={p.cover.src}
                  width={p.cover.width}
                  height={p.cover.height}
                  alt={p.cover.alt}
                  sizes="(max-width:767px) 90vw, 45vw"
                />
                <span className="pd-view">
                  View project <ArrowUpRight size={15} />
                </span>
              </div>
              <div className="pd-card-body">
                <div className="pd-card-meta">
                  <span>{p.industry}</span>
                  <span>
                    {p.type === "mobile"
                      ? "Mobile experience"
                      : p.type === "commerce"
                        ? "E-commerce"
                        : "Web platform"}
                  </span>
                </div>
                <h3>
                  {p.projectName}
                  <ArrowUpRight size={21} />
                </h3>
                <p>{p.title}</p>
                <div className="pd-tags">
                  {p.stack.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && (
          <div className="pd-empty">
            <Search size={26} />
            <h3>No projects match that search.</h3>
            <p>Try a different project name, product type or industry.</p>
            <button onClick={reset}>
              Show all projects <ArrowUpRight size={16} />
            </button>
          </div>
        )}
        <div className="pd-next">
          <div>
            <span className="pd-eyebrow">YOUR NEXT PROJECT</span>
            <h2>Have a similar challenge?</h2>
            <p>Tell us what you would like to build or make easier.</p>
          </div>
          <Link href="/contact" className="ag-link">
            Let's talk <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
