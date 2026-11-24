import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Approach } from "@/components/sections/Approach";
import { ParentGuidance } from "@/components/sections/ParentGuidance";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Approach: Individualised, Play-Based Speech Therapy",
  description:
    "Individualised therapy plans, play-based sessions, evidence-based techniques and parent guidance at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Approach", path: "/approach" }]}
        note="One word at a time"
        title="How we work with your child"
        lead={
          <p>
            Progress in communication rarely happens in one leap. It comes from many small, meaningful steps, taken
            at your child&rsquo;s pace and celebrated along the way.
          </p>
        }
      />
      <Approach />
      <ParentGuidance />
      <CtaBand />
    </>
  );
}
