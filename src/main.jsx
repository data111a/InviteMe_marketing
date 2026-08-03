import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Global styles must be imported before App so that the bundler emits them
// ahead of the per-component stylesheets — otherwise base utilities such as
// `.btn` would win over component rules of equal specificity.
import "./styles/variables.css";
import "./styles/base.css";

import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
