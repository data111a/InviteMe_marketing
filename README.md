# InviteMe — marketing site

The public site for **inviteme.ge**. It presents the business, explains the
service and shows real example invitations as live previews. This is *not* the
invitation product itself — no RSVP data or client dashboard lives here.

Built with React + Vite, plain CSS, and a small hand-rolled i18n layer.
Fully bilingual: **ქართული** (primary) and **English**.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open the URL Vite prints (http://localhost:5173 by default).

Other scripts:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

`build` writes a static site to `dist/`. `preview` serves that build locally so
you can check it before deploying.

---

## Project layout

```
infoSite/
├── index.html                  base <meta>, Google Fonts, JSON-LD
├── public/
│   ├── favicon.svg
│   ├── _headers, _redirects    ← host config (security headers, SPA fallback)
│   └── .htaccess               ← same, for Apache / cPanel
└── src/
    ├── main.jsx                entry — global CSS is imported here, first
    ├── App.jsx                 routes + page shell
    ├── context/
    │   └── LanguageContext.jsx LanguageProvider + useLanguage()
    ├── locales/
    │   ├── en.js               every English string
    │   ├── ka.js               every Georgian string
    │   └── index.js            language list + default
    ├── data/
    │   ├── examples.js         live invitation examples (links)
    │   └── site.js             email, phone, social links
    ├── hooks/
    │   └── usePageMeta.js      per-page <title> + meta description
    ├── services/
    │   └── contactForm.js      ← wire your backend up here
    ├── components/             Header, Footer, Logo, Modal, SitePreviews,
    │                           LanguageSwitcher, PageHero, CTASection,
    │                           SectionHeading, ScrollToTop, Doodles
    ├── pages/                  Home, About, Services, Contact, NotFound
    └── styles/
        ├── variables.css       design tokens — colours, fonts, spacing
        └── base.css            reset, typography, buttons, cards, utilities
```

Each component and page has its own `.css` file next to it. Global tokens and
shared classes live in `src/styles/`.

> **Import order matters.** `variables.css` and `base.css` are imported in
> `main.jsx` *before* `App.jsx`, so the bundler emits them ahead of the
> per-component stylesheets. Keep it that way — flip the order and base
> utilities like `.btn` start beating component rules of equal specificity.

---

## Editing the text

**All visible text lives in `src/locales/en.js` and `src/locales/ka.js`.**
Nothing is hardcoded in a component. To change wording, edit those two files —
you never need to touch JSX.

The two files must have **the same keys**. If a key is missing from `ka.js` the
site falls back to the English string and logs a warning in the dev console.

Components read strings through a dotted path:

```jsx
const { t } = useLanguage();
t("home.hero.subtitle");        // → a string
t("home.features.items");       // → an array, ready to .map()
```

### Split headings

Some headings are stored as three keys so the wording can flow naturally in each
language (the emphasis word can sit in a different place):

```js
titleStart:  "Invitations your guests ",
titleAccent: "actually",
titleEnd:    " open.",
```

`titleAccent` renders inline as normal heading text. Leave it an empty string if
a heading does not need the middle segment.

### Adding a third language

1. Copy `en.js` to e.g. `ru.js` and translate the values.
2. Register it in `src/locales/index.js` — add it to `locales` and to
   `LANGUAGES` (`{ code: "ru", label: "RU", name: "Русский" }`).

The switcher, the `<html lang>` attribute and `localStorage` all pick it up
automatically.

---

## Adding example invitations

The "Recent work" section shows **real, published invitations live** — each one
is rendered inside a phone frame and the whole card links out to the site (opens
in a new tab). Edit `src/data/examples.js`:

```js
{
  id: "nikoloz-elene",                   // any unique string
  url: "https://test1.inviteme.ge",
  category: "wedding",                   // see below
  title: { en: "Nikoloz & Elene", ka: "ნიკოლოზი და ელენე" },
}
```

`category` must be one of the keys under `home.gallery.categories` in the locale
files: `wedding`, `birthday`, `corporate`, `christening`, `anniversary`.

Any site on `*.inviteme.ge` just works. A site on **another domain** must also be
added to the CSP `frame-src` (in `public/_headers`, `vercel.json` and
`public/.htaccess`), and it must not forbid being framed (`X-Frame-Options`).

Previews load lazily (only when scrolled near), run silently (no audio/autoplay)
and can't be clicked into — they're a picture of the site; the card is the link.
On phones the cards become a swipeable row.

---

## Hooking up the contact form

The form validates on the client and then calls `submitContactForm()` in
[`src/services/contactForm.js`](src/services/contactForm.js). Right now that
function logs the payload and resolves after a fake delay.

Open the file and replace the marked `TODO` block — it has ready-to-paste
snippets for three approaches:

- **A** — your own backend endpoint (`fetch` a POST to your API)
- **B** — a hosted form service such as Formspree or Web3Forms
- **C** — EmailJS, if you would rather not run a server

Throw from the function to show the error state; resolve to show the success
state. Both messages are already translated.

> Never put a private API key in this file. Everything in the frontend bundle
> is public — use a public form endpoint, or proxy through your own backend.

The form already includes a honeypot field that silently drops bot submissions.

---

## Things to replace before launch

These are placeholders, deliberately obvious:

- `src/data/site.js` — email, phone, Instagram/Facebook/WhatsApp links
- `src/locales/*` → `services.pricing.plans` — the prices (250/450/750 ₾)
- `src/locales/*` → `home.words.items` — the three testimonials
- `src/locales/*` → `about.story.paragraphs[0]` — marked as placeholder in the copy
- `index.html` — the JSON-LD block (name, email, phone) and `og:image`
- `public/og-image.jpg` — social sharing image, 1200×630, not included yet

---

## Deploying to inviteme.ge

`npm run build` produces a fully static `dist/` — no Node server needed. Upload
it to any static host (Netlify, Vercel, Cloudflare Pages, or Apache/cPanel).

**SPA fallback and security headers are already configured** — a visitor loading
`inviteme.ge/services` directly is served `index.html` so the router can handle
it, and hardening headers (CSP, HSTS, etc.) are applied. The right file is picked
up automatically by your host:

- **Netlify / Cloudflare Pages** — `public/_redirects` + `public/_headers`
- **Vercel** — `vercel.json` (rewrite + headers)
- **Apache / cPanel** — `public/.htaccess`
- **nginx** — not included; add `try_files $uri $uri/ /index.html;` plus the
  headers from `public/_headers` to your server block.

See [`SECURITY.md`](SECURITY.md) for the full security posture, and remember to
add your contact-form endpoint to the CSP `connect-src` when you wire it up.

---

## Notes on the build

**Fonts** load from Google Fonts in `index.html`: **Work Sans** for Latin and
**Noto Sans Georgian** for Georgian — one clean sans-serif used for both
headings and body. The browser picks the right face per character, so mixed text
works without extra CSS. To self-host them later, download the files into
`public/fonts/` and swap the `<link>` for `@font-face` rules.

**Theming** is all in `src/styles/variables.css` — colours, fonts, spacing,
radii and shadows. The brand is a blue→teal scheme taken from the logo: primary
blue `--c-accent` (`#1a6bab`), teal `--c-teal` (`#23a58c`), and the
`--grad-brand` gradient used on the logo and primary buttons. Change those
tokens and the whole site follows.

**Logo** is a text-based component in `src/components/Logo.jsx` — the "InviteMe"
wordmark drawn with the brand gradient (`background-clip: text`), a checkmark
SVG, and the tagline. It scales with CSS and needs no image file. To use the
exact raster logo instead, drop it at `public/logo.png` and follow the swap
comment at the top of `Logo.jsx`.

**Doodles** are inline SVG components in `src/components/Doodles.jsx`. They draw
with `currentColor`, so you position and colour them from CSS:

```jsx
<Sprig width={80} className="doodle doodle--olive hero__sprig" />
```

The `doodle--desktop` class hides a decoration below 720px so it never crowds
text on a phone.

**SEO** is client-side: `usePageMeta()` sets the title, description, OG tags and
canonical URL per page. Crawlers that run JavaScript (including Google) see
these; simpler crawlers see the defaults in `index.html`. If that matters to
you, pre-rendering is the next step.

**Accessibility** — semantic landmarks, a skip link, visible focus rings, a
focus-trapped lightbox that restores focus on close, labelled form fields with
`aria-invalid`/`aria-describedby` errors, and `prefers-reduced-motion` support
(which also shortens the menu and card animations).
