import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Philosophy } from "@/components/sections/Philosophy";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { APPROACH } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "About Us: Child Development Centre in BTM 2nd Stage",
  description:
    "Kahani is a child development centre in BTM 2nd Stage, Bengaluru, offering speech, language and communication support for children, with parents as partners.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about" }]}
        note="Kahani: a story"
        title="Every child has a story worth telling."
        lead={
          <p>
            Kahani Child Development Centre in BTM 2nd Stage, Bengaluru helps children find their voice and express
            their world with confidence, through speech, language and communication support shaped around each child.
          </p>
        }
      />

      <section className="frame relative mt-[var(--frame-inset)] bg-sand px-5 py-24 md:px-10 md:py-32">
        <ScrollReveal className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-12">
          <h2 data-reveal className="text-[length:var(--text-display-m)] lg:col-span-5">Why we&rsquo;re called Kahani</h2>
          <div data-reveal className="space-y-5 text-lg text-ink/85 lg:col-span-6 lg:col-start-7">
            <p>
              <em className="font-display not-italic text-forest">Kahani</em> means &ldquo;story&rdquo;. Every child
              arrives with their own: the way they play, what makes them laugh, how they already try to tell us things.
            </p>
            <p>
              Communication is how children share that story with the world. When words are hard to find, hard to say, or
              hard to understand, a child&rsquo;s story can feel stuck. Our work is to help it unfold, word by word.
            </p>
            <p>
              That&rsquo;s why our parrot sits at the centre of our logo. Parrots are famous talkers, and the arcs around
              ours are a voice travelling outward, reaching someone who is listening.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Philosophy />

      <section className="paper frame relative mt-[var(--frame-inset)] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="max-w-[16ch] text-[length:var(--text-display-m)]">What guides us</h2>
          <ScrollReveal as="div" className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((a) => (
              <div key={a.title} data-reveal className="border-t-2 border-leaf/60 pt-6">
                <h3 className="text-2xl">{a.title}</h3>
                <p className="mt-3 text-ink/80">{a.body}</p>
              </div>
            ))}
            <div data-reveal className="flex items-end gap-4 border-t-2 border-marigold pt-6">
              <ServiceIcon kind="social" className="w-16 shrink-0" />
              <p>
                <Link href="/approach" className="prose-link font-semibold">
                  See how our approach works in practice
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
