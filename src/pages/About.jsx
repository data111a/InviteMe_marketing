import { useLanguage } from "../context/LanguageContext.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

import SectionHeading from "../components/SectionHeading.jsx";
import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import {
  Sprig,
  Sparkle,
  Envelope,
  Dots,
  Check,
  Flourish,
} from "../components/Doodles.jsx";

import "./About.css";

const DIFFERENCE_DOODLES = [Sparkle, Envelope, Flourish];

export default function About() {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t("about.meta.title"),
    description: t("about.meta.description"),
    language,
  });

  const paragraphs = t("about.story.paragraphs");
  const differences = t("about.difference.items");
  const values = t("about.values.items");

  return (
    <div className="page-enter">
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        titleStart={t("about.hero.titleStart")}
        titleAccent={t("about.hero.titleAccent")}
        titleEnd={t("about.hero.titleEnd")}
        lead={t("about.hero.lead")}
      />

      {/* ============================================================== story */}
      <section className="section story">
        <Dots width={84} className="doodle doodle--desktop story__dots" />

        <div className="container story__inner">
          <div className="story__aside">
            <SectionHeading
              eyebrow={t("about.story.eyebrow")}
              title={t("about.story.title")}
              align="start"
            />
            <Sprig
              width={92}
              className="doodle--olive story__sprig"
              aria-hidden="true"
            />
          </div>

          <div className="story__body prose">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={index === 0 ? "story__first" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= difference */}
      <section className="section section--tinted difference">
        <div className="container">
          <SectionHeading
            eyebrow={t("about.difference.eyebrow")}
            title={t("about.difference.title")}
          />

          <ul className="difference__list">
            {differences.map((item, index) => {
              const Doodle =
                DIFFERENCE_DOODLES[index % DIFFERENCE_DOODLES.length];
              return (
                <li className="difference__item" key={item.title}>
                  <span className="difference__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="difference__content">
                    <h3 className="difference__title">{item.title}</h3>
                    <p className="difference__body">{item.body}</p>
                  </div>

                  <Doodle
                    width={46}
                    className="difference__doodle doodle--gold"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============================================================= values */}
      <section className="section values">
        <div className="container">
          <SectionHeading
            eyebrow={t("about.values.eyebrow")}
            title={t("about.values.title")}
          />

          <ul className="values__grid">
            {values.map((value) => (
              <li className="value card" key={value.title}>
                <span className="value__tick" aria-hidden="true">
                  <Check width={17} />
                </span>
                <h3 className="value__title">{value.title}</h3>
                <p className="value__body">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={t("about.cta.title")}
        body={t("about.cta.body")}
        primaryLabel={t("about.cta.primary")}
      />
    </div>
  );
}
