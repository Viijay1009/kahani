"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CONTACT } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/gsap";

// Short clips from Kahani's own Instagram reels. Captions follow the text on each reel.
const REELS = [
  { src: "reel-blowing", caption: "A DIY blowing activity", alt: "A homemade blowing toy made from a bottle, a straw and cotton balls" },
  { src: "reel-animals", caption: "All the animals on board", alt: "Toy animals lined up on toy trucks on a play mat" },
  { src: "reel-stacking", caption: "Stacking animal blocks", alt: "A tall tower of animal picture blocks being stacked" },
  { src: "reel-orange", caption: "Peeling an orange: a fine motor task", alt: "Small hands peeling an orange" },
  { src: "reel-hand-painting", caption: "Made with love for Mom", alt: "A hand-print painting being decorated with colours" },
  { src: "reel-puzzle-break", caption: "A small break with a puzzle", alt: "Hands fitting puzzle blocks together on a play mat" },
  { src: "reel-bite-blocks", caption: "Bite blocks for jaw stability", alt: "A therapist using bite blocks during an oral motor activity" },
  { src: "reel-body-parts", caption: "Learning body parts, one word at a time", alt: "A therapist playing with a potato-head toy to teach body parts" },
];

export function Moments() {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the motion preference once on mount
    setReduced(prefersReducedMotion());
  }, []);

  // Play only the clips that are on screen; reduced motion and the pause button stop them all
  useEffect(() => {
    const list = track.current;
    if (!list) return;
    const videos = Array.from(list.querySelectorAll("video"));
    if (paused || reduced) {
      videos.forEach((v) => v.pause());
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.6 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [paused, reduced]);

  const scrollBy = (dir: 1 | -1) => {
    const list = track.current;
    if (!list) return;
    const card = list.querySelector("li");
    list.scrollBy({ left: dir * ((card?.clientWidth ?? 260) + 16) * 2, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="moments-title" className="relative overflow-hidden bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-[80rem] px-5 md:px-10">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="font-bold text-beak">
              Inside our sessions
            </p>
            <h2 id="moments-title" data-reveal className="mt-2 max-w-[18ch] text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] text-deep">
              Learning through play, every single day
            </h2>
            <p data-reveal className="mt-4 max-w-[52ch] text-ink/75">
              A peek at the games, crafts and everyday activities that build speech, language and confidence at Kahani.
            </p>
          </div>
          <div data-reveal className="flex items-center gap-2">
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play the videos" : "Pause the videos"}
                className="grid size-12 place-items-center rounded-full bg-paper text-forest ring-1 ring-forest/15 transition-[transform,background-color] duration-200 hover:bg-white active:scale-95"
              >
                {paused ? <Play className="size-5" aria-hidden /> : <Pause className="size-5" aria-hidden />}
              </button>
            )}
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous videos"
              className="grid size-12 place-items-center rounded-full bg-paper text-forest ring-1 ring-forest/15 transition-[transform,background-color] duration-200 hover:bg-white active:scale-95"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next videos"
              className="grid size-12 place-items-center rounded-full bg-forest text-paper transition-transform duration-200 hover:bg-deep active:scale-95"
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <ul
        ref={track}
        className="moments-track mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ paddingInline: "max(1.25rem, calc((100vw - 80rem) / 2 + 2.5rem))", scrollPaddingInline: "max(1.25rem, calc((100vw - 80rem) / 2 + 2.5rem))" }}
      >
        {REELS.map((r, i) => (
          <li key={r.src} className="w-[15rem] shrink-0 snap-start md:w-[16.5rem]">
            <figure>
              <div className={`relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-forest/10 ${i % 2 ? "md:translate-y-8" : ""}`}>
                <video
                  className="size-full object-cover"
                  src={`/media/${r.src}.mp4`}
                  poster={`/media/${r.src}.webp`}
                  muted
                  loop
                  playsInline
                  preload="none"
                  controls={reduced}
                  aria-label={r.alt}
                />
              </div>
              <figcaption className={`mt-3 px-1 font-hand text-lg leading-snug text-forest ${i % 2 ? "md:mt-11" : ""}`}>
                {r.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 max-w-[80rem] px-5 md:px-10">
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-forest hover:text-deep"
        >
          <InstagramIcon className="size-5" />
          More moments on Instagram, {CONTACT.instagramHandle}
        </a>
      </div>
    </section>
  );
}
