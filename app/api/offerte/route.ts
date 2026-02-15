import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { getCmsSiteSettings } from "@/sanity/lib/content";

type OffertePayload = Record<string, unknown>;

const TO_EMAIL = "bas.troelstra@live.nl";
const FALLBACK_PHONE = "0612345678";
const FORM_SUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${TO_EMAIL}`;
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/${TO_EMAIL}`;

type SendResult = {
  ok: boolean;
  used: "resend" | "formsubmit" | "none";
  message?: string;
};

function toStringValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Ja" : "Nee";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function normalizeProviderMessage(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("confirm") && lower.includes("email")) {
    return "Formulierprovider vereist eenmalige activatie. Controleer de inbox/spam van bas.troelstra@live.nl en bevestig de activatiemail van FormSubmit.";
  }
  return message;
}

function getRequestOrigin(request: Request) {
  const directOrigin = request.headers.get("origin");
  if (directOrigin) return directOrigin;

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  if (host) {
    return `${proto}://${host}`;
  }

  return siteConfig.url;
}

function renderText(data: OffertePayload) {
  const fieldMap: Array<[string, string]> = [
    ["naam", "Naam"],
    ["telefoon", "Telefoon"],
    ["email", "E-mail"],
    ["contactVoorkeur", "Voorkeur contact"],
    ["belMoment", "Beste belmoment"],
    ["dienst", "Type verhuizing"],
    ["verhuisdatum", "Gewenste verhuisdatum"],
    ["flexibiliteit", "Flexibiliteit planning"],
    ["vanPlaats", "Huidige plaats"],
    ["naarPlaats", "Nieuwe plaats"],
    ["woningTypeVan", "Type huidige locatie"],
    ["woningTypeNaar", "Type nieuwe locatie"],
    ["verdiepingVan", "Verdieping huidige locatie"],
    ["verdiepingNaar", "Verdieping nieuwe locatie"],
    ["liftVan", "Lift aanwezig (huidige locatie)"],
    ["liftNaar", "Lift aanwezig (nieuwe locatie)"],
    ["inpakservice", "Hulp met inpakken"],
    ["montage", "Demontage/montage"],
    ["opslag", "Tijdelijke opslag"],
    ["bedrijf", "Bedrijfsnaam"],
    ["werkplekken", "Aantal werkplekken"],
    ["ictWerkplekken", "Aantal ICT-werkplekken"],
    ["verhuismomentZakelijk", "Gewenst verhuismoment (zakelijk)"],
    ["urgentie", "Urgentie"],
    ["redenSpoed", "Toelichting spoed"],
    ["bericht", "Omschrijving"],
  ];

  return fieldMap
    .map(([key, label]) => {
      const value = toStringValue(data[key]);
      return value ? `${label}: ${value}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

async function sendViaResend(data: OffertePayload, text: string): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { ok: false, used: "none" };

  const from = process.env.RESEND_FROM_EMAIL ?? "Verhuisservice Noord <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO_EMAIL],
      reply_to: toStringValue(data.email) || undefined,
      subject: "Nieuwe offerteaanvraag - Verhuisservice Noord",
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return {
      ok: false,
      used: "resend",
      message: `Resend fout (${response.status}): ${errorText || "onbekende fout"}`,
    };
  }

  return { ok: true, used: "resend" };
}

async function sendViaFormSubmit(data: OffertePayload, origin: string): Promise<SendResult> {
  const payload = {
    ...data,
    _subject: "Nieuwe offerteaanvraag - Verhuisservice Noord",
    _captcha: "false",
    _template: "table",
    _autoresponse:
      "Bedankt voor uw aanvraag bij Verhuisservice Noord. We nemen zo snel mogelijk contact met u op.",
  };

  const response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/contact`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      used: "formsubmit",
      message: `FormSubmit HTTP fout (${response.status})`,
    };
  }

  const result = (await response.json().catch(() => null)) as
    | { success?: boolean | string; message?: string }
    | null;
  const rawSuccess = result?.success;
  const success =
    rawSuccess === true ||
    rawSuccess === "true" ||
    rawSuccess === "True" ||
    rawSuccess === "TRUE";

  if (!success) {
    const message =
      result?.message ||
      "FormSubmit gaf geen bevestiging terug. Activeer eerst het doel-e-mailadres.";
    const normalizedMessage = normalizeProviderMessage(message);

    // Retry via the non-AJAX endpoint for environments where FormSubmit rejects AJAX server hops.
    if (normalizedMessage.toLowerCase().includes("web server")) {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        const fieldValue = toStringValue(value);
        if (fieldValue) params.set(key, fieldValue);
      });

      const retry = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/html,application/xhtml+xml",
          Origin: origin,
          Referer: `${origin}/contact`,
        },
        body: params.toString(),
      });

      if (retry.ok) {
        return { ok: true, used: "formsubmit" };
      }
    }

    return { ok: false, used: "formsubmit", message: normalizedMessage };
  }

  return { ok: true, used: "formsubmit" };
}

export async function POST(request: Request) {
  let supportPhone = FALLBACK_PHONE;

  try {
    const settings = await getCmsSiteSettings();
    supportPhone = settings?.phone || FALLBACK_PHONE;
    const data = (await request.json()) as OffertePayload;

    const naam = toStringValue(data.naam);
    const telefoon = toStringValue(data.telefoon);
    const email = toStringValue(data.email);
    const bericht = toStringValue(data.bericht);

    if (!naam || !telefoon || !email || !bericht) {
      return NextResponse.json(
        { ok: false, message: "Verplichte velden ontbreken." },
        { status: 400 },
      );
    }

    const origin = getRequestOrigin(request);
    const text = renderText(data);

    const resendResult = await sendViaResend(data, text);
    if (resendResult.ok) {
      return NextResponse.json({ ok: true });
    }

    const formSubmitResult = await sendViaFormSubmit(data, origin);
    if (!formSubmitResult.ok) {
      // Server-side log for production debugging in Vercel logs.
      console.error("Offerte verzending mislukt", {
        resend: resendResult,
        formsubmit: formSubmitResult,
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            formSubmitResult.message ||
            resendResult.message ||
            `Verzenden is nu niet gelukt. Probeer het opnieuw of bel direct ${supportPhone}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          `Er ging iets mis bij het verwerken van de aanvraag. Bel direct ${supportPhone}.`,
      },
      { status: 500 },
    );
  }
}
