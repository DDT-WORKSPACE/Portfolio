"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useHeaderScroll } from "./providers";
import { Brand } from "./ui";
export function Header() {
  const [mobile, setMobile] = useState(false);
  const path = usePathname();
  const { compact, hidden } = useHeaderScroll();
  useEffect(() => {
    setMobile(false);
  }, [path]);
  useEffect(() => {
    if (!mobile) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  const links = [
    ["Services", path === "/" ? "#features" : "/#features"],
    ["Work", "/work"],
    ["Industries", "/#industries"],
    ["Company", "/about"],
  ];
  return (
    <header
      className={`header header-studio ${compact ? "compact" : ""} ${hidden && !mobile ? "header-hidden" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") setMobile(false);
      }}
    >
      <div className="header-inner">
        <Link prefetch={false} href="/" aria-label="Home">
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link prefetch={false} key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/contact" className="header-talk">
            Let's talk <ArrowUpRight size={15} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-navigation"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav
          id="mobile-navigation"
          className="mobile-menu"
          aria-label="Mobile navigation"
          data-lenis-prevent
        >
          {[...links, ["Contact", "/contact"]].map(([label, href]) => (
            <Link
              prefetch={false}
              key={label}
              href={href}
              onClick={() => setMobile(false)}
            >
              {label}
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
