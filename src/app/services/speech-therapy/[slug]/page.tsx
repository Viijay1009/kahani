import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SERVICES, getService } from "@/data/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/speech-therapy/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.title}: Speech Therapy in Bangalore`,
    description: s.metaDescription,
    path: `/services/speech-therapy/${s.slug}`,
  });
}

export default function ServiceDetailPage({ params }: PageProps<"/services/speech-therapy/[slug]">) {
  return (
    <Suspense fallback={<div className="paper frame mt-[var(--frame-inset)] min-h-[80svh]" aria-busy="true" />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: { params: PageProps<"/services/speech-therapy/[slug]">["params"] }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const path = `/services/speech-therapy/${s.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Speech Therapy", path: "/services/speech-therapy" },
          { name: s.title, path },
        ]}
        title={s.title}
        lead={<p>{s.short}</p>}
      />

      <section className="frame relative mt-[var(--frame-inset)] bg-sand px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="grid aspect-square max-w-[20rem] place-items-center rounded-[2.5rem] bg-sprout lg:sticky lg:top-28">
              <ServiceIcon kind={s.icon} className="w-1/2" />
            </div>
          </div>
          <ScrollReveal className="lg:col-span-7 lg:col-start-6">
            <div data-reveal className="space-y-5 text-lg text-ink/85 md:text-xl md:leading-relaxed">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 data-reveal className="mt-16 text-[length:var(--text-display-s)]">
              Some things you might notice
            </h2>
            <ul data-reveal className="mt-6 space-y-3">
              {s.signs.map((x) => (
                <li key={x} className="grid grid-cols-[auto_1fr] gap-4 text-lg text-ink/85">
                  <span aria-hidden className="mt-2.5 size-2.5 rounded-full bg-leaf" />
                  {x}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-5 text-ink/65">
              Every child develops differently. These are general signs, not a checklist for diagnosis. If something
              concerns you, it&rsquo;s worth a conversation.
            </p>

            <h2 data-reveal className="mt-16 text-[length:var(--text-display-s)]">
              How we can support your child
            </h2>
            <ul data-reveal className="mt-6 space-y-3">
              {s.support.map((x) => (
                <li key={x} className="grid grid-cols-[auto_1fr] gap-4 text-lg text-ink/85">
                  <span aria-hidden className="mt-2.5 size-2.5 rounded-full bg-marigold" />
                  {x}
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-12 flex flex-wrap gap-3">
              <Button href="/contact#enquiry">Book an appointment</Button>
              <Button href="/services/speech-therapy" variant="secondary">
                All speech therapy services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="paper frame relative mt-[var(--frame-inset)] px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="text-[length:var(--text-display-s)]">Other areas we support</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/speech-therapy/${o.slug}`}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-sprout py-2 pr-5 pl-2 font-semibold text-forest transition-[background-color,transform] duration-200 hover:bg-marigold/60 active:scale-[0.97]"
                >
                  <ServiceIcon kind={o.icon} className="size-8" />
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={serviceJsonLd({ title: s.title, description: s.metaDescription, path })} />
    </>
  );
}
