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
import type { FaqItem } from "@/lib/site";

const Steps = dynamic(() => import("@/components/sections/Steps").then((mod) => mod.Steps));
const AreaSwitcher = dynamic(() => import("@/components/sections/AreaSwitcher").then((mod) => mod.AreaSwitcher));
const Reviews = dynamic(() => import("@/components/sections/Reviews").then((mod) => mod.Reviews));
const MetricsStrip = dynamic(() => import("@/components/sections/MetricsStrip").then((mod) => mod.MetricsStrip));
const ContactQuoteForm = dynamic(() =>
  import("@/components/sections/ContactQuoteForm").then((mod) => mod.ContactQuoteForm),
);

export const metadata = createPageMetadata({
  title: "Verhuisbedrijf Friesland voor een zorgeloze verhuisdag",
  description:
    "Verhuisservice Noord verhuist particulieren en bedrijven in Friesland. Actief in Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.",
  path: "/",
});

const faqItems: FaqItem[] = [
  {
    question: "Wat kost een verhuizing in Friesland?",
    answer:
      "Dat hangt af van volume, afstand, bereikbaarheid en extra hulp zoals inpakken. U ontvangt altijd vooraf een transparante offerte.",
  },
  {
    question: "Doen jullie ook spoedverhuizingen?",
    answer:
      "Ja, we kunnen vaak snel schakelen. Bel direct zodat we beschikbaarheid en planning meteen kunnen afstemmen.",
  },
  {
    question: "In welke steden zijn jullie actief?",
    answer:
      "Wij verhuizen in heel Friesland, met focus op Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.",
  },
  {
    question: "Hoe snel kan mijn verhuizing ingepland worden?",
    answer:
      "In veel gevallen plannen wij binnen enkele werkdagen. Voor spoedverhuizingen kunnen we vaak dezelfde dag schakelen.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <MovingGallery />
      <HomeHighlights />
      <ContactQuoteForm />
      <MetricsStrip />
      <Benefits />
      <LocalProof
        title="Waarom Friesland voor ons voelt als thuisterrein"
        text="Onze teams rijden dagelijks door de provincie. Daardoor plannen we realistischer en verhuizen we met meer rust."
      />
      <Steps />
      <Services />
      <MovingPhotoShowcase />
      <AreaSwitcher />
      <Reviews />
      <Faq title="Veelgestelde vragen over verhuizen in Friesland" items={faqItems} />
      <CtaBand
        title="Klaar om uw verhuizing in te plannen?"
        text="Ontvang snel een heldere prijsopgave en plan uw verhuisdag met een ervaren team uit Friesland."
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
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
