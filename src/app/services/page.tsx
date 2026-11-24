import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Button } from "@/components/ui/Button";
import { Services } from "@/components/sections/Services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: Speech Therapy for Children in Bangalore",
  description:
    "Speech and language therapy for children at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru: apraxia, autism, stammering, articulation, AAC and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Our services"
        lead={
          <>
            <p>
              Kahani offers speech, language and communication therapy for children. Each child begins with an
              assessment, and support is planned around what we learn together.
            </p>
            <p className="mt-4 text-base text-ink/70">
              Looking for something not listed here? <Link href="/contact" className="prose-link font-semibold">Ask us</Link>{" "}
              and we&rsquo;ll tell you honestly whether we can help.
            </p>
          </>
        }
      >
        <div className="mt-9">
          <Button href="/services/speech-therapy">About speech therapy at Kahani</Button>
        </div>
      </PageHero>
      <Services />
      <CtaBand />
    </>
  );
}
