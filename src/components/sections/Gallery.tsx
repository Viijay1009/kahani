"use client";

import Image from "next/image";
import { useState } from "react";
import { PHOTOS, type Photo } from "@/data/gallery";
import { CONTACT } from "@/lib/constants";
import { Lightbox } from "@/components/ui/Lightbox";
import { MaskReveal, ScrollReveal } from "@/components/animations/ScrollReveal";
import { InstagramIcon } from "@/components/ui/icons";
import { ParrotMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

// Journal layouts: a wide plate, a tall portrait and a detail, plus written notes.
const LAYOUTS: Record<number, string[]> = {
  3: ["md:col-span-7 aspect-[930/480]", "md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto", "md:col-span-3 aspect-[13/16]"],
  2: ["md:col-span-8 aspect-[930/480]", "md:col-span-4 md:row-span-2 aspect-[13/16] md:aspect-auto"],
};

export function Gallery({
  headingLevel = "h2",
  photos = PHOTOS,
}: {
  headingLevel?: "h1" | "h2";
  photos?: Photo[];
}) {
  const [index, setIndex] = useState<number | null>(null);
  const H = headingLevel;
  const layout = LAYOUTS[photos.length] ?? LAYOUTS[3];
  const twoUp = photos.length === 2;

  return (
    <section aria-labelledby="gallery-title" className="paper frame relative mt-[var(--frame-inset)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[88rem]">
        <ScrollReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <H id="gallery-title" data-reveal className="max-w-[14ch] text-[length:var(--text-display-l)]">
            A glimpse into Kahani.
          </H>
          <p data-reveal className="max-w-[40ch] text-lg text-ink/80">
            Pages from our first chapter. We share everyday moments on Instagram, always with families&rsquo; consent.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {photos.map((p, i) => (
            <MaskReveal key={p.src} className={cn("relative", layout[i])}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group/ph relative block size-full overflow-hidden rounded-[1.75rem] bg-sprout"
                aria-label={`Open photo: ${p.caption}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/ph:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 translate-y-1 rounded-full bg-paper/90 px-4 py-1.5 font-hand text-[1.05rem] text-forest opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] group-hover/ph:translate-y-0 group-hover/ph:opacity-100 group-focus-visible/ph:translate-y-0 group-focus-visible/ph:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  {p.caption}
                </span>
              </button>
            </MaskReveal>
          ))}

          <div className={cn("flex flex-col justify-between rounded-[1.75rem] bg-sprout p-7", twoUp ? "md:col-span-3" : "md:col-span-4")}>
            <p className="font-hand text-[1.6rem] leading-snug text-forest">
              Speak. Connect.
              <br />
              Express. Grow.
            </p>
            <ParrotMark className="mt-6 w-14 self-end" />
          </div>

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/ig relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-forest p-7 text-paper",
              twoUp ? "md:col-span-5" : "md:col-span-12 md:flex-row md:items-center",
            )}
          >
            <span className="font-display text-[length:var(--text-display-s)] leading-tight">
              More moments from the centre on Instagram
            </span>
            <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3 font-bold text-forest transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/ig:-translate-y-0.5 md:mt-0">
              <InstagramIcon className="size-5" /> {CONTACT.instagramHandle}
            </span>
          </a>
        </div>
      </div>
      <Lightbox photos={photos} index={index} onChange={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
}
