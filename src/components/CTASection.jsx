import { Link } from "react-router-dom";

import { Sprig, Sparkle, Confetti } from "./Doodles.jsx";
import "./CTASection.css";

/** Closing call-to-action band, reused at the bottom of every page. */
export default function CTASection({
  title,
  body,
  primaryLabel,
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="cta-band">
      <Sprig
        width={78}
        className="doodle doodle--desktop cta-band__sprig-left"
      />
      <Sprig
        width={78}
        className="doodle doodle--desktop cta-band__sprig-right"
      />
      <Confetti
        width={110}
        className="doodle doodle--desktop cta-band__confetti"
      />

      <div className="container cta-band__inner">
        <Sparkle width={22} className="cta-band__star" />
        <h2 className="cta-band__title">{title}</h2>
        <p className="cta-band__body">{body}</p>

        <div className="cta-band__actions">
          <Link to={primaryTo} className="btn btn--light">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link to={secondaryTo} className="btn cta-band__ghost">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
