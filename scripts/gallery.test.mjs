import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gallery } from '../src/data/gallery.mjs';

test('the gallery has the seven cleared entries', () => {
  assert.equal(gallery.length, 7);
});

for (const e of gallery) {
  test(`gallery entry ${e.name} is complete`, () => {
    assert.ok(e.alt.trim(), 'alt text');
    assert.ok(e.blurb.trim(), 'blurb');
    assert.ok(e.system.trim(), 'system');
    assert.match(e.url, /^https:\/\//);
    assert.ok(fs.existsSync(`public${e.img}`), `picture public${e.img}`);
  });
}
