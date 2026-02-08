type SubmitResult = {
  ok: boolean;
  message?: string;
};

const TARGET_EMAIL = "bas.troelstra@live.nl";
const FORM_SUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

function toStringValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Ja" : "Nee";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

export async function submitViaFormSubmitBrowser(data: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const response = await fetch(FORM_SUBMIT_AJAX_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        _subject: "Nieuwe offerteaanvraag - Verhuisservice Noord",
        _captcha: "false",
        _template: "table",
      }),
    });

    if (!response.ok) {
      return { ok: false, message: `FormSubmit HTTP fout (${response.status})` };
    }

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean | string; message?: string }
      | null;

    const success =
      result?.success === true ||
      result?.success === "true" ||
      result?.success === "True" ||
      result?.success === "TRUE";

    if (!success) {
      const message = toStringValue(result?.message) || "FormSubmit gaf geen geldige bevestiging.";
      return { ok: false, message };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Directe verzending via FormSubmit is mislukt. Probeer later opnieuw of bel direct.",
    };
  }
}

