import "./SectionHeading.css";

/**
 * Section title with an optional hand-drawn underline under one accent word.
 *
 * Titles are split into three locale keys (titleStart / titleAccent / titleEnd)
 * so the underlined word can sit in a different place in each language.
 */
export default function SectionHeading({
  eyebrow,
  title,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
  align = "center",
  level = 2,
  id,
}) {
  const Tag = `h${level}`;

  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <p className={`eyebrow ${align === "start" ? "eyebrow--start" : ""}`}>
          {eyebrow}
        </p>
      )}

      <Tag className="section-heading__title" id={id}>
        {title ? (
          title
        ) : (
          <>
            {titleStart}
            {titleAccent}
            {titleEnd}
          </>
        )}
      </Tag>

      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
