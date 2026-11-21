import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkSeo } from './check-seo.mjs';

function makeDist(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dist-'));
  for (const [name, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
    fs.writeFileSync(path.join(dir, name), body);
  }
  return dir;
}

const good = (title, description) =>
  `<html><head><title>${title}</title><meta name="description" content="${description}">` +
  '<link rel="canonical" href="https://example.com/"><meta property="og:image" content="x.png">' +
  '<script type="application/ld+json">{"@type":"WebSite"}</script></head></html>';
const long = 'A description that is long enough to pass the minimum length check here.';

test('a complete page passes', () => {
  assert.deepEqual(checkSeo(makeDist({ 'index.html': good('Home', long) })), []);
});

test('reports a missing description, canonical and share picture', () => {
  const dist = makeDist({ 'a/index.html': '<html><head><title>A</title></head></html>' });
  assert.deepEqual(checkSeo(dist), [
    'a/index.html: no meta description',
    'a/index.html: no canonical link',
    'a/index.html: 0 og:image tags (want 1)',
  ]);
});

test('reports a description out of range and broken structured data', () => {
  const page = good('B', 'Too short').replace('{"@type":"WebSite"}', '{nope');
  assert.deepEqual(checkSeo(makeDist({ 'b/index.html': page })), [
    'b/index.html: description is 9 characters (want 50-160)',
    'b/index.html: structured data is not valid JSON',
  ]);
});

test('reports titles and descriptions used on more than one page', () => {
  const dist = makeDist({ 'a/index.html': good('Same', long), 'b/index.html': good('Same', long) });
  assert.deepEqual(checkSeo(dist), [
    'same title "Same" on a/index.html, b/index.html',
    'same description on a/index.html, b/index.html',
  ]);
});

test('skips the 404 page, Pagefind files and redirect pages', () => {
  const dist = makeDist({
    '404.html': '<p>gone</p>',
    'pagefind/x.html': '<p>x</p>',
    'old/index.html': '<meta http-equiv="refresh" content="0;url=/new/">',
  });
  assert.deepEqual(checkSeo(dist), []);
});
