import { Sprig, Sparkle, Dots } from "./Doodles.jsx";
import "./PageHero.css";

/** Compact page header used at the top of About / Services / Contact. */
export default function PageHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  lead,
  children,
}) {
  return (
    <section className="page-hero">
      <Sprig
        width={74}
        className="doodle doodle--olive doodle--desktop page-hero__sprig"
      />
      <Dots width={72} className="doodle doodle--desktop page-hero__dots" />

      <div className="container page-hero__inner">
        <p className="eyebrow">{eyebrow}</p>

        <h1 className="page-hero__title">
          {titleStart}
          {titleAccent}
          {titleEnd}
        </h1>

        {lead && <p className="page-hero__lead">{lead}</p>}

        <Sparkle width={18} className="page-hero__star" />

        {children}
      </div>
    </section>
  );
}
