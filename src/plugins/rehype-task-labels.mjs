// Quoted prep plans and wrap-ups carry Markdown checklists ("- [ ] Hand out the map").
// GitHub-style Markdown renders each box as a bare disabled <input> with no label, so a
// screen reader announces "checkbox" and nothing else. This names each box after its
// own item's words.

/** The words of a list item, leaving out any list nested inside it. */
function itemText(node) {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element' || node.tagName === 'ul' || node.tagName === 'ol') return '';
  return node.children.map(itemText).join('');
}

function visit(node) {
  if (node.type === 'element' && node.tagName === 'li') {
    const box = node.children.find(
      (c) => c.type === 'element' && c.tagName === 'input' && c.properties?.type === 'checkbox',
    );
    if (box && !box.properties.ariaLabel) {
      const label = node.children.map(itemText).join('').replace(/\s+/g, ' ').trim();
      if (label) box.properties.ariaLabel = label;
    }
  }
  for (const child of node.children ?? []) visit(child);
}

export default function rehypeTaskLabels() {
  return (tree) => visit(tree);
}
