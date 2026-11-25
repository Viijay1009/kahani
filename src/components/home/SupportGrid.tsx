import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

// Card tints cycle through the brand colours, like the coloured stamps on the flyer
const TINTS = ["bg-sprout", "bg-marigold/20", "bg-beak/10", "bg-leaf/15"];

/** Home page: the eight areas of support from Kahani's flyer, as friendly cards. */
export function SupportGrid() {
  return (
    <section aria-labelledby="support-title" className="bg-paper px-5 pt-10 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-[80rem]">
        <ScrollReveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="font-bold text-leaf">
              Areas we support
            </p>
            <h2 id="support-title" data-reveal className="mt-2 max-w-[18ch] text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] text-deep">
              Speech and communication support for every child
            </h2>
          </div>
          <div data-reveal className="md:col-span-5 md:pb-2">
            <p className="text-ink/75">
              Every child is assessed individually, and support is shaped around them, their interests and their pace.
            </p>
            <Link href="/services" className="group mt-3 inline-flex items-center gap-2 font-bold text-forest">
              View all services
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal as="div" stagger={0.05} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              data-reveal
              href={`/services/speech-therapy/${s.slug}`}
              className="group flex flex-col rounded-[1.75rem] bg-white p-3 ring-1 ring-forest/8 transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgba(15,54,34,.35)] active:scale-[0.98]"
            >
              <span className={`grid h-32 place-items-center rounded-[1.25rem] ${TINTS[i % TINTS.length]}`}>
                <ServiceIcon kind={s.icon} className="w-16 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:-rotate-3" />
              </span>
              <span className="flex flex-1 flex-col px-3 pt-5 pb-3">
                <span className="font-display text-xl leading-tight text-deep">{s.title}</span>
                <span className="mt-2 line-clamp-3 flex-1 text-[0.95rem] text-ink/70">{s.short}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-bold text-forest">
                  Learn more<span className="sr-only"> about {s.title}</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
