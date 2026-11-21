"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

type Cover = { src: string; width: number; height: number; alt: string };

export function ProjectCover({
  projectName,
  cover,
}: {
  projectName: string;
  cover: Cover;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="dd-container ed-case-cover">
      <figure>
        <div className="ed-case-artwork">
          <Image {...cover} sizes="(max-width: 760px) 84vw, 900px" preload />
        </div>
        <figcaption>
          <span>{projectName} · Product screens</span>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Maximize2 size={15} aria-hidden="true" />
            View full image
          </button>
        </figcaption>
      </figure>

      <dialog
        className="ed-case-art-dialog"
        ref={dialog}
        aria-labelledby="project-artwork-title"
        data-lenis-prevent
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.currentTarget === event.target) event.currentTarget.close();
        }}
      >
        <div className="ed-case-art-dialog-inner">
          <header>
            <h2 id="project-artwork-title">{projectName} · Product screens</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close image viewer"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          {open && <Image {...cover} sizes="(max-width: 800px) 88vw, 1200px" />}
        </div>
      </dialog>
    </div>
  );
}
