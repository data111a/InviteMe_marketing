import { useLanguage } from "../context/LanguageContext.jsx";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage, languages, t } = useLanguage();

  return (
    <div
      className={`lang ${className}`}
      role="group"
      aria-label={t("nav.languageLabel")}
    >
      {languages.map((option) => {
        const isActive = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            className={`lang__btn ${isActive ? "is-active" : ""}`}
            aria-pressed={isActive}
            lang={option.code}
            onClick={() => setLanguage(option.code)}
          >
            {option.label}
            {/* Keeps the visible "KA" in the accessible name and adds the
                language's own name after it: "KA ქართული". */}
            <span className="visually-hidden"> {option.name}</span>
          </button>
        );
      })}
    </div>
  );
}
