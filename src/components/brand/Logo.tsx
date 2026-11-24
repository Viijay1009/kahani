import * as P from "./logo-paths";
import { cn } from "@/lib/utils";

export const BRAND = {
  dark: "#1F5A35",
  light: "#7DB943",
  yellow: "#F4C430",
  red: "#E0473E",
  grey: "#5E5850",
};

/** The parrot and its voice arcs, drawn from the traced flyer artwork. */
export function MarkLayers({ arcClassName }: { arcClassName?: string }) {
  return (
    <>
      <g fill="none" strokeWidth={46} className={arcClassName}>
        <path data-arc d={P.arcGreyL} stroke={BRAND.grey} />
        <path data-arc d={P.arcYellowL} stroke={BRAND.yellow} />
        <path data-arc d={P.arcGreyR} stroke={BRAND.grey} />
        <path data-arc d={P.arcYellowR} stroke={BRAND.yellow} />
      </g>
      <g data-bird>
        <path d={P.body} fill={BRAND.light} />
        <path d={P.wing} fill={BRAND.dark} data-wing />
        <path d={P.yellow} fill={BRAND.yellow} />
        <path d={P.beak} fill={BRAND.red} />
        <path d={P.eye} fill={BRAND.grey} />
      </g>
    </>
  );
}

export function ParrotMark({
  className,
  title,
  arcClassName,
}: {
  className?: string;
  title?: string;
  arcClassName?: string;
}) {
  return (
    <svg
      viewBox="20 0 740 824"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <MarkLayers arcClassName={arcClassName} />
    </svg>
  );
}

export function Logo({
  className,
  tone = "colour",
  showDescriptor = true,
}: {
  className?: string;
  tone?: "colour" | "light";
  showDescriptor?: boolean;
}) {
  const light = tone === "light";
  return (
    <svg
      viewBox={showDescriptor ? "20 0 1960 824" : "20 0 1940 824"}
      className={cn("h-auto", className)}
      role="img"
      aria-label="Kahani Child Development Centre"
    >
      <MarkLayers />
      <path d={P.word} fill={light ? "#FBF6EA" : BRAND.dark} />
      {showDescriptor && (
        <>
          <path
            d="M800 486 Q1380 500 1970 492"
            stroke={light ? "#F4C430" : BRAND.grey}
            strokeWidth={10}
            strokeLinecap="round"
            fill="none"
          />
          <text
            x="772"
            y="628"
            fontSize="104"
            textLength="1180"
            lengthAdjust="spacingAndGlyphs"
            fill={light ? "#E7F0DA" : "#4A4038"}
            style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif", fontWeight: 600 }}
          >
            Child Development Centre
          </text>
        </>
      )}
    </svg>
  );
}
