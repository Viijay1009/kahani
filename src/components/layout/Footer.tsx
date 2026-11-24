import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { word as wordPath } from "@/components/brand/logo-paths";
import { ParrotMark } from "@/components/brand/Logo";
import { Sprig } from "@/components/brand/Botanical";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { NAV } from "@/data/navigation";
import { SERVICES } from "@/data/services";
import { ADDRESS_LINES, CONTACT, MAP_LINK_URL, SITE } from "@/lib/constants";
import { FooterReveal } from "./FooterReveal";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();
  return (
    <footer className="frame relative mt-[var(--frame-inset)] mb-[var(--frame-inset)] bg-deep text-sprout">
      <FooterReveal>
        <Sprig tone="paper" className="pointer-events-none absolute -top-6 right-[6%] w-28 rotate-[18deg] md:w-40" />
        <Sprig tone="paper" className="pointer-events-none absolute bottom-40 -left-6 w-24 -rotate-[24deg] md:w-36" />

        <div className="relative mx-auto max-w-[88rem] px-6 pt-20 pb-10 md:px-12 md:pt-28">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
            <div data-footer-item>
              <div className="flex items-center gap-4">
                <ParrotMark className="w-16 shrink-0" />
                <p className="font-hand text-xl leading-snug text-marigold">{SITE.tagline}</p>
              </div>
              <p className="measure mt-6 text-sprout/80">
                Kahani is a child development centre in BTM 2nd Stage, Bengaluru, offering speech, language and
                communication support for children, with parents as partners all the way.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-marigold px-5 font-bold text-deep transition-transform duration-200 active:scale-[0.97]"
                >
                  <WhatsAppIcon className="size-5" /> WhatsApp us
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-bold text-paper ring-1 ring-inset ring-paper/30 transition-colors duration-200 hover:bg-paper/10"
                >
                  <InstagramIcon className="size-5" /> {CONTACT.instagramHandle}
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              <FooterCol title="Explore">
                {NAV.map((n) => (
                  <FooterLink key={n.href} href={n.href}>
                    {n.label}
                  </FooterLink>
                ))}
              </FooterCol>
              <FooterCol title="Areas of support">
                {SERVICES.map((s) => (
                  <FooterLink key={s.slug} href={`/services/speech-therapy/${s.slug}`}>
                    {s.title}
                  </FooterLink>
                ))}
              </FooterCol>
              <FooterCol title="Visit or call">
                <li>
                  <a href={MAP_LINK_URL} target="_blank" rel="noopener noreferrer" className="group flex gap-3 text-sprout/85 hover:text-paper">
                    <MapPin className="mt-1 size-4 shrink-0 text-marigold" aria-hidden />
                    <address className="not-italic">
                      {ADDRESS_LINES.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-sprout/85 hover:text-paper">
                    <Phone className="size-4 shrink-0 text-marigold" aria-hidden /> {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all text-sprout/85 hover:text-paper">
                    <Mail className="size-4 shrink-0 text-marigold" aria-hidden /> {CONTACT.email}
                  </a>
                </li>
              </FooterCol>
            </div>
          </div>

          <svg
            viewBox="760 150 1180 320"
            className="mt-20 w-full text-paper/95"
            role="img"
            aria-label="Kahani"
            data-footer-word
          >
            <path d={wordPath} fill="currentColor" />
          </svg>

          <div className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-6 text-sm text-sprout/65 md:flex-row md:justify-between">
            <p>
              © {year} {SITE.name}. All rights reserved.
            </p>
            <p>The information on this site is general and is not a diagnosis. Please speak with us about your child.</p>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-footer-item>
      <h2 className="font-display text-xl text-marigold">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.97rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sprout/85 transition-colors duration-200 hover:text-paper hover:underline hover:decoration-marigold hover:decoration-2 hover:underline-offset-4">
        {children}
      </Link>
    </li>
  );
}
