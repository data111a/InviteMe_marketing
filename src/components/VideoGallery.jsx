import { useCallback, useRef, useState } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";
import Modal from "./Modal.jsx";
import { PlayMark, Sparkle, Envelope } from "./Doodles.jsx";
import "./VideoGallery.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ card */

function VideoCard({ item, onOpen }) {
  const { t, language } = useLanguage();
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  const title = item.title[language] ?? item.title.en;
  const category = t(`home.gallery.categories.${item.category}`);

  const startPreview = useCallback(() => {
    if (failed || prefersReducedMotion()) return;
    const video = videoRef.current;
    if (!video) return;
    // play() rejects if the element is detached or the file is missing.
    video.play().catch(() => {});
  }, [failed]);

  const stopPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <li className="vcard-wrap">
      <button
        type="button"
        className="vcard"
        aria-label={`${t("home.gallery.open")}: ${title}`}
        onClick={() => onOpen(item)}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
      >
        <span className="vcard__frame">
          <span className="vcard__media">
            {failed ? (
              <span className="vcard__placeholder">
                <Envelope width={54} />
                <span className="vcard__placeholder-text">
                  {t("home.gallery.soon")}
                </span>
              </span>
            ) : (
              <video
                ref={videoRef}
                className="vcard__video"
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="metadata"
                tabIndex={-1}
                onError={() => setFailed(true)}
              />
            )}
          </span>

          <span className="vcard__play" aria-hidden="true">
            <PlayMark width={20} />
          </span>
        </span>

        <span className="vcard__meta">
          <span className="vcard__title">{title}</span>
          <span className="vcard__cat">{category}</span>
        </span>
      </button>
    </li>
  );
}

/* --------------------------------------------------------------- gallery */

export default function VideoGallery({ items }) {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(null);
  const [modalFailed, setModalFailed] = useState(false);

  const open = useCallback((item) => {
    setModalFailed(false);
    setActive(item);
  }, []);

  const close = useCallback(() => setActive(null), []);

  const activeTitle = active
    ? active.title[language] ?? active.title.en
    : "";

  return (
    <>
      <p className="vgal__hint">
        <Sparkle width={13} className="vgal__hint-star" />
        <span className="vgal__hint-hover">{t("home.gallery.hint")}</span>
        <span className="vgal__hint-touch">{t("home.gallery.hintTouch")}</span>
      </p>

      <ul className="vgal">
        {items.map((item) => (
          <VideoCard key={item.id} item={item} onOpen={open} />
        ))}
      </ul>

      <Modal isOpen={Boolean(active)} onClose={close} label={activeTitle}>
        {active && (
          <figure className="vmodal">
            {modalFailed ? (
              <div className="vmodal__placeholder">
                <Envelope width={72} />
                <p>{t("home.gallery.soon")}</p>
              </div>
            ) : (
              <video
                key={active.id}
                className="vmodal__video"
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                loop
                playsInline
                onError={() => setModalFailed(true)}
              >
                {t("home.gallery.unsupported")}
              </video>
            )}

            <figcaption className="vmodal__caption">
              <span className="vmodal__title">{activeTitle}</span>
              <span className="vmodal__cat">
                {t(`home.gallery.categories.${active.category}`)}
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </>
  );
}
