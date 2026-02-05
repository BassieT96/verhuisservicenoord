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
import { ClockIcon, RouteIcon, ShieldIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Spoedverhuizing Friesland snel en zorgvuldig geregeld",
  description:
    "Direct een spoedverhuizing in Friesland nodig? Verhuisservice Noord schakelt snel met duidelijke planning en veilige uitvoering.",
  path: "/spoedverhuizing",
});

const faqItems: FaqItem[] = [
  {
    question: "Hoe snel kunnen jullie starten bij spoed?",
    answer:
      "Na uw telefoontje geven we direct aan welke capaciteit beschikbaar is en hoe snel we kunnen starten.",
  },
  {
    question: "Kan een spoedverhuizing ook 's avonds?",
    answer:
      "Ja, waar mogelijk plannen we ook in de avond of het weekend om uw situatie snel op te lossen.",
  },
  {
    question: "Blijft de verhuizing zorgvuldig onder tijdsdruk?",
    answer: "Ja, ook bij spoed werken wij met beschermmateriaal, checklists en duidelijke oplevercontrole.",
  },
];

const cards = [
  {
    title: "Directe intake",
    text: "Binnen enkele minuten weet u wat mogelijk is qua planning, capaciteit en kosten.",
    bullets: ["Snelle beoordeling", "Directe indicatie", "Korte beslislijn"],
    icon: ClockIcon,
  },
  {
    title: "Regionale dekking",
    text: "Door onze Friese routes kunnen we vaak snel ter plaatse zijn in de hele provincie.",
    bullets: ["Snel in Leeuwarden en Drachten", "Dagelijkse routes", "Flexibele inzet"],
    icon: RouteIcon,
  },
  {
    title: "Professionele uitvoering",
    text: "Ook onder tijdsdruk blijven wij zorgvuldig met uw inboedel en oplevering.",
    bullets: ["Beschermmateriaal standaard", "Nette overdracht", "Heldere communicatie"],
    icon: ShieldIcon,
  },
] as const;

export default function SpoedverhuizingPage() {
  return (
    <>
      <Breadcrumbs current="Spoedverhuizing" />
      <PageIntro
        eyebrow="Spoedverhuizing Friesland"
        title="Snel verhuizen wanneer tijd kritisch is"
        description="Bij onverwachte situaties schakelen wij direct met een praktisch plan, een ervaren team en heldere communicatie."
      />
      <MovingGallery
        title="Spoedverhuizing met controle"
        description="Ook onder tijdsdruk blijven we zorgvuldig werken met overzichtelijke stappen."
      />

      <FeatureCardsSection
        id="spoed-aanpak"
        title="Spoedaanpak in drie duidelijke stappen"
        description="U krijgt direct duidelijkheid over haalbaarheid, planning en uitvoering zodat u snel kunt handelen."
        items={cards}
      />

      <Container section>
        <Card>
          <h2>Ook reguliere verhuizing plannen?</h2>
          <p>
            Bekijk dan onze <Link href="/verhuisdiensten">verhuisdiensten</Link> of ga naar
            <Link href="/contact"> contact</Link> voor direct advies.
          </p>
        </Card>
      </Container>

      <LocalProof
        title="Spoedaanpak zonder concessies"
        text="Ook bij hoge urgentie blijft onze uitvoering zorgvuldig, veilig en transparant."
      />
      <Faq title="Veelgestelde vragen over spoedverhuizing" items={faqItems} />
      <CtaBand
        title="Nu een spoedverhuizer nodig?"
        text="Bel direct voor snelle beschikbaarheid of stuur een WhatsApp voor directe afstemming."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Spoedverhuizing Friesland",
            description: "Snelle spoedverhuizingen in Friesland met directe intake en zorgvuldige uitvoering.",
            path: "/spoedverhuizing",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
