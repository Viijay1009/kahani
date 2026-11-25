import { Button } from "./Button";
import { WhatsAppIcon } from "./icons";
import { CONTACT } from "@/lib/constants";
import { ParrotMark } from "@/components/brand/Logo";

/** Closing invitation used at the end of inner pages. */
export function CtaBand({ title = "Ready to talk about your child?", body }: { title?: string; body?: string }) {
  return (
    <section className="frame relative mt-[var(--frame-inset)] bg-forest px-5 py-20 text-sprout md:px-10 md:py-24">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-6">
          <ParrotMark className="hidden w-20 shrink-0 md:block" />
          <div>
            <h2 className="max-w-[18ch] text-[length:var(--text-display-m)] text-paper">{title}</h2>
            <p className="measure mt-4 text-sprout/85">
              {body ?? "Call, message or send an enquiry. We'll help you work out the right next step for your child."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/#enquiry" variant="light">
            Book an appointment
          </Button>
          <Button href={CONTACT.whatsappHref} variant="ghost" icon={<WhatsAppIcon />}>
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  );
}
