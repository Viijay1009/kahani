import { cn } from "@/lib/utils";

type Arc = { r: number; from: number; to: number; color: string; width?: number };

const DEFAULT_ARCS: Arc[] = [
  { r: 46, from: 145, to: 250, color: "var(--color-marigold)" },
  { r: 60, from: 140, to: 238, color: "var(--color-bark)" },
  { r: 46, from: 22, to: 66, color: "var(--color-marigold)" },
  { r: 60, from: 24, to: 74, color: "var(--color-bark)" },
  { r: 74, from: 150, to: 222, color: "var(--color-leaf)" },
];

function arcPath(r: number, a0: number, a1: number) {
  const p = (a: number) => {
    const rad = (a * Math.PI) / 180;
    return `${(80 + r * Math.cos(rad)).toFixed(2)} ${(80 + r * Math.sin(rad)).toFixed(2)}`;
  };
  return `M${p(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`;
}

/**
 * The broken concentric arcs from the Kahani mark: sound travelling outward.
 * Used as the site's one decorative device.
 */
export function VoiceArcs({
  className,
  arcs = DEFAULT_ARCS,
  strokeWidth = 7,
}: {
  className?: string;
  arcs?: Arc[];
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 160 160" className={cn("overflow-visible", className)} aria-hidden>
      {arcs.map((a, i) => (
        <path
          key={i}
          data-voice-arc
          d={arcPath(a.r, a.from, a.to)}
          fill="none"
          stroke={a.color}
          strokeWidth={a.width ?? strokeWidth}
          strokeLinecap="butt"
          pathLength={1}
        />
      ))}
    </svg>
  );
}
