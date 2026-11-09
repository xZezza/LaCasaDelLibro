import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const globalCss = fs.readFileSync(path.join(root, 'src/styles/global.css'), 'utf8');
if (/\.salon-|@keyframes/.test(globalCss)) errors.push('Component styles belong beside their component, not in global.css.');
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  });
}
const source = files(path.join(root, 'src'));
const reachable = new Set();
function resolveImport(from, value) {
  const base = path.resolve(path.dirname(from), value);
  return [base, ...['.js', '.jsx', '.astro', '.css', '.json'].map(ext => base + ext), path.join(base, 'index.jsx')]
    .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}
function visit(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/\bimport\s+(?:[^;'"\n]+?\s+from\s+)?['"](\.[^'"]+)['"]/g)) {
    const target = resolveImport(file, match[1]);
    if (!target) errors.push(`${path.relative(root, file)}: missing import ${match[1]}`);
    else visit(target);
  }
}
visit(path.join(root, 'src/pages/index.astro'));
for (const file of source) {
  if (!reachable.has(file)) errors.push(`Unreachable source: ${path.relative(root, file)}`);
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/["'](\/images\/[^"']+)["']/g)) {
    if (match[1].includes('${')) continue;
    if (!fs.existsSync(path.join(root, 'public', match[1]))) errors.push(`${path.relative(root, file)}: missing image ${match[1]}`);
  }
  if (file.endsWith('.css')) {
    for (const query of content.matchAll(/@media\s*([^{}]+)\{/g)) {
      for (const size of query[1].matchAll(/(\d+)px/g)) if (![650, 651, 960, 1440].includes(Number(size[1]))) errors.push(`${path.relative(root, file)}: unexpected breakpoint ${size[1]}px`);
    }
  }
}
const guests = JSON.parse(fs.readFileSync(path.join(root, 'src/data/library-visitors.json'), 'utf8'));
const requiredGuests = ['rhysand', 'azriel', 'feyre', 'nesta', 'aelin', 'rowan', 'poppy', 'casteel', 'katniss', 'peeta', 'cassian', 'violet', 'xaden', 'hedwig', 'crookshanks', 'fleetfoot', 'abraxos', 'tairn', 'andarna', 'sgaeyl', 'buttercup', 'ron'];
const ids = new Set(guests.map(guest => guest.id));
if (ids.size !== guests.length) errors.push('Duplicate visitor IDs.');
for (const id of requiredGuests) if (!ids.has(id)) errors.push(`Missing approved visitor: ${id}`);
for (const guest of guests) if (!fs.existsSync(path.join(root, 'public', guest.image))) errors.push(`Missing visitor artwork: ${guest.image}`);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/site.webmanifest'), 'utf8'));
for (const icon of manifest.icons) if (!fs.existsSync(path.join(root, 'public', icon.src))) errors.push(`Missing manifest icon: ${icon.src}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Structure OK: ${reachable.size} reachable source files; image references, ${guests.length} visitors, favicon icons and responsive boundaries (650/960, desktop cap 1440) verified.`);
