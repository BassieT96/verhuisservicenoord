import dynamic from "next/dynamic";
import { JsonLd } from "@/components/layout/JsonLd";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { ContactCard } from "@/components/sections/ContactCard";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { Faq } from "@/components/sections/Faq";
import { LocalProof } from "@/components/sections/LocalProof";
import { MovingGallery } from "@/components/sections/MovingGallery";
import { PageIntro } from "@/components/sections/PageIntro";
import { ClockIcon, FileTextIcon, PhoneIcon } from "@/components/ui/icons";
import { createPageMetadata, getFaqJsonLd, getServiceJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/site";

const ContactQuoteForm = dynamic(() => import("@/components/sections/ContactQuoteForm").then((mod) => mod.ContactQuoteForm));

export const metadata = createPageMetadata({
  title: "Contact en vrijblijvende offerte aanvragen",
  description:
    "Neem contact op met Verhuisservice Noord voor verhuizingen in Friesland. Bel direct of vraag online een vrijblijvende offerte aan.",
  path: "/contact",
});

const faqItems: FaqItem[] = [
  {
    question: "Hoe snel reageren jullie op een offerteaanvraag?",
    answer:
      "In de meeste gevallen ontvangt u dezelfde werkdag een reactie met voorstel voor planning en vervolgstappen.",
  },
  {
    question: "Kan ik ook via WhatsApp contact opnemen?",
    answer: "Ja, voor korte vragen of spoed kunt u ons direct via WhatsApp benaderen.",
  },
  {
    question: "Bellen jullie terug bij gemiste oproepen?",
    answer: "Ja, wij bellen gemiste oproepen zo snel mogelijk terug op werkdagen en bij spoedaanvragen.",
  },
];

const contactSteps = [
  {
    title: "Aanvraag in 2 minuten",
    text: "Vul het formulier kort in of bel direct met ons team.",
    bullets: ["Duidelijke velden", "Snelle verwerking", "Ook via WhatsApp"],
    icon: FileTextIcon,
  },
  {
    title: "Snelle terugkoppeling",
    text: "U ontvangt snel duidelijkheid over prijs en mogelijke verhuisdata.",
    bullets: ["Vaak dezelfde werkdag", "Concrete planning", "Transparante kosten"],
    icon: ClockIcon,
  },
  {
    title: "Direct afstemmen",
    text: "Na akkoord plannen we direct de uitvoering met één aanspreekpunt.",
    bullets: ["Vaste contactpersoon", "Heldere afspraken", "Telefonisch bereikbaar"],
    icon: PhoneIcon,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs current="Contact" />
      <PageIntro
        eyebrow="Contact Verhuisservice Noord"
        title="Plan uw verhuizing met een helder voorstel"
        description="Bel direct of stuur uw aanvraag via het formulier. Wij denken snel met u mee over planning, aanpak en kosten."
      />
      <MovingGallery
        title="Zo helpen we klanten verhuizen"
        description="Een korte impressie van onze voorbereiding, uitvoering en oplevering in Friesland."
      />

      <FeatureCardsSection
        id="contact-proces"
        title="Zo snel schakelen we met u"
        description="Uw aanvraag wordt direct opgepakt, zodat u snel weet waar u aan toe bent."
        items={contactSteps}
      />

      <ContactCard />
      <ContactQuoteForm />
      <LocalProof
        title="Snel contact, duidelijke vervolgactie"
        text="Na uw aanvraag krijgt u snel terugkoppeling met concrete planning en kostenindicatie."
      />
      <Faq title="Veelgestelde vragen over contact en offerte" items={faqItems} />
      <CtaBand
        title="Liever direct schakelen?"
        text="Bel ons voor snelle beschikbaarheid of stuur een WhatsApp voor korte afstemming."
      />

      <JsonLd
        data={
          getServiceJsonLd({
            name: "Contact verhuisservice Friesland",
            description: "Contact en offerte voor verhuisservice in Friesland met snelle terugkoppeling.",
            path: "/contact",
          })
        }
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
    </>
  );
}
