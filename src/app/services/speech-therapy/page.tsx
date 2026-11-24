import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SERVICES } from "@/data/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Pediatric speech therapy in BTM 2nd Stage, Bengaluru. Individualised, play-based speech and language therapy for children, with parent guidance and counselling.";

export const metadata = pageMetadata({
  title: "Speech Therapy for Children in BTM, Bangalore",
  description: DESCRIPTION,
  path: "/services/speech-therapy",
});

const STEPS = [
  {
    title: "First conversation",
    body: "You tell us what you've noticed and what you hope for. We answer your questions and explain what an assessment involves.",
  },
  {
    title: "Assessment",
    body: "We observe and play with your child to understand how they communicate now: their strengths as well as what's hard.",
  },
  {
    title: "A plan for your child",
    body: "We share what we found in plain language and agree on goals together. Every plan is individual.",
  },
  {
    title: "Sessions and home practice",
    body: "Play-based sessions, with simple ideas for you to use at home. We review progress with you along the way.",
  },
];

export default function SpeechTherapyPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Speech Therapy", path: "/services/speech-therapy" },
        ]}
        note="Helping children find their voice"
        title="Speech therapy for children"
        lead={
          <p>
            Speech and language therapy helps children understand words, say sounds clearly, put thoughts into
            sentences and connect with the people around them. At Kahani we make it playful, personal and
            something your family is part of.
          </p>
        }
      />

      <section className="frame relative mt-[var(--frame-inset)] bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="max-w-[16ch] text-[length:var(--text-display-m)]">How it works</h2>
          <ScrollReveal as="div" className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} data-reveal>
                <span className="grid size-12 place-items-center rounded-full bg-marigold font-display text-xl text-deep">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 text-ink/80">{s.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="paper frame relative mt-[var(--frame-inset)] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="max-w-[16ch] text-[length:var(--text-display-m)]">Areas we support</h2>
          <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-forest/15">
                <Link
                  href={`/services/speech-therapy/${s.slug}`}
                  className="group/a flex items-start gap-5 py-7 transition-colors duration-200"
                >
                  <ServiceIcon kind={s.icon} className="size-12 shrink-0 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/a:-rotate-6" />
                  <span>
                    <span className="block font-display text-2xl text-forest group-hover/a:underline group-hover/a:decoration-marigold group-hover/a:decoration-2 group-hover/a:underline-offset-4">
                      {s.title}
                    </span>
                    <span className="mt-2 block text-ink/75">{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={serviceJsonLd({ title: "Speech therapy for children", description: DESCRIPTION, path: "/services/speech-therapy" })}
      />
    </>
  );
}
