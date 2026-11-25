import Image from "next/image";
import Link from "next/link";
import { TEAM, type TeamMember } from "@/data/team";
import { MaskReveal, ScrollReveal } from "@/components/animations/ScrollReveal";
import { VoiceArcs } from "@/components/brand/VoiceArcs";

export function Team({ headingLevel = "h2", showLink = true }: { headingLevel?: "h1" | "h2"; showLink?: boolean }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="team-title" className="frame relative mt-[var(--frame-inset)] bg-sprout px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <VoiceArcs className="pointer-events-none absolute -top-10 -left-12 w-40 opacity-60 md:w-56" strokeWidth={4} />
          <MaskReveal className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
            <Image
              src="/media/team-at-kahani.webp"
              alt="The Kahani team standing together in front of the Kahani sign at the centre"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </MaskReveal>
          <p className="mt-4 font-hand text-lg text-bark">The Kahani team at our centre in BTM 2nd Stage</p>
        </div>

        <ScrollReveal className="lg:col-span-7 lg:pt-10">
          <H id="team-title" data-reveal className="max-w-[13ch] text-[length:var(--text-display-l)]">
            Care begins with understanding.
          </H>
          <p data-reveal className="measure mt-6 text-lg text-ink/80">
            Before any plan, we take time to know your child: what they enjoy, how they communicate today, and what
            your family hopes for.
          </p>
          <div className="mt-12 space-y-12">
            {TEAM.map((m) => (
              <Profile key={m.name} member={m} />
            ))}
          </div>
          {showLink && (
            <Link data-reveal href="/our-team" className="prose-link mt-10 inline-block font-semibold">
              Meet our team
            </Link>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

export function Profile({ member }: { member: TeamMember }) {
  return (
    <article data-reveal className="grid gap-6 border-t border-forest/20 pt-8 md:grid-cols-[auto_1fr] md:gap-8">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.photoAlt ?? member.name}
          width={160}
          height={160}
          className="size-28 rounded-full object-cover"
        />
      ) : (
        <span aria-hidden className="grid size-20 place-items-center rounded-full bg-forest font-display text-3xl text-marigold">
          {member.name.charAt(0)}
        </span>
      )}
      <div>
        <h3 className="text-[length:var(--text-display-s)]">{member.name}</h3>
        <p className="mt-1 font-bold text-ink/80">{member.role}</p>
        {member.qualification && <p className="text-ink/70">{member.qualification}</p>}
        <div className="measure mt-4 space-y-3 text-ink/85">
          {member.bio.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
        {member.certifications && (
          <>
            <h4 className="mt-6 font-sans text-sm font-bold tracking-normal text-forest">Certified in</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {member.certifications.map((c) => (
                <li key={c} className="rounded-full bg-paper px-3.5 py-1.5 text-[0.92rem] text-ink/85 ring-1 ring-forest/10">
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
