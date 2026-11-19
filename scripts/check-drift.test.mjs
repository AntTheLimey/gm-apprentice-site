import { test } from 'node:test';
import assert from 'node:assert/strict';
import { driftWarnings, latestTag } from './check-drift.mjs';

const page = (checkedAgainst) => ({ file: 'tutorials/x.md', checkedAgainst });

test('one minor behind is fine, two is a warning', () => {
  assert.deepEqual(driftWarnings([page('1.13.5')], '1.14.0'), []);
  const w = driftWarnings([page('1.12.97')], '1.14.0');
  assert.equal(w.length, 1);
  assert.match(w[0], /tutorials\/x\.md/);
});

test('an older major is a warning', () => {
  assert.equal(driftWarnings([page('0.14.0')], '1.14.0').length, 1);
});

test('patch releases never warn', () => {
  assert.deepEqual(driftWarnings([page('1.12.0')], '1.12.97'), []);
});

test('a malformed version is a warning, not a crash', () => {
  const w = driftWarnings([page('soon')], '1.12.97');
  assert.equal(w.length, 1);
  assert.match(w[0], /not a version/);
});

test('latest tag ignores the publish-v series', () => {
  assert.equal(latestTag(['v1.12.97', 'publish-v1.70.36', 'v1.9.200', 'v1.12.10']), '1.12.97');
});
