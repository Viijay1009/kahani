"use client";

import Link from "next/link";
import { useRef } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { APPROACH } from "@/data/services";
import { ParrotMark } from "@/components/brand/Logo";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

if (typeof window !== "undefined") gsap.registerPlugin(MotionPathPlugin);

const ICONS = [
  // Individualised plan: a page with one child's name line
  <svg key="0" viewBox="0 0 64 64" aria-hidden><rect x="12" y="6" width="40" height="52" rx="6" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3.5" /><path d="M20 20h24M20 30h18M20 40h22" stroke="var(--color-leaf)" strokeWidth="4" strokeLinecap="round" /><circle cx="46" cy="46" r="9" fill="var(--color-marigold)" /></svg>,
  // Play: stacked blocks and a ball
  <svg key="1" viewBox="0 0 64 64" aria-hidden><rect x="8" y="34" width="22" height="22" rx="4" fill="var(--color-leaf)" /><rect x="18" y="12" width="22" height="22" rx="4" fill="var(--color-marigold)" /><circle cx="46" cy="44" r="12" fill="var(--color-beak)" /><path d="M36 40c6 2 14 2 20 0" stroke="var(--color-paper)" strokeWidth="3" fill="none" /></svg>,
  // Evidence: an open book with a leaf bookmark
  <svg key="2" viewBox="0 0 64 64" aria-hidden><path d="M6 16c10-4 18-4 26 2 8-6 16-6 26-2v34c-10-4-18-4-26 2-8-6-16-6-26-2Z" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3.5" strokeLinejoin="round" /><path d="M32 18v34" stroke="var(--color-forest)" strokeWidth="3" /><path d="M44 8c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="var(--color-leaf)" /></svg>,
  // Parent guidance: two hearts, big and small
  <svg key="3" viewBox="0 0 64 64" aria-hidden><path d="M26 54C10 42 4 32 8 22c3-8 14-10 18-2 4-8 15-6 18 2 4 10-2 20-18 32Z" fill="var(--color-beak)" /><path d="M48 46c-7-5-10-9-8-14 1-4 6-5 8-1 2-4 7-3 8 1 2 5-1 9-8 14Z" fill="var(--color-marigold)" /></svg>,
  // Safe environment: a sprout in a pot
  <svg key="4" viewBox="0 0 64 64" aria-hidden><path d="M18 40h28l-4 18H22Z" fill="var(--color-marigold)" /><path d="M32 40V22" stroke="var(--color-forest)" strokeWidth="3.5" strokeLinecap="round" /><path d="M32 26C22 26 16 18 16 10c10 0 16 8 16 16Z" fill="var(--color-leaf)" /><path d="M32 22c0-8 6-14 16-14 0 8-6 14-16 14Z" fill="var(--color-forest)" /></svg>,
];

function vinePath(width: number, height: number) {
  const mid = height / 2;
  const amp = height * 0.32;
  const step = 340;
  let d = `M0 ${mid}`;
  for (let x = 0, i = 0; x < width; x += step, i++) {
    const dir = i % 2 === 0 ? -1 : 1;
    d += ` C${x + step * 0.35} ${mid + dir * amp}, ${x + step * 0.65} ${mid + dir * amp}, ${x + step} ${mid}`;
  }
  return d;
}

export function Approach({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const root = useRef<HTMLElement>(null);
  const H = headingLevel;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = root.current!.querySelector<HTMLElement>("[data-pin]")!;
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const svg = root.current!.querySelector<SVGSVGElement>("[data-vine]")!;
        const vine = svg.querySelector("path")!;
        const bird = root.current!.querySelector<HTMLElement>("[data-bird]")!;
        root.current!.classList.add("is-horizontal");

        const list = root.current!.querySelector<HTMLElement>(".approach-list")!;
        // The vine starts where the milestones begin, after the heading panel
        const vineLeft = () => list.offsetLeft - 60;
        const vineWidth = () => track.scrollWidth - vineLeft();
        const build = () => {
          const w = vineWidth();
          const h = svg.clientHeight;
          svg.style.left = `${vineLeft()}px`;
          svg.style.width = `${w}px`;
          svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
          vine.setAttribute("d", vinePath(w, h));
        };
        build();

        const distance = () => track.scrollWidth - window.innerWidth + 80;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefreshInit: build,
          },
        });
        tl.to(track, { x: () => -distance() }, 0).to(
          bird,
          {
            motionPath: {
              path: vine,
              align: vine,
              alignOrigin: [0.5, 0.6],
              // Keeps the bird at a steady spot on screen while the path scrolls beneath it
              start: 0,
              end: () => Math.min(1, distance() / vineWidth()),
            },
          },
          0,
        );
        gsap.from(vine, {
          strokeDashoffset: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Each milestone wakes as the bird reaches it
        gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((m) => {
          gsap.from(m.querySelector("[data-dot]"), {
            scale: 0.4,
            backgroundColor: "rgba(31,90,53,.15)",
            duration: 0.5,
            scrollTrigger: { trigger: m, containerAnimation: tl, start: "left 45%", toggleActions: "play none none reverse" },
          });
        });

        return () => root.current?.classList.remove("is-horizontal");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Refresh pinned measurements once fonts settle
  useGSAP(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return (
    <section
      ref={root}
      aria-labelledby="approach-title"
      className="approach frame relative mt-[var(--frame-inset)] bg-sand"
    >
      <div data-pin className="relative overflow-hidden lg:min-h-[100svh]">
        <div data-track className="approach-track relative px-5 pt-24 pb-24 md:px-10">
          <svg data-vine aria-hidden className="approach-vine pointer-events-none absolute top-[42%] left-0 hidden h-48 overflow-visible">
            <path
              d=""
              fill="none"
              stroke="var(--color-leaf)"
              strokeWidth="3"
              strokeDasharray="1"
              pathLength={1}
              strokeLinecap="round"
            />
          </svg>
          <div data-bird aria-hidden className="approach-bird absolute top-0 left-0 z-10 hidden w-16">
            <ParrotMark className="w-full" />
          </div>

          <div className="approach-intro shrink-0">
            <H id="approach-title" className="max-w-[12ch] text-[length:var(--text-display-l)]">
              Little steps. Meaningful progress.
            </H>
            <p className="measure mt-6 text-lg text-ink/80">
              Five principles shape every session at Kahani. Together they make a path that starts with your child
              and keeps you close at every step.
            </p>
            <Link href="/approach" className="prose-link mt-4 inline-block font-semibold">
              Read about our approach
            </Link>
          </div>

          <ol className="approach-list">
            {APPROACH.map((a, i) => (
              <li key={a.title} data-milestone className="approach-item relative">
                <div className="flex items-center gap-4">
                  <span
                    data-dot
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-marigold font-display text-xl text-deep"
                  >
                    {i + 1}
                  </span>
                  <span className="font-hand text-lg text-bark">{a.note}</span>
                </div>
                <div className="mt-6 w-20">{ICONS[i]}</div>
                <h3 className="mt-5 text-[length:var(--text-display-s)]">{a.title}</h3>
                <p className="mt-3 max-w-[34ch] text-ink/80">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
