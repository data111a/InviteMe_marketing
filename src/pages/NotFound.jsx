import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { Envelope, Confetti } from "../components/Doodles.jsx";

import "./NotFound.css";

export default function NotFound() {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t("notFound.meta.title"),
    description: t("notFound.meta.description"),
    language,
  });

  return (
    <section className="section not-found page-enter">
      <Confetti
        width={120}
        className="doodle doodle--gold doodle--desktop not-found__confetti"
      />

      <div className="container not-found__inner">
        <Envelope width={86} className="not-found__icon" />
        <p className="not-found__code">{t("notFound.code")}</p>
        <h1 className="not-found__title">{t("notFound.title")}</h1>
        <p className="not-found__body">{t("notFound.body")}</p>

        <Link to="/" className="btn btn--primary">
          {t("common.backHome")}
        </Link>
      </div>
    </section>
  );
}
