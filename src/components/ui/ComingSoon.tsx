import { Phone } from "lucide-react";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons";
import { ParrotMark } from "@/components/brand/Logo";
import { CONTACT } from "@/lib/constants";

/** Placeholder for pages still being written. Everything a parent needs is on the home page for now. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <section aria-labelledby="soon-title" className="relative overflow-hidden bg-paper px-5 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32">
      <div
        aria-hidden
        className="absolute -top-24 -right-32 h-[26rem] w-[30rem] rounded-[46%_54%_40%_60%/52%_44%_56%_48%] bg-marigold/80"
      />
      <div className="relative mx-auto max-w-[40rem] text-center">
        <span className="mx-auto grid size-28 place-items-center rounded-full bg-white shadow-[0_20px_40px_-24px_rgba(15,54,34,.5)] ring-8 ring-sprout">
          <ParrotMark className="w-[70%]" />
        </span>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-sprout px-4 py-1.5 text-[0.92rem] font-bold text-forest">
          <span className="size-2 rounded-full bg-leaf" aria-hidden />
          {title}
        </p>
        <h1 id="soon-title" className="mt-5 text-[clamp(2.4rem,1.6rem+3vw,3.8rem)] text-deep">
          This page is <span className="text-beak">coming soon</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-lg text-ink/75">
          We’re still writing this part of our story. In the meantime, you’ll find our services, sessions and
          enquiry form on the home page, or you can reach us directly.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/#enquiry" variant="secondary">
            Book an appointment
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-ink/80">
          <li>
            <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 hover:text-forest">
              <Phone className="size-4 text-leaf" aria-hidden /> {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-forest">
              <WhatsAppIcon className="size-4 text-leaf" /> Message us on WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
