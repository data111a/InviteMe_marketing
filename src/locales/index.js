import en from "./en.js";
import ka from "./ka.js";

export const locales = { en, ka };

/** Order here is the order shown in the language switcher. */
export const LANGUAGES = [
  { code: "ka", label: "KA", name: "ქართული" },
  { code: "en", label: "EN", name: "English" },
];

/** Georgian is the primary market. */
export const DEFAULT_LANGUAGE = "ka";
