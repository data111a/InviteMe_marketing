import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router keeps the scroll position between pages by default — reset it, unless
 * the link points at an anchor on the destination page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
