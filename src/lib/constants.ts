// Single source of truth for verified business details.
// Anything not confirmed by the client lives in docs/CONTENT_REQUIREMENTS.md, not here.

export const SITE = {
  name: "Kahani Child Development Centre",
  shortName: "Kahani",
  tagline: "Unfolding stories, word by word.",
  description:
    "Compassionate child development and speech therapy support at Kahani Child Development Centre, BTM 2nd Stage, Bengaluru. Contact us to enquire about appointments.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en_IN",
} as const;

export const CONTACT = {
  phoneDisplay: "+91 81059 35183",
  phoneHref: "tel:+918105935183",
  whatsappNumber: "918105935183",
  whatsappHref: "https://wa.me/918105935183",
  email: "kahani.cdc@outlook.com",
  instagram: "https://www.instagram.com/kahani.cdc/",
  instagramHandle: "@kahani.cdc",
  address: {
    street: "35, 16th Main Road, Mahadeshwara Nagar",
    locality: "BTM 2nd Stage",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560076",
    country: "IN",
  },
} as const;

export const ADDRESS_LINES = [
  CONTACT.address.street,
  CONTACT.address.locality,
  `${CONTACT.address.city}, ${CONTACT.address.region} – ${CONTACT.address.postalCode}`,
];

export const MAP_QUERY = encodeURIComponent(
  `Kahani Child Development Centre, ${CONTACT.address.street}, ${CONTACT.address.locality}, ${CONTACT.address.city} ${CONTACT.address.postalCode}`,
);
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
export const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export function whatsappLink(message?: string) {
  return message
    ? `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`
    : CONTACT.whatsappHref;
}
