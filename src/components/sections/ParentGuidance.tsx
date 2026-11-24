import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParrotMark } from "@/components/brand/Logo";
import { Sprig } from "@/components/brand/Botanical";
import { Button } from "@/components/ui/Button";

const POINTS = [
  { title: "You'll know what we're working on", body: "We explain each goal in plain words, and why it matters for your child." },
  { title: "You'll have ideas for home", body: "Simple ways to build communication into meals, play, bath time and the drive to school." },
  { title: "Your questions are welcome", body: "Worries, doubts, small wins: parent counselling is part of our approach, not an extra." },
];

/** A conversation drawn as two speech bubbles: a parent's large one, a child's small one. */
function Conversation() {
  return (
    <svg viewBox="0 0 420 380" className="w-full" role="img" aria-label="Two speech bubbles in conversation, a large one and a small one">
      <path
        d="M40 40 H300 A36 36 0 0 1 336 76 V196 A36 36 0 0 1 300 232 H150 L90 290 V232 H76 A36 36 0 0 1 40 196 V76 A36 36 0 0 1 76 40Z"
        fill="var(--color-paper)"
        opacity=".95"
      />
      <path
        d="M248 190 H370 A28 28 0 0 1 398 218 V290 A28 28 0 0 1 370 318 H356 V362 L316 318 H248 A28 28 0 0 1 220 290 V218 A28 28 0 0 1 248 190Z"
        fill="var(--color-marigold)"
      />
      <path d="M92 104 H284 M92 140 H250 M92 176 H200" stroke="var(--color-leaf)" strokeWidth="12" strokeLinecap="round" />
      <circle cx="276" cy="254" r="9" fill="var(--color-deep)" />
      <circle cx="309" cy="254" r="9" fill="var(--color-deep)" />
      <circle cx="342" cy="254" r="9" fill="var(--color-deep)" />
    </svg>
  );
}

export function ParentGuidance() {
  return (
    <section aria-labelledby="parents-title" className="frame relative mt-[var(--frame-inset)] bg-forest px-5 py-24 text-sprout md:px-10 md:py-32">
      <Sprig tone="paper" className="pointer-events-none absolute -bottom-6 left-[38%] w-32 rotate-[12deg]" />
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <Conversation />
          <ParrotMark className="absolute top-[calc(10.5%-3.4rem)] left-[56%] w-14 md:top-[calc(10.5%-4.6rem)] md:w-[4.75rem]" />
          <p className="mt-2 font-hand text-xl text-marigold">You know your child best. We listen first.</p>
        </div>
        <ScrollReveal className="lg:col-span-6 lg:col-start-7">
          <h2 id="parents-title" data-reveal className="max-w-[12ch] text-[length:var(--text-display-l)] text-paper">
            Because every small step matters.
          </h2>
          <p data-reveal className="measure mt-6 text-lg text-sprout/85">
            Children make the most of therapy when the people around them are part of it. That&rsquo;s why parent
            guidance and counselling sit at the heart of how we work.
          </p>
          <ul className="mt-10 space-y-7">
            {POINTS.map((p) => (
              <li key={p.title} data-reveal className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden className="mt-2 size-3 rounded-full bg-marigold" />
                <div>
                  <h3 className="font-display text-2xl text-paper">{p.title}</h3>
                  <p className="mt-1 text-sprout/80">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <Button href="/contact#enquiry" variant="light">
              Talk to us about your child
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
