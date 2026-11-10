import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Geist_Mono,
} from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";
import "./experience.css";
import "./hero.css";
import "./refinements.css";
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
export const metadata: Metadata = {
  icons: { icon: "/Logo/logo.png", apple: "/Logo/logo.png" },
  title: {
    default: "One team from first idea to launch",
    template: "%s | DevsDen Tech",
  },
  description: site.description,
  robots:
    process.env.DRAFT_PREVIEW === "1" || site.name.includes("{{")
      ? { index: false, follow: false }
      : undefined,
  ...(process.env.SITE_URL
    ? { metadataBase: new URL(process.env.SITE_URL) }
    : {}),
  openGraph: {
    title: "One team from first idea to launch",
    description: site.description,
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const approved = !site.name.includes("{{");
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        {approved && process.env.SITE_URL && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: site.name,
                url: process.env.SITE_URL,
                description: site.description,
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_ANALYTICS_SRC && (
          <Script
            src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
            data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
