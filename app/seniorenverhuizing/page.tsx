import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/layout/JsonLd";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { Faq } from "@/components/sections/Faq";
import { LocalProof } from "@/components/sections/LocalProof";
import { MovingGallery } from "@/components/sections/MovingGallery";
import { PageIntro } from "@/components/sections/PageIntro";
import { Card } from "@/components/ui/Card";
import { ClockIcon, ShieldIcon, BoxIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Seniorenverhuizing Friesland met persoonlijke begeleiding",
  description:
    "Seniorenverhuizing in Friesland met rust, aandacht en duidelijke begeleiding voor senioren en familie.",
  path: "/seniorenverhuizing",
});

const faqItems: FaqItem[] = [
  {
    question: "Kunnen jullie familie of mantelzorg meenemen in de planning?",
    answer:
      "Ja, we stemmen de verhuisdag af met familie of mantelzorgers zodat iedereen weet wat er wanneer gebeurt.",
  },
  {
    question: "Helpen jullie met inrichten op het nieuwe adres?",
    answer: "Ja, wij plaatsen meubels en essentiële spullen direct op de juiste plek voor een rustige start.",
  },
  {
    question: "Gaat een seniorenverhuizing altijd in een rustiger tempo?",
    answer:
      "Ja, wij nemen extra tijd voor uitleg, keuzes en emotionele momenten zonder de planning uit het oog te verliezen.",
  },
];

const cards = [
  {
    title: "Rustige begeleiding",
    text: "We plannen met ruimte en duidelijke stappen, zodat senior en familie grip houden op het proces.",
    bullets: ["Eén vertrouwd contactpersoon", "Rustige dagindeling", "Tijd voor persoonlijke keuzes"],
    icon: ClockIcon,
  },
  {
    title: "Zorgvuldig inpakken",
    text: "Kwetsbare en waardevolle spullen worden extra beschermd en duidelijk gelabeld per ruimte.",
    bullets: ["Extra beschermmateriaal", "Overzichtelijke labeling", "Zorgvuldige handling"],
    icon: ShieldIcon,
  },
  {
    title: "Vertrouwde oplevering",
    text: "Meubels en praktische items worden direct gebruiksklaar geplaatst op het nieuwe adres.",
    bullets: ["Slimme indeling", "Essentiële spullen eerst", "Rustige oplevercheck"],
    icon: BoxIcon,
  },
] as const;

export default function SeniorenverhuizingPage() {
  return (
    <>
      <Breadcrumbs current="Seniorenverhuizing" />
      <PageIntro
        eyebrow="Seniorenverhuizing Friesland"
        title="Verhuizen met rust, aandacht en vertrouwen"
        description="Wij begeleiden seniorenverhuizingen in Friesland stap voor stap, met extra zorg voor mens, ritme en persoonlijke spullen."
      />
      <MovingGallery
        title="Rustige seniorenverhuizingen in beeld"
        description="Aandacht voor tempo, communicatie en zorgvuldige handling van dierbare spullen."
      />

      <FeatureCardsSection
        id="senioren-aanpak"
        title="Aandachtige begeleiding voor senioren"
        description="Onze aanpak is persoonlijk, duidelijk en rustig, zodat senior en familie met vertrouwen kunnen verhuizen."
        items={cards}
      />

      <Container section>
        <Card>
          <h2>Meer weten?</h2>
          <p>
            Bekijk ook <Link href="/verhuisdiensten">verhuisdiensten</Link> en{" "}
            <Link href="/werkgebied">ons werkgebied in Friesland</Link>.
          </p>
        </Card>
      </Container>

      <LocalProof
        title="Extra rust op de verhuisdag"
        text="Wij nemen tijd voor uitleg, persoonlijke wensen en een rustige oplevering op de nieuwe plek."
      />
      <Faq title="Veelgestelde vragen over seniorenverhuizing" items={faqItems} />
      <CtaBand
        title="Seniorenverhuizing inplannen?"
        text="Neem contact op voor een rustige aanpak op maat, afgestemd op senior, familie en planning."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Seniorenverhuizing Friesland",
            description: "Persoonlijke seniorenverhuizing in Friesland met rustige begeleiding en zorgvuldig transport.",
            path: "/seniorenverhuizing",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
