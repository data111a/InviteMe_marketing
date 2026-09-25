import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";
import { Sparkle, Envelope } from "./Doodles.jsx";
import "./SitePreviews.css";

/* The live site is rendered at a real phone size, then scaled down to fit the
   card — so the preview looks exactly like the invitation on a guest's phone. */
const PHONE_W = 390;
const PHONE_H = 844;

const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function PreviewCard({ item }) {
  const { t, language } = useLanguage();
  const screenRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const [loaded, setLoaded] = useState(false);

  const title = item.title[language] ?? item.title.en;
  const host = hostOf(item.url);

  // Keep the scaled iframe matched to the card width as the layout changes.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / PHONE_W);
    });
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  return (
    <li className="spv__item">
      <a
        className="spv__card"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("home.gallery.open")}: ${title} (${host})`}
      >
        <span className="spv__phone">
          <span className="spv__notch" aria-hidden="true" />
          <span
            className="spv__screen"
            ref={screenRef}
            style={{ "--spv-scale": scale }}
          >
            {!loaded && (
              <span className="spv__loading" aria-hidden="true">
                <Envelope width={48} />
                <span>{t("home.gallery.loading")}</span>
              </span>
            )}
            <iframe
              className={`spv__frame ${loaded ? "is-loaded" : ""}`}
              src={item.url}
              title={title}
              width={PHONE_W}
              height={PHONE_H}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              // Scripts only — no forms, popups or top-level navigation, and
              // no sound (it's a silent preview; the real site opens on click).
              sandbox="allow-scripts allow-same-origin"
              allow="autoplay 'none'; microphone 'none'; camera 'none'; geolocation 'none'"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoaded(true)}
            />
          </span>
        </span>

        <span className="spv__meta">
          <span className="spv__title">{title}</span>
          <span className="spv__cat">
            {t(`home.gallery.categories.${item.category}`)}
          </span>
          <span className="spv__link">
            {host}
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </span>
      </a>
    </li>
  );
}

export default function SitePreviews({ items }) {
  const { t } = useLanguage();

  return (
    <>
      <p className="spv__hint">
        <Sparkle width={13} className="spv__hint-star" />
        <span className="spv__hint-hover">{t("home.gallery.hint")}</span>
        <span className="spv__hint-touch">{t("home.gallery.hintTouch")}</span>
      </p>

      <ul className="spv">
        {items.map((item) => (
          <PreviewCard key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
