import Link from "next/link";
import { WordByWord } from "@/components/animations/WordByWord";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParrotMark } from "@/components/brand/Logo";
import { VoiceArcs } from "@/components/brand/VoiceArcs";

export function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="frame relative mt-[var(--frame-inset)] bg-sprout px-5 py-24 md:px-10 md:py-36"
    >
      <VoiceArcs
        className="pointer-events-none absolute top-1/2 left-1/2 w-[min(70rem,140vw)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        strokeWidth={1.6}
      />
      <div className="relative mx-auto max-w-[72rem]">
        <h2 id="philosophy-title" className="sr-only">
          Every little voice deserves to be heard
        </h2>
        <div className="relative mx-auto max-w-[60rem] text-center">
          <WordByWord
            as="p"
            text="Every little voice deserves to be heard."
            className="mx-auto max-w-[13ch] font-display text-[length:var(--text-display-l)] leading-[0.98] tracking-[-0.03em] text-forest [font-variation-settings:'SOFT'_100,'WONK'_1]"
          />
          <ParrotMark className="absolute -top-14 right-[4%] w-14 rotate-6 md:-top-16 md:right-[10%] md:w-24" />
        </div>

        <ScrollReveal className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <p data-reveal className="font-hand text-2xl leading-snug text-bark md:col-span-4 md:col-start-2 md:text-[1.7rem]">
            Every child.
            <br />
            Every voice.
            <br />
            Every milestone.
          </p>
          <div data-reveal className="md:col-span-6">
            <p className="text-xl leading-relaxed text-ink/90 md:text-[1.4rem]">
              Every child grows in their own beautiful way. We believe in understanding each child&rsquo;s unique
              strengths, supporting their challenges, and celebrating every little milestone along the journey.
            </p>
            <p className="mt-6 text-ink/75">
              <em className="font-display not-italic text-forest">Kahani</em> means &ldquo;story&rdquo;. It&rsquo;s
              how we think about therapy: not fixing a child, but helping them tell their own story, one word at a time.{" "}
              <Link href="/about" className="prose-link font-semibold">
                More about us
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
