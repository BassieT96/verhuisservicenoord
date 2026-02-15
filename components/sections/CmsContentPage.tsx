import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/layout/JsonLd";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ContactCard } from "@/components/sections/ContactCard";
import { ContactQuoteForm } from "@/components/sections/ContactQuoteForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { LocalProof } from "@/components/sections/LocalProof";
import { MovingGallery } from "@/components/sections/MovingGallery";
import { PageIntro } from "@/components/sections/PageIntro";
import { AreaSwitcher } from "@/components/sections/AreaSwitcher";
import { resolveSectionIcon } from "@/components/sections/iconMap";
import { Card } from "@/components/ui/Card";
import { getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { CmsAreaItem, CmsContentPage, CmsSiteSettings } from "@/sanity/lib/content";
import { formatPhoneHref, formatWhatsappHref } from "@/sanity/lib/content";

type CmsContentPageSectionProps = {
  page: CmsContentPage;
  settings: CmsSiteSettings;
  areasBlock?: {
    heading: string;
    description: string;
    areas: CmsAreaItem[];
  };
};

export function CmsContentPageSection({ page, settings, areasBlock }: CmsContentPageSectionProps) {
  const phoneHref = formatPhoneHref(settings.phone);
  const whatsappHref = formatWhatsappHref(settings.whatsapp);
  const mappedFeatures = page.features.map((item) => ({
    ...item,
    icon: resolveSectionIcon(item.iconKey),
  }));

  return (
    <>
      <Breadcrumbs current={page.breadcrumb} />
      <PageIntro
        eyebrow={page.introEyebrow}
        title={page.introTitle}
        description={page.introDescription}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
        images={page.galleryItems.slice(0, 3)}
      />
      <MovingGallery title={page.galleryTitle} description={page.galleryDescription} items={page.galleryItems} />
      <FeatureCardsSection
        id={`${page.slug}-features`}
        title={page.featuresTitle}
        description={page.featuresDescription}
        items={mappedFeatures}
      />

      <Container section>
        <Card>
          <h2>{page.infoCardTitle}</h2>
          <p>{page.infoCardText}</p>
          {page.infoLinks.length > 0 ? (
            <p>
              {page.infoLinks.map((item, index) => (
                <span key={`${item.href}-${item.label}`}>
                  {index > 0 ? " · " : ""}
                  <Link href={item.href}>{item.label}</Link>
                </span>
              ))}
            </p>
          ) : null}
        </Card>
      </Container>

      {page.showAreaSwitcher && areasBlock ? (
        <AreaSwitcher heading={areasBlock.heading} description={areasBlock.description} areas={areasBlock.areas} />
      ) : null}

      {page.showContactCard ? (
        <ContactCard
          companyName={settings.companyName}
          address={settings.address}
          phoneHref={phoneHref}
          phoneDisplay={settings.phone}
          email={settings.email}
          serviceAreas={settings.serviceAreas}
          openingHours={settings.openingHours}
        />
      ) : null}

      {page.showContactForm ? <ContactQuoteForm phoneDisplay={settings.phone} /> : null}

      <LocalProof title={page.localProofTitle} text={page.localProofText} />
      <Faq title={page.faqTitle} items={page.faqItems} />
      <CtaBand title={page.ctaTitle} text={page.ctaText} phoneHref={phoneHref} whatsappHref={whatsappHref} />

      <JsonLd
        data={getServiceJsonLd({ name: page.jsonLdName, description: page.jsonLdDescription, path: `/${page.slug}` })}
      />
      <JsonLd data={getFaqJsonLd(page.faqItems)} />
    </>
  );
}
