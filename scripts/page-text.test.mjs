import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageText } from './page-text.mjs';

test('drops script and style, decodes entities, one line per block', () => {
  const html = '<style>p{}</style><p>a &amp; b</p><script>x()</script><p>c</p>';
  assert.equal(pageText(html), 'a & b\nc');
});

test('a selector limits the text to that element', () => {
  const html = '<nav><p>menu</p></nav><article><h2>Title</h2><p>Body <em>text</em>.</p></article>';
  assert.equal(pageText(html, 'article'), 'Title\nBody text.');
});

test('list items and table cells each get their own line', () => {
  const html = '<ul><li>one</li><li>two</li></ul><table><tr><td>x</td><td>y</td></tr></table>';
  assert.equal(pageText(html), 'one\ntwo\nx\ny');
});
