import dynamic from "next/dynamic";
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
import { BuildingIcon, ClockIcon, RouteIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import { serviceAreas, type FaqItem } from "@/lib/site";

const AreaSwitcher = dynamic(() => import("@/components/sections/AreaSwitcher").then((mod) => mod.AreaSwitcher));

export const metadata = createPageMetadata({
  title: "Werkgebied Friesland | Verhuisservice Noord",
  description:
    "Wij verhuizen in heel Friesland met focus op Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen. Bekijk ons werkgebied.",
  path: "/werkgebied",
});

const faqItems: FaqItem[] = [
  {
    question: "Werken jullie in heel Friesland?",
    answer:
      "Ja, wij verhuizen provinciebreed en plannen dagelijks ritten in zowel steden als dorpen.",
  },
  {
    question: "Kan ik ook buiten Friesland verhuizen?",
    answer:
      "Ja, in overleg plannen wij ook verhuizingen van of naar omliggende provincies.",
  },
  {
    question: "Zijn de tarieven per regio verschillend?",
    answer:
      "De kosten zijn afhankelijk van werkzaamheden en route. U ontvangt vooraf altijd een duidelijke offerte.",
  },
];

const areaHighlights = [
  {
    title: "Kennis van lokale routes",
    text: "Wij plannen slim op basis van verkeersstromen, laadmogelijkheden en stadslogistiek.",
    bullets: ["Centrum en buitengebied", "Route-optimalisatie", "Realistische tijdsblokken"],
    icon: RouteIcon,
  },
  {
    title: "Snelle regionale inzet",
    text: "Met onze Friese dekking kunnen we snel capaciteit vrijmaken wanneer dat nodig is.",
    bullets: ["Snelle terugkoppeling", "Flexibele planning", "Betrouwbare beschikbaarheid"],
    icon: ClockIcon,
  },
  {
    title: "Consistente kwaliteit",
    text: "In elke regio hanteren we dezelfde standaard voor zorgvuldigheid en communicatie.",
    bullets: ["Vast kwaliteitsniveau", "Transparante afspraken", "Nette oplevering"],
    icon: BuildingIcon,
  },
] as const;

export default function WerkgebiedPage() {
  return (
    <>
      <Breadcrumbs current="Werkgebied" />
      <PageIntro
        eyebrow="Werkgebied Friesland"
        title="Lokaal verhuisbedrijf met dekking in heel Friesland"
        description="Van centrumgebied tot buitengebied: wij plannen per regio slim en efficiënt, met heldere communicatie en betrouwbare uitvoering."
      />
      <MovingGallery
        title="Verhuiswerk in heel Friesland"
        description="Van Leeuwarden tot Harlingen: een consistente aanpak op elke locatie."
      />

      <FeatureCardsSection
        id="werkgebied-voordelen"
        title="Wat onze Friese dekking u oplevert"
        description="U profiteert van korte lijnen, realistische planning en een verhuisteam dat de regio echt kent."
        items={areaHighlights}
      />

      <Container section>
        <Card>
          <h2>Regio&apos;s waar we dagelijks actief zijn</h2>
          <p>{serviceAreas.join(", ")} en omliggende plaatsen in Friesland.</p>
          <p>
            Bekijk ook onze <Link href="/verhuisdiensten">verhuisdiensten</Link>,
            <Link href="/zakelijk-verhuizen"> zakelijk verhuizen</Link> en
            <Link href="/seniorenverhuizing"> seniorenverhuizing</Link>.
          </p>
        </Card>
      </Container>

      <AreaSwitcher />
      <LocalProof
        title="Lokale service met vaste kwaliteit"
        text="In elke Friese regio werken we met dezelfde zorgvuldige standaard, planning en communicatie."
      />
      <Faq title="Veelgestelde vragen over ons werkgebied" items={faqItems} />
      <CtaBand
        title="Verhuizen binnen Friesland?"
        text="Vraag direct een offerte aan. Wij plannen uw verhuizing op basis van locatie, bereikbaarheid en gewenste datum."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Werkgebied verhuisservice Friesland",
            description: "Verhuisservice in heel Friesland met focus op Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.",
            path: "/werkgebied",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
