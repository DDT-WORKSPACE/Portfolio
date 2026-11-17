import type { Metadata } from "next";
import Link from "next/link";
import { ThemedImage } from "@/components/themed-image";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Target,
  Search,
  Users,
  ShieldCheck,
  Milestone,
  Video,
  Sparkles,
  Globe2,
  LayoutDashboard,
  MonitorSmartphone,
  Route,
  Star,
  BookOpen,
  Map,
  ShoppingCart,
  CreditCard,
  Gift,
  Navigation,
  CalendarDays,
  BellRing,
  LockKeyhole,
  FolderOpen,
  Plane,
  Hotel,
  Stamp,
  Tag,
  ChartLine,
  Wallet,
  ListChecks,
  SlidersHorizontal,
  MapPin,
  Truck,
  Headphones,
  Layers3,
  Cpu,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { work } from "@/content/work";
import { caseStudies, type FeatureIcon } from "@/content/case-studies";
import { InnerHero } from "@/components/inner";
import { StartProjectButton } from "@/components/start-project";

const icons: Record<FeatureIcon, LucideIcon> = {
  search: Search,
  team: Users,
  shield: ShieldCheck,
  milestone: Milestone,
  video: Video,
  match: Sparkles,
  globe: Globe2,
  dashboard: LayoutDashboard,
  device: MonitorSmartphone,
  route: Route,
  star: Star,
  guide: BookOpen,
  map: Map,
  cart: ShoppingCart,
  card: CreditCard,
  gift: Gift,
  track: Navigation,
  calendar: CalendarDays,
  bell: BellRing,
  lock: LockKeyhole,
  folder: FolderOpen,
  plane: Plane,
  hotel: Hotel,
  visa: Stamp,
  tag: Tag,
  chart: ChartLine,
  wallet: Wallet,
  list: ListChecks,
  filter: SlidersHorizontal,
  pin: MapPin,
  truck: Truck,
  support: Headphones,
};

export const dynamicParams = false;
export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((w) => w.slug === slug);
  return { title: w ? `${w.projectName} case study` : "Case study", description: caseStudies[slug]?.summary };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = work.findIndex((w) => w.slug === slug);
  const c = caseStudies[slug];
  if (i < 0 || !c) notFound();
  const w = work[i];
  const next = work[(i + 1) % work.length];

  return (
    <div className="dd dd-case">
      <InnerHero marker={w.projectName} title={w.title} body={c.summary} cta={false}>
        <div className="dd-case-tags">
          <span>{w.industry}</span>
          <span>{c.platform}</span>
          <span>Case study</span>
        </div>
      </InnerHero>

      <section className="dd-case-cover">
        <div className="dd-container">
          <div className="dd-case-frame">
            <ThemedImage
              src={w.cover.src}
              width={w.cover.width}
              height={w.cover.height}
              alt={w.cover.alt}
              sizes="(max-width: 1240px) 94vw, 1160px"
              preload
            />
          </div>
        </div>
      </section>

      <section className="dd-case-facts">
        <div className="dd-container dd-case-facts-grid">
          <div>
            <small>Project</small>
            <strong>{w.projectName}</strong>
          </div>
          <div>
            <small>Industry</small>
            <strong>{w.industry}</strong>
          </div>
          <div>
            <small>Platform</small>
            <strong>{c.platform}</strong>
          </div>
          <div>
            <small>Focus</small>
            <strong>{w.stack.join(", ")}</strong>
          </div>
        </div>
      </section>

      <section className="dd-case-section">
        <div className="dd-container dd-case-challenge">
          <div>
            <span className="dd-badge">
              <i aria-hidden="true" />
              The challenge
            </span>
            <h2>What needed solving</h2>
            <p>{c.challenge}</p>
          </div>
          <aside className="dd-case-goal">
            <span className="dd-case-goal-icon">
              <Target size={22} />
            </span>
            <small>Our goal</small>
            <p>{c.goal}</p>
          </aside>
        </div>
      </section>

      <section className="dd-case-section is-tinted">
        <div className="dd-container">
          <div className="dd-heading is-center">
            <span className="dd-badge is-orange">
              <i aria-hidden="true" />
              Our approach
            </span>
            <h2>How we shaped {w.projectName}</h2>
          </div>
          <ol className="dd-case-steps">
            {c.approach.map((step, n) => (
              <li key={step.title}>
                <span className="dd-case-step-num">0{n + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dd-case-section">
        <div className="dd-container">
          <div className="dd-heading is-center">
            <span className="dd-badge">
              <i aria-hidden="true" />
              Key features
            </span>
            <h2>What the product does well</h2>
          </div>
          <div className="dd-case-features">
            {c.features.map((f) => {
              const Icon = icons[f.icon] ?? CheckCircle2;
              return (
                <article key={f.title}>
                  <span className="dd-case-feature-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dd-case-section is-tinted">
        <div className="dd-container dd-case-expertise">
          <div>
            <span className="dd-badge">
              <i aria-hidden="true" />
              The expertise
            </span>
            <h2>Disciplines behind the work</h2>
            <p>Design, engineering and delivery working as one team around the same product goal.</p>
          </div>
          <div className="dd-case-chips">
            <div>
              <small>
                <Layers3 size={15} /> Expertise
              </small>
              <ul>
                {c.expertise.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            {c.tech && (
              <div>
                <small>
                  <Cpu size={15} /> Technologies
                </small>
                <ul className="is-tech">
                  {c.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="dd-case-section">
        <div className="dd-container">
          <div className="dd-case-result">
            <div>
              <span className="dd-badge is-dark">
                <i aria-hidden="true" />
                The result
              </span>
              <p>{c.outcome}</p>
            </div>
            <div className="dd-case-result-actions">
              <StartProjectButton className="dd-btn dd-btn-white">
                Start a similar project <ArrowUpRight size={16} />
              </StartProjectButton>
              <Link href="/work" className="dd-btn dd-btn-ghost">
                All projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <Link href={`/work/${next.slug}`} className="dd-case-next">
            <span className="dd-case-next-thumb">
              <ThemedImage src={next.cover.src} width={next.cover.width} height={next.cover.height} alt="" sizes="220px" />
            </span>
            <span className="dd-case-next-text">
              <small>Next case study</small>
              <strong>{next.projectName}</strong>
              <span>{next.title}</span>
            </span>
            <span className="dd-case-next-go">
              <ArrowUpRight size={20} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
