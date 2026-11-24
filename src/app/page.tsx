import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { ParentGuidance } from "@/components/sections/ParentGuidance";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQS } from "@/data/faqs";
import { PHOTOS } from "@/data/gallery";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Kahani Child Development Centre | Speech Therapy in BTM, Bangalore",
  absoluteTitle: true,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Services />
      <Approach />
      {/* The opening-day portrait appears in the Team chapter just below */}
      <Gallery photos={PHOTOS.filter((p) => p.src !== "/img/opening-day.webp")} />
      <Team />
      <ParentGuidance />
      <FAQ />
      <Contact />
      <JsonLd data={faqJsonLd(FAQS)} />
    </>
  );
}
