import { useEffect } from "react";

/**
 * Minimal SEO helper — sets <title> and the description/OG meta tags for the
 * current page. Kept deliberately tiny so the project needs no react-helmet.
 *
 * Note: this runs on the client. For crawlers that do not execute JavaScript,
 * pre-rendering (e.g. `vite-plugin-ssr`) or static per-page HTML would be the
 * next step — the defaults in index.html are what those crawlers see today.
 */
function setMeta(selector, attr, value) {
  if (!value) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [key, val] = selector.replace(/^meta\[|\]$/g, "").split("=");
    tag.setAttribute(key, val.replace(/"/g, ""));
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

export default function usePageMeta({ title, description, language }) {
  useEffect(() => {
    if (title) document.title = title;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta(
      'meta[property="og:locale"]',
      "content",
      language === "ka" ? "ka_GE" : "en_US"
    );

    // Canonical URL for the current path.
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + window.location.pathname);
  }, [title, description, language]);
}
