"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/services";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

export function Services({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const H = headingLevel;
  const s = SERVICES[active];

  // On large screens the stage follows the row passing the middle of the viewport
  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    list.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="services-title" className="paper frame relative mt-[var(--frame-inset)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[88rem]">
        <ScrollReveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <H id="services-title" data-reveal className="text-[length:var(--text-display-l)] md:col-span-7">
            Support that grows with your child.
          </H>
          <div data-reveal className="md:col-span-5 md:pb-3">
            <p className="text-lg text-ink/80">
              Our speech therapy services cover the areas below. Every child is assessed individually, and support is
              shaped around them.
            </p>
            <Link href="/services/speech-therapy" className="prose-link mt-3 inline-block font-semibold">
              How speech therapy at Kahani works
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* The stage: shows the area the reader is pointing at */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[2.5rem] bg-sprout">
                <VoiceArcs key={`arcs-${active}`} className="stage-arcs absolute inset-[6%] opacity-70" strokeWidth={3} />
                <div key={s.slug} className="stage-in relative w-[46%]">
                  <ServiceIcon kind={s.icon} className="w-full" />
                </div>
                <p
                  key={`cap-${s.slug}`}
                  className="stage-in absolute right-8 bottom-7 left-8 font-hand text-lg leading-snug text-forest"
                  aria-hidden
                >
                  {s.short}
                </p>
              </div>
            </div>
          </div>

          <ul ref={listRef} className="lg:col-span-7">
            {SERVICES.map((svc, i) => (
              <li key={svc.slug} data-index={i} className="border-t border-forest/15 last:border-b">
                <Link
                  href={`/services/speech-therapy/${svc.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group/svc relative flex items-start gap-5 py-7 md:gap-7 md:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-[-1rem] inset-y-1 -z-0 origin-left scale-x-0 rounded-2xl bg-sprout/70 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/svc:scale-x-100 group-focus-visible/svc:scale-x-100 lg:hidden"
                  />
                  <ServiceIcon kind={svc.icon} className="relative mt-1 size-12 shrink-0 md:size-14 lg:size-11" />
                  <span className="relative flex-1">
                    <span
                      className={cn(
                        "block font-display text-[length:var(--text-display-s)] leading-tight text-forest transition-transform duration-300 ease-[var(--ease-out-soft)] [font-variation-settings:'SOFT'_100,'WONK'_1]",
                        "lg:group-hover/svc:translate-x-2",
                        i === active && "lg:translate-x-2",
                      )}
                    >
                      {svc.title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-ink/75">{svc.short}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-[0.95rem] font-bold text-forest">
                      Learn more
                      <span className="sr-only"> about {svc.title}</span>
                      <span
                        aria-hidden
                        className="h-[2px] w-6 origin-left rounded bg-marigold transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/svc:scale-x-[1.8]"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
