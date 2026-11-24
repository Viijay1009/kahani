import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQS } from "@/data/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Book an Appointment",
  description:
    "Call or WhatsApp +91 81059 35183, or send an appointment enquiry to Kahani Child Development Centre, 16th Main Road, BTM 2nd Stage, Bengaluru 560076.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Contact us"
        lead={<p>Call, message or send an enquiry. We&rsquo;ll help you work out the right next step for your child.</p>}
      />
      <Contact />
      <FAQ />
      <JsonLd data={faqJsonLd(FAQS)} />
    </>
  );
}
