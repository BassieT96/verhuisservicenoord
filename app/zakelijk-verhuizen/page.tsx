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
import type { FaqItem } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Zakelijk verhuizen in Friesland met minimale downtime",
  description:
    "Professioneel zakelijk verhuizen in Friesland voor kantoren en bedrijven. Strakke planning, vaste aansturing en minimale stilstand.",
  path: "/zakelijk-verhuizen",
});

const faqItems: FaqItem[] = [
  {
    question: "Verhuizen jullie ook buiten kantooruren?",
    answer:
      "Ja, wij plannen zakelijke verhuizingen ook in de avond of in het weekend om uw bedrijfscontinuïteit te waarborgen.",
  },
  {
    question: "Hebben jullie ervaring met ICT-verhuizingen?",
    answer:
      "Ja, wij verhuizen werkplekken en apparatuur gefaseerd en met duidelijke opleverafspraken.",
  },
  {
    question: "Hoe snel krijgen we een zakelijke offerte?",
    answer: "Vaak ontvangt u dezelfde werkdag een voorstel met planning, capaciteit en kostenoverzicht.",
  },
];

const cards = [
  {
    title: "Projectmatige aanpak",
    text: "Eén projectleider bewaakt planning, communicatie en uitvoering van begin tot eind.",
    bullets: ["Heldere rolverdeling", "Vaste aanspreekpunten", "Realtime voortgang"],
    icon: BuildingIcon,
  },
  {
    title: "Gefaseerd verhuizen",
    text: "Wij verhuizen per afdeling of vloer zodat teams gecontroleerd kunnen doorwerken.",
    bullets: ["Minder verstoring", "Werkplekken snel inzetbaar", "Logische verhuisvolgorde"],
    icon: RouteIcon,
  },
  {
    title: "Flexibele planning",
    text: "Avond- en weekendverhuizingen mogelijk voor minimale impact op uw operatie.",
    bullets: ["Ook buiten kantooruren", "Scherpe tijdvakken", "Strakke oplevering"],
    icon: ClockIcon,
  },
] as const;

export default function ZakelijkVerhuizenPage() {
  return (
    <>
      <Breadcrumbs current="Zakelijk verhuizen" />
      <PageIntro
        eyebrow="Zakelijk verhuizen Friesland"
        title="Uw kantoorverhuizing, strak gepland en zonder ruis"
        description="Wij verzorgen zakelijke verhuizingen in Friesland met heldere communicatie, korte lijnen en minimale downtime."
      />
      <MovingGallery
        title="Zakelijk verhuizen met overzicht"
        description="Professionele uitvoering met duidelijke aansturing voor teams, werkplekken en planning."
      />

      <FeatureCardsSection
        id="zakelijk-aanpak"
        title="Zakelijke aanpak die door kan draaien"
        description="Uw verhuizing wordt ingericht rondom continuiteit van uw team, systemen en werkprocessen."
        items={cards}
      />

      <Container section>
        <Card>
          <h2>Ook relevant</h2>
          <p>
            Voor aanvullende ondersteuning bekijkt u ook onze <Link href="/verhuisdiensten">verhuisdiensten</Link>,
            <Link href="/spoedverhuizing"> spoedverhuizing</Link> en <Link href="/werkgebied">werkgebied</Link>.
          </p>
        </Card>
      </Container>

      <LocalProof
        title="Zakelijke verhuizingen met controle en continuiteit"
        text="Door onze projectmatige aanpak blijven teams operationeel en blijven deadlines haalbaar."
      />
      <Faq title="Veelgestelde vragen over zakelijk verhuizen" items={faqItems} />
      <CtaBand
        title="Zakelijke verhuizing inplannen?"
        text="Vraag direct een offerte aan en ontvang een voorstel dat past bij uw planning, locatie en teamgrootte."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Zakelijk verhuizen Friesland",
            description: "Kantoor- en bedrijfsverhuizingen in Friesland met minimale downtime en vaste projectaansturing.",
            path: "/zakelijk-verhuizen",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
