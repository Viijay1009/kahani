import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

// Full page is in git history; it returns once the content is ready.
export const metadata: Metadata = {
  title: "Speech therapy",
  robots: { index: false },
  alternates: { canonical: "/services/speech-therapy" },
};

export default function Page() {
  return <ComingSoon title="Speech therapy" />;
}
