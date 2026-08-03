import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { locales, LANGUAGES, DEFAULT_LANGUAGE } from "../locales/index.js";

const STORAGE_KEY = "inviteme.language";

const LanguageContext = createContext(null);

/** Read a dotted path ("home.hero.title") out of a nested object. */
function lookup(source, path) {
  return path
    .split(".")
    .reduce((value, key) => (value == null ? undefined : value[key]), source);
}

function readStoredLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    // localStorage can throw in private mode — fall through to detection.
  }

  // Georgian is the primary market, so anything non-English defaults to ka.
  const browser = window.navigator?.language ?? "";
  return browser.toLowerCase().startsWith("en") ? "en" : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Persisting is a nicety, not a requirement.
    }
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (LANGUAGES.some((l) => l.code === code)) setLanguageState(code);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "en" ? "ka" : "en"));
  }, []);

  /**
   * t("home.hero.title") → string
   * Values may also be arrays or objects (feature lists, steps, …); they are
   * returned as-is so components can map over them.
   * Missing keys fall back to English, then to the key itself, and warn in dev.
   */
  const t = useCallback(
    (path) => {
      const value = lookup(locales[language], path);
      if (value !== undefined) return value;

      const fallback = lookup(locales.en, path);
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing "${path}" for language "${language}".`);
      }
      return fallback !== undefined ? fallback : path;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t, languages: LANGUAGES }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage() must be used inside <LanguageProvider>.");
  }
  return context;
}
