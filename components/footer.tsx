import Link from "next/link";
import { ArrowUp, ArrowUpRight, MessageCircle, MapPin, Clock3 } from "lucide-react";
import { site } from "@/content/site";
import { Brand } from "./header";
import { FooterEmail } from "./footer-email";
import { StartProjectButton } from "./start-project";
import { FooterOrbit } from "./footer-orbit";

const quick: [string, string][] = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Selected work", "/work"],
  ["Insights", "/blog"],
  ["Services", "/services"],
  ["Solutions", "/integrations"],
  ["Contact", "/contact"],
  ["Privacy policy", "/legal/privacy"],
];
const serviceLinks: [string, string][] = [
  ["Web development", "/services/web-development"],
  ["Mobile apps", "/services/mobile-apps"],
  ["UI/UX design", "/services/ui-ux-design"],
  ["AI & automation", "/services/ai-automation"],
  ["E-commerce", "/services/e-commerce"],
];

export function Footer() {
  return (
    <footer className="dd-footer">
      <FooterOrbit />

      <div className="dd-container dd-foot-wrap">
        {/* Let's build something great */}
        <section className="dd-foot-cta" aria-labelledby="dd-foot-cta-title">
          <div className="dd-foot-cta-card">
            <span className="dd-foot-cta-ring is-a" aria-hidden="true" />
            <span className="dd-foot-cta-ring is-b" aria-hidden="true" />
            <div className="dd-foot-cta-copy">
              <small>Let&apos;s build something great</small>
              <h2 id="dd-foot-cta-title">Ready to start your next project?</h2>
              <div className="dd-foot-cta-actions">
                <StartProjectButton className="dd-btn dd-btn-dark">
                  Start a project <ArrowUpRight size={16} />
                </StartProjectButton>
                <Link href="/contact" className="dd-btn dd-btn-glass">
                  <MessageCircle size={16} /> Contact us
                </Link>
              </div>
            </div>
            <div className="dd-foot-avail">
              <span className="dd-foot-avail-tag">
                <i aria-hidden="true" /> Available for new projects
              </span>
              <div className="dd-foot-avail-people" aria-hidden="true">
                <span className="dd-foot-avail-logo">
                  <img className="dd-th-brand" src="/Logo/logo.png" width={26} height={27} alt="" />
                  <img className="dd-th-emerald" src="/Logo/logo-emerald.png" width={26} height={27} alt="" loading="lazy" />
                </span>
                <b>+</b>
                <span className="dd-foot-avail-you">You</span>
              </div>
              <strong>Quick 15-minute call</strong>
              <p>Tell us the idea. We will shape the first step together.</p>
              <Link href="/contact" className="dd-btn dd-btn-primary dd-btn-sm">
                Book a free call
              </Link>
              <span className="dd-foot-cursor" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M4 3l15 7-6.5 2L10 19z" fill="currentColor" />
                </svg>
                <em>DevsDen</em>
              </span>
            </div>
          </div>
        </section>

        <div className="dd-foot-main">
          <div className="dd-foot-brand">
            <Link href="/" aria-label="DevsDen Tech home">
              <Brand />
            </Link>
            <p>Design, software and automation that move your business forward.</p>
            <div className="dd-foot-brand-actions">
              <Link href="/contact" className="dd-btn dd-btn-primary dd-btn-sm">
                <MessageCircle size={15} /> Contact us
              </Link>
              <StartProjectButton className="dd-btn dd-btn-outline dd-btn-sm">
                Start a project <ArrowUpRight size={15} />
              </StartProjectButton>
            </div>
          </div>
          <nav aria-label="Quick links" className="dd-foot-col">
            <span>Quick links</span>
            <div className="dd-foot-links is-two">
              {quick.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Services" className="dd-foot-col">
            <span>Services</span>
            <div className="dd-foot-links">
              {serviceLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="dd-foot-col">
            <span>Get in touch</span>
            <div className="dd-foot-contact">
              <FooterEmail />
              <p>
                <MapPin size={15} /> {site.offices}
              </p>
              <p>
                <Clock3 size={15} /> Every enquiry starts with a conversation
              </p>
            </div>
          </div>
        </div>

        <div className="dd-foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div>
            <Link href="/legal/privacy">Privacy policy</Link>
            <Link href="/legal/terms">Terms of service</Link>
            <a href="#top">
              Back to top <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
