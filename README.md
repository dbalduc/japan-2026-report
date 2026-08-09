# Japan 2026 — trip report

A day-by-day photo journal of ten days in Tokyo, Okinawa and Kyoto, July 17–26 2026.

Companion to the original planning site at [dbalduc.github.io/japan-2026](https://dbalduc.github.io/japan-2026/).

---

## Files

```
index.html      structure + all styling. Rarely needs editing.
data.js         ← ALL THE CONTENT. This is the file you edit.
app.js          renderer, lightbox, easter egg. Don't need to touch it.
MANIFEST.md     every photo/audio/video filename the site expects.
images/         drop photos here
audio/          drop audio here
video/          drop video here
.nojekyll       tells GitHub Pages to serve the folder as-is
```

## Putting it live

1. Create a new **public** repo called `japan-2026-report`.
2. Drag everything in this folder into it (keep the folder structure).
3. Repo → **Settings** → **Pages** → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
4. Two minutes later it's at `https://dbalduc.github.io/japan-2026-report/`.

## What's already in here

81 photos and 8 videos, sorted by EXIF timestamp against the itinerary,
resized to 2200 px long edge at quality 82, and named by day. Total about
68 MB — comfortably inside what GitHub is happy with.

The manta clip is colour-corrected: the GoPro original is heavily magenta at
18 m, so the channels are rebalanced (R×0.78, G×1.12, B×1.30) and it now
reads the way the water actually looked. Your original file is untouched.

## Adding more photos

Name the file whatever you like, drop it in `images/`, and add one line to
that day's `blocks` array in `data.js`:

```js
{t:'photo', src:'d10-01-hachiko.jpg', cap:'Your caption.'},
```

Any slot whose file is missing renders as a labelled dashed box with the
expected filename inside it rather than a broken image, so you can add the
line first and the photo later. Load the site with `?todo` on the URL and
open the browser console to list anything still missing.

**Export settings:** long edge 2000–2400 px, JPEG quality ~80. Portrait shots
are fine — the layout caps image height at 86% of the viewport so a tall photo
never eats the whole screen.

## Adding a photo that isn't in the manifest

One line in `data.js`, inside that day's `blocks` array:

```js
{t:'photo', src:'d3-14-whatever.jpg', cap:'Your caption.'},
```

Add `wide:true` to make it break the margins full-bleed. For a side-by-side row:

```js
{t:'gal', cols:2, items:[
  {src:'d3-15-left.jpg',  cap:'Left.'},
  {src:'d3-16-right.jpg', cap:'Right.'}
]},
```

## Links with hover facts

Inside any caption or paragraph, `[[fushimi-inari]]` becomes a link to the
official site with a one-line historical fact on hover. `[[fushimi-inari|the
mountain]]` does the same with your own wording. All 36 available slugs are
listed at the top of `data.js`.

## Video

GitHub gets unhappy with large files and hard-rejects anything over 100 MB.
Compress the manta clip to roughly 720p before committing:

```bash
ffmpeg -i manta-original.mp4 -vf scale=-2:720 -c:v libx264 -crf 24 -c:a aac -b:a 128k video/d5-manta.mp4
```

If it's still too big, upload it unlisted to YouTube and swap the `{t:'video'}`
block for an iframe embed.

## The Shibuya easter egg

Drop your clip at `audio/shibuya-meme.mp3`.

Once that file exists — and only then — a small "🔊 Sound on" chip appears on
the Day 2 Saturday-night crossing photo. Clicking it plays the audio over a
full-screen glitch overlay with the line in large type. If the file isn't
there, the chip never renders and the photo behaves like any other photo.

Preview the visual without the audio file: add `?egg` to the URL.

Note: the source audio is copyrighted anime dialogue. Supply your own clip and
keep it short.

## Editing text

All ten days of narrative live in `data.js` as plain strings. Change whatever
you like — it's a static site, nothing to rebuild. Commit and Pages redeploys
in about a minute.
