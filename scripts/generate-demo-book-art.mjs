import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Original typographic demo artwork. No publisher artwork, logos or cover photos.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'src/data', name + '.json'), 'utf8'));
const shelf = read('bookshelf');
const all = [...new Map([...shelf, ...read('popular-books')].map(book => [book.id, book])).values()];
const spines = read('spines');
const output = path.join(root, 'public/images/demo-books');
fs.mkdirSync(output, { recursive: true });
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const palettes = [
  ['#344e43','#e8d2a0'], ['#b18456','#fff0d0'], ['#4e6171','#f1d9a5'],
  ['#8b5847','#fae0b4'], ['#687054','#f6e4b9'], ['#e3d3b1','#405347'],
  ['#3b575b','#ead2a2'], ['#a47648','#fff0c9'], ['#53533d','#edd9aa'],
];
const hash = value => [...value].reduce((n, char) => (n * 31 + char.charCodeAt(0)) >>> 0, 0);
function lines(title) {
  const words = title.split(/\s+/), result = [];
  let line = '';
  for (const word of words) {
    if (line && (line + ' ' + word).length > 21) { result.push(line); line = word; }
    else line += (line ? ' ' : '') + word;
  }
  if (line) result.push(line);
  return result;
}
for (const book of all) {
  const [base, ink] = palettes[hash(book.id) % palettes.length];
  const title = lines(book.title);
  const fontSize = title.length > 3 ? 43 : 48;
  const titleY = 442 - (title.length - 1) * 32;
  const titleText = title.map((line, index) => `<text x="300" y="${titleY + index * 64}" text-anchor="middle" font-family="Georgia,serif" font-size="${fontSize}" fill="${ink}">${esc(line)}</text>`).join('');
  const ornament = hash(book.id) % 2 === 0
    ? '<path d="M253 255Q300 203 347 255M264 264Q300 228 336 264M300 215V279"/><ellipse cx="300" cy="241" rx="55" ry="37"/>'
    : '<path d="M258 276Q300 226 342 276M271 274V241Q300 209 329 241V274M300 230V285"/><circle cx="300" cy="199" r="6"/>';
  const cloth = '<pattern id="cloth" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 0V7M0 0H7" stroke="#fff" stroke-opacity=".045" stroke-width="1"/></pattern>';
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><title>${esc(book.title)} — illustrative design</title><defs>${cloth}<linearGradient id="binding"><stop stop-color="#000" stop-opacity=".22"/><stop offset=".055" stop-color="#fff" stop-opacity=".09"/><stop offset=".12" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path fill="${base}" d="M0 0H600V900H0Z"/><path fill="url(#cloth)" d="M0 0H600V900H0Z"/><path fill="url(#binding)" d="M0 0H600V900H0Z"/><g fill="none" stroke="${ink}" stroke-opacity=".65"><rect x="34" y="30" width="532" height="840" rx="2"/><rect x="44" y="40" width="512" height="820" rx="1" stroke-width=".7"/><path d="M112 136H488M112 652H488"/><g stroke-width="2.3">${ornament}</g><path d="M269 760H331M300 749V771"/></g><text x="300" y="101" text-anchor="middle" font-family="Georgia,serif" font-size="18" letter-spacing="6" fill="${ink}">THE SALON</text>${titleText}<text x="300" y="711" text-anchor="middle" font-family="Georgia,serif" font-size="25" fill="${ink}">${esc(book.author)}</text><text x="300" y="825" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" letter-spacing="3" fill="${ink}" opacity=".85">ILLUSTRATIVE DESIGN</text></svg>`;
  fs.writeFileSync(path.join(output, book.id + '.svg'), cover + '\n');
  if (shelf.some(item => item.id === book.id)) {
    const surname = book.author.split(' ').at(-1);
    const spine = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="500" viewBox="0 0 80 500"><title>${esc(book.title)} — illustrative spine</title><defs>${cloth}<linearGradient id="round"><stop stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".07"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs><path fill="${base}" d="M0 0H80V500H0Z"/><path fill="url(#cloth)" d="M0 0H80V500H0Z"/><path fill="url(#round)" d="M0 0H80V500H0Z"/><g stroke="${ink}" fill="none" opacity=".65"><path d="M7 5V495M73 5V495M9 59H71M9 65H71M9 442H71M9 448H71"/></g><text x="40" y="35" text-anchor="middle" font-family="Georgia,serif" font-size="10" letter-spacing=".5" fill="${ink}">${esc(surname.toUpperCase())}</text><text transform="translate(53 252) rotate(90)" text-anchor="middle" font-family="Georgia,serif" font-size="23" fill="${ink}" textLength="${Math.min(343, book.title.length * 11)}" lengthAdjust="spacingAndGlyphs">${esc(book.title)}</text><text x="40" y="478" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${ink}">${book.order || 'S'}</text></svg>`;
    fs.writeFileSync(path.join(output, book.id + '-spine.svg'), spine + '\n');
    spines[book.id] = { image: '/images/demo-books/' + book.id + '-spine.svg', ratio: spines[book.id]?.ratio || .16, artwork: 'Original illustrative design for The Salon' };
  }
}
fs.writeFileSync(path.join(root, 'src/data/spines.json'), JSON.stringify(spines, null, 2) + '\n');
console.log(`Generated ${all.length} original covers and ${shelf.length} original spines.`);
