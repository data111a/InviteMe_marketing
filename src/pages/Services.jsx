import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTASection from "../components/CTASection.jsx";
import {
  Envelope,
  Check,
  Sparkle,
  Confetti,
  Sprig,
  Rings,
  Toast,
  CircleScribble,
} from "../components/Doodles.jsx";

import "./Services.css";

const SERVICE_DOODLES = [Envelope, Rings, Toast];

export default function Services() {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t("services.meta.title"),
    description: t("services.meta.description"),
    language,
  });

  const items = t("services.items");
  const extras = t("services.extras.items");
  const steps = t("services.process.steps");
  const plans = t("services.pricing.plans");
  const faq = t("services.faq.items");

  return (
    <div className="page-enter">
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        titleStart={t("services.hero.titleStart")}
        titleAccent={t("services.hero.titleAccent")}
        titleEnd={t("services.hero.titleEnd")}
        lead={t("services.hero.lead")}
      />

      {/* =========================================================== services */}
      <section className="section services">
        <Confetti
          width={112}
          className="doodle doodle--gold doodle--desktop services__confetti"
        />

        <div className="container">
          <ul className="services__grid">
            {items.map((item, index) => {
              const Doodle = SERVICE_DOODLES[index % SERVICE_DOODLES.length];
              return (
                <li className="service card card--framed" key={item.name}>
                  <span className="service__icon" aria-hidden="true">
                    <Doodle width={46} />
                  </span>

                  <h2 className="service__name">{item.name}</h2>
                  <p className="service__summary">{item.summary}</p>

                  <ul className="service__points">
                    {item.points.map((point) => (
                      <li key={point}>
                        <Check width={16} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============================================================= extras */}
      <section className="section section--tinted extras">
        <div className="container">
          <SectionHeading
            eyebrow={t("services.extras.eyebrow")}
            title={t("services.extras.title")}
          />

          <ul className="extras__list">
            {extras.map((extra) => (
              <li className="extras__chip" key={extra}>
                <Sparkle width={12} aria-hidden="true" />
                {extra}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ process */}
      <section className="section process">
        <Sprig
          width={80}
          className="doodle doodle--olive doodle--desktop process__sprig"
        />

        <div className="container">
          <SectionHeading
            eyebrow={t("services.process.eyebrow")}
            title={t("services.process.title")}
          />

          <ol className="process__list">
            {steps.map((step, index) => (
              <li className="process__step" key={step.title}>
                <div className="process__badge">
                  <CircleScribble width={58} className="process__ring" />
                  <span className="process__number">{index + 1}</span>
                </div>
                <div>
                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ pricing */}
      <section className="section section--tinted pricing">
        <div className="container">
          <SectionHeading
            eyebrow={t("services.pricing.eyebrow")}
            title={t("services.pricing.title")}
            subtitle={t("services.pricing.subtitle")}
          />

          <ul className="pricing__grid">
            {plans.map((plan, index) => {
              const featured = index === 1;
              return (
                <li
                  className={`plan ${featured ? "plan--featured" : ""}`}
                  key={plan.name}
                >
                  {featured && (
                    <span className="plan__badge">
                      {t("services.pricing.popular")}
                    </span>
                  )}

                  <h3 className="plan__name">{plan.name}</h3>
                  <p className="plan__price">
                    {plan.price}
                    <span className="plan__period">
                      {t("services.pricing.perEvent")}
                    </span>
                  </p>
                  <p className="plan__description">{plan.description}</p>

                  <hr className="rule-dashed plan__rule" />

                  <ul className="plan__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check width={15} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`btn ${
                      featured ? "btn--primary" : "btn--ghost"
                    } plan__cta`}
                  >
                    {t("services.pricing.cta")}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="pricing__note">{t("services.pricing.note")}</p>
        </div>
      </section>

      {/* ================================================================ faq */}
      <section className="section faq">
        <div className="container container--narrow">
          <SectionHeading
            eyebrow={t("services.faq.eyebrow")}
            title={t("services.faq.title")}
          />

          <div className="faq__list">
            {faq.map((entry) => (
              <details className="faq__item" key={entry.q}>
                <summary className="faq__q">
                  <span>{entry.q}</span>
                  <span className="faq__marker" aria-hidden="true" />
                </summary>
                <div className="faq__a">
                  <p>{entry.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t("services.cta.title")}
        body={t("services.cta.body")}
        primaryLabel={t("services.cta.primary")}
      />
    </div>
  );
}
