import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionNavigation, type DetailAnchor } from "./section-navigation";

type RelatedLink = { href: string; title: string; description?: string };

export function EditorialHero({
  parent,
  title,
  description,
  children,
}: {
  parent: { href: string; label: string };
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="ed-hero">
      <div className="dd-container">
        <nav className="ed-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link href={parent.href}>{parent.label}</Link>
        </nav>
        <div className="ed-hero-grid">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}

export function EditorialContent({
  anchors,
  children,
}: {
  anchors: DetailAnchor[];
  children: ReactNode;
}) {
  return (
    <div className="dd-container ed-layout">
      <aside className="ed-sidebar">
        <SectionNavigation items={anchors} />
      </aside>
      <div className="ed-content">{children}</div>
    </div>
  );
}

export function EditorialSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="ed-section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

export function EditorialRows({
  rows,
}: {
  rows: { title: string; body: string }[];
}) {
  return (
    <dl className="ed-rows">
      {rows.map(({ title, body }) => (
        <div key={title}>
          <dt>{title}</dt>
          <dd>{body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EditorialQuestions({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <div className="ed-questions">
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function EditorialLinks({ links }: { links: RelatedLink[] }) {
  return (
    <ul className="ed-related">
      {links.map(({ href, title, description }) => (
        <li key={href}>
          <Link href={href}>
            <span>
              <strong>{title}</strong>
              {description && <small>{description}</small>}
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function EditorialContact({
  title,
  text,
  href = "/contact",
  action = "Talk to our team",
}: {
  title: string;
  text: string;
  href?: string;
  action?: string;
}) {
  return (
    <aside className="ed-contact">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="ed-button ed-button-inverse" href={href}>
        {action}
      </Link>
    </aside>
  );
}
