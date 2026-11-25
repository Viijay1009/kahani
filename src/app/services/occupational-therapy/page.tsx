import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

// Full page is in git history; it returns once the content is ready.
export const metadata: Metadata = {
  title: "Occupational therapy",
  robots: { index: false },
  alternates: { canonical: "/services/occupational-therapy" },
};

export default function Page() {
  return <ComingSoon title="Occupational therapy" />;
}
