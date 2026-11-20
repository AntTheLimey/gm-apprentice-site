# GM-Apprentice — The Scribe’s Familiar

Production assets traced from the selected raven artwork. All SVG artwork and lettering are vector paths, with no external fonts, embedded images, scripts, or linked dependencies.

## Files
- svg/raven-*.svg: standalone marks, transparent background.
- svg/logo-horizontal-*.svg: website/header wordmark.
- svg/logo-stacked-*.svg: centered logo.
- png/: transparent PNG counterparts.
- favicon/: SVG favicon, multi-resolution ICO, 16/32/48 px PNGs, Apple touch icon (180), Android icons (192/512), and web manifest.
- preview.png: light/dark applications and actual-size favicon checks.

Dark variants use brass artwork and parchment text for dark backgrounds. Light variants use deep green throughout. Black/white versions are single-colour. All logo SVGs and PNGs are transparent; favicon artwork has its own green ground.

## Palette
Brass #e3b55b · Green #12291f · Parchment #efe9dc.
Wordmark: Alegreya ExtraBold, converted to outlines. Font licence included.

## Use
Keep clear space around the raven; do not stretch. Prefer the horizontal logo at 240px wide or larger. Use the standalone raven for compact branding. At 16px the bird silhouette is the primary identifier; the nib detail is more legible at 32px and above.

Copy the contents of favicon/ into the website public directory and add these head links:

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

These assets are prepared for use; no website changes or deployment are included.

## In this repo

This folder is the backup of the brand pack. The site doesn't publish it: the
files the site uses are copied into `public/` (favicons, manifest,
`brand/logo-horizontal-dark.svg`, `social-card.png`) and `src/assets/` (the
docs header logos).

- `source/raven-original.png`: the raven artwork the marks were traced from.
- `scripts/build.py`: traces that artwork into the SVG marks and outlines the
  Alegreya wordmark. `scripts/render.cjs`: renders the PNGs, favicons and
  `preview.png` with sharp. Both still name the absolute paths they were run
  with (`/tmp/gma-brand`, the plugin folder, the site's `node_modules`):
  edit those before running them again.
