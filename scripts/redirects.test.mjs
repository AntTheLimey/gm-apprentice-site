import { test } from 'node:test';
import assert from 'node:assert/strict';
import { redirectFor, relayTarget } from '../worker/index.mjs';

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
  assert.equal(redirectFor('https://some-branch-gm-apprentice.antthelimey.workers.dev/'), null);
});

test('the old workers.dev address goes to the bare domain, keeping path and query', () => {
  assert.equal(redirectFor('https://gm-apprentice.antthelimey.workers.dev/'), 'https://gmapprentice.com/');
  assert.equal(redirectFor('https://gm-apprentice.antthelimey.workers.dev/tutorials/?a=1'), 'https://gmapprentice.com/tutorials/?a=1');
});

test('/raven/ relays to PostHog: scripts and config to the assets host, events to the API host', () => {
  assert.equal(relayTarget('https://gmapprentice.com/raven/static/array.js'), 'https://us-assets.i.posthog.com/static/array.js');
  assert.equal(relayTarget('https://gmapprentice.com/raven/array/phc_x/config.js'), 'https://us-assets.i.posthog.com/array/phc_x/config.js');
  assert.equal(relayTarget('https://gmapprentice.com/raven/e/?ip=0&ver=1'), 'https://us.i.posthog.com/e/?ip=0&ver=1');
  assert.equal(relayTarget('https://gmapprentice.com/raven/flags/?v=2'), 'https://us.i.posthog.com/flags/?v=2');
});

test('everything else is not relayed', () => {
  assert.equal(relayTarget('https://gmapprentice.com/'), null);
  assert.equal(relayTarget('https://gmapprentice.com/ravens-and-crows/'), null);
  assert.equal(relayTarget('https://gmapprentice.com/blog/raven/'), null);
});
