import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeSwitch } from "@/components/theme";
import { themeScript } from "@/components/theme-script";
import { VisitorTracker } from "@/components/visitor-tracker";
import { mailReady } from "@/lib/mail";
import { site } from "@/content/site";
import "./globals.css";
import "./experience.css";
import "./refinements.css";
import "./studio.css";
import "./brand.css";
import "./theme-emerald.css";
import "./theme-emerald-overrides.css";
import "./theme-switch.css";
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  preload: true,
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
    default: "Websites, apps & business automation | DevsDen Tech",
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
    title: "Websites, apps & business automation | DevsDen Tech",
    description: site.description,
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const approved = !site.name.includes("{{");
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers mailReady={mailReady()}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ThemeSwitch />
          <VisitorTracker />
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
