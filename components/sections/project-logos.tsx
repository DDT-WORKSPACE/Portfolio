"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectBrands } from "@/content/experience";
export function ProjectLogos() {
  const ref = useRef<HTMLElement>(null),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className="project-logo-section"
      aria-label="Projects from our portfolio"
    >
      <div className="container logo-strip-caption">
        <span>A few ideas we’ve helped bring to life.</span>
        <Link href="/work">
          Meet the projects
          <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="project-logo-window">
        <div
          className="project-logo-track"
          style={{ animationPlayState: visible ? "running" : "paused" }}
        >
          {[0, 1].map((n) => (
            <div className="project-logo-group" key={n} aria-hidden={n === 1}>
              {projectBrands.map((b) => (
                <Link
                  href={`/work/${b.slug}`}
                  key={b.slug}
                  className={`project-logo-cell brand-${b.slug}`}
                  tabIndex={n === 1 ? -1 : 0}
                  aria-label={`Explore ${b.name}`}
                >
                  <img
                    src={b.logo}
                    width={b.width}
                    height={b.height}
                    alt=""
                    loading="lazy"
                  />
                  <span>{b.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
