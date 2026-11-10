"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { useHeaderScroll } from "./providers";
import { Brand, Button, Copy, Icon } from "./ui";
import { services } from "@/content/services";
import { work } from "@/content/work";
export function Header() {
  const [open, setOpen] = useState(false),
    [mobile, setMobile] = useState(false);
  const path = usePathname();
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleMenu = (value: boolean) => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => setOpen(value), value ? 80 : 120);
  };
  const { compact, hidden } = useHeaderScroll();
  useEffect(() => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    setOpen(false);
    setMobile(false);
    return () => {
      if (menuTimer.current) clearTimeout(menuTimer.current);
    };
  }, [path]);
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobile]);
  return (
    <header
      className={`header ${compact ? "compact" : ""} ${hidden && !open && !mobile ? "header-hidden" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          if (menuTimer.current) clearTimeout(menuTimer.current);
          setOpen(false);
          setMobile(false);
        }
      }}
    >
      <div className="header-inner">
        <Link prefetch={false} href="/" aria-label="Home">
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <div
            onMouseEnter={() => scheduleMenu(true)}
            onMouseLeave={() => scheduleMenu(false)}
          >
            <button
              className={`nav-service ${open ? "active" : ""}`}
              aria-expanded={open}
              aria-controls="services-menu"
              onClick={() => setOpen(!open)}
            >
              Services
              <ChevronDown size={13} />
            </button>
            {open && (
              <div id="services-menu" className="mega-menu">
                <div className="mega-grid">
                  {[
                    [
                      "Build",
                      services.slice(0, 2).concat(services.slice(8, 10)),
                    ],
                    ["AI and data", [services[3], services[10], services[5]]],
                    [
                      "Design, cloud and quality",
                      [services[2], services[4], services[6], services[7]],
                    ],
                  ].map(([label, list]) => (
                    <div key={label as string}>
                      <span className="menu-label">{label as string}</span>
                      {(list as typeof services).map((s) => (
                        <Link
                          prefetch={false}
                          href={`/services/${s.slug}`}
                          key={s.slug}
                        >
                          <strong>{s.name}</strong>
                          <small>{s.promise}</small>
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    prefetch={false}
                    className="menu-feature"
                    href={`/work/${work[0].slug}`}
                  >
                    <img
                      className="menu-feature-cover"
                      src={work[0].cover.src}
                      width={256}
                      height={171}
                      alt={work[0].cover.alt}
                      loading="lazy"
                    />
                    <small>Featured work</small>
                    <strong>{work[0].title}</strong>
                    <span>
                      Explore {work[0].projectName} <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </div>
                <Link prefetch={false} className="menu-all" href="/services">
                  Explore all services <ArrowUpRight size={16} />
                </Link>
              </div>
            )}
          </div>
          <Link prefetch={false} href="/work">
            Work
          </Link>
          <Link prefetch={false} href="/#industries">
            Industries
          </Link>
          <Link prefetch={false} href="/#process">
            Process
          </Link>
          <Link prefetch={false} href="/about">
            Company
          </Link>
        </nav>
        <div className="header-actions">
          <Link prefetch={false} href="/contact" className="contact-link">
            Contact
          </Link>
          <Button>Book a call</Button>
          <button
            aria-label={mobile ? "Close menu" : "Open menu"}
            className="mobile-toggle"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav
          className="mobile-menu"
          aria-label="Mobile navigation"
          data-lenis-prevent
        >
          <details>
            <summary>
              Services <ChevronDown size={20} />
            </summary>
            {services.map((s) => (
              <Link prefetch={false} key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </details>
          {[
            ["Work", "/work"],
            ["Industries", "/#industries"],
            ["Process", "/#process"],
            ["Company", "/about"],
            ["Contact", "/contact"],
          ].map(([t, h]) => (
            <Link
              prefetch={false}
              key={h}
              href={h}
              onClick={() => setMobile(false)}
            >
              {t}
              <ArrowUpRight />
            </Link>
          ))}
          <Button>Book a free strategy call</Button>
        </nav>
      )}
    </header>
  );
}
