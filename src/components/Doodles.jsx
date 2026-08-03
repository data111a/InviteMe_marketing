/* ==========================================================================
   Hand-drawn SVG decorations.

   All of them draw with `currentColor`, so you colour them from CSS:
     <Sprig className="doodle doodle--olive" style={{ top: 40, left: 0 }} />

   They are purely decorative: aria-hidden and non-focusable everywhere.
   ========================================================================== */

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

/* ---------------------------------------------------- leafy branch ------ */
export function Sprig({ width = 58, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 64 128" width={width} strokeWidth="2" {...rest}>
      <path d="M32 125c-2-24-2-49 2-71 3-18 8-34 14-48" />
      <path d="M31 107c-9-1-15-7-16-15 9-2 15 3 16 15Z" />
      <path d="M32 97c8-3 13-9 12-18-9 1-13 7-12 18Z" />
      <path d="M31 87c-9-2-14-9-14-17 9-1 14 5 14 17Z" />
      <path d="M33 76c8-3 13-10 12-18-9 1-13 7-12 18Z" />
      <path d="M34 65c-9-2-14-9-13-17 9-1 13 5 13 17Z" />
      <path d="M36 54c8-4 12-11 11-19-9 1-12 8-11 19Z" />
      <path d="M40 39c-8-3-12-9-11-17 8 0 12 6 11 17Z" />
    </svg>
  );
}

/* --------------------------------------------------------- heart -------- */
export function Heart({ width = 40, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 48 46" width={width} strokeWidth="2.2" {...rest}>
      <path d="M24 42C14.5 35.5 4 28.5 4 17.5 4 10 9.5 4.5 15.8 4.5c3.7 0 6.7 1.9 8.2 4.8 1.6-2.9 4.7-4.8 8.4-4.8C38.6 4.5 44 10 44 17.5c0 11-10.6 18-20 24.5Z" />
      <path d="M13 15.5c.4-2.6 1.9-4.3 4.2-4.9" strokeWidth="1.6" opacity=".75" />
    </svg>
  );
}

/* --------------------------------------------------- four-point star ---- */
export function Sparkle({ width = 26, ...rest }) {
  return (
    <svg
      {...base}
      viewBox="0 0 40 40"
      width={width}
      fill="currentColor"
      stroke="none"
      {...rest}
    >
      <path d="M20 1.5c2.2 9.4 8.9 16.2 18.3 18.5-9.4 2.3-16.1 9.1-18.3 18.5-2.2-9.4-8.9-16.2-18.3-18.5C11.1 17.7 17.8 10.9 20 1.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------ small burst ----- */
export function Burst({ width = 44, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 48 48" width={width} strokeWidth="2" {...rest}>
      <path d="M24 4v9M24 35v9M4 24h9M35 24h9M9.9 9.9l6.4 6.4M31.7 31.7l6.4 6.4M38.1 9.9l-6.4 6.4M16.3 31.7l-6.4 6.4" />
    </svg>
  );
}

/* -------------------------------------------------------- confetti ------ */
export function Confetti({ width = 96, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 110 80" width={width} strokeWidth="2" {...rest}>
      <path d="M8 22c3-5 3-9 0-14" />
      <path d="M31 10c3.5-4.5 3.8-8.6 1-13" />
      <path d="M56 20c3-5 3-9 0-14" />
      <path d="M82 13c3.5-4.5 3.8-8.6 1-13" />
      <path d="M19 46c3-5 3-9 0-14" />
      <path d="M68 44c3-5 3-9 0-14" />
      <path d="M96 38c3-5 3-9 0-14" />
      <circle cx="44" cy="38" r="2.6" />
      <circle cx="90" cy="61" r="2.6" />
      <circle cx="13" cy="66" r="2.6" />
      <path d="M55 60l4 4M59 60l-4 4" />
      <path d="M31 68l4 4M35 68l-4 4" />
    </svg>
  );
}

/* -------------------------------------------------------- envelope ------ */
export function Envelope({ width = 64, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 72 56" width={width} strokeWidth="2.1" {...rest}>
      <path d="M4 14c2.5-1.6 6.4-2.6 10.4-2.9 10.6-.8 32.5-.7 43.1.2 3.4.3 6.5 1.2 8.9 2.7.8 4 1 8.1.8 12.2-.2 5-.6 9.9-1.3 14.8-.3 2.2-2 3.6-4.3 3.9-12.7 1.4-38 1.4-50.7 0-2.3-.3-3.9-1.7-4.3-4C5.7 36 5.2 31 5 26c-.2-4 0-8.1.9-12Z" />
      <path d="M4.8 14.9c7.1 6.8 14.7 12.5 22.9 17.1 1.8 1 3.9 1 5.6.1 8.2-4.6 15.8-10.3 22.8-17.1" />
    </svg>
  );
}

/* ----------------------------------------------------------- rings ------ */
export function Rings({ width = 62, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 76 52" width={width} strokeWidth="2.1" {...rest}>
      <path d="M27 48c11 0 19.5-7.8 19.5-18S38 12 27 12 7.5 19.8 7.5 30 16 48 27 48Z" />
      <path d="M49 48c11 0 19.5-7.8 19.5-18S60 12 49 12c-4 0-7.7 1-10.8 2.9" />
      <path d="M49 12.5 45.6 5h6.9L49 12.5Z" />
    </svg>
  );
}

/* -------------------------------------------------------- balloons ------ */
export function Balloons({ width = 62, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 70 110" width={width} strokeWidth="2" {...rest}>
      <path d="M24 56c9.4 0 17-8.7 17-19.4S33.4 17 24 17 7 25.9 7 36.6 14.6 56 24 56Z" />
      <path d="M24 56c1.4 2.2 2.5 3.6 4.5 4.6-2.6 1-4.8 1-7.4 0 1.8-1 2.7-2.4 2.9-4.6Z" />
      <path d="M26 61c3.5 12.5 3 25.4-1.5 38.6-1.3 3.8-1 6.6 1.5 9.4" />
      <path d="M50 76c7.6 0 13.8-7 13.8-15.7S57.6 44.6 50 44.6s-13.8 7-13.8 15.7S42.4 76 50 76Z" />
      <path d="M50 76c1.1 1.8 2 2.9 3.6 3.7-2.1.8-3.9.8-6 0 1.5-.8 2.2-1.9 2.4-3.7Z" />
      <path d="M52 80c2.4 9.6 1.7 19.2-2.2 28.8" />
    </svg>
  );
}

/* ------------------------------------------------ champagne / toast ----- */
export function Toast({ width = 62, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 76 76" width={width} strokeWidth="2" {...rest}>
      <path d="M11 12c4.6-1.3 9.3-1.6 14 0 1.8 8.4 1.3 15.9-1.6 22.6-1.4 3.2-4.2 5-7.7 5.4" />
      <path d="M25 12c-1.6 8.6-1 16.3 1.9 23 1.4 3.3 4.3 5.2 7.9 5.4" />
      <path d="M18 40.5c1.8 8 2 16 .6 24" />
      <path d="M11 66c5-1.6 10-1.6 15 0" />
      <path d="M65 12c-4.6-1.3-9.3-1.6-14 0-1.8 8.4-1.3 15.9 1.6 22.6 1.4 3.2 4.2 5 7.7 5.4" />
      <path d="M51 12c1.6 8.6 1 16.3-1.9 23-1.4 3.3-4.3 5.2-7.9 5.4" />
      <path d="M58 40.5c-1.8 8-2 16-.6 24" />
      <path d="M50 66c5-1.6 10-1.6 15 0" />
      <path d="M38 4v6M31 7l-2.5 5M45 7l2.5 5" opacity=".8" />
    </svg>
  );
}

/* ---------------------------------------------------- wavy divider ------ */
export function Squiggle({ width = 200, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 220 20" width={width} strokeWidth="2" {...rest}>
      <path d="M3 12c13-11 26 9 39 0s26-11 39 0 26 9 39 0 26-11 39 0 26 9 39 0" />
    </svg>
  );
}

/* ------------------------------------------------- curved arrow --------- */
export function ArrowCurve({ width = 74, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 90 64" width={width} strokeWidth="2" {...rest}>
      <path d="M4 8c14.6 3.2 27.5 9.6 38.7 19.3C53 36 62.6 46.6 71.4 59" />
      <path d="M56 55.5c5.4 1.8 10.6 2.9 15.6 3.4 1.2-4.9 1.7-10.2 1.5-15.8" />
    </svg>
  );
}

/* ---------------------------------------------------- dotted texture ---- */
export function Dots({ width = 92, ...rest }) {
  return (
    <svg
      {...base}
      viewBox="0 0 100 100"
      width={width}
      fill="currentColor"
      stroke="none"
      {...rest}
    >
      {[6, 28, 50, 72, 94].map((y) =>
        [6, 28, 50, 72, 94].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.1" />
        ))
      )}
    </svg>
  );
}

/* ------------------------------------------------- corner flourish ------ */
export function Flourish({ width = 96, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 110 70" width={width} strokeWidth="1.9" {...rest}>
      <path d="M4 66c8.6-19.6 21-35.4 37.4-47.4C51 11.5 61.4 6.6 72.6 4" />
      <path d="M72.6 4c8 .6 14.4 3.6 19.4 9 4.6 5 6.6 10.6 6 16.8-.5 5-3.3 8-7.4 8.2-3.7.2-6.3-2-6.7-5.4-.4-3.4 1.6-6 5-6.4 4.6-.6 8.4 2 11 7.6" />
      <path d="M31 61c6.4-3.4 10.4-8 12-13.8" opacity=".7" />
    </svg>
  );
}

/* ------------------------------------------------ numbered step ring ---- */
export function CircleScribble({ width = 76, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 88 88" width={width} strokeWidth="2" {...rest}>
      <path d="M44 4.5c21.8 0 39.5 17.7 39.5 39.5S65.8 83.5 44 83.5 4.5 65.8 4.5 44 22.2 4.5 44 4.5Z" />
      <path
        d="M46 8.5c20 .6 35.6 16.6 35.6 36.4"
        strokeWidth="1.5"
        opacity=".45"
      />
    </svg>
  );
}

/* --------------------------------------------------------- checkmark ---- */
export function Check({ width = 22, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 24 24" width={width} strokeWidth="2.4" {...rest}>
      <path d="M4 13.2c2.4 1.4 4.3 3.2 5.8 5.4C13 12.3 17 7.3 21.6 3.8" />
    </svg>
  );
}

/* -------------------------------------------------------- play icon ----- */
export function PlayMark({ width = 26, ...rest }) {
  return (
    <svg {...base} viewBox="0 0 24 24" width={width} strokeWidth="2" {...rest}>
      <path d="M8.4 5.2c4 1.9 7.5 4.1 10.6 6.8-3.1 2.7-6.6 5-10.6 6.8-.6-4.6-.6-9.1 0-13.6Z" />
    </svg>
  );
}
