"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * "Unfolding stories, word by word." Each word brightens as the reader scrolls
 * through the statement. Words stay fully legible without JS or with reduced motion.
 */
export function WordByWord({
  text,
  as: Tag = "p",
  className,
  wordClassName,
  start = "top 78%",
  end = "bottom 45%",
}: {
  text: string;
  as?: "p" | "h2" | "h1";
  className?: string;
  wordClassName?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>(".reveal-word", ref.current);
      gsap.fromTo(
        words,
        { opacity: 0.14, y: 6 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start, end, scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className={cn("reveal-word", wordClassName)}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
