// Writes the smaller copies of every picture in public/img/ to public/img/w/
// (see src/lib/image-sizes.mjs). Runs before each build; skips copies that
// are already newer than their original.
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { PUBLIC_DIR, sizedPath, widthsFor } from '../src/lib/image-sizes.mjs';

const dir = PUBLIC_DIR + 'img/';
mkdirSync(dir + 'w', { recursive: true });
let made = 0;
for (const name of readdirSync(dir).filter((f) => f.endsWith('.jpg'))) {
  const original = dir + name;
  const { width } = await sharp(original).metadata();
  for (const w of widthsFor(width)) {
    const out = PUBLIC_DIR + sizedPath(`/img/${name}`, w).slice(1);
    try {
      if (statSync(out).mtimeMs >= statSync(original).mtimeMs) continue;
    } catch {}
    await sharp(original).resize({ width: w }).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
    made++;
  }
}
console.log(`make-image-sizes: ${made} copies written`);
