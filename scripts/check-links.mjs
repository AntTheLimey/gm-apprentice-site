// Every root-relative link and picture in the built site must have a file behind it.
// starlight-links-validator checks Starlight pages only; this also covers the
// custom front page.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as cheerio from 'cheerio';

function htmlFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(full, base);
    return e.name.endsWith('.html') ? [path.relative(base, full)] : [];
  });
}

function resolves(distDir, href) {
  const clean = decodeURIComponent(href.split(/[?#]/)[0]);
  const target = path.join(distDir, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return (
    (fs.existsSync(target) && fs.statSync(target).isFile()) ||
    fs.existsSync(path.join(target, 'index.html')) ||
    fs.existsSync(`${target}.html`)
  );
}

/** One "<page> -> <href>" line per root-relative href or src with no file behind it. */
export function checkLinks(distDir) {
  const broken = [];
  for (const page of htmlFiles(distDir).sort()) {
    const $ = cheerio.load(fs.readFileSync(path.join(distDir, page), 'utf8'));
    $('[href], [src]').each((_, el) => {
      const ref = $(el).attr('href') ?? $(el).attr('src');
      if (!ref.startsWith('/') || ref.startsWith('//')) return;
      if (!resolves(distDir, ref)) broken.push(`${page} -> ${ref}`);
    });
  }
  return [...new Set(broken)];
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const broken = checkLinks(process.argv[2] ?? 'dist');
  for (const line of broken) console.error(`broken link: ${line}`);
  if (broken.length) process.exit(1);
  console.log('check:links: every internal link resolves');
}
