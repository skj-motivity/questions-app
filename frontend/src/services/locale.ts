export const SUPPORTED_LOCALES = ["en", "ja"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupported(v: string | null | undefined): v is Locale {
  return !!v && (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

export function getStoredLocale(): Locale | null {
  try {
    const v = localStorage.getItem("locale");
    if (isSupported(v)) return v;
  } catch (e) {
    // ignore
  }
  return null;
}

export function detectBrowserLocale(): Locale {
  const nav =
    typeof navigator !== "undefined"
      ? navigator.language || navigator.languages?.[0]
      : undefined;
  if (nav && nav.toLowerCase().startsWith("ja")) return "ja";
  return "en";
}

export function getLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;
  return detectBrowserLocale();
}

export function setLocale(value: string) {
  if (isSupported(value)) {
    try {
      localStorage.setItem("locale", value);
    } catch (e) {
      // ignore
    }
    return value;
  }
  return getLocale();
}
