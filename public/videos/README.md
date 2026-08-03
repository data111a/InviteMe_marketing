# Put your invitation preview videos here

Anything in `public/` is copied to the site root as-is, so a file saved at
`public/videos/wedding-ana-levan.mp4` is served from `/videos/wedding-ana-levan.mp4`.

## Steps

1. Drop the MP4 in this folder.
2. Drop a poster image (a still frame) in `posters/`.
3. Add or edit the matching entry in `src/data/videos.js`.

## Recommended settings

| | |
|---|---|
| Format | MP4 (H.264 video + AAC audio) — plays everywhere |
| Orientation | Portrait. The cards are 9:16, so a phone-screen recording fits perfectly |
| Resolution | 720×1280 is plenty; 1080×1920 if you want it crisp on large screens |
| Length | 10–20 seconds. The card preview loops silently on hover |
| File size | Aim for under 3 MB per clip. Six large videos on one page is a slow homepage |
| Audio | Keep it — the card preview is muted, but the lightbox plays with sound |

Compress with ffmpeg:

```bash
ffmpeg -i input.mov -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k output.mp4
```

Grab a poster frame at 1 second in:

```bash
ffmpeg -i output.mp4 -ss 00:00:01 -vframes 1 -q:v 3 posters/output.jpg
```

Until a file exists, its card falls back to a "preview coming soon" placeholder —
the page still looks finished, so you can ship before all six clips are ready.
