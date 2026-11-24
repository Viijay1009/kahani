"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Reveals children marked with [data-reveal] when the block enters the viewport.
 * Content is visible without JavaScript; the animation only runs once hydrated.
 */
export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  stagger = 0.08,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
      if (!items.length) return;
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}

/** Clip-path mask reveal for images: the frame opens upward like a page being turned. */
export function MaskReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(100% 0% 0% 0% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
      const img = ref.current?.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } },
        );
      }
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
