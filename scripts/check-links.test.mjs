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

import { checkText } from './check-links.mjs';

test('start and tutorial pages may not carry slash commands or private paths', () => {
  const dist = makeDist({
    'start/a/index.html': '<p>Ask: /gm-apprentice:the-midwife go</p>',
    'tutorials/b/index.html': '<p>saved in /Users/someone/x</p>',
    'tutorials/c/index.html': '<p>all clean</p>',
    'tutorials/d/index.html': '<p>Albin Herzfeld, Canticle of the End; Six in Dead End</p>',
    'gallery/index.html': '<p>Canticle /gm-apprentice:x</p>',
  });
  assert.deepEqual(checkText(dist), [
    'start/a/index.html: "/gm-apprentice:"',
    'tutorials/b/index.html: "/Users/"',
  ]);
});
