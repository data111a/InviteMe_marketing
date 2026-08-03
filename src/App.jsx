import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useLanguage } from "./context/LanguageContext.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const { t } = useLanguage();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {t("nav.ariaLabel")}
      </a>

      <ScrollToTop />
      <Header />

      <main id="main" className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
