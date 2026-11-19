import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkLinks } from './check-links.mjs';

function makeDist(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dist-'));
  for (const [name, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
    fs.writeFileSync(path.join(dir, name), body);
  }
  return dir;
}

test('reports only root-relative links with nothing behind them', () => {
  const dist = makeDist({
    'index.html':
      '<a href="/gallery/">g</a><a href="/missing/">m</a><img src="/img/a.jpg#x">' +
      '<a href="https://example.com">e</a><a href="#top">t</a><a href="/gallery/?q=1">q</a>',
    'gallery/index.html': '<p>ok</p>',
    'img/a.jpg': 'x',
  });
  assert.deepEqual(checkLinks(dist), ['index.html -> /missing/']);
});

test('a link to a file path resolves to the file', () => {
  const dist = makeDist({
    'index.html': '<a href="/blog/rss.xml">r</a><a href="/blog/post">p</a>',
    'blog/rss.xml': '<rss/>',
    'blog/post/index.html': '<p/>',
  });
  assert.deepEqual(checkLinks(dist), []);
});
