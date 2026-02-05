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
import { BuildingIcon, RouteIcon, ShieldIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Over Verhuisservice Noord",
  description:
    "Maak kennis met Verhuisservice Noord: ervaren verhuisbedrijf in Friesland met focus op zorgvuldigheid, betrouwbaarheid en betaalbare kwaliteit.",
  path: "/over-ons",
});

const faqItems: FaqItem[] = [
  {
    question: "Hoe lang bestaat Verhuisservice Noord?",
    answer: "Wij ondersteunen al meer dan 15 jaar verhuizingen in Friesland voor particulieren en bedrijven.",
  },
  {
    question: "Waarom kiezen klanten voor jullie?",
    answer:
      "Door onze regionale kennis, heldere communicatie en zorgvuldige uitvoering ervaren klanten rust en vertrouwen op de verhuisdag.",
  },
  {
    question: "Welke soorten verhuizingen doen jullie?",
    answer:
      "Particuliere verhuizingen, zakelijke verhuizingen, seniorenverhuizingen en spoedverhuizingen in heel Friesland.",
  },
];

const pillars = [
  {
    title: "Zorgvuldigheid",
    text: "Wij behandelen iedere inboedel alsof het onze eigen spullen zijn.",
    bullets: ["Beschermd transport", "Ervaren verhuizers", "Nette oplevering"],
    icon: ShieldIcon,
  },
  {
    title: "Regionale kennis",
    text: "Wij kennen routes, verkeersdrukte en laadmogelijkheden in Friesland.",
    bullets: ["Lokale planning", "Korte reistijden", "Snelle inzetbaarheid"],
    icon: RouteIcon,
  },
  {
    title: "Betrouwbare uitvoering",
    text: "Heldere afspraken, vaste teams en een planning die klopt.",
    bullets: ["Afspraak = afspraak", "Transparante communicatie", "Vaste contactpersoon"],
    icon: BuildingIcon,
  },
] as const;

export default function OverOnsPage() {
  return (
    <>
      <Breadcrumbs current="Over ons" />
      <PageIntro
        eyebrow="Over ons"
        title="Friese nuchterheid, professionele verhuiskwaliteit"
        description="Wij zijn een betrokken verhuisteam dat duidelijke afspraken combineert met zorgvuldige uitvoering."
      />
      <MovingGallery
        title="Ons team aan het werk"
        description="Zo werken wij dagelijks aan betrouwbare verhuizingen voor gezinnen en bedrijven in Friesland."
      />

      <FeatureCardsSection
        id="over-ons-kernwaarden"
        title="Waar wij dagelijks op sturen"
        description="Onze kernwaarden bepalen hoe wij plannen, communiceren en verhuizen in heel Friesland."
        items={pillars}
      />

      <Container section>
        <Card>
          <h2>Voor wie wij werken</h2>
          <ul>
            <li>Particulieren die zorgeloos willen verhuizen</li>
            <li>Bedrijven met een strakke planning</li>
            <li>Senioren met behoefte aan extra begeleiding</li>
            <li>Klanten die snel moeten schakelen bij spoed</li>
          </ul>
          <p>
            Lees meer over onze <Link href="/verhuisdiensten">verhuisdiensten</Link> of vraag direct een
            <Link href="/contact"> vrijblijvende offerte</Link> aan.
          </p>
        </Card>
      </Container>

      <LocalProof
        title="Gebouwd op vertrouwen in Friesland"
        text="Wij investeren in vaste teams, heldere communicatie en een nette oplevering op elk adres."
      />
      <Faq title="Veelgestelde vragen over Verhuisservice Noord" items={faqItems} />
      <CtaBand
        title="Kennismaken met ons verhuisteam?"
        text="Bel direct of stuur een bericht. We bespreken graag hoe we uw verhuizing in Friesland slim aanpakken."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Verhuisbedrijf Friesland",
            description: "Ervaren verhuisbedrijf in Friesland voor particuliere, zakelijke en specialistische verhuizingen.",
            path: "/over-ons",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
