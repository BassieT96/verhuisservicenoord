"use client";

import { useMemo, useState } from "react";
import { ButtonNative } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import uiStyles from "@/components/ui/ui.module.css";
import sectionStyles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";
import { submitViaFormSubmitBrowser } from "@/lib/formsubmit";
import { siteConfig } from "@/lib/site";

type ServiceType = "particulier" | "zakelijk" | "senior" | "spoed";

type FormState = {
  naam: string;
  telefoon: string;
  email: string;
  dienst: ServiceType;
  verhuisdatum: string;
  vanPlaats: string;
  naarPlaats: string;
  verdieping: string;
  werkplekken: string;
  urgentie: string;
  bericht: string;
};

const initialState: FormState = {
  naam: "",
  telefoon: "",
  email: "",
  dienst: "particulier",
  verhuisdatum: "",
  vanPlaats: "",
  naarPlaats: "",
  verdieping: "",
  werkplekken: "",
  urgentie: "",
  bericht: "",
};

function validate(data: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (data.naam.trim().length < 2) errors.naam = "Vul uw naam in.";
  if (!/^\+?[0-9\s-]{8,15}$/.test(data.telefoon)) errors.telefoon = "Vul een geldig telefoonnummer in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Vul een geldig e-mailadres in.";
  if (data.bericht.trim().length < 20) errors.bericht = "Beschrijf uw verhuizing in minimaal 20 tekens.";

  return errors;
}

export function QuoteForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitted(false);
    setSubmitError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null;
        const fallbackResult = await submitViaFormSubmitBrowser(state);
        if (fallbackResult.ok) {
          setSubmitted(true);
          setState(initialState);
          return;
        }

        throw new Error(
          fallbackResult.message ||
            result?.message ||
            "Verzenden is niet gelukt.",
        );
      }

      setSubmitted(true);
      setState(initialState);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Verzenden is niet gelukt. Probeer het opnieuw of bel direct 0612345678.";
      setSubmitError(message);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${layoutStyles.section} ${sectionStyles.formAnchor}`} id="offerte" aria-labelledby="offerte-heading">
      <div className={layoutStyles.container}>
        <div className={sectionStyles.sectionHeading}>
          <h2 id="offerte-heading">Offerte aanvragen</h2>
          <p>
            Vertel kort wat u nodig heeft. Wij reageren snel met een heldere offerte voor uw verhuizing
            in Friesland.
          </p>
        </div>

        <Card>
          <form className={sectionStyles.formLayout} onSubmit={handleSubmit} noValidate>
            {hasErrors ? (
              <p className={`${sectionStyles.feedback} ${sectionStyles.feedbackError} ${sectionStyles.full}`} role="alert">
                Controleer de gemarkeerde velden en probeer opnieuw.
              </p>
            ) : null}

            {submitError ? (
              <p className={`${sectionStyles.feedback} ${sectionStyles.feedbackError} ${sectionStyles.full}`} role="alert">
                {submitError}
              </p>
            ) : null}

            {submitted ? (
              <p className={`${sectionStyles.feedback} ${sectionStyles.feedbackSuccess} ${sectionStyles.full}`} role="status">
                Bedankt! Uw aanvraag is ontvangen. We bellen u snel terug op {siteConfig.phoneDisplay}.
              </p>
            ) : null}

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
            <Input id="email" name="email" label="E-mailadres" type="email" value={state.email} onChange={(v) => setField("email", v)} error={errors.email} required />

            <div>
              <label htmlFor="dienst" className={uiStyles.label}>
                Type verhuizing
              </label>
              <select
                id="dienst"
                name="dienst"
                className={uiStyles.select}
                value={state.dienst}
                onChange={(event) => setField("dienst", event.target.value as ServiceType)}
              >
                <option value="particulier">Particulier</option>
                <option value="zakelijk">Zakelijk</option>
                <option value="senior">Senioren</option>
                <option value="spoed">Spoed</option>
              </select>
            </div>

            <Input id="verhuisdatum" name="verhuisdatum" label="Gewenste verhuisdatum" type="date" value={state.verhuisdatum} onChange={(v) => setField("verhuisdatum", v)} />
            <Input id="van-plaats" name="vanPlaats" label="Van plaats" value={state.vanPlaats} onChange={(v) => setField("vanPlaats", v)} />
            <Input id="naar-plaats" name="naarPlaats" label="Naar plaats" value={state.naarPlaats} onChange={(v) => setField("naarPlaats", v)} />

            {state.dienst === "particulier" || state.dienst === "senior" ? (
              <Input id="verdieping" name="verdieping" label="Verdieping / lift aanwezig" value={state.verdieping} onChange={(v) => setField("verdieping", v)} />
            ) : null}

            {state.dienst === "zakelijk" ? (
              <Input id="werkplekken" name="werkplekken" label="Aantal werkplekken" value={state.werkplekken} onChange={(v) => setField("werkplekken", v)} />
            ) : null}

            {state.dienst === "spoed" ? (
              <Input id="urgentie" name="urgentie" label="Hoe snel is de verhuizing nodig?" value={state.urgentie} onChange={(v) => setField("urgentie", v)} placeholder="Bijv. binnen 48 uur" />
            ) : null}

            <div className={sectionStyles.full}>
              <Textarea
                id="bericht"
                name="bericht"
                label="Omschrijving"
                value={state.bericht}
                onChange={(v) => setField("bericht", v)}
                error={errors.bericht}
                required
                placeholder="Denk aan inboedel, bijzonderheden en gewenste planning"
              />
            </div>

            <div className={sectionStyles.full}>
              <ButtonNative type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Bezig met verzenden..." : "Verstuur aanvraag"}
              </ButtonNative>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
