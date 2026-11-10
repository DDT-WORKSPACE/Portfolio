"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Plus } from "lucide-react";
const scenes = [
  {
    name: "The problem comes into focus.",
    label: "A useful starting point",
    image: "/Projects/talentbadger.jpg",
    slug: "talentbadger",
    project: "Talent Badger",
    note: "A clear route from specialist expertise to the right next conversation.",
    focus: [
      "Who needs this?",
      "What gets in the way?",
      "What would progress look like?",
    ],
    position: "50% 50%",
  },
  {
    name: "A direction you can react to.",
    label: "From journey to interface",
    image: "/Projects/renbite.jpg",
    slug: "renbite",
    project: "Renbite",
    note: "Discovery, choices and everyday use—considered as one mobile journey.",
    focus: [
      "Explore the journey",
      "Review the detail",
      "Refine the experience",
    ],
    position: "65% 50%",
  },
  {
    name: "The details start working together.",
    label: "A product taking shape",
    image: "/Projects/crypto-wallet.png",
    slug: "crypto-wallet",
    project: "Crypto Wallet",
    note: "An organised workspace where an overview and its details belong together.",
    focus: [
      "The core experience",
      "System connections",
      "The important edge cases",
    ],
    position: "50% 50%",
  },
  {
    name: "A beginning, with a way forward.",
    label: "Ready for the next chapter",
    image: "/Projects/gcl-storefront.webp",
    slug: "gcl-storefront",
    project: "GCL storefront",
    note: "A connected storefront experience, from finding a product to the next step.",
    focus: ["Release readiness", "A clear handover", "The next improvement"],
    position: "50% 50%",
  },
];
export function ProcessScenes({ active }: { active: number }) {
  const s = scenes[active],
    [selected, setSelected] = useState(0);
  return (
    <div className={`process-editorial process-editorial-${active}`}>
      <div className="process-art-header">
        <span>{s.label}</span>
        <span className="process-art-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <Link href={`/work/${s.slug}`} className="process-project-image">
        <Image
          src={s.image}
          alt={`${s.project} portfolio presentation`}
          width={1280}
          height={960}
          sizes="(max-width:767px) 100vw, 55vw"
          loading="eager"
          style={{ objectPosition: s.position }}
        />
        <span className="process-image-caption">
          <span>
            {s.project}
            <small>From the portfolio</small>
          </span>
          <span>
            <ArrowUpRight size={22} />
          </span>
        </span>
      </Link>
      <div className="process-editorial-title">
        <h4>{s.name}</h4>
        <p>{s.note}</p>
      </div>
      <div className="process-focus-list" aria-label="Explore this stage">
        {s.focus.map((t, i) => (
          <button
            key={t}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span>
              {selected === i ? <Check size={12} /> : <Plus size={12} />}
            </span>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
