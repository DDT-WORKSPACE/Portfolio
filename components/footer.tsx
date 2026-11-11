import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Brand } from "./ui";
import { FooterEmail } from "./footer-email";
export function Footer() {
  return (
    <footer className="footer-next-studio">
      <div className="st-container">
        <div className="fns-top">
          <div>
            <span className="fns-label">
              <i /> DevsDen Tech
            </span>
            <h2>
              Built with care.
              <br />
              <span>Connected by design.</span>
            </h2>
          </div>
          <Link href="/contact" className="fns-contact">
            Let's talk <ArrowUpRight size={22} />
          </Link>
        </div>
        <div className="fns-main">
          <div className="fns-brand">
            <Link href="/" aria-label="DevsDen Tech home">
              <Brand />
            </Link>
            <p>
              Software, design and useful automation.
              <br />
              One connected team.
            </p>
            <FooterEmail />
          </div>
          <nav aria-label="Footer studio">
            <span>Studio</span>
            <Link href="/work">Selected work</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav aria-label="Footer expertise">
            <span>Expertise</span>
            <Link href="/services/web-development">Web platforms</Link>
            <Link href="/services/mobile-apps">Mobile apps</Link>
            <Link href="/services/ui-ux-design">Product design</Link>
            <Link href="/services/ai-automation">AI & automation</Link>
            <Link href="/services">
              All services <ArrowUpRight size={12} />
            </Link>
          </nav>
        </div>
        <div className="fns-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <a href="#top">
              Back to top <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
