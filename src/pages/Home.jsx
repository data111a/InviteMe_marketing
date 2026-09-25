import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import examples from "../data/examples.js";

import SectionHeading from "../components/SectionHeading.jsx";
import SitePreviews from "../components/SitePreviews.jsx";
import CTASection from "../components/CTASection.jsx";
import {
  Sprig,
  Sparkle,
  Confetti,
  ArrowCurve,
  Rings,
  Balloons,
  Toast,
  Dots,
  Flourish,
  Check,
  CircleScribble,
} from "../components/Doodles.jsx";

import "./Home.css";

/* Rotating doodle for each "how it works" step. */
const STEP_DOODLES = [Rings, Confetti, Toast];

export default function Home() {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t("home.meta.title"),
    description: t("home.meta.description"),
    language,
  });

  const stats = t("home.stats");
  const steps = t("home.how.steps");
  const features = t("home.features.items");
  const words = t("home.words.items");

  return (
    <div className="page-enter">
      {/* ================================================================ hero */}
      <section className="hero">
        <Sprig
          width={92}
          className="doodle doodle--olive doodle--desktop hero__sprig"
        />
        <Dots width={86} className="doodle doodle--desktop hero__dots" />
        <Flourish
          width={104}
          className="doodle doodle--gold doodle--desktop hero__flourish"
        />

        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--start">{t("home.hero.eyebrow")}</p>

            <h1 className="hero__title">
              {t("home.hero.titleStart")}
              {t("home.hero.titleAccent")}
              {t("home.hero.titleEnd")}
            </h1>

            <p className="hero__subtitle">{t("home.hero.subtitle")}</p>

            <div className="hero__actions">
              <Link to="/contact" className="btn btn--primary">
                {t("common.getInTouch")}
              </Link>
              <a href="#examples" className="btn btn--ghost">
                {t("common.seeExamples")}
              </a>
            </div>

            <p className="hero__note">
              <Check width={17} className="hero__note-icon" />
              {t("home.hero.note")}
            </p>
          </div>

          {/* Decorative mock-up of an invitation card. */}
          <div className="hero__visual" aria-hidden="true">
            <ArrowCurve
              width={78}
              className="doodle doodle--desktop hero__arrow"
            />
            <Balloons
              width={62}
              className="doodle doodle--accent doodle--desktop hero__balloons"
            />

            <div className="invite-card">
              <div className="invite-card__edge">
                <p className="invite-card__kicker">
                  {t("home.hero.cardTitle")}
                </p>
                <Sparkle width={18} className="invite-card__star" />
                <p className="invite-card__names">{t("home.hero.cardNames")}</p>
                <div className="invite-card__rule">
                  <span />
                  <Sparkle width={11} />
                  <span />
                </div>
                <p className="invite-card__date">{t("home.hero.cardDate")}</p>
                <p className="invite-card__place">{t("home.hero.cardPlace")}</p>

                <p className="invite-card__ask">{t("home.hero.cardAction")}</p>
                <div className="invite-card__buttons">
                  <span className="invite-card__btn is-yes">
                    {t("home.hero.cardYes")}
                  </span>
                  <span className="invite-card__btn">
                    {t("home.hero.cardNo")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================== stats */}
      <section className="stats">
        <div className="container stats__inner">
          {stats.map((stat) => (
            <div className="stats__item" key={stat.label}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================= gallery */}
      <section className="section gallery-section" id="examples">
        <div className="container">
          <SectionHeading
            eyebrow={t("home.gallery.eyebrow")}
            titleStart={t("home.gallery.titleStart")}
            titleAccent={t("home.gallery.titleAccent")}
            titleEnd={t("home.gallery.titleEnd")}
            subtitle={t("home.gallery.subtitle")}
          />
          <SitePreviews items={examples} />
        </div>
      </section>

      {/* ================================================================= how */}
      <section className="section section--tinted how">
        <Confetti
          width={120}
          className="doodle doodle--gold doodle--desktop how__confetti"
        />

        <div className="container">
          <SectionHeading
            eyebrow={t("home.how.eyebrow")}
            title={t("home.how.title")}
          />

          <ol className="how__list">
            {steps.map((step, index) => {
              const Doodle = STEP_DOODLES[index % STEP_DOODLES.length];
              return (
                <li className="how__step" key={step.title}>
                  <div className="how__badge">
                    <CircleScribble width={72} className="how__badge-ring" />
                    <span className="how__number">{index + 1}</span>
                  </div>

                  <Doodle width={54} className="how__doodle doodle--accent" />

                  <h3 className="how__title">{step.title}</h3>
                  <p className="how__body">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ============================================================ features */}
      <section className="section features">
        <Sprig
          width={82}
          className="doodle doodle--olive doodle--desktop features__sprig"
        />

        <div className="container">
          <SectionHeading
            eyebrow={t("home.features.eyebrow")}
            title={t("home.features.title")}
          />

          <ul className="features__grid">
            {features.map((feature) => (
              <li className="feature card card--framed" key={feature.title}>
                <span className="feature__tick" aria-hidden="true">
                  <Check width={18} />
                </span>
                <h3 className="feature__title">{feature.title}</h3>
                <p className="feature__body">{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =============================================================== words */}
      <section className="section section--tinted words">
        <div className="container">
          <SectionHeading
            eyebrow={t("home.words.eyebrow")}
            title={t("home.words.title")}
          />

          <ul className="words__grid">
            {words.map((word) => (
              <li className="quote" key={word.author}>
                <span className="quote__mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="quote__text">{word.quote}</blockquote>
                <footer className="quote__by">
                  <span className="quote__author">{word.author}</span>
                  <span className="quote__event">{word.event}</span>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================= cta */}
      <CTASection
        title={t("home.cta.title")}
        body={t("home.cta.body")}
        primaryLabel={t("home.cta.primary")}
        secondaryLabel={t("home.cta.secondary")}
        secondaryTo="/services"
      />
    </div>
  );
}
