import { useLanguage } from "../context/LanguageContext.jsx";
import "./Logo.css";

/**
 * InviteMe wordmark — recreated from the brand logo: a blue→teal gradient
 * flowing across "InviteMe", with a checkmark standing in for the dot of the
 * "i" (the "i" uses a dotless glyph, U+0131, so the check is its only accent),
 * and the tagline beneath. Built as text (not an image) so it stays crisp at
 * any size and follows the theme tokens.
 *
 * Prefer the exact raster logo? Drop the file at public/logo.png and swap the
 * whole <span className="logo"> block for:
 *   <img src="/logo.png" alt="InviteMe" className="logo-img" />
 */
export default function Logo({ tagline = true, className = "" }) {
  const { t } = useLanguage();

  return (
    <span className={`logo ${className}`}>
      <span className="visually-hidden">InviteMe</span>
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__word">{"InvıteMe"}</span>
        <svg
          className="logo__check"
          viewBox="0 0 48 34"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 18.5c4.7 2.2 8.7 5.6 12 10.3C21.5 17.5 30.5 8.6 45 2.5"
            stroke="url(#logo-check-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="logo-check-grad"
              x1="3"
              y1="2"
              x2="42"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1a6bab" />
              <stop offset="1" stopColor="#23a58c" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {tagline && <span className="logo__tag">{t("common.tagline")}</span>}
    </span>
  );
}
