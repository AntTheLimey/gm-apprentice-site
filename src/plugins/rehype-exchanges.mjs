// Tutorials show a conversation: what the GM typed, what the apprentice replied, and
// excerpts of files it wrote. In markdown each is a blockquote whose first paragraph
// is a marker on its own line:
//
//   > [!you]
//   >
//   > Put this campaign online for my players.
//
// This turns the marker into a class on the blockquote and a visible label, so the
// three kinds look different (styles in src/styles/theme.css).

export const KINDS = {
  you: 'You type',
  apprentice: 'The apprentice',
  vault: 'In your vault',
};

const MARKER = /^\[!(\w+)\]$/;

/** The marker kind of a blockquote node, or null. */
export function markerKind(node) {
  const first = node.children?.find((c) => c.type === 'element');
  if (!first || first.tagName !== 'p') return null;
  const text = first.children.map((c) => (c.type === 'text' ? c.value : '\u0000')).join('').trim();
  const m = MARKER.exec(text);
  if (!m) return null;
  if (!(m[1] in KINDS)) throw new Error(`Unknown exchange marker [!${m[1]}]`);
  return m[1];
}

function walk(node) {
  if (node.type === 'element' && node.tagName === 'blockquote') {
    const kind = markerKind(node);
    if (kind) {
      const i = node.children.findIndex((c) => c.type === 'element');
      node.children.splice(i, 1, {
        type: 'element',
        tagName: 'p',
        properties: { className: ['exchange-label'] },
        children: [{ type: 'text', value: KINDS[kind] }],
      });
      const cls = node.properties.className ?? [];
      node.properties.className = [...cls, 'exchange', `exchange-${kind}`];
    }
  }
  for (const child of node.children ?? []) walk(child);
}

export default function rehypeExchanges() {
  return (tree) => walk(tree);
}
