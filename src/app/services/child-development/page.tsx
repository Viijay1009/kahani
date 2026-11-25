import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

// Full page is in git history; it returns once the content is ready.
export const metadata: Metadata = {
  title: "Child development",
  robots: { index: false },
  alternates: { canonical: "/services/child-development" },
};

export default function Page() {
  return <ComingSoon title="Child development" />;
}
