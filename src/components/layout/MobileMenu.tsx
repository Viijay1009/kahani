"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { NAV } from "@/data/navigation";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { VoiceArcs } from "@/components/brand/VoiceArcs";
import { WhatsAppIcon } from "@/components/ui/icons";

export function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className={cn(
        "paper fixed inset-0 z-40 flex flex-col overflow-x-hidden overflow-y-auto px-6 pt-28 pb-8 transition-[clip-path,visibility] duration-500 ease-[var(--ease-out-soft)] xl:hidden",
        open ? "visible [clip-path:circle(150%_at_calc(100%-3.5rem)_3rem)]" : "invisible [clip-path:circle(0%_at_calc(100%-3.5rem)_3rem)]",
      )}
    >
      <VoiceArcs className="pointer-events-none absolute -right-24 bottom-10 size-80 opacity-25" />
      <nav aria-label="Mobile">
        <ul className="space-y-1">
          {NAV.map((item, i) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
              className={cn(
                "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline gap-3 py-1.5 font-display text-[2.15rem] leading-tight text-forest"
              >
                {isActive(item.href) && <span aria-hidden className="size-2 -translate-y-2 rounded-full bg-beak" />}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto grid grid-cols-2 gap-3 pt-10">
        <a
          href={CONTACT.phoneHref}
          className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-forest font-bold text-paper"
        >
          <Phone className="size-5" aria-hidden /> Call
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-marigold font-bold text-deep"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <Link
          href="/contact#enquiry"
          onClick={onClose}
          className="col-span-2 flex min-h-14 items-center justify-center rounded-full ring-2 ring-inset ring-forest font-bold text-forest"
        >
          Book an appointment
        </Link>
      </div>
    </div>
  );
}
