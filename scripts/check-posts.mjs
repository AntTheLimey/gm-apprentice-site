// Checks every republished post against the LinkedIn original it came from:
// the same words (as a reader sees them on the built page), the same date, and
// at least as many pictures.
//
// The committed source for a post is sources/linkedin/<slug>.txt:
//   line 1  "Date: <Month D, YYYY>" as LinkedIn shows it
//   line 2  "Title: <title>"
//   line 3  blank
//   then    the article body, cut from the raw capture by cutBody()
// and sources/linkedin/<slug>.images.json, the list of pictures captured from
// the article by script (position 0 is the cover when LinkedIn shows one).
//
// The cut rule (set from the real launch capture, 2026-11-19). The raw capture
// is the innerText of LinkedIn's <article> element, which holds the article
// and nothing else (comments and "more articles" sit outside it):
//   title, author name, author tagline, date ("April 15, 2026"), then the body.
// The body is everything after the date line, with a closing line made only of
// #hashtags dropped (a LinkedIn convention, not part of the post).
//
// Usage: node scripts/check-posts.mjs   (run after `npm run build`)

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';
import { pageText } from './page-text.mjs';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_LINE = new RegExp(`^(${MONTHS.join('|')}) (\\d{1,2}), (\\d{4})$`);

/**
 * @param {string} raw innerText of LinkedIn's <article> element
 * @returns {{ title: string, date: string, body: string }}
 */
export function cutBody(raw) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const dateIndex = lines.slice(0, 8).findIndex((line) => DATE_LINE.test(line.trim()));
  if (dateIndex < 0) throw new Error('cutBody: no "Month D, YYYY" date line in the first 8 lines');
  const body = lines.slice(dateIndex + 1);
  while (body.length && !body[body.length - 1].trim()) body.pop();
  if (body.length && /^(#\w+\s*)+$/.test(body[body.length - 1].trim())) body.pop();
  while (body.length && !body[body.length - 1].trim()) body.pop();
  while (body.length && !body[0].trim()) body.shift();
  return { title: lines[0].trim(), date: lines[dateIndex].trim(), body: body.join('\n') };
}

/** "April 15, 2026" -> "2026-04-15" */
export function isoDate(linkedinDate) {
  const m = DATE_LINE.exec(linkedinDate.trim());
  if (!m) throw new Error(`isoDate: not a LinkedIn date: ${linkedinDate}`);
  return `${m[3]}-${String(MONTHS.indexOf(m[1]) + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

function words(text) {
  return text
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”‟″]/g, '"')
    .replace(/ /g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function firstDifference(expected, actual) {
  const n = Math.min(expected.length, actual.length);
  for (let i = 0; i < n; i++) if (expected[i] !== actual[i]) return i;
  return expected.length === actual.length ? -1 : n;
}

function around(list, i) {
  return list.slice(Math.max(0, i - 6), i + 7).join(' ');
}

/**
 * @param {{ slug: string, distDir: string, sourcesDir: string, postsDir: string }} where
 * @returns {{ ok: boolean, problems: string[] }}
 */
export function checkPost({ slug, distDir, sourcesDir, postsDir }) {
  const problems = [];
  const source = readFileSync(join(sourcesDir, `${slug}.txt`), 'utf8');
  const [dateLine, , , ...bodyLines] = source.split('\n');
  const sourceDate = isoDate(dateLine.replace(/^Date:\s*/, ''));
  const images = JSON.parse(readFileSync(join(sourcesDir, `${slug}.images.json`), 'utf8'));
  const post = matter(readFileSync(join(postsDir, `${slug}.md`), 'utf8'));

  const postDate = new Date(post.data.date).toISOString().slice(0, 10);
  if (postDate !== sourceDate) problems.push(`date: the post says ${postDate}, LinkedIn says ${sourceDate}`);

  const htmlPath = join(distDir, 'blog', slug, 'index.html');
  if (!existsSync(htmlPath)) {
    problems.push(`not built: ${htmlPath} is missing (run npm run build first)`);
    return { ok: false, problems };
  }
  const $ = cheerio.load(readFileSync(htmlPath, 'utf8'));
  const content = $('.sl-markdown-content').first();
  // Not the post: starlight-blog's cover, date/author block and previous/next links,
  // our "First published" line, and the hidden "Section titled ..." text on each
  // heading's anchor link. The cover is counted once, from frontmatter, below.
  content
    .find('.sl-blog-cover, .sl-blog-metadata, .sl-blog-post-footer, .first-published, .sl-anchor-link, .sr-only')
    .remove();

  const expected = words(bodyLines.join('\n'));
  const actual = words(pageText($.html(content)));
  const i = firstDifference(expected, actual);
  if (i >= 0) {
    problems.push(
      `words differ at word ${i + 1}: LinkedIn has "${around(expected, i)}", the page has "${around(actual, i)}"`,
    );
  }

  const shown = content.find('img').length + (post.data.cover ? 1 : 0);
  if (shown < images.length) {
    problems.push(`images: LinkedIn shows ${images.length}, the post shows ${shown}; first missing is position ${shown}`);
  }

  return { ok: problems.length === 0, problems };
}

// CLI: check every post whose frontmatter names a LinkedIn original.
if (import.meta.url === `file://${process.argv[1]}`) {
  const postsDir = 'src/content/docs/blog';
  const where = { distDir: 'dist', sourcesDir: 'sources/linkedin', postsDir };
  let failed = 0;
  let checked = 0;
  for (const file of existsSync(postsDir) ? readdirSync(postsDir) : []) {
    if (!file.endsWith('.md')) continue;
    const slug = file.slice(0, -3);
    if (!matter(readFileSync(join(postsDir, file), 'utf8')).data.linkedin) continue;
    checked++;
    const { ok, problems } = checkPost({ slug, ...where });
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${slug}`);
    for (const p of problems) console.log(`     ${p}`);
    if (!ok) failed++;
  }
  console.log(`check-posts: ${checked} checked, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}
