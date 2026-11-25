"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/faqs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <section aria-labelledby="faq-title" className="paper frame relative mt-[var(--frame-inset)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="max-w-[10ch] text-[length:var(--text-display-m)]">
              Questions parents ask.
            </h2>
            <p className="mt-5 max-w-[34ch] text-ink/75">
              Can&rsquo;t see your question? We&rsquo;re happy to talk it through.
            </p>
            <div className="mt-7">
              <Button href="/#enquiry" variant="secondary">
                Ask us directly
              </Button>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-t border-forest/15 last:border-b">
                <h3 className="font-sans text-base tracking-normal">
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group/q flex min-h-16 w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[1.35rem] leading-snug text-forest md:text-[1.6rem] [font-variation-settings:'SOFT'_100,'WONK'_1]">
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)]",
                        isOpen ? "rotate-45 bg-marigold text-deep" : "bg-sprout text-forest group-hover/q:bg-marigold/60",
                      )}
                    >
                      <Plus className="size-5" aria-hidden />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-soft)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="measure pb-7 text-lg text-ink/80">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
