import test from "node:test";
import assert from "node:assert/strict";
import LibraryController from "../src/components/landing/Library/LibraryController.js";
import { DECOS, WALLS, CASES, LIGHTS } from "../src/data/landing/library.js";
import { arrangeLibrary, bookStatus, chooseShelfCover, groupLibrary, placeLibraryBook, twoShelfLibrary } from "../src/lib/mobile-library.js";
import { isValidLibrarySnapshot, serializeLibrary } from "../src/lib/library-storage.js";

const config = { decorations: DECOS, walls: WALLS, cases: CASES, lights: LIGHTS };
function controller() {
  const page = new LibraryController({});
  page.setState = update => { page.state = { ...page.state, ...(typeof update === "function" ? update(page.state) : update) }; };
  return page;
}
const ids = lib => lib.map(item => item.id).sort();

test("taking a book off the shelves keeps it in the list with its reading status and orientation", () => {
  for (const mode of ["spine", "cover", "lying"]) {
    const page = controller(), view = twoShelfLibrary(page.state.lib);
    const first = view.lib.find(item => !item.deco);
    const lib = view.lib.map(item => item.id === first.id ? { ...item, mode, rotation: { x: -5, y: 12, z: 3 }, status: 2 } : item);
    const original = JSON.stringify(lib), book = lib.find(item => item.id === first.id);
    const result = placeLibraryBook(lib, view.preferences, book.id, "");
    assert.deepEqual(ids(result.lib), ids(lib));
    assert.deepEqual(result.lib.find(item => item.id === book.id), { ...book, onShelf: false });
    assert.equal(JSON.stringify(lib), original);
    assert.deepEqual(result.preferences, view.preferences);
  }
});

test("putting an unshelved book back preserves its mode, rotation, status and identity without changing other books", () => {
  const page = controller(), view = twoShelfLibrary(page.state.lib);
  const book = { ...view.lib.find(item => !item.deco), mode: "cover", status: 2, rotation: { x: 1, y: 2, z: 3 }, onShelf: false };
  const lib = view.lib.map(item => item.id === book.id ? book : item);
  const result = placeLibraryBook(lib, view.preferences, book.id, "1");
  assert.deepEqual(result.lib.find(item => item.id === book.id), { ...book, shelf: 1, onShelf: true });
  for (const other of lib.filter(item => item.id !== book.id)) assert.deepEqual(result.lib.find(item => item.id === other.id), other);
  assert.deepEqual(ids(result.lib), ids(lib));
  assert.equal(book.onShelf, false);
  assert.equal(bookStatus(result.lib.find(item => item.id === book.id)), 2);
});

test("grouping, sorting and changing a displayed cover do not bring unshelved books back", () => {
  const page = controller(), view = twoShelfLibrary(page.state.lib);
  const book = view.lib.find(item => !item.deco);
  const off = placeLibraryBook(view.lib, view.preferences, book.id, "");
  for (const key of ["status", "saga", "all"]) {
    const grouped = groupLibrary(off.lib, off.preferences, key, 2);
    assert.equal(grouped.lib.find(item => item.id === book.id).onShelf, false);
    assert.deepEqual(ids(grouped.lib), ids(off.lib));
  }
  for (const key of ["colour", "height", "author", "saga", "manual"]) {
    const arranged = arrangeLibrary(off.lib, off.preferences, key, 2);
    assert.equal(arranged.lib.find(item => item.id === book.id).onShelf, false);
  }
  const cover = { ...off.lib.find(item => item.id === book.id), mode: "cover", rotation: { x: 1, y: 2, z: 3 } };
  const lib = off.lib.map(item => item.id === cover.id ? cover : item);
  const other = lib.find(item => !item.deco && item.id !== book.id && item.shelf === cover.shelf);
  assert.deepEqual(chooseShelfCover(lib, cover.shelf, other.id).find(item => item.id === cover.id), cover);
});

test("saved shelf presence accepts legacy snapshots and rejects malformed new flags", () => {
  const page = controller();
  const legacy = JSON.parse(serializeLibrary(page.state));
  assert.equal(isValidLibrarySnapshot(legacy, config), true);
  const book = legacy.lib.find(item => !item.deco);
  book.onShelf = false;
  assert.equal(isValidLibrarySnapshot(JSON.parse(JSON.stringify(legacy)), config), true);
  book.onShelf = true;
  assert.equal(isValidLibrarySnapshot(legacy, config), true);
  for (const invalid of ["false", 0, null, [], {}]) {
    book.onShelf = invalid;
    assert.equal(isValidLibrarySnapshot(legacy, config), false);
  }
});

test("desktop shelves omit explicitly unshelved books while the shared mobile list retains them", () => {
  const page = controller();
  const book = page.state.lib.find(item => !item.deco);
  page.updateMobileLibrary(state => placeLibraryBook(state.lib, state.preferences, book.id, ""));
  const values = page.renderVals();
  assert.equal(values.shelves.length, 3);
  assert.equal(values.shelves.flatMap(shelf => shelf.segs.flatMap(segment => segment.books)).some(item => item.id === book.id), false);
  assert.equal(values.mobileLibrary.lib.some(item => item.id === book.id && item.onShelf === false), true);
});

test("Save and Discard preserve an unshelved book without deleting it or losing reading status", () => {
  const page = controller(), store = new Map();
  const before = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { setItem: (key, value) => store.set(key, value) } });
  try {
    const book = page.state.lib.find(item => !item.deco), status = bookStatus(book);
    page.updateMobileLibrary(state => placeLibraryBook(state.lib, state.preferences, book.id, ""));
    assert.equal(page.saveLibrary(), true);
    const saved = store.get("the-salon-library-layout-v1");
    assert.equal(isValidLibrarySnapshot(JSON.parse(saved), config), true);
    page.updateMobileLibrary(state => placeLibraryBook(state.lib, state.preferences, book.id, "1"));
    assert.equal(page.state.lib.find(item => item.id === book.id).onShelf, true);
    page.renderVals().discardLibrary();
    assert.equal(serializeLibrary(page.state), saved);
    assert.equal(page.state.lib.find(item => item.id === book.id).onShelf, false);
    assert.equal(bookStatus(page.state.lib.find(item => item.id === book.id)), status);
  } finally {
    clearTimeout(page._saveConfirmationTimer);
    if (before) Object.defineProperty(globalThis, "localStorage", before); else delete globalThis.localStorage;
  }
});
