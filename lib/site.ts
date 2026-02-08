export const serviceAreas = ["Leeuwarden", "Drachten", "Sneek", "Heerenveen", "Harlingen"] as const;

export type ServiceArea = (typeof serviceAreas)[number];

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/verhuisdiensten", label: "Diensten" },
  { href: "/zakelijk-verhuizen", label: "Zakelijk" },
  { href: "/seniorenverhuizing", label: "Senioren" },
  { href: "/spoedverhuizing", label: "Spoed" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

export const staticRoutes = [
  "/",
  "/verhuisdiensten",
  "/zakelijk-verhuizen",
  "/seniorenverhuizing",
  "/spoedverhuizing",
  "/werkgebied",
  "/over-ons",
  "/contact",
] as const;

export const siteConfig = {
  name: "Verhuisservice Noord",
  legalName: "Verhuisservice Noord",
  shortName: "VSN",
  description:
    "Verhuisservice Noord is uw betrouwbare verhuisbedrijf in Friesland voor particuliere, zakelijke, senioren- en spoedverhuizingen.",
  url: "https://www.verhuisservicenoord.nl",
  locale: "nl_NL",
  phoneDisplay: "06 - 1234 5678",
  phonePlain: "+31612345678",
  phoneHref: "tel:0612345678",
  whatsappDisplay: "06 - 1234 5678",
  whatsappHref: "https://wa.me/31612345678",
  email: "info@verhuisservicenoord.nl",
  address: {
    street: "Heliconweg 62",
    postalCode: "8914 AT",
    city: "Leeuwarden",
    country: "NL",
  },
  openingHours: "Maandag t/m zaterdag: 07:00 - 21:00",
  socialImagePath: "/opengraph-image",
  trustPoints: ["Verzekerd vervoer", "Zorgvuldig ingepakt", "Snel ingepland"] as const,
} as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export type ReviewItem = {
  quote: string;
  author: string;
  location: string;
};
