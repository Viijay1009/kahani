"use client";

import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { LogoAnimation } from "@/components/animations/LogoAnimation";
import { FloatingLeaves } from "@/components/animations/FloatingLeaves";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { Sprig } from "@/components/brand/Botanical";
import { CONTACT, SITE } from "@/lib/constants";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const LINES = [
  { text: "Every child", indent: "" },
  { text: "has a story.", indent: "" },
  { text: "Let’s help them", indent: "lg:pl-[1.6em]" },
  { text: "tell it.", indent: "lg:pl-[1.6em]" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const copy = ref.current?.querySelector(".hero-copy");
      copy?.classList.add("is-ready");
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ delay: 0.35 });
      tl.fromTo("[data-hero-line]", { yPercent: 105 }, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.09 })
        .from("[data-hero-note]", { opacity: 0, y: 10, duration: 0.7 }, 0.1)
        .from("[data-hero-fade]", { opacity: 0, y: 18, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.55)
        .from("[data-hero-tagline]", { opacity: 0, x: -8, duration: 0.8 }, 2.4);

      // Gentle depth on scroll: the bird stays a beat longer than the words
      gsap.to("[data-hero-visual]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="paper frame relative mt-[var(--frame-inset)] flex min-h-[calc(100svh-var(--frame-inset)*2)] flex-col"
    >
      <Sprig className="pointer-events-none absolute -top-4 -left-6 w-24 -rotate-[30deg] opacity-80 md:w-36" />
      <Sprig tone="forest" className="pointer-events-none absolute -right-8 bottom-24 w-28 rotate-[200deg] opacity-25 md:w-40" />
      <FloatingLeaves />

      <div className="relative mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-6 px-5 pt-28 pb-10 md:px-10 lg:grid-cols-12 lg:gap-4 lg:pt-32">
        <div className="hero-copy relative z-10 lg:col-span-7">
          <p data-hero-note className="flex items-center gap-3 font-hand text-[1.3rem] text-bark md:text-2xl">
            <span>A little care. A lot of possibility.</span>
            <svg viewBox="0 0 80 20" className="hidden w-16 text-marigold sm:block" aria-hidden>
              <path d="M2 14 C20 2 40 18 60 8 C66 5 72 6 78 9" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[length:var(--text-display-xl)] leading-[0.94] tracking-[-0.035em] text-forest"
          >
            {LINES.map((l) => (
              <span key={l.text} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                <span data-hero-line className="block">
                  {l.text}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-8 max-w-[46ch] text-lg text-ink/85 md:text-xl md:leading-relaxed">
            At Kahani, we support children in discovering their abilities, finding their voice, and building
            confidence through compassionate, individualised developmental care.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
            <Button href="/services">Explore our services</Button>
            <Button href="/contact#enquiry" variant="secondary">
              Book an appointment
            </Button>
          </div>
        </div>

        <div data-hero-visual className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none lg:pl-6">
          <VoiceArcs className="pointer-events-none absolute top-1/2 left-1/2 w-[135%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" strokeWidth={2.5} />
          <LogoAnimation className="relative mx-auto w-full lg:w-[min(100%,58svh)]" />
          <p
            data-hero-tagline
            className="absolute -bottom-2 left-[46%] w-max max-w-[14rem] -rotate-3 font-hand text-[1.15rem] leading-snug text-forest md:left-[58%] md:text-xl"
          >
            <svg viewBox="0 0 40 40" className="mb-1 ml-[-1.6rem] w-8 -rotate-[100deg] text-bark" aria-hidden>
              <path d="M6 34 C10 18 22 8 34 6 M26 2 L34 6 L29 13" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {SITE.tagline}
          </p>
        </div>
      </div>

      <div data-hero-fade className="relative mx-auto w-full max-w-[88rem] px-5 pb-6 md:px-10">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-forest/15 pt-5 text-[0.95rem] text-ink/80">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-leaf" aria-hidden /> BTM 2nd Stage, Bengaluru
          </li>
          <li>
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-forest">
              <Phone className="size-4 text-leaf" aria-hidden /> {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-forest">
              <WhatsAppIcon className="size-4 text-leaf" /> Message us on WhatsApp
            </a>
          </li>
          <li className="ml-auto hidden font-display text-forest/70 md:block">Speech, language &amp; communication</li>
        </ul>
      </div>
    </section>
  );
}
