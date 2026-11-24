"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ParrotMark } from "@/components/brand/Logo";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ParrotScene = dynamic(() => import("./ParrotScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Brand introduction: coloured particles gather into the parrot, the wing sweeps in
 * like a leaf, then the crisp vector mark takes over. The 2D mark is always the
 * final asset and the fallback (reduced motion, no WebGL, no JS).
 */
export function LogoAnimation({ className }: { className?: string }) {
  const markRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<"pending" | "running" | "off">("pending");
  const [dense, setDense] = useState(true);

  useEffect(() => {
    const el = markRef.current;
    if (!el) return;
    el.dataset.controlled = "true";
    if (prefersReducedMotion() || !hasWebGL()) {
      gsap.set(el, { opacity: 1 });
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability check on mount
      setScene("off");
      return;
    }
    gsap.set(el, { opacity: 0 });
    setDense(window.innerWidth >= 768);
    setScene("running");
  }, []);

  const onAssembled = () => {
    const el = markRef.current;
    if (!el) return;
    const tl = gsap.timeline({ onComplete: () => window.setTimeout(() => setScene("off"), 600) });
    tl.to(el, { opacity: 1, duration: 0.9, ease: "power2.out" })
      .fromTo(
        el.querySelector("[data-wing]"),
        { rotate: -10, transformOrigin: "62% 12%" },
        { rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" },
        0,
      )
      .fromTo(
        el.querySelectorAll("[data-arc]"),
        { scale: 0.92, opacity: 0.4, transformOrigin: "380px 335px" },
        { scale: 1, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" },
        0.1,
      );
  };

  return (
    <div className={cn("relative aspect-[740/824]", className)}>
      <div ref={markRef} className="hero-mark absolute inset-0">
        <ParrotMark className="size-full" title="The Kahani parrot" />
      </div>
      {scene === "running" && <ParrotScene onAssembled={onAssembled} dense={dense} />}
    </div>
  );
}
