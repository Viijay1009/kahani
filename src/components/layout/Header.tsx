"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NAV } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(false);
    setOpenDrop(false);
  }

  useEffect(() => {
    if (!openDrop) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenDrop(false);
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpenDrop(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openDrop]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[calc(var(--frame-inset)+0.5rem)] pt-[calc(var(--frame-inset)+0.5rem)]">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[88rem] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-state)] md:pl-5",
            scrolled || openMenu
              ? "bg-paper/90 shadow-[0_12px_32px_-18px_rgba(15,54,34,.45)] ring-1 ring-forest/10 backdrop-blur-md"
              : "bg-transparent",
          )}
        >
          <Link href="/" aria-label="Kahani Child Development Centre, home" className="shrink-0 rounded-lg">
            <Logo className="w-[8.5rem] md:w-[9.75rem]" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) =>
                item.children ? (
                  <li
                    key={item.href}
                    ref={dropRef}
                    className="relative"
                    onMouseEnter={() => setOpenDrop(true)}
                    onMouseLeave={() => setOpenDrop(false)}
                  >
                    <div className="flex items-center">
                      <NavLink href={item.href} active={isActive(item.href)}>
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={openDrop}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={() => setOpenDrop((v) => !v)}
                        className="-ml-2 grid size-8 place-items-center rounded-full text-forest/80 hover:text-forest"
                      >
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-200", openDrop && "rotate-180")}
                        />
                      </button>
                    </div>
                    <div
                      id="services-menu"
                      className={cn(
                        "absolute top-full left-1/2 w-[23rem] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-out-soft)]",
                        openDrop ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <ul className="paper rounded-[1.5rem] p-2 shadow-[0_24px_48px_-24px_rgba(15,54,34,.5)] ring-1 ring-forest/10">
                        {item.children.map((c, i) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={cn(
                                "block rounded-xl px-4 py-2.5 text-[0.95rem] text-ink transition-colors duration-150 hover:bg-sprout hover:text-forest",
                                i === 0 && "mb-1 bg-sprout/60 font-bold text-forest",
                              )}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <NavLink href={item.href} active={isActive(item.href)}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/contact#enquiry" className="min-h-11 px-5">
                Book an appointment
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpenMenu((v) => !v)}
              aria-expanded={openMenu}
              aria-controls="mobile-menu"
              aria-label={openMenu ? "Close menu" : "Open menu"}
              className="relative grid size-12 place-items-center rounded-full bg-forest text-paper transition-transform duration-200 active:scale-95 xl:hidden"
            >
              <span
                className={cn(
                  "absolute h-[2px] w-5 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-soft)]",
                  openMenu ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[2px] w-5 rounded bg-current transition-transform duration-300 ease-[var(--ease-out-soft)]",
                  openMenu ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} isActive={isActive} />
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav relative inline-flex px-3 py-2 text-[0.95rem] font-semibold transition-colors duration-200",
        active ? "text-forest" : "text-ink/80 hover:text-forest",
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 bottom-1 h-[3px] origin-left rounded-full bg-marigold transition-transform duration-300 ease-[var(--ease-out-soft)]",
          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
        )}
      />
    </Link>
  );
}
