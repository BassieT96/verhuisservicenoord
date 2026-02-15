import { client } from "@/sanity/lib/client";

export type CmsIconKey =
  | "file"
  | "building"
  | "clock"
  | "shield"
  | "route"
  | "box"
  | "phone"
  | "truck";

export type CmsFaqItem = {
  question: string;
  answer: string;
};

export type CmsFeatureItem = {
  title: string;
  text: string;
  bullets: string[];
  iconKey: CmsIconKey;
};

export type CmsLinkItem = {
  label: string;
  href: string;
};

export type CmsGalleryItem = {
  title: string;
  text: string;
  alt: string;
  imageUrl: string;
};

export type CmsMetricItem = {
  value: number;
  suffix?: string;
  label: string;
};

export type CmsAreaItem = {
  name: string;
  intro: string;
  usp: string;
  statA: string;
  statALabel: string;
  statB: string;
  statBLabel: string;
};

export type CmsStepItem = {
  id: string;
  title: string;
  detail: string;
  iconKey: CmsIconKey;
};

export type CmsServiceCardItem = {
  title: string;
  text: string;
  quick: string;
  href: string;
  iconKey: CmsIconKey;
};

export type CmsHighlightItem = {
  title: string;
  text: string;
  bullets: string[];
  href: string;
  cta: string;
  iconKey: CmsIconKey;
};

export type CmsBenefitItem = {
  title: string;
  text: string;
  backTitle: string;
  backText: string;
  iconKey: CmsIconKey;
};

export type CmsSiteSettings = {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  footerDescription: string;
  openingHours: string;
  trustPoints: string[];
  serviceAreas: string[];
};

export type CmsReview = {
  name: string;
  rating: number;
  location: string;
  text: string;
};

export type CmsDienst = {
  title: string;
  description: string;
  iconUrl?: string;
  price: string;
  quick: string;
  href: string;
  iconKey: CmsIconKey;
};

export type CmsHomePage = {
  title: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  routeStartLabel: string;
  routeEndLabel: string;
  routeBoxOneLabel: string;
  routeBoxTwoLabel: string;
  routeStatOneValue: string;
  routeStatOneLabel: string;
  routeStatTwoValue: string;
  routeStatTwoLabel: string;
  movingGalleryTitle: string;
  movingGalleryDescription: string;
  movingGalleryItems: CmsGalleryItem[];
  highlightsTitle: string;
  highlightsDescription: string;
  highlights: CmsHighlightItem[];
  metricsTitle?: string;
  metrics: CmsMetricItem[];
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: CmsBenefitItem[];
  localProofTitle: string;
  localProofText: string;
  stepsTitle: string;
  stepsDescription: string;
  steps: CmsStepItem[];
  servicesTitle: string;
  servicesDescription: string;
  servicesQuickFallback: string;
  serviceCards: CmsServiceCardItem[];
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseItems: CmsGalleryItem[];
  areasTitle: string;
  areasDescription: string;
  areas: CmsAreaItem[];
  reviewsTitle: string;
  reviewsDescription: string;
  reviewsScoreLabel: string;
  reviewsScoreText: string;
  faqTitle: string;
  faqItems: CmsFaqItem[];
  ctaTitle: string;
  ctaText: string;
};

export type CmsContentPage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumb: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  galleryTitle: string;
  galleryDescription: string;
  galleryItems: CmsGalleryItem[];
  featuresTitle: string;
  featuresDescription: string;
  features: CmsFeatureItem[];
  infoCardTitle: string;
  infoCardText: string;
  infoLinks: CmsLinkItem[];
  localProofTitle: string;
  localProofText: string;
  showAreaSwitcher: boolean;
  showContactCard: boolean;
  showContactForm: boolean;
  faqTitle: string;
  faqItems: CmsFaqItem[];
  ctaTitle: string;
  ctaText: string;
  jsonLdName: string;
  jsonLdDescription: string;
};

const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    companyName,
    phone,
    whatsapp,
    email,
    address,
    heroTitle,
    heroSubtitle,
    footerDescription,
    openingHours,
    trustPoints,
    serviceAreas
  }
`;

const homePageQuery = `
  *[_type == "homePage"][0]{
    title,
    description,
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    routeStartLabel,
    routeEndLabel,
    routeBoxOneLabel,
    routeBoxTwoLabel,
    routeStatOneValue,
    routeStatOneLabel,
    routeStatTwoValue,
    routeStatTwoLabel,
    movingGalleryTitle,
    movingGalleryDescription,
    movingGalleryItems[]{
      title,
      text,
      alt,
      "imageUrl": image.asset->url
    },
    highlightsTitle,
    highlightsDescription,
    highlights[]{
      title,
      text,
      bullets,
      href,
      cta,
      iconKey
    },
    metricsTitle,
    metrics[]{
      value,
      suffix,
      label
    },
    benefitsTitle,
    benefitsDescription,
    benefits[]{
      title,
      text,
      backTitle,
      backText,
      iconKey
    },
    localProofTitle,
    localProofText,
    stepsTitle,
    stepsDescription,
    steps[]{
      id,
      title,
      detail,
      iconKey
    },
    servicesTitle,
    servicesDescription,
    servicesQuickFallback,
    serviceCards[]{
      title,
      text,
      quick,
      href,
      iconKey
    },
    showcaseTitle,
    showcaseDescription,
    showcaseItems[]{
      title,
      text,
      alt,
      "imageUrl": image.asset->url
    },
    areasTitle,
    areasDescription,
    areas[]{
      name,
      intro,
      usp,
      statA,
      statALabel,
      statB,
      statBLabel
    },
    reviewsTitle,
    reviewsDescription,
    reviewsScoreLabel,
    reviewsScoreText,
    faqTitle,
    faqItems[]{
      question,
      answer
    },
    ctaTitle,
    ctaText
  }
`;

const contentPageQuery = `
  *[_type == "contentPage" && slug == $slug][0]{
    slug,
    seoTitle,
    seoDescription,
    breadcrumb,
    introEyebrow,
    introTitle,
    introDescription,
    galleryTitle,
    galleryDescription,
    galleryItems[]{
      title,
      text,
      alt,
      "imageUrl": image.asset->url
    },
    featuresTitle,
    featuresDescription,
    features[]{
      title,
      text,
      bullets,
      iconKey
    },
    infoCardTitle,
    infoCardText,
    infoLinks[]{
      label,
      href
    },
    localProofTitle,
    localProofText,
    showAreaSwitcher,
    showContactCard,
    showContactForm,
    faqTitle,
    faqItems[]{
      question,
      answer
    },
    ctaTitle,
    ctaText,
    jsonLdName,
    jsonLdDescription
  }
`;

const reviewsQuery = `
  *[_type == "review"] | order(_createdAt desc){
    name,
    rating,
    location,
    "text": text
  }
`;

const dienstenQuery = `
  *[_type == "dienst"] | order(_createdAt asc){
    title,
    description,
    "iconUrl": icon.asset->url,
    price,
    quick,
    href,
    iconKey
  }
`;

function normalizePhoneForHref(value: string) {
  return value.replace(/\s+/g, "");
}

export function formatPhoneHref(phone: string) {
  return `tel:${normalizePhoneForHref(phone)}`;
}

export function formatWhatsappHref(phone: string) {
  const cleaned = normalizePhoneForHref(phone).replace(/[^\d+]/g, "").replace("+", "");
  return `https://wa.me/${cleaned}`;
}

export async function getCmsSiteSettings() {
  return client.fetch<CmsSiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 60 } });
}

export async function getCmsHomePage() {
  return client.fetch<CmsHomePage | null>(homePageQuery, {}, { next: { revalidate: 60 } });
}

export async function getCmsContentPage(slug: string) {
  return client.fetch<CmsContentPage | null>(contentPageQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getCmsReviews() {
  return client.fetch<CmsReview[]>(reviewsQuery, {}, { next: { revalidate: 60 } });
}

export async function getCmsDiensten() {
  return client.fetch<CmsDienst[]>(dienstenQuery, {}, { next: { revalidate: 60 } });
}
