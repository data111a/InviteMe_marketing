# Security

This is the **public marketing site** for inviteme.ge — a static React (Vite)
build with no server of its own, no database, no login, and no user data stored.
The invitation product, guest data and client dashboard live elsewhere
(`systemUI1/`) and are out of scope here.

Because it ships as static files, the realistic attack surface is small. This
document records what is hardened, what is deliberately accepted, and what to
keep an eye on.

---

## 1. HTTP security headers

Delivered by the host, kept identical across all three config files:

| Host | File |
| --- | --- |
| Netlify, Cloudflare Pages | `public/_headers` |
| Vercel | `vercel.json` |
| Apache / cPanel shared hosting | `public/.htaccess` |

(`index.html` also carries a **commented-out** `<meta>` copy of the CSP — enable
it only if you deploy somewhere that can't set headers, e.g. GitHub Pages.)

Headers set:

- **Content-Security-Policy** — the main defence against XSS/injection. Only
  first-party code runs; the only third party allowed is Google Fonts.
  ```
  default-src 'self'; base-uri 'self'; object-src 'none';
  frame-ancestors 'none'; script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;
  media-src 'self'; connect-src 'self'; form-action 'self';
  manifest-src 'self'; upgrade-insecure-requests
  ```
  - `script-src 'self'` — no inline JS in the build; the JSON-LD block is
    non-executable data, so it isn't affected.
  - `style-src` allows `'unsafe-inline'` because React writes inline `style`
    attributes. Style injection is far lower risk than script injection; this is
    the standard trade-off. Scripts are **not** given `'unsafe-inline'`.
  - `img-src 'self' data:` covers the inline-SVG doodle textures (data URIs).
  - `frame-ancestors 'none'` + `X-Frame-Options: DENY` — no clickjacking.
- **Strict-Transport-Security** — `max-age=2y; includeSubDomains; preload`.
  Forces HTTPS. Only turn on `preload`/submit to hstspreload.org once you're sure
  every subdomain is HTTPS-only.
- **X-Content-Type-Options: nosniff** — no MIME sniffing.
- **Referrer-Policy: strict-origin-when-cross-origin**.
- **Permissions-Policy** — camera, microphone, geolocation, USB, payment, etc.
  are all disabled; only `autoplay`/`fullscreen` are allowed for self (the video
  gallery needs them).
- **Cross-Origin-Opener-Policy: same-origin**.

The CSP was validated against a real production build (`npm run build` +
`npm run preview`) with **zero violations** — fonts, videos, doodles and layout
all load cleanly.

> **When you wire up the contact form** (see below), add your form provider's
> origin to **`connect-src`** and **`form-action`** in each config file (and the
> `<meta>` if you enabled it). Nothing else needs to change.

Verify after deploy at <https://securityheaders.com> and
<https://observatory.mozilla.org> — the target is an **A/A+**.

---

## 2. Application code

- **No dangerous sinks.** No `dangerouslySetInnerHTML`, `eval`, `innerHTML`, or
  `new Function` anywhere. React escapes all interpolated text by default, so the
  bilingual strings and any future form echoes are safe from XSS.
- **External links** (`target="_blank"`) all use `rel="noopener noreferrer"` —
  no reverse-tabnabbing.
- **`localStorage`** stores exactly one non-sensitive value: the language
  choice (`inviteme.language`). No tokens, no PII.
- **No secrets in the bundle.** There are no API keys, tokens or `.env` files in
  the project. Anything shipped to the browser is public by definition.

---

## 3. Contact form (before it goes live)

Today `src/services/contactForm.js` only logs and fake-resolves — nothing is sent
anywhere, so there's no live endpoint to attack. When you connect it:

- Use a **public** form endpoint (Formspree, Web3Forms, EmailJS) **or** your own
  backend. **Never** put a private/secret API key in the frontend — Vite
  `VITE_*` vars are embedded in the public bundle.
- The form already has a **honeypot** field that silently drops bots
  (`Contact.jsx`), plus client-side validation. Keep both.
- On the receiving side, always **validate/sanitise server-side** and add
  **rate-limiting / spam protection** (most hosted form services include this).
- Add the endpoint origin to the CSP `connect-src` / `form-action` as noted above.

---

## 4. Dependencies

- Run `npm audit` regularly; keep React, Vite and react-router patched.
- **Known advisory (accepted):** `npm audit` currently flags `react-router`
  (GHSA-qwww-vcr4-c8h2, "RSC Mode CSRF"). It applies **only** to React Router's
  server / React-Server-Components mode with server actions. This project is a
  **static client-only SPA** (`BrowserRouter`, no loaders, no actions, no SSR/RSC),
  so the issue is **not reachable** here. We run the latest published version
  (`react-router-dom@^7.18.2`, which patches the client-relevant open-redirect
  advisories) and will move to a fully-clean release when one ships. All routes
  and `<Link>`/`navigate` targets are hard-coded — no user input flows into
  navigation, so the open-redirect class doesn't apply either.

---

## 5. Deployment checklist

- [ ] Serve over **HTTPS only** (Netlify/Vercel/Cloudflare do this automatically).
- [ ] Confirm the **SPA fallback** works — visit `/about` directly, it must load,
      not 404 (`_redirects` / `vercel.json` / `.htaccess` handle this).
- [ ] Confirm headers are live (securityheaders.com).
- [ ] Update the JSON-LD `telephone` and `og:*` in `index.html` to real values.
- [ ] Keep the CSP in sync when adding the form endpoint.

---

## Reporting

Found something? Email **hello@inviteme.ge** (replace with your security contact).
Please don't open a public issue for anything sensitive.
