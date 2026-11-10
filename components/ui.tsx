import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Smartphone,
  PenTool,
  Sparkles,
  Cloud,
  Workflow,
  ShieldCheck,
  Headphones,
  Rocket,
  ShoppingBag,
  ChartNoAxesCombined,
  Wallet,
  HeartPulse,
  Truck,
  BookOpen,
  Users,
  Layers3,
  Orbit,
} from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
export function Copy({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {children.split(/(\{\{.*?\}\})/g).map((part, i) =>
        part.startsWith("{{") ? (
          <span key={i} className="placeholder" title="Owner content required">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
export function Marker({ children }: { children: ReactNode }) {
  return (
    <p className="marker">
      <span aria-hidden="true">//</span> {children}
    </p>
  );
}
export function Button({
  children,
  href = "/contact",
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={`button ${secondary ? "secondary" : "primary"} ${className}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function RoundArrow({ label }: { label?: string }) {
  return (
    <span className="round-arrow" aria-label={label}>
      <ArrowUpRight size={19} />
    </span>
  );
}
const icons = {
  code: Code2,
  phone: Smartphone,
  design: PenTool,
  spark: Sparkles,
  cloud: Cloud,
  connect: Workflow,
  shield: ShieldCheck,
  support: Headphones,
  rocket: Rocket,
  bag: ShoppingBag,
  chart: ChartNoAxesCombined,
  wallet: Wallet,
  heart: HeartPulse,
  truck: Truck,
  book: BookOpen,
  people: Users,
  layers: Layers3,
  orbit: Orbit,
};
export function Icon({ name, size = 25 }: { name: string; size?: number }) {
  const I = icons[name as keyof typeof icons] ?? Code2;
  return <I size={size} strokeWidth={1.6} />;
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link prefetch={false} href={href} className="text-link">
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Heading({
  marker,
  title,
  body,
}: {
  marker?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      {marker && <Marker>{marker}</Marker>}
      <h2>
        <Copy>{title}</Copy>
      </h2>
      {body && (
        <p>
          <Copy>{body}</Copy>
        </p>
      )}
    </div>
  );
}
export function Brand({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand ${large ? "brand-large" : ""}`}>
      <img
        className="brand-mark"
        src="/Logo/logo.png"
        width={32}
        height={33}
        alt=""
      />
      <span className="brand-name">
        {site.name}
        <small>Software · Design · Automation</small>
      </span>
    </span>
  );
}
