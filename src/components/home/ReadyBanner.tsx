import { CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/constants";

/** Soft closing invitation, like the reference's "Ready to get started?" strip. */
export function ReadyBanner() {
  return (
    <section aria-labelledby="ready-title" className="bg-paper px-5 pb-20 md:px-10 md:pb-28">
      <div className="relative mx-auto flex max-w-[80rem] flex-col items-center gap-6 overflow-hidden rounded-[2.25rem] bg-marigold/25 px-6 py-10 text-center ring-1 ring-marigold/40 md:flex-row md:justify-between md:px-14 md:text-left">
        <svg aria-hidden viewBox="0 0 64 64" className="absolute -top-3 -left-3 hidden w-20 text-marigold md:block">
          <circle cx="32" cy="32" r="12" fill="currentColor" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <path key={i} d={`M${32 + Math.cos(a) * 18} ${32 + Math.sin(a) * 18}L${32 + Math.cos(a) * 27} ${32 + Math.sin(a) * 27}`} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />;
          })}
        </svg>
        <div className="md:pl-10">
          <h2 id="ready-title" className="text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] text-deep">
            Ready to take the first step?
          </h2>
          <p className="mt-2 text-ink/75">We’d love to meet you and your child. Call, WhatsApp or send an enquiry.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/#enquiry" icon={<CalendarHeart />}>
            Book an appointment
          </Button>
          <Button href={CONTACT.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  );
}
