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

// Start and tutorial pages: no Claude Code-only slash commands (readers may be in Cowork
// or Codex), and nothing private from the machine the examples were captured on.
const FORBIDDEN = ['/gm-apprentice:', 'antonypegg', 'gmail', '/Users/', '/private/tmp',
  'Canticle', 'Dead End', 'Special Forces', 'Drakkenheim'];

/** One "<page>: \"<text>\"" line per forbidden string in dist/start/ or dist/tutorials/. */
export function checkText(distDir) {
  const hits = [];
  for (const page of htmlFiles(distDir).sort()) {
    if (!/^(start|tutorials)\//.test(page.split(path.sep).join('/'))) continue;
    const text = cheerio.load(fs.readFileSync(path.join(distDir, page), 'utf8'))('main').text() || cheerio.load(fs.readFileSync(path.join(distDir, page), 'utf8'))('body').text();
    for (const f of FORBIDDEN) if (text.includes(f)) hits.push(`${page}: "${f}"`);
  }
  return hits;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = process.argv[2] ?? 'dist';
  const broken = checkLinks(dist);
  for (const line of broken) console.error(`broken link: ${line}`);
  const text = checkText(dist);
  for (const line of text) console.error(`not allowed on a start or tutorial page: ${line}`);
  if (broken.length || text.length) process.exit(1);
  console.log('check:links: every internal link resolves');
}
