import { Leaf } from "@/components/brand/Botanical";

// A handful of leaves drifting in the hero margins. CSS-only, paused for reduced motion.
const LEAVES = [
  { cls: "top-[18%] left-[46%] w-5 rotate-[24deg]", color: "var(--color-leaf)", dur: "11s", delay: "0s" },
  { cls: "top-[86%] left-[58%] w-4 -rotate-[40deg] hidden lg:block", color: "var(--color-marigold)", dur: "13s", delay: "-4s" },
  { cls: "top-[12%] right-[8%] w-6 rotate-[60deg]", color: "var(--color-forest)", dur: "15s", delay: "-2s" },
  { cls: "bottom-[22%] right-[4%] w-4 rotate-[10deg]", color: "var(--color-leaf)", dur: "12s", delay: "-7s" },
  { cls: "top-[40%] left-[3%] w-4 -rotate-[70deg] hidden md:block", color: "var(--color-marigold)", dur: "14s", delay: "-5s" },
];

export function FloatingLeaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {LEAVES.map((l, i) => (
        <div
          key={i}
          className={`leaf-drift absolute ${l.cls}`}
          style={{ animationDuration: l.dur, animationDelay: l.delay }}
        >
          <Leaf className="w-full" color={l.color} />
        </div>
      ))}
    </div>
  );
}
