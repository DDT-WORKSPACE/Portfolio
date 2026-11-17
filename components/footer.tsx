import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, Globe2, Clock3, MessageCircle } from "lucide-react";
import { site, industries } from "@/content/site";
import { Brand } from "./header";
import { FooterEmail } from "./footer-email";
import { StartProjectButton } from "./start-project";

export function Footer() {
  return (
    <footer className="dd-footer">
      <div className="dd-footer-glow" aria-hidden="true" />
      <div className="dd-container">
        <div className="dd-footer-cta">
          <div>
            <h2>
              Have an idea, a product or a process to improve?
            </h2>
            <p>Tell us what is happening today and what you want to change.</p>
          </div>
          <Link href="/contact" className="dd-btn dd-btn-primary">
            Let&apos;s talk <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="dd-footer-main">
          <div className="dd-footer-brand">
            <Link href="/" aria-label="DevsDen Tech home">
              <Brand />
            </Link>
            <p>
              Product design, software development and practical business automation. One connected team, from the
              first idea to everyday use.
            </p>
            <div className="dd-footer-actions">
              <Link href="/contact" className="dd-btn dd-btn-primary dd-btn-sm">
                <MessageCircle size={16} /> Contact us
              </Link>
              <StartProjectButton className="dd-btn dd-btn-ghost dd-btn-sm">
                Start a project <ArrowUpRight size={15} />
              </StartProjectButton>
            </div>
          </div>
          <nav aria-label="Footer company">
            <span>Company</span>
            <Link href="/about">About us</Link>
            <Link href="/work">Selected work</Link>
            <Link href="/blog">Insights</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav aria-label="Footer services">
            <span>Services</span>
            <Link href="/services/web-development">Web development</Link>
            <Link href="/services/mobile-apps">Mobile apps</Link>
            <Link href="/services/ui-ux-design">UI/UX design</Link>
            <Link href="/services/ai-automation">AI & automation</Link>
            <Link href="/services">All services</Link>
          </nav>
          <nav aria-label="Footer industries">
            <span>Industries</span>
            {industries.slice(0, 5).map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`}>
                {i.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="dd-footer-contact">
          <div>
            <span className="dd-footer-ico">
              <Mail size={18} />
            </span>
            <span>
              <small>Email</small>
              <FooterEmail />
            </span>
          </div>
          <div>
            <span className="dd-footer-ico">
              <Globe2 size={18} />
            </span>
            <span>
              <small>Where we work</small>
              <strong>{site.offices}</strong>
            </span>
          </div>
          <div>
            <span className="dd-footer-ico">
              <Clock3 size={18} />
            </span>
            <span>
              <small>Replies</small>
              <strong>Every enquiry starts with a conversation</strong>
            </span>
          </div>
        </div>

        <div className="dd-footer-bottom">
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
