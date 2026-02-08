"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ButtonNative } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import layoutStyles from "@/components/layout/layout.module.css";
import sectionStyles from "@/components/sections/sections.module.css";
import uiStyles from "@/components/ui/ui.module.css";
import { siteConfig } from "@/lib/site";

type ServiceType = "particulier" | "zakelijk" | "senioren" | "spoed";
type ContactMethod = "telefoon" | "whatsapp" | "email";
type YesNoMaybe = "ja" | "nee" | "misschien";
type Flexibility = "vast" | "plusminus2" | "flexibel";
type Urgency = "" | "vandaag" | "binnen48" | "dezeweek";

type FormState = {
  naam: string;
  telefoon: string;
  email: string;
  contactVoorkeur: ContactMethod;
  belMoment: string;
  dienst: ServiceType;
  verhuisdatum: string;
  flexibiliteit: Flexibility;
  vanPlaats: string;
  naarPlaats: string;
  woningTypeVan: string;
  woningTypeNaar: string;
  verdiepingVan: string;
  verdiepingNaar: string;
  liftVan: YesNoMaybe;
  liftNaar: YesNoMaybe;
  inpakservice: YesNoMaybe;
  montage: YesNoMaybe;
  opslag: YesNoMaybe;
  bedrijf: string;
  werkplekken: string;
  ictWerkplekken: string;
  verhuismomentZakelijk: string;
  urgentie: Urgency;
  redenSpoed: string;
  bericht: string;
  privacyAkkoord: boolean;
};

const initialState: FormState = {
  naam: "",
  telefoon: "",
  email: "",
  contactVoorkeur: "telefoon",
  belMoment: "",
  dienst: "particulier",
  verhuisdatum: "",
  flexibiliteit: "plusminus2",
  vanPlaats: "",
  naarPlaats: "",
  woningTypeVan: "",
  woningTypeNaar: "",
  verdiepingVan: "",
  verdiepingNaar: "",
  liftVan: "misschien",
  liftNaar: "misschien",
  inpakservice: "misschien",
  montage: "misschien",
  opslag: "nee",
  bedrijf: "",
  werkplekken: "",
  ictWerkplekken: "",
  verhuismomentZakelijk: "",
  urgentie: "",
  redenSpoed: "",
  bericht: "",
  privacyAkkoord: false,
};

const serviceOptions: { value: ServiceType; label: string; text: string }[] = [
  { value: "particulier", label: "Particulier", text: "Gezinswoning of appartement" },
  { value: "zakelijk", label: "Zakelijk", text: "Kantoor, praktijk of bedrijfspand" },
  { value: "senioren", label: "Senioren", text: "Rustige en persoonlijke begeleiding" },
  { value: "spoed", label: "Spoed", text: "Snel schakelen met direct plan" },
];

const contactOptions: { value: ContactMethod; label: string }[] = [
  { value: "telefoon", label: "Telefoon" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
];

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (state.naam.trim().length < 2) errors.naam = "Vul uw naam in.";
  if (!/^\+?[0-9\s-]{8,15}$/.test(state.telefoon)) errors.telefoon = "Vul een geldig telefoonnummer in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = "Vul een geldig e-mailadres in.";

  if (!state.verhuisdatum && state.dienst !== "spoed") {
    errors.verhuisdatum = "Kies een gewenste verhuisdatum.";
  }

  if (state.vanPlaats.trim().length < 2) errors.vanPlaats = "Vul de huidige plaats in.";
  if (state.naarPlaats.trim().length < 2) errors.naarPlaats = "Vul de nieuwe plaats in.";

  if (state.dienst === "zakelijk") {
    if (state.bedrijf.trim().length < 2) errors.bedrijf = "Vul uw bedrijfsnaam in.";
    const plekken = Number.parseInt(state.werkplekken, 10);
    if (!Number.isFinite(plekken) || plekken < 1) {
      errors.werkplekken = "Vul het aantal werkplekken in.";
    }
  }

  if (state.dienst === "spoed" && !state.urgentie) {
    errors.urgentie = "Geef aan hoe urgent de verhuizing is.";
  }

  if (state.bericht.trim().length < 30) {
    errors.bericht = "Beschrijf uw aanvraag in minimaal 30 tekens.";
  }

  if (!state.privacyAkkoord) {
    errors.privacyAkkoord = "Ga akkoord met het verwerken van uw aanvraag.";
  }

  return errors;
}

export function ContactQuoteForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setState(initialState);
  };

  return (
    <section className={`${layoutStyles.section} ${sectionStyles.formAnchor}`} id="offerte" aria-labelledby="offerte-heading">
      <div className={layoutStyles.container}>
        <div className={sectionStyles.sectionHeading}>
          <h2 id="offerte-heading">Uitgebreide offerte aanvragen</h2>
          <p>
            Geef uw situatie zo volledig mogelijk door. Zo ontvangt u sneller een realistische prijs,
            planning en aanpak voor uw verhuizing in Friesland.
          </p>
        </div>

        <div className={sectionStyles.requestLayout}>
          <Card className={sectionStyles.requestMain}>
            <form className={sectionStyles.formLayout} onSubmit={handleSubmit} noValidate>
              {hasErrors ? (
                <p className={`${sectionStyles.feedback} ${sectionStyles.feedbackError} ${sectionStyles.full}`} role="alert">
                  Er ontbreken nog enkele gegevens. Controleer de gemarkeerde velden.
                </p>
              ) : null}

              {submitted ? (
                <p className={`${sectionStyles.feedback} ${sectionStyles.feedbackSuccess} ${sectionStyles.full}`} role="status">
                  Bedankt! Uw aanvraag is ontvangen. We nemen snel contact op via uw voorkeur en zijn bereikbaar op {siteConfig.phoneDisplay}.
                </p>
              ) : null}

              <div className={sectionStyles.full}>
                <p className={sectionStyles.formSectionTitle}>1. Contactgegevens</p>
              </div>

              <Input id="naam" name="naam" label="Naam" value={state.naam} onChange={(v) => setField("naam", v)} error={errors.naam} required />
              <Input
                id="telefoon"
                name="telefoon"
                label="Telefoonnummer"
                value={state.telefoon}
                onChange={(v) => setField("telefoon", v)}
                error={errors.telefoon}
                required
              />
              <Input id="email" name="email" type="email" label="E-mailadres" value={state.email} onChange={(v) => setField("email", v)} error={errors.email} required />
              <Input id="bel-moment" name="belMoment" label="Beste tijd om te bellen" value={state.belMoment} onChange={(v) => setField("belMoment", v)} placeholder="Bijv. tussen 18:00 en 20:00" />

              <div className={sectionStyles.full}>
                <span className={uiStyles.label}>Voorkeur contact</span>
                <div className={sectionStyles.choiceRow} role="radiogroup" aria-label="Voorkeur contact">
                  {contactOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${sectionStyles.choicePill} ${state.contactVoorkeur === option.value ? sectionStyles.choicePillActive : ""}`.trim()}
                      onClick={() => setField("contactVoorkeur", option.value)}
                      aria-pressed={state.contactVoorkeur === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={sectionStyles.full}>
                <p className={sectionStyles.formSectionTitle}>2. Type verhuizing</p>
              </div>

              <div className={sectionStyles.full}>
                <div className={sectionStyles.optionGrid}>
                  {serviceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${sectionStyles.optionButton} ${state.dienst === option.value ? sectionStyles.optionButtonActive : ""}`.trim()}
                      onClick={() => setField("dienst", option.value)}
                      aria-pressed={state.dienst === option.value}
                    >
                      <span className={sectionStyles.optionButtonLabel}>{option.label}</span>
                      <span className={sectionStyles.optionButtonText}>{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                id="verhuisdatum"
                name="verhuisdatum"
                type="date"
                label="Gewenste verhuisdatum"
                value={state.verhuisdatum}
                onChange={(v) => setField("verhuisdatum", v)}
                error={errors.verhuisdatum}
                required={state.dienst !== "spoed"}
              />

              <div>
                <label htmlFor="flexibiliteit" className={uiStyles.label}>
                  Flexibiliteit planning
                </label>
                <select
                  id="flexibiliteit"
                  name="flexibiliteit"
                  className={uiStyles.select}
                  value={state.flexibiliteit}
                  onChange={(event) => setField("flexibiliteit", event.target.value as Flexibility)}
                >
                  <option value="vast">Vaste datum</option>
                  <option value="plusminus2">+/- 2 dagen mogelijk</option>
                  <option value="flexibel">Volledig flexibel</option>
                </select>
              </div>

              <Input id="van-plaats" name="vanPlaats" label="Huidige plaats" value={state.vanPlaats} onChange={(v) => setField("vanPlaats", v)} error={errors.vanPlaats} required />
              <Input id="naar-plaats" name="naarPlaats" label="Nieuwe plaats" value={state.naarPlaats} onChange={(v) => setField("naarPlaats", v)} error={errors.naarPlaats} required />

              <div>
                <label htmlFor="woning-type-van" className={uiStyles.label}>
                  Type huidige locatie
                </label>
                <select
                  id="woning-type-van"
                  name="woningTypeVan"
                  className={uiStyles.select}
                  value={state.woningTypeVan}
                  onChange={(event) => setField("woningTypeVan", event.target.value)}
                >
                  <option value="">Selecteer</option>
                  <option value="appartement">Appartement</option>
                  <option value="eengezinswoning">Eengezinswoning</option>
                  <option value="vrijstaand">Vrijstaande woning</option>
                  <option value="kantoor">Kantoor / bedrijfspand</option>
                </select>
              </div>

              <div>
                <label htmlFor="woning-type-naar" className={uiStyles.label}>
                  Type nieuwe locatie
                </label>
                <select
                  id="woning-type-naar"
                  name="woningTypeNaar"
                  className={uiStyles.select}
                  value={state.woningTypeNaar}
                  onChange={(event) => setField("woningTypeNaar", event.target.value)}
                >
                  <option value="">Selecteer</option>
                  <option value="appartement">Appartement</option>
                  <option value="eengezinswoning">Eengezinswoning</option>
                  <option value="vrijstaand">Vrijstaande woning</option>
                  <option value="kantoor">Kantoor / bedrijfspand</option>
                </select>
              </div>

              {state.dienst === "zakelijk" ? (
                <>
                  <div className={sectionStyles.full}>
                    <p className={sectionStyles.formSectionTitle}>3. Zakelijke details</p>
                  </div>

                  <Input id="bedrijf" name="bedrijf" label="Bedrijfsnaam" value={state.bedrijf} onChange={(v) => setField("bedrijf", v)} error={errors.bedrijf} required />
                  <Input
                    id="werkplekken"
                    name="werkplekken"
                    label="Aantal werkplekken"
                    value={state.werkplekken}
                    onChange={(v) => setField("werkplekken", v)}
                    error={errors.werkplekken}
                    required
                  />
                  <Input id="ict-werkplekken" name="ictWerkplekken" label="Aantal ICT-werkplekken" value={state.ictWerkplekken} onChange={(v) => setField("ictWerkplekken", v)} />

                  <div>
                    <label htmlFor="verhuismoment-zakelijk" className={uiStyles.label}>
                      Gewenst verhuismoment
                    </label>
                    <select
                      id="verhuismoment-zakelijk"
                      name="verhuismomentZakelijk"
                      className={uiStyles.select}
                      value={state.verhuismomentZakelijk}
                      onChange={(event) => setField("verhuismomentZakelijk", event.target.value)}
                    >
                      <option value="">Selecteer</option>
                      <option value="kantooruren">Binnen kantooruren</option>
                      <option value="avond-weekend">Avond / weekend</option>
                      <option value="gefaseerd">Gefaseerd verhuizen</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className={sectionStyles.full}>
                    <p className={sectionStyles.formSectionTitle}>3. Woningdetails en extra hulp</p>
                  </div>

                  <Input id="verdieping-van" name="verdiepingVan" label="Verdieping huidige locatie" value={state.verdiepingVan} onChange={(v) => setField("verdiepingVan", v)} />
                  <Input id="verdieping-naar" name="verdiepingNaar" label="Verdieping nieuwe locatie" value={state.verdiepingNaar} onChange={(v) => setField("verdiepingNaar", v)} />

                  <div>
                    <label htmlFor="lift-van" className={uiStyles.label}>
                      Lift aanwezig (huidige locatie)
                    </label>
                    <select id="lift-van" name="liftVan" className={uiStyles.select} value={state.liftVan} onChange={(event) => setField("liftVan", event.target.value as YesNoMaybe)}>
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                      <option value="misschien">Onbekend</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lift-naar" className={uiStyles.label}>
                      Lift aanwezig (nieuwe locatie)
                    </label>
                    <select id="lift-naar" name="liftNaar" className={uiStyles.select} value={state.liftNaar} onChange={(event) => setField("liftNaar", event.target.value as YesNoMaybe)}>
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                      <option value="misschien">Onbekend</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inpakservice" className={uiStyles.label}>
                      Hulp met inpakken
                    </label>
                    <select
                      id="inpakservice"
                      name="inpakservice"
                      className={uiStyles.select}
                      value={state.inpakservice}
                      onChange={(event) => setField("inpakservice", event.target.value as YesNoMaybe)}
                    >
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                      <option value="misschien">Misschien</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="montage" className={uiStyles.label}>
                      Demontage / montage nodig
                    </label>
                    <select id="montage" name="montage" className={uiStyles.select} value={state.montage} onChange={(event) => setField("montage", event.target.value as YesNoMaybe)}>
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                      <option value="misschien">Misschien</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="opslag" className={uiStyles.label}>
                      Tijdelijke opslag nodig
                    </label>
                    <select id="opslag" name="opslag" className={uiStyles.select} value={state.opslag} onChange={(event) => setField("opslag", event.target.value as YesNoMaybe)}>
                      <option value="ja">Ja</option>
                      <option value="nee">Nee</option>
                      <option value="misschien">Misschien</option>
                    </select>
                  </div>
                </>
              )}

              {state.dienst === "spoed" ? (
                <>
                  <div className={sectionStyles.full}>
                    <p className={sectionStyles.formSectionTitle}>4. Spoedinformatie</p>
                  </div>

                  <div>
                    <label htmlFor="urgentie" className={uiStyles.label}>
                      Hoe urgent is de verhuizing?
                    </label>
                    <select
                      id="urgentie"
                      name="urgentie"
                      className={uiStyles.select}
                      value={state.urgentie}
                      onChange={(event) => setField("urgentie", event.target.value as Urgency)}
                      aria-invalid={Boolean(errors.urgentie)}
                      aria-describedby={errors.urgentie ? "urgentie-error" : undefined}
                    >
                      <option value="">Selecteer</option>
                      <option value="vandaag">Vandaag</option>
                      <option value="binnen48">Binnen 48 uur</option>
                      <option value="dezeweek">Deze week</option>
                    </select>
                    {errors.urgentie ? (
                      <p id="urgentie-error" className={uiStyles.errorText}>
                        {errors.urgentie}
                      </p>
                    ) : null}
                  </div>

                  <Input id="reden-spoed" name="redenSpoed" label="Korte toelichting spoed" value={state.redenSpoed} onChange={(v) => setField("redenSpoed", v)} placeholder="Bijv. sleuteloverdracht of onverwachte situatie" />
                </>
              ) : null}

              <div className={sectionStyles.full}>
                <p className={sectionStyles.formSectionTitle}>5. Omschrijving</p>
              </div>

              <div className={sectionStyles.full}>
                <Textarea
                  id="bericht"
                  name="bericht"
                  label="Beschrijf uw verhuizing"
                  value={state.bericht}
                  onChange={(v) => setField("bericht", v)}
                  error={errors.bericht}
                  required
                  placeholder="Noem volume, bijzonderheden, bereikbaarheid en eventuele wensen voor planning of extra hulp"
                />
              </div>

              <div className={sectionStyles.full}>
                <label className={sectionStyles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={state.privacyAkkoord}
                    onChange={(event) => setField("privacyAkkoord", event.target.checked)}
                    aria-invalid={Boolean(errors.privacyAkkoord)}
                    aria-describedby={errors.privacyAkkoord ? "privacy-error" : undefined}
                  />
                  <span>Ik ga akkoord met het verwerken van mijn gegevens om mijn aanvraag te beantwoorden.</span>
                </label>
                {errors.privacyAkkoord ? (
                  <p id="privacy-error" className={uiStyles.errorText}>
                    {errors.privacyAkkoord}
                  </p>
                ) : null}
              </div>

              <div className={sectionStyles.full}>
                <ButtonNative type="submit">Verstuur aanvraag</ButtonNative>
              </div>
            </form>
          </Card>

          <Card className={sectionStyles.requestAside}>
            <div className={sectionStyles.requestImageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Verhuisdozen in een nieuwe woning"
                width={900}
                height={600}
                className={sectionStyles.requestImage}
              />
            </div>
            <h3>Wat u van ons ontvangt</h3>
            <ul className={sectionStyles.requestChecklist}>
              <li>Heldere prijsopbouw zonder verborgen kosten</li>
              <li>Praktische planning op basis van uw situatie</li>
              <li>Advies over inpakken, montage en bereikbaarheid</li>
              <li>Snel contact via telefoon, WhatsApp of e-mail</li>
            </ul>
            <p className={sectionStyles.requestMeta}>Actief in Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.</p>
            <p className={sectionStyles.requestMeta}>Liever direct contact? Bel ons op {siteConfig.phoneDisplay}.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
