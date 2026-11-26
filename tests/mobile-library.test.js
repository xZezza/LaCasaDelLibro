import test from "node:test";
import assert from "node:assert/strict";
import LibraryController from "../src/components/landing/Library/LibraryController.js";
import { DECOS, WALLS, CASES, LIGHTS } from "../src/data/landing/library.js";
import { libraryBookInfo } from "../src/data/landing/mobile-library.js";
import { arrangeLibrary, bookStatus, chooseShelfCover, groupLibrary, libraryPreferences, moveLibraryItem, rememberLayout } from "../src/lib/mobile-library.js";
import { isValidLibrarySnapshot, serializeLibrary } from "../src/lib/library-storage.js";

function controller() {
  const page = new LibraryController({});
  page.setState = function (update) { this.state = { ...this.state, ...(typeof update === "function" ? update(this.state) : update) }; };
  return page;
}
const config = { decorations: DECOS, walls: WALLS, cases: CASES, lights: LIGHTS };

test("mobile moves preserve reading status and restore a stable custom layout after sorting", () => {
  const page = controller(), first = page.state.lib.find(item => !item.deco);
  page.updateMobileLibrary(state => moveLibraryItem(state.lib, state.preferences, first.id, 2));
  assert.equal(page.state.lib.find(item => item.id === first.id).shelf, 2);
  assert.equal(bookStatus(page.state.lib.find(item => item.id === first.id)), 0);
  const manual = rememberLayout(page.state.lib);
  for (const order of ["saga", "author", "height", "colour"]) page.updateMobileLibrary(state => arrangeLibrary(state.lib, state.preferences, order));
  page.updateMobileLibrary(state => arrangeLibrary(state.lib, state.preferences, "manual"));
  assert.deepEqual(rememberLayout(page.state.lib), manual);
  assert.equal(new Set(page.state.lib.map(item => item.id)).size, page.state.lib.length);
});

test("status and saga grouping preserve all books, decorations and independent statuses", () => {
  const page = controller(), before = page.state.lib;
  const statuses = new Map(before.filter(item => !item.deco).map(item => [item.id, bookStatus(item)]));
  const grouped = groupLibrary(before, libraryPreferences(), "saga");
  const families = new Map();
  for (const book of grouped.lib.filter(item => !item.deco)) {
    const family = libraryBookInfo(book).saga;
    if (!families.has(family)) families.set(family, new Set());
    families.get(family).add(book.shelf);
    assert.equal(bookStatus(book), statuses.get(book.id));
  }
  assert.ok([...families.values()].every(rows => rows.size === 1));
  assert.deepEqual(grouped.lib.map(item => item.id).sort(), before.map(item => item.id).sort());
  const byStatus = groupLibrary(grouped.lib, grouped.preferences, "status");
  assert.ok(byStatus.lib.filter(item => !item.deco).every(book => book.shelf === bookStatus(book)));
  assert.deepEqual(byStatus.lib.filter(item => item.deco).map(item => [item.id, item.shelf]).sort(), before.filter(item => item.deco).map(item => [item.id, item.shelf]).sort());
});

test("cover choice is exclusive within its shelf and None restores spine presentation", () => {
  const page = controller(), middle = page.state.lib.filter(item => !item.deco && item.shelf === 1);
  const next = chooseShelfCover(page.state.lib, 1, middle[1].id);
  assert.deepEqual(next.filter(item => item.shelf === 1 && item.mode === "cover").map(item => item.id), [middle[1].id]);
  const cleared = chooseShelfCover(next, 1, "");
  assert.equal(cleared.some(item => item.shelf === 1 && item.mode === "cover"), false);
  assert.deepEqual(cleared.filter(item => item.shelf !== 1), page.state.lib.filter(item => item.shelf !== 1));
});

test("all mobile preferences and new decorations survive save, while Discard restores the whole snapshot", () => {
  const page = controller(), store = new Map();
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { setItem: (key, value) => store.set(key, value) } });
  try {
    for (const key of ["hourglass", "frame", "bookends", "sleeping-cat"]) page.addDeco(key, 1);
    page.updateMobileLibrary(({ preferences }) => ({ preferences: { ...preferences, name: "Your library", bookcase: "Oak", wall: "Forest", light: "Evening" }, lights: "off" }));
    page.updateMobileLibrary(state => groupLibrary(state.lib, state.preferences, "saga"));
    assert.equal(page.saveLibrary(), true);
    const saved = store.get("the-salon-library-layout-v1");
    assert.equal(isValidLibrarySnapshot(JSON.parse(saved), config), true);
    page.updateMobileLibrary(({ preferences }) => ({ preferences: { ...preferences, name: "Temporary", wall: "Peach" }, lib: [], lights: "warm" }));
    page.renderVals().discardLibrary();
    assert.equal(serializeLibrary(page.state), saved);
    assert.equal(page.renderVals().mobileLibrary.preferences.name, "Your library");
  } finally {
    clearTimeout(page._saveConfirmationTimer);
    if (previous) Object.defineProperty(globalThis, "localStorage", previous); else delete globalThis.localStorage;
  }
});

test("old snapshots remain valid; invalid mobile preferences and reading statuses are rejected", () => {
  const page = controller(), snapshot = JSON.parse(serializeLibrary(page.state));
  delete snapshot.libraryPreferences;
  snapshot.lib.forEach(item => delete item.status);
  assert.equal(isValidLibrarySnapshot(snapshot, config), true);
  assert.equal(libraryPreferences(snapshot.libraryPreferences).name, "Your library");
  assert.equal(isValidLibrarySnapshot({ ...snapshot, libraryPreferences: { wall: "unknown" } }, config), false);
  assert.equal(isValidLibrarySnapshot({ ...snapshot, libraryPreferences: { name: "x".repeat(81) } }, config), false);
  snapshot.lib.find(item => !item.deco).status = 9;
  assert.equal(isValidLibrarySnapshot(snapshot, config), false);
});

test("storage failure is reported and leaves the library dirty for retry", () => {
  const page = controller();
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { setItem: () => { throw new Error("Unavailable"); } } });
  try {
    page.updateMobileLibrary(({ preferences }) => ({ preferences: { ...preferences, wall: "Sage" } }));
    assert.equal(page.saveLibrary(), false);
    assert.equal(page.state.saveError, true);
    assert.equal(page.renderVals().libraryDirty, true);
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous); else delete globalThis.localStorage;
  }
});
