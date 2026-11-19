// Visible text of an HTML page, one line per block element.
// The one extractor the site's checks use: the front-page copy check and the
// LinkedIn word-for-word check both compare what a reader would see.
import * as cheerio from 'cheerio';

const BLOCKS = [
  'address', 'article', 'aside', 'blockquote', 'br', 'dd', 'details', 'div', 'dl', 'dt',
  'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
  'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'td', 'th',
  'tr', 'ul',
].join(',');

/**
 * @param {string} html
 * @param {string} [selector] limit to the first element matching this selector
 * @returns {string}
 */
export function pageText(html, selector) {
  const $ = cheerio.load(html);
  $('script, style, noscript, template').remove();
  const root = selector ? $(selector).first() : $.root();
  root.find(BLOCKS).each((_, el) => {
    $(el).before('\n').after('\n');
  });
  return root
    .text()
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

// CLI: node scripts/page-text.mjs <file.html> [selector]
if (import.meta.url === `file://${process.argv[1]}`) {
  const { readFileSync } = await import('node:fs');
  process.stdout.write(pageText(readFileSync(process.argv[2], 'utf8'), process.argv[3]) + '\n');
}
