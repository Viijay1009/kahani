"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeartHandshake, Pause, Play, Puzzle, Route } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { Sprig } from "@/components/brand/Botanical";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// From Kahani's own flyer ("Our Approach")
const POINTS = [
  { icon: Route, title: "Individualised plans", body: "Built around your child", tint: "bg-leaf/15 text-forest" },
  { icon: Puzzle, title: "Play-based sessions", body: "Child-friendly and fun", tint: "bg-marigold/25 text-[#8a6400]" },
  { icon: HeartHandshake, title: "Parent guidance", body: "Support to carry home", tint: "bg-beak/12 text-beak" },
];

// Real photos and reel stills from the centre, shown as a slow crossfade
const SLIDES = [
  { src: "/media/hero-stacking.webp", alt: "A child stacking big animal picture blocks into a tall tower", pos: "50% 40%" },
  { src: "/media/centre-entrance.webp", alt: "Three people smiling under a green and yellow balloon arch at the Kahani entrance", pos: "50% 35%" },
  { src: "/media/hero-ball-pit.webp", alt: "Hands playing in a ball pit of bright coloured balls during a session", pos: "50% 50%" },
  { src: "/media/team-at-kahani.webp", alt: "The Kahani team standing together in front of the Kahani sign", pos: "50% 60%" },
  { src: "/media/ephphatha-desk.webp", alt: "A framed Ephphatha print, sunflowers and a Kahani mug on the reception desk", pos: "50% 45%" },
];
const HOLD_MS = 4200;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the motion preference once on mount
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const t = window.setTimeout(() => setSlide((i) => (i + 1) % SLIDES.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [slide, playing, reduced]);

  useGSAP(
    () => {
      ref.current?.querySelector(".hero-copy")?.classList.add("is-ready");
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ delay: 0.15 })
        .fromTo("[data-hero-line]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.1 })
        .from("[data-hero-fade]", { opacity: 0, y: 14, duration: 0.7, ease: "expo.out", stagger: 0.07 }, 0.35)
        .from("[data-hero-blob]", { scale: 0.88, opacity: 0, duration: 1.1, ease: "expo.out" }, 0.1)
        .from("[data-hero-sun]", { scale: 0.6, opacity: 0, rotate: -12, duration: 1.2, ease: "expo.out" }, 0)
        .from("[data-hero-badge]", { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(1.8)" }, 0.75)
        .from("[data-hero-plane]", { opacity: 0, x: -20, duration: 1, ease: "power2.out" }, 0.5)
        .from("[data-hero-doodle]", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.1 }, 0.9);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-28 md:pt-32">
      {/* Marigold sun shape behind the photo, bleeding off the right edge */}
      <div
        data-hero-sun
        aria-hidden
        className="absolute -top-10 -right-40 h-[34rem] w-[38rem] rounded-[46%_54%_40%_60%/52%_44%_56%_48%] bg-marigold/90 md:-right-24 lg:top-6 lg:h-[46rem] lg:w-[44rem]"
      />
      <Sprig className="pointer-events-none absolute right-4 bottom-10 hidden w-24 rotate-[18deg] lg:block" />

      <div className="relative mx-auto grid max-w-[80rem] items-center gap-12 px-5 pb-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="hero-copy relative z-10 lg:col-span-6">
          <p data-hero-fade className="inline-flex items-center gap-2 rounded-full bg-sprout px-4 py-1.5 text-[0.92rem] font-bold text-forest">
            <span className="size-2 rounded-full bg-leaf" aria-hidden />
            Speech therapy for children in BTM, Bengaluru
          </p>

          <h1 id="hero-title" className="relative mt-6 text-[clamp(2.5rem,1.5rem+3.4vw,4.1rem)] leading-[1.08] text-deep">
            <span data-hero-line className="block">
              Every child has a <span className="text-leaf">story</span>.
            </span>
            <span data-hero-line className="block">
              Let’s help them <span className="text-beak">tell it</span>.
            </span>
            {/* Paper plane looping toward the headline */}
            <svg viewBox="0 0 160 70" aria-hidden className="pointer-events-none absolute -top-14 right-0 hidden w-36 text-forest/60 xl:block">
              <path data-hero-plane pathLength={1} strokeDasharray="0.03 0.03" d="M4 60c30 4 46-10 38-22-8-12-26 2-14 12 16 12 52 0 84-34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="m120 8 34-6-18 30-6-12-10-12Z" fill="var(--color-paper)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </h1>

          <p data-hero-fade className="mt-6 max-w-[46ch] text-lg text-ink/80 md:text-xl md:leading-relaxed">
            We help children discover their abilities, find their voice and build confidence, through warm,
            individualised developmental care.
          </p>

          <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
            <Button href="/#enquiry">Book an appointment</Button>
            <Button href="/services" variant="secondary">
              Explore our services
            </Button>
          </div>

          <ul data-hero-fade className="mt-10 grid gap-5 sm:grid-cols-3">
            {POINTS.map(({ icon: Icon, title, body, tint }) => (
              <li key={title} className="flex items-start gap-3">
                <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tint}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-bold text-deep">{title}</span>
                  <span className="block text-[0.92rem] text-ink/70">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-6 lg:max-w-[34rem] lg:justify-self-end">
          <div
            data-hero-blob
            className="relative aspect-[4/5] overflow-hidden rounded-[58%_42%_48%_52%/46%_50%_50%_54%] bg-sprout shadow-[0_40px_80px_-40px_rgba(15,54,34,.55)] ring-[10px] ring-paper"
          >
            {SLIDES.map((sl, i) => (
              <Image
                key={sl.src}
                src={sl.src}
                alt={sl.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 34rem, 90vw"
                aria-hidden={i !== slide}
                style={{ objectPosition: sl.pos }}
                className={`object-cover transition-[opacity,transform] ease-[var(--ease-out-soft)] [transition-duration:900ms,5s] motion-reduce:transition-none ${i === slide ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-end lg:pr-8">
            {SLIDES.map((sl, i) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
                aria-current={i === slide}
                className="grid size-6 place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-soft)] ${i === slide ? "w-6 bg-forest" : "w-2 bg-forest/25 hover:bg-forest/50"}`}
                />
              </button>
            ))}
            {!reduced && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause the photos" : "Play the photos"}
                className="ml-1 grid size-9 place-items-center rounded-full text-forest ring-1 ring-forest/20 transition-[transform,background-color] duration-200 hover:bg-sprout active:scale-95"
              >
                {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
              </button>
            )}
          </div>

          <div
            data-hero-badge
            className="absolute -bottom-4 -left-2 grid size-40 place-items-center rounded-full bg-paper p-5 text-center shadow-[0_20px_40px_-20px_rgba(15,54,34,.5)] md:-left-10 md:size-44"
          >
            <span>
              <VoiceArcs className="mx-auto mb-1 w-12" strokeWidth={9} />
              <span className="block font-display text-[1.05rem] leading-tight text-deep">
                Every child’s <span className="text-leaf">voice</span> matters
              </span>
            </span>
          </div>

          <svg data-hero-doodle viewBox="0 0 40 40" aria-hidden className="absolute top-6 -left-6 w-10 text-beak">
            <path d="M20 34C8 26 4 19 7 13c2-5 9-6 13 0 4-6 11-5 13 0 3 6-1 13-13 21Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <svg data-hero-doodle viewBox="0 0 40 40" aria-hidden className="absolute -top-2 right-10 w-9 text-forest">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={8 + i * 12} cy={20 - (i % 2) * 8} r="3" fill="currentColor" opacity={0.5 + i * 0.2} />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
