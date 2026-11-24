import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-[0.98rem] font-bold tracking-[0.005em] transition-[transform,box-shadow,color] duration-200 ease-[var(--ease-state)] active:scale-[0.97] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper shadow-[0_1px_0_rgba(255,255,255,.15)_inset,0_10px_24px_-14px_rgba(15,54,34,.8)] hover:text-deep",
  secondary: "bg-transparent text-forest ring-2 ring-inset ring-forest/80 hover:text-deep",
  light: "bg-paper text-forest hover:text-deep",
  ghost: "bg-paper/10 text-paper ring-1 ring-inset ring-paper/40 hover:text-deep",
};

const fill: Record<Variant, string> = {
  primary: "bg-marigold",
  secondary: "bg-marigold",
  light: "bg-marigold",
  ghost: "bg-paper",
};

/** Pill button. On hover a marigold wash rises from below, like the sun on the logo's arcs. */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 rounded-[inherit] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:scale-y-100 motion-reduce:transition-none",
          fill[variant],
        )}
      />
      {icon && <span className="relative shrink-0 [&>svg]:size-[1.15em]">{icon}</span>}
      <span className="relative">{children}</span>
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
