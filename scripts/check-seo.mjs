// Every page a search engine can index must carry what search results and link
// previews are built from: a unique title, a unique description of a sensible
// length, a canonical address, one share picture, and structured data that parses.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as cheerio from 'cheerio';

const MIN = 50;
const MAX = 160;
// Pages search engines never list: the 404 page and Pagefind's own files.
const SKIP = /^(404\.html|pagefind\/)/;

function htmlFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(full, base);
    return e.name.endsWith('.html') ? [path.relative(base, full).split(path.sep).join('/')] : [];
  });
}

/** One "<page>: <problem>" line per missing or broken search tag. */
export function checkSeo(distDir) {
  const problems = [];
  const titles = new Map();
  const descriptions = new Map();
  for (const page of htmlFiles(distDir).sort()) {
    if (SKIP.test(page)) continue;
    const $ = cheerio.load(fs.readFileSync(path.join(distDir, page), 'utf8'));
    // A redirect page (Astro's meta refresh) is not a page to list.
    if ($('meta[http-equiv="refresh"]').length) continue;
    const title = $('title').first().text().trim();
    const description = $('meta[name="description"]').attr('content')?.trim() ?? '';
    if (!title) problems.push(`${page}: no <title>`);
    else titles.set(title, [...(titles.get(title) ?? []), page]);
    if (!description) problems.push(`${page}: no meta description`);
    else {
      if (description.length < MIN || description.length > MAX)
        problems.push(`${page}: description is ${description.length} characters (want ${MIN}-${MAX})`);
      descriptions.set(description, [...(descriptions.get(description) ?? []), page]);
    }
    if (!$('link[rel="canonical"]').attr('href')) problems.push(`${page}: no canonical link`);
    const images = $('meta[property="og:image"]').length;
    if (images !== 1) problems.push(`${page}: ${images} og:image tags (want 1)`);
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        JSON.parse($(el).text());
      } catch {
        problems.push(`${page}: structured data is not valid JSON`);
      }
    });
  }
  for (const [title, pages] of titles)
    if (pages.length > 1) problems.push(`same title "${title}" on ${pages.join(', ')}`);
  for (const [, pages] of descriptions)
    if (pages.length > 1) problems.push(`same description on ${pages.join(', ')}`);
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const problems = checkSeo(process.argv[2] ?? 'dist');
  for (const line of problems) console.error(`seo: ${line}`);
  if (problems.length) process.exit(1);
  console.log('check:seo: every page has a unique title and description, a canonical link and one share picture');
}
