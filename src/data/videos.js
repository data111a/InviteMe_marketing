/* ==========================================================================
   Video preview gallery.

   HOW TO SWAP IN YOUR OWN VIDEOS
   1. Drop the MP4 into  public/videos/        →  src: "/videos/my-file.mp4"
   2. Drop a poster JPG into public/videos/posters/ →  poster: "/videos/posters/my-file.jpg"
      (A poster is the still frame shown before the video loads. Optional but
       strongly recommended — without one the card stays blank until hover.)
   3. `category` must be one of the keys under home.gallery.categories in the
      locale files: wedding | birthday | corporate | christening | anniversary
   4. `title` is shown on the card. Give it both languages.

   Entries whose file does not exist yet still render — the card falls back to
   a decorated "preview coming soon" placeholder, so the site never looks broken.
   ========================================================================== */

const videos = [
  {
    id: "xatia-nika",
    src: "/videos/wedding-xatia-nika.mp4",
    poster: "/videos/posters/wedding-xatia-nika.jpg",
    category: "wedding",
    title: { en: "Xatia & Nika", ka: "ხატია და ნიკა" },
  },
  {
    id: "birthday",
    src: "/videos/birthday.mp4",
    poster: "/videos/posters/birthday.jpg",
    category: "birthday",
    title: { en: "Birthday", ka: "დაბადების დღე" },
  },
  {
    id: "nino-giorgi",
    src: "/videos/wedding-nino-giorgi.mp4",
    poster: "/videos/posters/wedding-nino-giorgi.jpg",
    category: "wedding",
    title: { en: "Nino & Giorgi", ka: "ნინო და გიორგი" },
  },
  {
    id: "chateau-mukhrani",
    src: "/videos/chateau-mukhrani.mp4",
    poster: "/videos/posters/chateau-mukhrani.jpg",
    category: "corporate",
    title: { en: "Chateau Mukhrani", ka: "შატო მუხრანი" },
  },
];

export default videos;
