/* ==========================================================================
   Live invitation examples shown in the "Recent work" section.

   Each entry is a real, published invitation. The card renders the site live
   inside a phone frame and links out to it.

   HOW TO ADD ONE
   1. Add an entry below with the full https:// URL.
   2. If the site is NOT on *.inviteme.ge, also add its origin to the CSP
      `frame-src` in public/_headers, vercel.json and public/.htaccess —
      otherwise the browser will refuse to show the preview.
   3. `category` must be one of the keys under home.gallery.categories in the
      locale files: wedding | birthday | corporate | christening | anniversary
   ========================================================================== */

const examples = [
  {
    id: "nikoloz-elene",
    url: "https://test1.inviteme.ge",
    category: "wedding",
    title: { en: "Nikoloz & Elene", ka: "ნიკოლოზი და ელენე" },
  },
  {
    id: "luka-mariam",
    url: "https://test2.inviteme.ge",
    category: "wedding",
    title: { en: "Luka & Mariam", ka: "ლუკა და მარიამი" },
  },
  {
    id: "year-end-party",
    url: "https://test3.inviteme.ge",
    category: "corporate",
    title: { en: "Year-end party", ka: "წლის დასასრულის წვეულება" },
  },
];

export default examples;
