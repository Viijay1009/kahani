import { SERVICES } from "./services";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Speech therapy overview", href: "/services/speech-therapy" },
      ...SERVICES.map((s) => ({
        label: s.title,
        href: `/services/speech-therapy/${s.slug}`,
      })),
    ],
  },
  { label: "Our Approach", href: "/approach" },
  { label: "Our Team", href: "/our-team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
