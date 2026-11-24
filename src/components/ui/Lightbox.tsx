"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/gallery";

/** Accessible lightbox built on the native <dialog>: focus trapping and Escape come for free. */
export function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => index !== null && onChange((index + dir + photos.length) % photos.length),
    [index, onChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const p = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Photo viewer"
      className="lightbox m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-4 backdrop:bg-deep/85 backdrop:backdrop-blur-sm md:p-10"
    >
      {p && (
        <figure key={p.src} className="lightbox-in flex flex-col items-center">
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes="90vw"
            className="h-auto max-h-[70dvh] w-auto rounded-[1.5rem] object-contain"
          />
          <figcaption className="mt-4 font-hand text-xl text-paper">{p.caption}</figcaption>
        </figure>
      )}
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full bg-paper text-forest transition-transform active:scale-95">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={onClose} aria-label="Close photo viewer" className="grid size-12 place-items-center rounded-full bg-marigold text-deep transition-transform active:scale-95">
          <X className="size-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-12 place-items-center rounded-full bg-paper text-forest transition-transform active:scale-95">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </dialog>
  );
}
