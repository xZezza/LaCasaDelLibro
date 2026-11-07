import test from 'node:test';
import assert from 'node:assert/strict';
import LandingController from '../src/components/landing/LandingController.js';
import { DECOS, WALLS, CASES, LIGHTS } from '../src/data/landing/library.js';
import { serializeLibrary, isValidLibrarySnapshot } from '../src/lib/library-storage.js';

function controller() {
  const page = new LandingController({});
  page.setState = function (update) {
    this.state = { ...this.state, ...(typeof update === 'function' ? update(this.state) : update) };
  };
  return page;
}

test('discard restores books, order, companions and settings before the first save', () => {
  const page = controller();
  const original = serializeLibrary(page.state);
  page.move(page.state.lib[0].id, 2, null);
  page.addDeco('pet-hedwig', 1);
  page.setState({ caseC: 2, wall: 4, lights: 'off', angle: 30, expanded: { 2: true }, q: 'test', qOpen: true });
  assert.equal(page.renderVals().libraryDirty, true);
  page.renderVals().discardLibrary();
  assert.equal(serializeLibrary(page.state), original);
  assert.equal(page.renderVals().libraryDirty, false);
  assert.deepEqual(page.state.expanded, {});
  assert.equal(page.state.qOpen, false);
});

test('saved companion survives discard and the saved snapshot is never overwritten', () => {
  const page = controller();
  const store = new Map();
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { setItem: (key, value) => store.set(key, value) } });
  try {
    page.addDeco('pet-crookshanks', 1);
    page.setState({ caseC: 3, wall: 2, lights: 'pastel', angle: 12 });
    page.saveLibrary();
    const saved = store.get('the-salon-library-layout-v1');
    page.setLib(lib => lib.filter(book => book.deco !== 'pet-crookshanks'));
    page.addDeco('pet-tairn', 0);
    page.setState({ caseC: 5, wall: 0, lights: 'off', angle: -20 });
    page.renderVals().discardLibrary();
    assert.equal(serializeLibrary(page.state), saved);
    assert.equal(store.get('the-salon-library-layout-v1'), saved);
    assert.equal(page.renderVals().libraryDirty, false);
  } finally {
    clearTimeout(page._saveConfirmationTimer);
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  }
});

test('moving a book between shelves keeps every other book and all IDs unique', () => {
  const page = controller();
  const first = page.state.lib.find(book => !book.deco);
  const destination = page.state.lib.find(book => book.shelf === 2 && !book.deco);
  const ids = page.state.lib.map(book => book.id);
  page.move(first.id, 2, destination.id);
  assert.equal(page.state.lib.length, ids.length);
  assert.equal(new Set(page.state.lib.map(book => book.id)).size, ids.length);
  assert.equal(page.state.lib.find(book => book.id === first.id).shelf, 2);
  assert.equal(page.state.lib.findIndex(book => book.id === first.id) + 1, page.state.lib.findIndex(book => book.id === destination.id));
});

test('a fixed companion is added only once, can be moved and can be removed', () => {
  const page = controller();
  page.addDeco('pet-andarna', 0);
  page.addDeco('pet-andarna', 1);
  const pets = page.state.lib.filter(book => book.deco === 'pet-andarna');
  assert.equal(pets.length, 1);
  page.move(pets[0].id, 2, null);
  assert.equal(page.state.lib.find(book => book.id === pets[0].id).shelf, 2);
  page.renderVals().removeSel();
  assert.equal(page.state.lib.some(book => book.id === pets[0].id), false);
});

test('every shelf mode has finite geometry and decoration assets resolve to image URLs', () => {
  const page = controller();
  const first = page.state.lib.find(book => !book.deco);
  for (const mode of ['spine', 'cover', 'lying']) {
    const book = page.bookVals({ ...first, mode });
    assert.ok(Number.isFinite(book.fw) && book.fw > 0);
    assert.ok(Number.isFinite(book.fh) && book.fh > 0);
    assert.ok(!book.spineBg.includes('undefined'));
  }
  for (const decoration of page.renderVals().tray) assert.match(decoration.bgImg, /^url\("\/images\/decorations\//);
  assert.equal(page.renderVals().companions.length, 8);
});

test('reload accepts lights Off and rejects duplicate IDs or unknown settings', () => {
  const page = controller();
  page.setState({ lights: 'off' });
  const saved = JSON.parse(serializeLibrary(page.state));
  const config = { decorations: DECOS, walls: WALLS, cases: CASES, lights: LIGHTS };
  assert.equal(isValidLibrarySnapshot(saved, config), true);
  assert.equal(isValidLibrarySnapshot({ ...saved, lights: 'unknown' }, config), false);
  assert.equal(isValidLibrarySnapshot({ ...saved, caseC: 999 }, config), false);
  assert.equal(isValidLibrarySnapshot({ ...saved, lib: [...saved.lib, saved.lib[0]] }, config), false);
});
