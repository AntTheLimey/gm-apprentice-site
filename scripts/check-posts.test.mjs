import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { cutBody, checkPost } from './check-posts.mjs';

// A real LinkedIn capture (the launch post, article element only, captured 2026-11-19).
const RAW = readFileSync(new URL('./fixtures/launch-raw.txt', import.meta.url), 'utf8');
const SLUG = 'launch';

/** Build a site-shaped tree: a post, its committed source, its image list, its rendered page. */
function tree({ body, date = '2026-04-15', sourceDate = 'April 15, 2026', images = 1, cover = true, renderedImages = 0, chrome = '' }) {
  const root = mkdtempSync(join(tmpdir(), 'check-posts-'));
  const postsDir = join(root, 'posts');
  const sourcesDir = join(root, 'sources');
  const distDir = join(root, 'dist');
  mkdirSync(postsDir);
  mkdirSync(sourcesDir);
  mkdirSync(join(distDir, 'blog', SLUG), { recursive: true });
  const cut = cutBody(RAW);
  writeFileSync(join(sourcesDir, `${SLUG}.txt`), `Date: ${sourceDate}\nTitle: ${cut.title}\n\n${cut.body}\n`);
  writeFileSync(
    join(sourcesDir, `${SLUG}.images.json`),
    JSON.stringify(Array.from({ length: images }, (_, n) => ({ position: n, cover: n === 0, src: `https://x/${n}`, alt: '' }))),
  );
  writeFileSync(
    join(postsDir, `${SLUG}.md`),
    `---\ntitle: T\ndate: ${date}\nlinkedin: https://www.linkedin.com/pulse/x/\n${cover ? 'cover:\n  image: ./c.jpg\n  alt: c\n' : ''}---\n\nbody\n`,
  );
  const paras = (body ?? cut.body).split(/\n+/).map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`).join('\n');
  const imgs = '<img src="/a.png" alt="">'.repeat(renderedImages);
  writeFileSync(
    join(distDir, 'blog', SLUG, 'index.html'),
    `<html><body><h1>T</h1><div class="sl-markdown-content">${chrome}<p class="first-published">First published on LinkedIn, 15 Apr 2026</p>${paras}${imgs}</div></body></html>`,
  );
  return { slug: SLUG, postsDir, sourcesDir, distDir };
}

test('cut rule keeps only the article', () => {
  const { title, date, body } = cutBody(RAW);
  assert.equal(title, 'A GameMasters Apprentice Claude Skill: Feedback Wanted');
  assert.equal(date, 'April 15, 2026');
  assert.match(body, /^As most of you know, I'm a technical Product Person/);
  assert.match(body, /\nAnt$/);
  assert.doesNotMatch(body, /Proven leader of Product/);
  assert.doesNotMatch(body, /#TTRPG/);
});

test('identical text passes', () => {
  const r = checkPost(tree({}));
  assert.deepEqual(r.problems, []);
  assert.equal(r.ok, true);
});

test('one changed word fails and names where', () => {
  const body = cutBody(RAW).body.replace('less great for the hobby', 'less good for the hobby');
  const r = checkPost(tree({ body }));
  assert.equal(r.ok, false);
  assert.match(r.problems[0], /great/);
  assert.match(r.problems[0], /good/);
  assert.match(r.problems[0], /less .* for the hobby/);
});

test('date mismatch fails', () => {
  const r = checkPost(tree({ date: '2026-04-14' }));
  assert.equal(r.ok, false);
  assert.ok(r.problems.some((p) => p.includes('2026-04-14') && p.includes('2026-04-15')));
});

test('missing image fails', () => {
  const r = checkPost(tree({ images: 3, renderedImages: 1 }));
  assert.equal(r.ok, false);
  assert.ok(r.problems.some((p) => /image/i.test(p) && p.includes('position 2')));
});

test('curly and straight quotes count as the same', () => {
  const body = cutBody(RAW).body.replace("I'm a technical", 'I’m a technical');
  assert.equal(checkPost(tree({ body })).ok, true);
});

test("starlight-blog's own furniture is not counted as the post", () => {
  // As starlight-blog 0.30 renders a post: the cover and the date/author block sit inside
  // the content, and each heading carries hidden "Section titled" text for its anchor link.
  const chrome =
    '<figure class="sl-blog-cover"><img src="/c.jpg" alt="c"></figure>' +
    '<div class="sl-blog-metadata not-content"><time>Apr 15, 2026</time><a>Antony Pegg</a></div>' +
    '<div class="sl-heading-wrapper level-h2"><h2>Heading</h2><a class="sl-anchor-link"><span class="sr-only">Section titled “Heading”</span></a></div>' +
    '<div class="sl-blog-post-footer"><a>Next post title</a></div>';
  const body = 'Heading\n' + cutBody(RAW).body;
  const r = checkPost(tree({ chrome, body: undefined, renderedImages: 0 }));
  // The source has no "Heading" line, so build one that does:
  const t = tree({ chrome });
  writeFileSync(join(t.sourcesDir, `${SLUG}.txt`), `Date: April 15, 2026\nTitle: T\n\n${body}\n`);
  const r2 = checkPost(t);
  assert.deepEqual(r2.problems, []);
  assert.ok(r.problems.every((p) => !/images/.test(p)), 'the cover image is counted once, from frontmatter');
});
