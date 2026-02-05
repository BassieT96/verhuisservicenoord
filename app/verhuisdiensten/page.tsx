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
import { BoxIcon, ClockIcon, ShieldIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Verhuisdiensten Friesland voor particulier en zakelijk",
  description:
    "Complete verhuisdiensten in Friesland: inpakken, transport, montage en tijdelijke opslag voor gezinnen en bedrijven.",
  path: "/verhuisdiensten",
});

const faqItems: FaqItem[] = [
  {
    question: "Bieden jullie een volledige inpakservice?",
    answer:
      "Ja, wij kunnen de volledige inpak- en uitpakfase verzorgen, inclusief beschermmateriaal en labeling per ruimte.",
  },
  {
    question: "Kan ik verhuisdiensten combineren met opslag?",
    answer:
      "Ja, tijdelijke opslag is mogelijk wanneer uw nieuwe woning of kantoor nog niet direct beschikbaar is.",
  },
  {
    question: "Verhuizen jullie ook grote meubels en piano's?",
    answer:
      "Ja, wij hebben ervaring met zwaar en kwetsbaar transport en stemmen materiaal en planning daarop af.",
  },
];

const cards = [
  {
    title: "Particuliere verhuizing",
    text: "Voor appartementen, gezinswoningen en nieuwbouw. Wij werken zorgvuldig en in een duidelijk dagplan.",
    bullets: ["Bescherming van vloeren en meubels", "Vast verhuisteam", "Heldere planning per dagdeel"],
    icon: ShieldIcon,
  },
  {
    title: "Inpakken en montage",
    text: "Wij regelen inpakken, demontage en montage zodat u sneller comfortabel woont of werkt.",
    bullets: ["Professioneel inpakmateriaal", "Logische labeling", "Netjes gemonteerd op bestemming"],
    icon: BoxIcon,
  },
  {
    title: "Opslag en tussentijdse oplossingen",
    text: "Voor situaties met verschillende opleverdata regelen wij veilige tijdelijke opslag.",
    bullets: ["Flexibele duur", "Veilige en droge opslag", "Snelle herlevering"],
    icon: ClockIcon,
  },
] as const;

export default function VerhuisdienstenPage() {
  return (
    <>
      <Breadcrumbs current="Verhuisdiensten" />
      <PageIntro
        eyebrow="Verhuisdiensten Friesland"
        title="Complete verhuisdiensten voor elk type verhuizing"
        description="Van zorgvuldig inpakken tot strak transport: wij verzorgen particuliere en zakelijke verhuisdiensten in heel Friesland."
      />
      <MovingGallery
        title="Onze verhuisdiensten in beeld"
        description="Van inpakken tot oplevering: zo zorgen wij voor een soepele verhuisdag in Friesland."
      />

      <FeatureCardsSection
        id="verhuisdiensten-wat-u-krijgt"
        title="Wat u krijgt bij onze verhuisdiensten"
        description="U kiest de ondersteuning die past bij uw situatie: volledig ontzorgd of juist alleen de onderdelen die u nodig heeft."
        items={cards}
      />

      <Container section>
        <Card>
          <h2>Gerelateerde diensten</h2>
          <p>
            Bekijk ook <Link href="/zakelijk-verhuizen">zakelijk verhuizen</Link>,{" "}
            <Link href="/seniorenverhuizing">seniorenverhuizing</Link>,{" "}
            <Link href="/spoedverhuizing">spoedverhuizing</Link> en ons{" "}
            <Link href="/werkgebied">werkgebied in Friesland</Link>.
          </p>
        </Card>
      </Container>

      <LocalProof
        title="Friese verhuisservice met vaste standaarden"
        text="U krijgt een team dat werkt met checklists, beschermmateriaal en duidelijke planning van begin tot eind."
      />
      <Faq title="Veelgestelde vragen over verhuisdiensten" items={faqItems} />
      <CtaBand
        title="Wilt u uw verhuisdiensten slim plannen?"
        text="Vraag een vrijblijvende offerte aan en ontvang direct advies over de beste aanpak voor uw verhuizing."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Verhuisdiensten Friesland",
            description: "Complete verhuisdiensten in Friesland met inpakken, transport, montage en opslag.",
            path: "/verhuisdiensten",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
