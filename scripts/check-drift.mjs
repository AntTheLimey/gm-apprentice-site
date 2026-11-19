// Warns when a tutorial page was last checked against a plugin release more than one
// minor version behind the plugin's latest. Never fails the build: it is a reminder
// to rerun the page's example, shown as a GitHub annotation.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';

const VERSION = /^(\d+)\.(\d+)\.(\d+)$/;

/** The newest release from the plugin's tag list: only plain `vX.Y.Z` tags count. */
export function latestTag(tags) {
  return tags
    .filter((t) => /^v\d+\.\d+\.\d+$/.test(t))
    .map((t) => t.slice(1).split('.').map(Number))
    .sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2])[0]
    .join('.');
}

/** One warning line per page more than one minor release behind `latest`. */
export function driftWarnings(pages, latest) {
  const [lMaj, lMin] = latest.split('.').map(Number);
  const warnings = [];
  for (const { file, checkedAgainst } of pages) {
    const m = VERSION.exec(String(checkedAgainst));
    if (!m) {
      warnings.push(`${file}: checkedAgainst "${checkedAgainst}" is not a version (X.Y.Z)`);
      continue;
    }
    const [maj, min] = [Number(m[1]), Number(m[2])];
    if (maj < lMaj || (maj === lMaj && min < lMin - 1)) {
      warnings.push(`${file}: checked against ${checkedAgainst}, plugin is at ${latest}; rerun its example`);
    }
  }
  return warnings;
}

function pagesIn(dir) {
  return fs.readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
    .map((e) => path.join(e.parentPath, e.name))
    .map((file) => ({ file, checkedAgainst: matter.read(file).data.checkedAgainst }))
    .filter((p) => p.checkedAgainst !== undefined);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = execFileSync('git', ['ls-remote', '--tags', 'https://github.com/AntTheLimey/gm-apprentice'], { encoding: 'utf8' });
  const tags = out.split('\n').map((l) => l.split('refs/tags/')[1]).filter((t) => t && !t.endsWith('^{}'));
  const latest = latestTag(tags);
  const pages = pagesIn('src/content/docs');
  for (const w of driftWarnings(pages, latest)) console.log(`::warning file=${w.split(':')[0]}::${w}`);
  console.log(`check:drift: ${pages.length} checked pages, plugin at ${latest}`);
}
