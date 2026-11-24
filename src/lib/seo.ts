import type { Metadata } from "next";
import { CONTACT, SITE } from "./constants";

const OG_IMAGE = { url: "/img/og-kahani.jpg", width: 1200, height: 630, alt: "Kahani Child Development Centre logo" };

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const abs = (path: string) => new URL(path, SITE.url).toString();

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": abs("/#business"),
    name: SITE.name,
    alternateName: "Kahani CDC",
    description: SITE.description,
    slogan: SITE.tagline,
    url: abs("/"),
    logo: abs("/img/kahani-parrot.png"),
    image: abs("/img/og-kahani.jpg"),
    telephone: "+91-81059-35183",
    email: CONTACT.email,
    medicalSpecialty: "SpeechPathology",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: `${CONTACT.address.locality}, ${CONTACT.address.city}`,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    areaServed: { "@type": "City", name: "Bengaluru" },
    sameAs: [CONTACT.instagram],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(s: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: "Speech and language therapy for children",
    description: s.description,
    url: abs(s.path),
    provider: { "@id": abs("/#business") },
    areaServed: { "@type": "City", name: "Bengaluru" },
    audience: { "@type": "PeopleAudience", audienceType: "Children and their parents" },
  };
}
