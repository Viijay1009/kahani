import { PendingService } from "@/components/ui/PendingService";
import { pageMetadata } from "@/lib/seo";

// Unpublished: awaiting client confirmation that this service is offered.
export const metadata = pageMetadata({
  title: "Occupational Therapy",
  description: "Information about occupational therapy at Kahani Child Development Centre is being prepared.",
  path: "/services/occupational-therapy",
  noindex: true,
});

export default function Page() {
  return <PendingService name="Occupational therapy" path="/services/occupational-therapy" />;
}
