"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Footer entrance: columns settle in, then the big wordmark rises from below the fold line. */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      tl.from("[data-footer-item]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.8, ease: "expo.out" }).from(
        "[data-footer-word]",
        { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out" },
        "-=0.5",
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}
