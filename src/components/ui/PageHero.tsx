import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { ParrotMark } from "@/components/brand/Logo";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { Sprig } from "@/components/brand/Botanical";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Opening page for inner routes: breadcrumbs, a large title, a short lead. */
export function PageHero({
  title,
  lead,
  crumbs,
  note,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  note?: string;
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="paper frame relative mt-[var(--frame-inset)] px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
      <Sprig className="pointer-events-none absolute -top-4 -left-6 w-24 -rotate-[30deg] opacity-80 md:w-32" />
      <div aria-hidden className="pointer-events-none absolute top-28 right-[6%] hidden w-64 lg:block xl:w-80">
        <VoiceArcs className="w-full opacity-60" strokeWidth={4} />
        <ParrotMark className="absolute top-1/2 left-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative mx-auto max-w-[88rem]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink/70">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5 text-ink/40" aria-hidden />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-forest">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-forest hover:underline">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {note && <p className="mt-10 font-hand text-xl text-bark md:text-2xl">{note}</p>}
        <h1 className={`${note ? "mt-3" : "mt-10"} max-w-[16ch] text-[length:var(--text-display-l)]`}>{title}</h1>
        {lead && <div className="measure mt-7 text-lg text-ink/85 md:text-xl md:leading-relaxed">{lead}</div>}
        {children}
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}
