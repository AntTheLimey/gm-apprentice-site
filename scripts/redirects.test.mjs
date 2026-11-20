import { test } from 'node:test';
import assert from 'node:assert/strict';
import { redirectFor } from '../worker/index.mjs';

test('www goes to the bare domain, keeping path and query', () => {
  assert.equal(redirectFor('https://www.gmapprentice.com/'), 'https://gmapprentice.com/');
  assert.equal(redirectFor('https://www.gmapprentice.com/start/setup/?a=1'), 'https://gmapprentice.com/start/setup/?a=1');
});

test('blog subdomain goes under /blog/', () => {
  assert.equal(redirectFor('https://blog.gmapprentice.com/'), 'https://gmapprentice.com/blog/');
  assert.equal(redirectFor('https://blog.gmapprentice.com/some-post/'), 'https://gmapprentice.com/blog/some-post/');
  assert.equal(redirectFor('https://blog.gmapprentice.com/rss.xml'), 'https://gmapprentice.com/blog/rss.xml');
});

test('a blog subdomain link that already says /blog/ is not doubled', () => {
  assert.equal(redirectFor('https://blog.gmapprentice.com/blog/some-post/'), 'https://gmapprentice.com/blog/some-post/');
});

test('the bare domain and preview hosts are served, not redirected', () => {
  assert.equal(redirectFor('https://gmapprentice.com/blog/'), null);
  assert.equal(redirectFor('https://gm-apprentice.antthelimey.workers.dev/'), null);
  assert.equal(redirectFor('https://some-branch-gm-apprentice.antthelimey.workers.dev/'), null);
});
