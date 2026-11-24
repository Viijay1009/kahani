import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Team } from "@/components/sections/Team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Team: Child Speech Therapist in BTM",
  description:
    "Meet the people behind Kahani Child Development Centre in BTM 2nd Stage, Bengaluru, including our speech and language therapist.",
  path: "/our-team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Team", path: "/our-team" }]}
        note="The people behind the care"
        title="Our team"
        lead={<p>Qualified, caring people who take the time to understand your child and your family.</p>}
      />
      <Team showLink={false} />
      <CtaBand />
    </>
  );
}
