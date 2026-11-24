import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery: Inside Kahani Child Development Centre",
  description: "Photos from Kahani Child Development Centre in BTM 2nd Stage, Bengaluru.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        title="Gallery"
        lead={<p>A look inside Kahani. We only share photos of children with their families&rsquo; permission.</p>}
      />
      <Gallery />
      <CtaBand />
    </>
  );
}
