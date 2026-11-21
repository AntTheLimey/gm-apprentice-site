import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeTaskLabels from '../src/plugins/rehype-task-labels.mjs';

const t = (value) => ({ type: 'text', value });
const el = (tagName, children, properties = {}) => ({ type: 'element', tagName, properties, children });
const box = () => el('input', [], { type: 'checkbox', disabled: true });
const run = (tree) => (rehypeTaskLabels()(tree), tree);

test('a checklist box is named after its item, nested lists left out', () => {
  const b = box();
  const li = el('li', [b, t(' Hand out '), el('strong', [t('the map')]), el('ul', [el('li', [t('sub')])])]);
  run(el('ul', [li]));
  assert.equal(b.properties.ariaLabel, 'Hand out the map');
});

test('a list item without a box, or a box already labelled, is left alone', () => {
  const plain = el('li', [t('Just text')]);
  const labelled = el('input', [], { type: 'checkbox', ariaLabel: 'Kept' });
  run(el('ul', [plain, el('li', [labelled, t(' Other words')])]));
  assert.deepEqual(plain.properties, {});
  assert.equal(labelled.properties.ariaLabel, 'Kept');
});
