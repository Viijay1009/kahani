import { PageHero } from "./PageHero";
import { Button } from "./Button";

/**
 * Placeholder for a service the client has not yet confirmed.
 * These routes are noindex, excluded from the sitemap and not linked from navigation.
 */
export function PendingService({ name, path }: { name: string; path: string }) {
  return (
    <PageHero
      crumbs={[
        { name: "Services", path: "/services" },
        { name, path },
      ]}
      note="This page is being prepared"
      title={name}
      lead={
        <>
          <p>
            We haven&rsquo;t published details about {name.toLowerCase()} at Kahani yet. If you&rsquo;re looking for this
            kind of support, please get in touch and we&rsquo;ll tell you whether we can help.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Ask us</Button>
            <Button href="/services/speech-therapy" variant="secondary">
              See our speech therapy services
            </Button>
          </div>
        </>
      }
    />
  );
}
