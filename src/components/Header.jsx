import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import Logo from "./Logo.jsx";
import { Sprig } from "./Doodles.jsx";
import "./Header.css";

const NAV_ITEMS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/contact", key: "nav.contact" },
];

export default function Header() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Esc closes the drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${
          menuOpen ? "is-menu-open" : ""
        }`}
      >
        <div className="site-header__inner container">
          <Link to="/" className="brand" aria-label={t("common.brand")}>
            <Logo className="logo--compact" />
          </Link>

          <nav className="site-nav" aria-label={t("nav.ariaLabel")}>
            <ul className="site-nav__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `site-nav__link ${isActive ? "is-active" : ""}`
                    }
                  >
                    {t(item.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <LanguageSwitcher />
            <Link to="/contact" className="btn btn--primary site-header__cta">
              {t("common.getInTouch")}
            </Link>

            <button
              type="button"
              className={`burger ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="burger__bar" />
              <span className="burger__bar" />
              <span className="burger__bar" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — a SIBLING of <header> on purpose. The header's
          backdrop-filter makes it the containing block for any fixed
          descendant, which would clamp this full-screen overlay to the header's
          height. As a sibling it fills the viewport. */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <Sprig
          width={90}
          className="doodle doodle--olive mobile-menu__sprig"
          aria-hidden="true"
        />

        <nav className="mobile-menu__nav" aria-label={t("nav.ariaLabel")}>
          <ul className="mobile-menu__list">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to} style={{ "--i": index }}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive ? "is-active" : ""}`
                  }
                >
                  <span className="mobile-menu__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          {/* <LanguageSwitcher className="lang--drawer" /> */}
          <Link to="/contact" className="btn btn--primary mobile-menu__cta">
            {t("common.getInTouch")}
          </Link>
        </div>
      </div>
    </>
  );
}
