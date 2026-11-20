import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeExchanges from '../src/plugins/rehype-exchanges.mjs';

const t = (value) => ({ type: 'text', value });
const el = (tagName, children, properties = {}) => ({ type: 'element', tagName, properties, children });
const quote = (...children) => el('blockquote', [t('\n'), ...children]);
const run = (tree) => (rehypeExchanges()(tree), tree);

test('a [!you] blockquote gets its class and a "You type" label in place of the marker', () => {
  const q = quote(el('p', [t('[!you]')]), t('\n'), el('p', [t('Put this campaign online.')]));
  run(el('div', [q]));
  assert.deepEqual(q.properties.className, ['exchange', 'exchange-you']);
  const ps = q.children.filter((c) => c.type === 'element');
  assert.deepEqual(ps[0].properties.className, ['exchange-label']);
  assert.equal(ps[0].children[0].value, 'You type');
  assert.equal(ps[1].children[0].value, 'Put this campaign online.');
  assert.equal(ps.length, 2);
});

test('apprentice and vault markers get their own class and label', () => {
  const a = quote(el('p', [t('[!apprentice]')]), el('ul', []));
  const v = quote(el('p', [t(' [!vault] ')]), el('p', [t('Recap.')]));
  run(el('div', [a, v]));
  assert.deepEqual(a.properties.className, ['exchange', 'exchange-apprentice']);
  assert.equal(a.children.find((c) => c.type === 'element').children[0].value, 'The apprentice');
  assert.deepEqual(v.properties.className, ['exchange', 'exchange-vault']);
  assert.equal(v.children.find((c) => c.type === 'element').children[0].value, 'In your vault');
});

test('a plain blockquote, or a marker sharing its paragraph with text, is left alone', () => {
  const plain = quote(el('p', [t('Just a quote.')]));
  const shared = quote(el('p', [t('[!you] Put this campaign online.')]));
  const formatted = quote(el('p', [el('strong', [t('[!you]')])]));
  run(el('div', [plain, shared, formatted]));
  for (const q of [plain, shared, formatted]) assert.equal(q.properties.className, undefined);
});

test('nested blockquotes are reached', () => {
  const inner = quote(el('p', [t('[!you]')]), el('p', [t('Hi.')]));
  run(el('div', [el('section', [inner])]));
  assert.deepEqual(inner.properties.className, ['exchange', 'exchange-you']);
});

test('an unknown marker fails the build rather than showing raw', () => {
  assert.throws(() => run(el('div', [quote(el('p', [t('[!gm]')]))])), /Unknown exchange marker \[!gm\]/);
});
