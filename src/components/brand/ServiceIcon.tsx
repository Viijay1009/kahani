import type { ServiceIcon as Kind } from "@/data/services";
import { cn } from "@/lib/utils";

const F = "var(--color-forest)";
const L = "var(--color-leaf)";
const Y = "var(--color-marigold)";
const B = "var(--color-bark)";
const P = "var(--color-paper)";
const R = "var(--color-beak)";

/**
 * Eight storybook "stamps", one per area of support. Shapes are simple and
 * chunky so they read at 40px in a list and at 240px on the services stage.
 */
export function ServiceIcon({ kind, className }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={cn("overflow-visible", className)} aria-hidden>
      {ICONS[kind]}
    </svg>
  );
}

const ICONS: Record<Kind, React.ReactNode> = {
  // Lips in profile with breath arcs
  "speech-motor": (
    <>
      <path d="M14 50 C22 34 40 32 48 40 C56 32 74 34 82 50 C70 66 26 66 14 50Z" fill={R} />
      <path d="M20 50 C34 54 62 54 76 50" stroke={P} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M86 30 A28 28 0 0 1 86 70" stroke={Y} strokeWidth="6" fill="none" />
      <path d="M10 30 A28 28 0 0 0 10 70" stroke={L} strokeWidth="6" fill="none" />
    </>
  ),
  // Blocks in a rising staircase: planning one step after another
  apraxia: (
    <>
      <rect x="8" y="58" width="26" height="26" rx="4" fill={L} />
      <rect x="36" y="40" width="26" height="44" rx="4" fill={Y} />
      <rect x="64" y="20" width="26" height="64" rx="4" fill={F} />
      <text x="21" y="77" textAnchor="middle" fontSize="16" fontWeight="800" fill={F} fontFamily="var(--font-nunito)">b</text>
      <text x="49" y="59" textAnchor="middle" fontSize="16" fontWeight="800" fill={F} fontFamily="var(--font-nunito)">a</text>
      <path d="M70 16 C76 6 86 6 90 12" stroke={B} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  // The neurodiversity infinity loop
  autism: (
    <>
      <path
        d="M48 48 C40 34 18 30 12 48 C18 66 40 62 48 48 C56 34 78 30 84 48 C78 66 56 62 48 48Z"
        fill="none"
        stroke={L}
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path d="M48 48 C56 34 78 30 84 48 C78 66 56 62 48 48Z" fill="none" stroke={Y} strokeWidth="11" strokeLinejoin="round" />
    </>
  ),
  // A path that wanders, then settles on the centre
  attention: (
    <>
      <circle cx="56" cy="50" r="30" fill="none" stroke={L} strokeWidth="6" />
      <circle cx="56" cy="50" r="16" fill="none" stroke={Y} strokeWidth="6" />
      <circle cx="56" cy="50" r="5" fill={F} />
      <path d="M6 84 C20 70 10 60 24 56 C36 52 34 62 48 54" stroke={B} strokeWidth="4" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
    </>
  ),
  // A little horn with sound leaving it
  articulation: (
    <>
      <path d="M14 40 L40 40 L70 20 L70 76 L40 56 L14 56Z" fill={F} strokeLinejoin="round" />
      <rect x="22" y="56" width="12" height="18" rx="3" fill={L} />
      <path d="M78 34 C84 42 84 54 78 62" stroke={Y} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M86 26 C96 40 96 56 86 70" stroke={Y} strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  // A river flowing smoothly past stones
  fluency: (
    <>
      <path d="M4 40 C20 28 32 52 48 40 C64 28 76 52 92 40" stroke={L} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M4 60 C20 48 32 72 48 60 C64 48 76 72 92 60" stroke={Y} strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="80" rx="9" ry="5" fill={B} />
      <ellipse cx="62" cy="20" rx="7" ry="4" fill={B} />
    </>
  ),
  // Two speech bubbles in conversation
  social: (
    <>
      <path d="M8 18 H54 A8 8 0 0 1 62 26 V48 A8 8 0 0 1 54 56 H26 L14 68 V56 H16 A8 8 0 0 1 8 48Z" fill={L} />
      <path d="M88 40 H44 A8 8 0 0 0 36 48 V70 A8 8 0 0 0 44 78 H70 L82 90 V78 H80 A8 8 0 0 0 88 70Z" fill={Y} />
      <circle cx="52" cy="60" r="3" fill={F} />
      <circle cx="62" cy="60" r="3" fill={F} />
      <circle cx="72" cy="60" r="3" fill={F} />
    </>
  ),
  // A communication board of picture tiles
  aac: (
    <>
      <rect x="8" y="10" width="80" height="76" rx="10" fill={F} />
      <rect x="16" y="18" width="30" height="28" rx="5" fill={P} />
      <rect x="50" y="18" width="30" height="28" rx="5" fill={P} />
      <rect x="16" y="50" width="30" height="28" rx="5" fill={P} />
      <rect x="50" y="50" width="30" height="28" rx="5" fill={Y} />
      <circle cx="31" cy="32" r="7" fill={Y} />
      <path d="M58 38 L65 26 L72 38Z" fill={L} />
      <path d="M24 64 h14 M31 57 v14" stroke={R} strokeWidth="4" strokeLinecap="round" />
      <path d="M58 64 C62 56 70 56 72 64" stroke={F} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
};
