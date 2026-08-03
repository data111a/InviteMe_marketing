import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "../context/LanguageContext.jsx";
import "./Modal.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, video[controls], [tabindex]:not([tabindex="-1"])';

/**
 * Reusable lightbox. Handles Esc, backdrop clicks, body scroll lock, a focus
 * trap, and returning focus to whatever opened it.
 */
export default function Modal({ isOpen, onClose, label, children }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      const nodes = dialog?.querySelectorAll(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      // Focus starts on the dialog container itself, which is not in the list.
      if (active === dialog) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";

    // Focus the dialog itself rather than something inside it: the contents
    // can swap after mount (a missing video falls back to a placeholder), and
    // focusing a node that then unmounts drops focus back to <body>, which
    // would let Tab escape the trap.
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="modal__dialog" ref={dialogRef} tabIndex={-1}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label={t("common.close")}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5.5 5.2c4.6 4.3 9.1 8.8 13.3 13.5M18.6 5.4C14.2 9.9 9.7 14.3 5.2 18.6" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
