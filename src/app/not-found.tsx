import { ParrotMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="paper frame relative mt-[var(--frame-inset)] grid min-h-[80svh] place-items-center px-5 py-32 text-center">
      <div className="mx-auto max-w-xl">
        <ParrotMark className="mx-auto w-24" />
        <p className="mt-6 font-hand text-xl text-bark">This page isn&rsquo;t part of our story.</p>
        <h1 className="mt-3 text-[length:var(--text-display-m)]">We couldn&rsquo;t find that page</h1>
        <p className="mt-5 text-lg text-ink/80">The link may be old, or the address may have a typo.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Go to the home page</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
