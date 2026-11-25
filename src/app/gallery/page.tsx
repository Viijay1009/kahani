import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

// Full page is in git history; it returns once the content is ready.
export const metadata: Metadata = {
  title: "Gallery",
  robots: { index: false },
  alternates: { canonical: "/gallery" },
};

export default function Page() {
  return <ComingSoon title="Gallery" />;
}
