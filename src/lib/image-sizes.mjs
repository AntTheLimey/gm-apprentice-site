// Smaller copies of the site's pictures, so a phone doesn't download the
// desktop size. scripts/make-image-sizes.mjs writes them to public/img/w/
// before each build, and the Img component lists them in an srcset.
import { resolve } from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [400, 800, 1200];
// Builds and the prebuild script both run from the site's root folder; a path
// from import.meta.url would point inside the build's bundle instead.
export const PUBLIC_DIR = resolve('public') + '/';

// '/img/de-home.jpg' at 400 → '/img/w/de-home-400.jpg'
export function sizedPath(src, width) {
  return src.replace(/^\/img\/([^/]+)\.jpg$/, `/img/w/$1-${width}.jpg`);
}

// The widths smaller than the original, which are the copies worth making.
export function widthsFor(originalWidth) {
  return WIDTHS.filter((w) => w < originalWidth);
}

export async function srcsetFor(src) {
  if (!/^\/img\/[^/]+\.jpg$/.test(src)) throw new Error(`Img: no smaller copies for ${src}`);
  const { width } = await sharp(PUBLIC_DIR + src.slice(1)).metadata();
  return [...widthsFor(width).map((w) => `${sizedPath(src, w)} ${w}w`), `${src} ${width}w`].join(', ');
}
