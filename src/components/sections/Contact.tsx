import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ADDRESS_LINES, CONTACT, MAP_EMBED_URL, MAP_LINK_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/icons";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { EnquiryForm } from "./EnquiryForm";

const ACTIONS = [
  { label: "Call us", detail: CONTACT.phoneDisplay, href: CONTACT.phoneHref, icon: Phone },
  { label: "WhatsApp", detail: "Message us any time", href: CONTACT.whatsappHref, icon: WhatsAppIcon },
  { label: "Email", detail: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
  { label: "Directions", detail: "Open in Google Maps", href: MAP_LINK_URL, icon: Navigation },
];

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section
      id="enquiry"
      aria-labelledby="contact-title"
      className="frame relative mt-[var(--frame-inset)] scroll-mt-24 bg-sand px-5 py-24 md:px-10 md:py-32"
    >
      <VoiceArcs className="pointer-events-none absolute -top-16 -right-16 w-72 opacity-40 md:w-[26rem]" strokeWidth={3} />
      <div className="relative mx-auto max-w-[88rem]">
        <H id="contact-title" className="max-w-[14ch] text-[length:var(--text-display-l)]">
          Let&rsquo;s begin your child&rsquo;s story.
        </H>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-leaf" aria-hidden />
              <div>
                <p className="font-display text-2xl text-forest">Kahani Child Development Centre</p>
                <address className="mt-2 text-lg not-italic text-ink/85">
                  {ADDRESS_LINES.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {ACTIONS.map((a) => {
                const Icon = a.icon;
                const external = a.href.startsWith("http");
                return (
                  <li key={a.label}>
                    <a
                      href={a.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group/act flex min-h-20 items-center gap-4 rounded-[1.25rem] bg-paper px-5 py-4 ring-1 ring-forest/10 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(15,54,34,.55)] active:scale-[0.98]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sprout text-forest transition-colors duration-200 group-hover/act:bg-marigold group-hover/act:text-deep">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold text-forest">{a.label}</span>
                        <span className="block truncate text-sm text-ink/70">{a.detail}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 overflow-hidden rounded-[1.75rem] ring-1 ring-forest/10">
              <iframe
                title="Map showing Kahani Child Development Centre, BTM 2nd Stage, Bengaluru"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 grayscale-[35%] sepia-[15%]"
              />
            </div>
          </div>

          <div className="rounded-[2rem] bg-paper/70 p-6 ring-1 ring-forest/10 md:p-10 lg:col-span-7">
            <h3 className="text-[length:var(--text-display-s)]">Appointment enquiry</h3>
            <p className="mt-2 mb-8 text-ink/75">Share a few details and we&rsquo;ll get back to you to arrange a time.</p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
