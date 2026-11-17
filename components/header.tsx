"use client";
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, ArrowUp } from "lucide-react";
import { useHeaderScroll } from "./providers";
import { services } from "@/content/services";
import { Glyph, type GlyphName } from "./home/glyph";
import { useStartProject } from "./start-project";

const serviceGlyph: Record<string, GlyphName> = {
  code: "web",
  phone: "phone",
  design: "design",
  spark: "network",
  cloud: "cloud",
  connect: "link",
  shield: "shield",
  support: "growth",
  rocket: "rocket",
  bag: "bag",
  chart: "chart",
};

export function Brand() {
  return (
    <span className="dd-brand">
      <img className="dd-th-brand" src="/Logo/logo.png" width={34} height={35} alt="" />
      <img className="dd-th-emerald" src="/Logo/logo-emerald.png" width={34} height={35} alt="" loading="lazy" />
      <span>
        DevsDen Tech
        <small>Design · Software · Automation</small>
      </span>
    </span>
  );
}

export function Header() {
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const { compact, hidden } = useHeaderScroll();
  const close = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [far, setFar] = useState(false);
  useEffect(() => {
    const onScroll = () => setFar(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMobile(false);
    setMenu(false);
  }, [path]);
  useEffect(() => {
    if (!mobile) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  const openedAt = useRef(0);
  const drop = useRef<HTMLDivElement>(null);
  const openMenu = () => {
    if (close.current) clearTimeout(close.current);
    if (!menu) openedAt.current = performance.now();
    setMenu(true);
  };
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => {
      if (drop.current && !drop.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menu]);
  const leaveMenu = () => {
    if (close.current) clearTimeout(close.current);
    close.current = setTimeout(() => setMenu(false), 160);
  };
  const { open: startProject } = useStartProject();
  const links: [string, string][] = [
    ["Work", "/work"],
    ["Industries", "/#industries"],
    ["Insights", "/blog"],
    ["About", "/about"],
  ];
  const active = (href: string) =>
    href === "/" ? path === "/" : href !== "/#industries" && path.startsWith(href);
  const servicesActive = path.startsWith("/services");

  // Sliding indicator under the active (or hovered) navigation item.
  const nav = useRef<HTMLElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false });
  const placeBar = useCallback((target?: HTMLElement | null) => {
    const root = nav.current;
    if (!root) return;
    const el = target ?? root.querySelector<HTMLElement>("[data-nav-item].is-active");
    if (!el) return setBar((b) => ({ ...b, on: false }));
    const r = el.getBoundingClientRect(),
      n = root.getBoundingClientRect();
    setBar({ x: r.left - n.left + 16, w: Math.max(12, r.width - 32), on: true });
  }, []);
  useLayoutEffect(() => {
    placeBar();
    const onResize = () => placeBar();
    addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => removeEventListener("resize", onResize);
  }, [path, placeBar]);
  return (
    <>
      <header
        className={`dd-header ${compact ? "is-solid" : ""} ${hidden && !mobile && !menu ? "is-hidden" : ""} ${mobile ? "is-open" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMobile(false);
            setMenu(false);
          }
        }}
      >
        <div className="dd-header-inner">
          <Link prefetch={false} href="/" aria-label="DevsDen Tech home" className="dd-header-brand">
            <Brand />
          </Link>
          <nav
            aria-label="Main navigation"
            className="dd-nav"
            ref={nav}
            onMouseOver={(e) => {
              const item = (e.target as HTMLElement).closest<HTMLElement>("[data-nav-item]");
              if (item) placeBar(item);
            }}
            onMouseLeave={() => placeBar()}
          >
            <span
              className={`dd-nav-bar ${bar.on ? "is-on" : ""}`}
              style={{ transform: `translateX(${bar.x}px)`, width: bar.w }}
              aria-hidden="true"
            />
            <Link prefetch={false} href="/" data-nav-item className={active("/") ? "is-active" : ""} aria-current={active("/") ? "page" : undefined}>
              Home
            </Link>
            <div className="dd-nav-drop" ref={drop} onMouseEnter={openMenu} onMouseLeave={leaveMenu}>
              <button
                type="button"
                aria-expanded={menu}
                aria-controls="dd-services-menu"
                data-nav-item
                className={servicesActive ? "is-active" : ""}
                onClick={(e) => {
                  // Keyboard toggles. A pointer click right after hover-open keeps it open.
                  if (e.detail === 0) return setMenu(!menu);
                  if (menu && performance.now() - openedAt.current > 450) setMenu(false);
                  else openMenu();
                }}
              >
                Services <ChevronDown size={14} />
              </button>
              <div
                id="dd-services-menu"
                className={`dd-mega ${menu ? "is-open" : ""}`}
                onFocus={openMenu}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) leaveMenu();
                }}
              >
                <div className="dd-mega-grid">
                  {services.map((s) => (
                    <Link prefetch={false} key={s.slug} href={`/services/${s.slug}`} onClick={() => setMenu(false)}>
                      <Glyph name={serviceGlyph[s.icon] ?? "web"} />
                      <span>
                        <strong>{s.name}</strong>
                        <small>{s.promise}</small>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="dd-mega-foot">
                  <span>Not sure where to start? We will help you scope it.</span>
                  <Link prefetch={false} href="/services" onClick={() => setMenu(false)}>
                    All services <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
            {links.map(([label, href]) => (
              <Link
                prefetch={false}
                key={label}
                href={href}
                data-nav-item
                className={active(href) ? "is-active" : ""}
                aria-current={active(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="dd-header-actions">
            <button type="button" className="dd-btn dd-btn-primary dd-btn-sm" onClick={startProject}>
              Start a project <ArrowUpRight size={15} />
            </button>
            <button
              className="dd-burger"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="dd-mobile-nav"
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobile && (
          <nav id="dd-mobile-nav" className="dd-mobile-nav" aria-label="Mobile navigation" data-lenis-prevent>
            {[["Home", "/"], ["Services", "/services"], ...links, ["Contact", "/contact"]].map(([label, href]) => (
              <Link prefetch={false} key={label} href={href} onClick={() => setMobile(false)}>
                {label}
                <ArrowUpRight size={19} />
              </Link>
            ))}
            <button
              type="button"
              className="dd-btn dd-btn-primary"
              onClick={() => {
                setMobile(false);
                startProject();
              }}
            >
              Start a project <ArrowUpRight size={16} />
            </button>
          </nav>
        )}
      </header>
      <a href="#top" className={`dd-to-top ${far ? "is-visible" : ""}`} aria-label="Back to top">
        <ArrowUp size={20} />
      </a>
    </>
  );
}
