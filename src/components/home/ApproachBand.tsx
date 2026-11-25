import { FlaskConical, HeartHandshake, Home, Puzzle, Route } from "lucide-react";
import { APPROACH } from "@/data/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const ICONS = [Route, Puzzle, FlaskConical, HeartHandshake, Home];

/** The five principles from the flyer, in the bold band the reference uses for numbers. */
export function ApproachBand() {
  return (
    <section aria-labelledby="approach-band-title" className="bg-paper px-5 pb-20 md:px-10 md:pb-28">
      <ScrollReveal stagger={0.07} className="relative mx-auto max-w-[80rem] overflow-hidden rounded-[2.25rem] bg-forest px-6 py-12 text-paper md:px-12 md:py-14">
        <svg aria-hidden viewBox="0 0 40 40" className="absolute top-6 left-6 w-8 text-marigold">
          <path d="m20 2 4.5 12.5L38 16l-10.5 8 3.5 13-11-7.5L9 37l3.5-13L2 16l13.5-1.5Z" fill="currentColor" />
        </svg>
        <svg aria-hidden viewBox="0 0 40 40" className="absolute right-8 bottom-6 w-6 text-leaf">
          <path d="m20 2 4.5 12.5L38 16l-10.5 8 3.5 13-11-7.5L9 37l3.5-13L2 16l13.5-1.5Z" fill="currentColor" />
        </svg>
        <h2 id="approach-band-title" data-reveal className="text-center text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] text-paper">
          How we work with every family
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-paper/15">
          {APPROACH.map((a, i) => {
            const Icon = ICONS[i];
            return (
              <li key={a.title} data-reveal className="flex flex-col items-center px-4 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-paper/10 ring-1 ring-paper/25">
                  <Icon className="size-6 text-marigold" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg leading-snug text-paper">{a.title}</h3>
                <p className="mt-1 font-hand text-[1.05rem] text-sprout/80">{a.note}</p>
              </li>
            );
          })}
        </ul>
      </ScrollReveal>
    </section>
  );
}
