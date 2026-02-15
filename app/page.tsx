import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { HomeHighlights } from "@/components/sections/HomeHighlights";
import { MovingGallery } from "@/components/sections/MovingGallery";
import { MovingPhotoShowcase } from "@/components/sections/MovingPhotoShowcase";
import { Services } from "@/components/sections/Services";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { LocalProof } from "@/components/sections/LocalProof";
import { JsonLd } from "@/components/layout/JsonLd";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import { formatPhoneHref, formatWhatsappHref, getCmsDiensten, getCmsHomePage, getCmsReviews, getCmsSiteSettings } from "@/sanity/lib/content";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";

const Steps = dynamic(() => import("@/components/sections/Steps").then((mod) => mod.Steps));
const AreaSwitcher = dynamic(() => import("@/components/sections/AreaSwitcher").then((mod) => mod.AreaSwitcher));
const Reviews = dynamic(() => import("@/components/sections/Reviews").then((mod) => mod.Reviews));
const MetricsStrip = dynamic(() => import("@/components/sections/MetricsStrip").then((mod) => mod.MetricsStrip));
const ContactQuoteForm = dynamic(() =>
  import("@/components/sections/ContactQuoteForm").then((mod) => mod.ContactQuoteForm),
);

export async function generateMetadata() {
  const home = await getCmsHomePage();
  if (!home) {
    return createPageMetadata({
      title: "Homepage",
      description: "Vul homepage-content in Sanity.",
      path: "/",
    });
  }

  return createPageMetadata({
    title: home.title,
    description: home.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [home, settings, reviews, diensten] = await Promise.all([
    getCmsHomePage(),
    getCmsSiteSettings(),
    getCmsReviews(),
    getCmsDiensten(),
  ]);

  if (!home || !settings) {
    return <SanityEmptyState pageName="Homepage" />;
  }

  const phoneHref = formatPhoneHref(settings.phone);
  const whatsappHref = formatWhatsappHref(settings.whatsapp);

  return (
    <>
      <Hero
        eyebrow={home.heroEyebrow}
        title={home.heroTitle}
        subtitle={home.heroSubtitle}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
        trustPoints={settings.trustPoints}
        routeStartLabel={home.routeStartLabel}
        routeEndLabel={home.routeEndLabel}
        routeBoxOneLabel={home.routeBoxOneLabel}
        routeBoxTwoLabel={home.routeBoxTwoLabel}
        routeStatOneValue={home.routeStatOneValue}
        routeStatOneLabel={home.routeStatOneLabel}
        routeStatTwoValue={home.routeStatTwoValue}
        routeStatTwoLabel={home.routeStatTwoLabel}
      />
      <MovingGallery title={home.movingGalleryTitle} description={home.movingGalleryDescription} items={home.movingGalleryItems} />
      <HomeHighlights heading={home.highlightsTitle} description={home.highlightsDescription} items={home.highlights} />
      <ContactQuoteForm phoneDisplay={settings.phone} />
      <MetricsStrip items={home.metrics} />
      <Benefits heading={home.benefitsTitle} description={home.benefitsDescription} items={home.benefits} />
      <LocalProof
        title={home.localProofTitle}
        text={home.localProofText}
      />
      <Steps heading={home.stepsTitle} description={home.stepsDescription} items={home.steps} />
      <Services
        heading={home.servicesTitle}
        description={home.servicesDescription}
        quickFallback={home.servicesQuickFallback}
        items={
          diensten.length > 0
            ? diensten.map((item) => ({
                title: item.title,
                text: item.description,
                quick: item.quick,
                href: item.href,
                iconKey: item.iconKey,
              }))
            : home.serviceCards
        }
      />
      <MovingPhotoShowcase title={home.showcaseTitle} description={home.showcaseDescription} items={home.showcaseItems} />
      <AreaSwitcher heading={home.areasTitle} description={home.areasDescription} areas={home.areas} />
      <Reviews
        heading={home.reviewsTitle}
        description={home.reviewsDescription}
        scoreLabel={home.reviewsScoreLabel}
        scoreText={home.reviewsScoreText}
        items={reviews}
      />
      <Faq title={home.faqTitle} items={home.faqItems} />
      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Verhuisservice Friesland",
            description:
              "Particuliere en zakelijke verhuisservice in Friesland met zorgvuldige uitvoering en duidelijke planning.",
            path: "/",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(home.faqItems)} />
    </>
  );
}
