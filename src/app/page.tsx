import { Hero } from "@/components/sections/Hero";
import { SupportGrid } from "@/components/home/SupportGrid";
import { ApproachBand } from "@/components/home/ApproachBand";
import { Moments } from "@/components/home/Moments";
import { InsideKahani } from "@/components/home/InsideKahani";
import { ReadyBanner } from "@/components/home/ReadyBanner";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQS } from "@/data/faqs";
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
      <SupportGrid />
      <ApproachBand />
      <Moments />
      <InsideKahani />
      <Team />
      <FAQ />
      <ReadyBanner />
      <Contact />
      <JsonLd data={faqJsonLd(FAQS)} />
    </>
  );
}
