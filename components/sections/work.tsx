"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type PointerEvent } from "react";
import {
  ChevronDown,
  ChevronRight,
  Compass,
  LayoutGrid,
  PanelsTopLeft,
  Search,
  ShoppingBag,
  Sparkles,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { work } from "@/content/work";
import { caseStudies } from "@/content/case-studies";
import { EditorialContact } from "@/components/editorial-detail";

const allIndustries = "All industries";
const categories = [
  allIndustries,
  ...new Set(work.map((project) => project.industry)),
];
const categoryIcons: Record<string, LucideIcon> = {
  "SaaS and startups": PanelsTopLeft,
  "E-commerce and retail": ShoppingBag,
  Fintech: WalletCards,
  Travel: Compass,
  Lifestyle: Sparkles,
};
const platforms: Record<string, string> = {
  dashboard: "Web platforms",
  mobile: "Mobile apps",
  commerce: "Storefronts",
};

function tiltArtwork(event: PointerEvent<HTMLDivElement>) {
  if (
    event.pointerType !== "mouse" ||
    !matchMedia("(prefers-reduced-motion: no-preference)").matches
  )
    return;
  const frame = event.currentTarget;
  const bounds = frame.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  frame.style.setProperty("--tilt-x", `${(0.5 - y) * 11}deg`);
  frame.style.setProperty("--tilt-y", `${(x - 0.5) * 13}deg`);
  frame.style.setProperty("--light-x", `${x * 100}%`);
  frame.style.setProperty("--light-y", `${y * 100}%`);
}

function resetArtwork(event: PointerEvent<HTMLDivElement>) {
  const { style } = event.currentTarget;
  style.removeProperty("--tilt-x");
  style.removeProperty("--tilt-y");
  style.removeProperty("--light-x");
  style.removeProperty("--light-y");
}

function ProjectCard({
  project,
  featured,
  reversed,
  first,
}: {
  project: (typeof work)[number];
  featured: boolean;
  reversed: boolean;
  first: boolean;
}) {
  const study = caseStudies[project.slug];
  return (
    <article
      className={`archive-entry${featured ? " is-featured" : ""}${reversed ? " is-reversed" : ""}`}
    >
      <Link
        className="archive-project"
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.projectName} case study`}
      >
        <div
          className={`archive-cover is-${project.type}`}
          style={
            {
              "--art-ratio": `${project.cover.width} / ${project.cover.height}`,
            } as CSSProperties
          }
          onPointerMove={tiltArtwork}
          onPointerLeave={resetArtwork}
        >
          <div className="archive-art-drift">
            <div className="archive-art-frame">
              <Image
                {...project.cover}
                loading={first ? "eager" : "lazy"}
                sizes={
                  featured
                    ? "(max-width: 760px) 83vw, (max-width: 1200px) 55vw, 650px"
                    : "(max-width: 680px) 83vw, (max-width: 1200px) 42vw, 500px"
                }
              />
            </div>
          </div>
        </div>
        <div className="archive-copy">
          <p className="archive-meta">
            <span>{project.industry}</span>
            <span>{study.platform}</span>
          </p>
          <h2>{project.projectName}</h2>
          <p>{study.summary}</p>
          <span className="archive-read">Read case study</span>
        </div>
      </Link>
    </article>
  );
}

export function ProjectDirectory() {
  const [industry, setIndustry] = useState(allIndustries);
  const [platform, setPlatform] = useState("");
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const matching = work.filter((project) => {
    const study = caseStudies[project.slug];
    const type = platforms[project.type];
    const text = [
      project.projectName,
      project.industry,
      type,
      study.platform,
      study.summary,
      ...project.stack,
    ].join(" ");
    return (
      (!platform || project.type === platform) &&
      text.toLowerCase().includes(term)
    );
  });
  const list =
    industry === allIndustries
      ? matching
      : matching.filter((project) => project.industry === industry);

  function reset() {
    setIndustry(allIndustries);
    setPlatform("");
    setQuery("");
  }

  return (
    <section className="archive" id="work" aria-labelledby="archive-title">
      <header className="archive-header">
        <div className="dd-container">
          <nav className="ed-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Work</span>
          </nav>
          <div className="archive-intro">
            <h1 id="archive-title">All projects</h1>
            <p>
              Explore our web platforms, mobile apps and storefronts. Each case
              study walks through the brief and the design decisions behind the
              work.
            </p>
          </div>
        </div>
      </header>

      <div className="dd-container archive-layout">
        <div
          className="archive-filters"
          role="region"
          aria-label="Filter projects"
        >
          <div className="archive-controls">
            <div className="archive-search">
              <label htmlFor="project-search">Search projects</label>
              <div>
                <Search size={17} aria-hidden="true" />
                <input
                  id="project-search"
                  type="search"
                  placeholder="Name or topic"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="archive-select">
              <label htmlFor="project-platform">Project type</label>
              <div>
                <select
                  id="project-platform"
                  value={platform}
                  onChange={(event) => setPlatform(event.target.value)}
                >
                  <option value="">All types</option>
                  {Object.entries(platforms).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <fieldset className="archive-categories">
            <legend>Browse by industry</legend>
            <div>
              {categories.map((category) => {
                const Icon = categoryIcons[category] ?? LayoutGrid;
                const count =
                  category === allIndustries
                    ? matching.length
                    : matching.filter(
                        (project) => project.industry === category,
                      ).length;
                return (
                  <button
                    type="button"
                    key={category}
                    aria-pressed={industry === category}
                    onClick={() => setIndustry(category)}
                  >
                    <span className="archive-category-icon">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="archive-category-label">{category}</span>
                    <span className="archive-category-count">
                      {count}
                      <span className="sr-only">
                        {" "}
                        {count === 1 ? "project" : "projects"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="archive-results">
          <div className="archive-bar">
            <p role="status">
              {list.length} {list.length === 1 ? "project" : "projects"}
            </p>
            {(industry !== allIndustries || platform || query) && (
              <button type="button" onClick={reset}>
                Reset filters <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>
          {list.length ? (
            <div className="archive-grid">
              {list.map((project, index) => (
                <ProjectCard
                  project={project}
                  key={project.slug}
                  featured={list.length !== 2 && index % 5 === 0}
                  reversed={index % 10 === 5}
                  first={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="archive-empty">
              <h2>No matching projects</h2>
              <p>
                Try a different keyword or choose another industry or project
                type.
              </p>
              <button className="ed-button" type="button" onClick={reset}>
                Show all projects
              </button>
            </div>
          )}
          <EditorialContact
            title="Planning your own project?"
            text="Tell us what you are working on or what you want to improve."
          />
        </div>
      </div>
    </section>
  );
}
