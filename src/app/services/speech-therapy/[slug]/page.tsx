import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { ComingSoon } from "@/components/ui/ComingSoon";

// Full service pages are in git history; they return once the content is ready.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/speech-therapy/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  return { title: s?.title ?? "Speech therapy", robots: { index: false } };
}

export default async function Page({ params }: PageProps<"/services/speech-therapy/[slug]">) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  return <ComingSoon title={s.title} />;
}
