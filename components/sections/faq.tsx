"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs, headings } from "@/content/site";
import { Copy, Heading } from "../ui";
export function FAQ({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <Heading {...headings.faq} />
        <div>
          {(compact ? faqs.slice(0, 3) : faqs).map((f, i) => (
            <div
              key={f.question}
              className={`faq-item ${open === i ? "open" : ""}`}
            >
              <h3>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                >
                  {f.question}
                  <Plus size={20} />
                </button>
              </h3>
              <div
                id={`faq-${i}`}
                className="accordion-content"
                inert={open !== i}
              >
                <div>
                  <p>
                    <Copy>{f.answer}</Copy>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
