import { cn } from "@/lib/utils";

/** A hand-drawn sprig of leaves, in the spirit of the flyer's watercolour foliage. */
export function Sprig({ className, tone = "leaf" }: { className?: string; tone?: "leaf" | "forest" | "paper" }) {
  const fill =
    tone === "paper" ? "rgba(251,246,234,.14)" : tone === "forest" ? "var(--color-forest)" : "var(--color-leaf)";
  const vein = tone === "paper" ? "rgba(251,246,234,.22)" : "rgba(15,54,34,.35)";
  return (
    <svg viewBox="0 0 120 200" className={cn("overflow-visible", className)} aria-hidden>
      <path d="M60 198 C58 150 62 100 70 10" stroke={vein} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[
        { d: "M61 170 C30 168 14 150 10 128 C34 128 52 144 61 170Z", o: 0.9 },
        { d: "M62 150 C92 146 108 124 110 100 C86 104 68 122 62 150Z", o: 0.75 },
        { d: "M63 118 C36 112 24 92 24 70 C46 74 60 92 63 118Z", o: 0.95 },
        { d: "M66 88 C92 82 104 62 104 40 C82 46 68 64 66 88Z", o: 0.8 },
        { d: "M68 54 C52 46 48 28 52 12 C66 20 72 36 68 54Z", o: 0.9 },
      ].map((l, i) => (
        <path key={i} d={l.d} fill={fill} opacity={l.o} />
      ))}
    </svg>
  );
}

/** A single broad leaf used for scattered, floating details. */
export function Leaf({ className, color = "var(--color-leaf)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <path d="M30 88 C6 66 2 36 30 2 C58 36 54 66 30 88Z" fill={color} />
      <path d="M30 84 C30 60 30 34 30 8" stroke="rgba(15,54,34,.35)" strokeWidth="2" fill="none" />
    </svg>
  );
}
