import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { Brand } from "./ui";
import { FooterEmail } from "./footer-email";
export function Footer() {
  return (
    <footer className="footer footer-compact footer-interactive">
      <div className="container">
        <div className="footer-compact-top">
          <div className="footer-invite-copy">
            <span className="footer-invite-label">
              <i /> Your next chapter
            </span>
            <h2>
              Have something in mind<span>?</span>
            </h2>
          </div>
          <Link href="/contact" className="footer-conversation">
            Let’s talk{" "}
            <span>
              <ArrowUpRight size={21} />
            </span>
          </Link>
        </div>
        <div className="footer-compact-grid">
          <div className="footer-compact-brand">
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
            <h3>Studio</h3>
            <Link href="/work">Our work</Link>
            <Link href="/about">About us</Link>
            <Link href="/#process">How we build</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav className="footer-compact-services" aria-label="Footer services">
            <h3>Expertise</h3>
            <div>
              <Link href="/services/web-development">Web development</Link>
              <Link href="/services/mobile-apps">Mobile apps</Link>
              <Link href="/services/ui-ux-design">Product design</Link>
              <Link href="/services/ai-automation">Business automation</Link>
              <Link href="/services/cloud-devops">Cloud & integrations</Link>
              <Link href="/services">
                All services <ArrowUpRight size={13} />
              </Link>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <a href="#top" className="footer-back">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
