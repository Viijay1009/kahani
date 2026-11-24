import { PendingService } from "@/components/ui/PendingService";
import { pageMetadata } from "@/lib/seo";

// Unpublished: awaiting client confirmation of the scope of child development services.
export const metadata = pageMetadata({
  title: "Child Development Services",
  description: "Information about wider child development services at Kahani Child Development Centre is being prepared.",
  path: "/services/child-development",
  noindex: true,
});

export default function Page() {
  return <PendingService name="Child development services" path="/services/child-development" />;
}
