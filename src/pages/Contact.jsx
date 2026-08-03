import { useState } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import site from "../data/site.js";
import { submitContactForm } from "../services/contactForm.js";

import PageHero from "../components/PageHero.jsx";
import { Envelope, Sparkle, Check, Sprig } from "../components/Doodles.jsx";

import "./Contact.css";

const EMPTY = { name: "", email: "", message: "" };

/* Deliberately loose: the point is to catch typos, not to police addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t("contact.meta.title"),
    description: t("contact.meta.description"),
    language,
  });

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [botField, setBotField] = useState("");

  function validate(current) {
    const next = {};

    if (!current.name.trim()) {
      next.name = t("contact.form.errors.name");
    }

    if (!current.email.trim()) {
      next.email = t("contact.form.errors.emailRequired");
    } else if (!EMAIL_PATTERN.test(current.email.trim())) {
      next.email = t("contact.form.errors.emailInvalid");
    }

    if (!current.message.trim()) {
      next.message = t("contact.form.errors.message");
    } else if (current.message.trim().length < 10) {
      next.message = t("contact.form.errors.messageShort");
    }

    return next;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);

    // Once a field has been blurred, re-validate as the user types.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validate(next)[name] }));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validate(values)[name] }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Honeypot: real people never fill a hidden field.
    if (botField) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      // Look the field up by name rather than by [aria-invalid] — React has
      // not re-rendered yet at this point, so that attribute is not in the
      // DOM until after this handler returns.
      const firstInvalid = ["name", "email", "message"].find(
        (field) => nextErrors[field]
      );
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch (error) {
      console.error("[contact form] submission failed:", error);
      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrors({});
    setTouched({});
  }

  const fieldError = (name) => (touched[name] ? errors[name] : undefined);

  return (
    <div className="page-enter">
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        titleStart={t("contact.hero.titleStart")}
        titleAccent={t("contact.hero.titleAccent")}
        titleEnd={t("contact.hero.titleEnd")}
        lead={t("contact.hero.lead")}
      />

      <section className="section contact">
        <Sprig
          width={84}
          className="doodle doodle--olive doodle--desktop contact__sprig"
        />

        <div className="container contact__inner">
          {/* ------------------------------------------------------- form */}
          <div className="contact__form-wrap card card--framed">
            <h2 className="contact__form-title">{t("contact.form.title")}</h2>

            {status === "success" ? (
              <div className="contact__success" role="status">
                <span className="contact__success-icon" aria-hidden="true">
                  <Check width={26} />
                </span>
                <p>{t("contact.form.success")}</p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={resetForm}
                >
                  {t("contact.form.sendAnother")}
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from people, tempting to bots. */}
                <div className="contact__honeypot" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(event) => setBotField(event.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="name">
                    {t("contact.form.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`field__input ${
                      fieldError("name") ? "has-error" : ""
                    }`}
                    placeholder={t("contact.form.namePlaceholder")}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldError("name"))}
                    aria-describedby={
                      fieldError("name") ? "name-error" : undefined
                    }
                    required
                  />
                  {fieldError("name") && (
                    <p className="field__error" id="name-error">
                      {fieldError("name")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    {t("contact.form.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`field__input ${
                      fieldError("email") ? "has-error" : ""
                    }`}
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldError("email"))}
                    aria-describedby={
                      fieldError("email") ? "email-error" : undefined
                    }
                    required
                  />
                  {fieldError("email") && (
                    <p className="field__error" id="email-error">
                      {fieldError("email")}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="message">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className={`field__input field__textarea ${
                      fieldError("message") ? "has-error" : ""
                    }`}
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(fieldError("message"))}
                    aria-describedby={
                      fieldError("message") ? "message-error" : undefined
                    }
                    required
                  />
                  {fieldError("message") && (
                    <p className="field__error" id="message-error">
                      {fieldError("message")}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="contact__alert" role="alert">
                    {t("contact.form.error")}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? t("contact.form.sending")
                    : t("contact.form.submit")}
                </button>

                <p className="contact__privacy">{t("contact.form.privacy")}</p>
              </form>
            )}
          </div>

          {/* ---------------------------------------------------- details */}
          <aside className="contact__details">
            <span className="contact__details-icon" aria-hidden="true">
              <Envelope width={54} />
            </span>

            <h2 className="contact__details-title">
              {t("contact.details.title")}
            </h2>

            <dl className="contact__list">
              <div className="contact__row">
                <dt>{t("contact.details.emailLabel")}</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>

              <div className="contact__row">
                <dt>{t("contact.details.phoneLabel")}</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phone}</a>
                </dd>
              </div>

              <div className="contact__row">
                <dt>{t("contact.details.hoursLabel")}</dt>
                <dd>{t("contact.details.hours")}</dd>
              </div>

              <div className="contact__row">
                <dt>{t("contact.details.addressLabel")}</dt>
                <dd>{t("contact.details.address")}</dd>
              </div>
            </dl>

            <h3 className="contact__social-title">
              {t("contact.details.socialLabel")}
            </h3>
            <ul className="contact__social">
              {site.social.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="contact__response">
              <Sparkle width={13} aria-hidden="true" />
              {t("contact.details.responseNote")}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
