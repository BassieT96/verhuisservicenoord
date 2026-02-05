import type { Metadata } from "next";
import { serviceAreas, siteConfig, type FaqItem } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const canonical = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: siteConfig.socialImagePath,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Verhuisbedrijf Friesland`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.socialImagePath],
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteConfig.url}#company`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phonePlain,
    email: siteConfig.email,
    areaServed: serviceAreas,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "21:00",
      },
    ],
    priceRange: "€€",
  };
}

type ServiceJsonLdInput = {
  name: string;
  description: string;
  path: string;
};

export function getServiceJsonLd({ name, description, path }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteConfig.url}${path}`,
    areaServed: serviceAreas,
    provider: {
      "@type": "MovingCompany",
      "@id": `${siteConfig.url}#company`,
      name: siteConfig.name,
      telephone: siteConfig.phonePlain,
    },
  };
}

export function getFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
