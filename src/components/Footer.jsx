import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import site from "../data/site.js";
import { Squiggle, Heart } from "./Doodles.jsx";
import Logo from "./Logo.jsx";
import "./Footer.css";

const PAGES = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/contact", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Squiggle width={260} className="doodle site-footer__squiggle" />

      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <Logo tagline={false} />
          </Link>
          <p className="site-footer__about">{t("footer.about")}</p>
        </div>

        <nav className="site-footer__col" aria-label={t("footer.pagesTitle")}>
          <h2 className="site-footer__title">{t("footer.pagesTitle")}</h2>
          <ul className="site-footer__list">
            {PAGES.map((page) => (
              <li key={page.to}>
                <Link to={page.to}>{t(page.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__title">{t("footer.contactTitle")}</h2>
          <ul className="site-footer__list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li className="site-footer__muted">{t("contact.details.address")}</li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__title">{t("footer.followTitle")}</h2>
          <ul className="site-footer__list">
            {site.social.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {t("common.brand")}. {t("footer.rights")}
        </p>
        <p className="site-footer__made">
          {t("footer.madeWith")}
          <Heart width={14} className="site-footer__heart" />
        </p>
      </div>
    </footer>
  );
}
