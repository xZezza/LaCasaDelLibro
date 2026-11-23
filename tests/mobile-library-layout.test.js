import test from "node:test";
import assert from "node:assert/strict";
import LandingController from "../src/components/landing/LandingController.js";
import { DECOS, WALLS, CASES, LIGHTS } from "../src/data/landing/library.js";
import { SHELF_LABELS, libraryBookInfo } from "../src/data/landing/mobile-library.js";
import { arrangeLibrary, bookStatus, groupLibrary, moveLibraryItem, rememberLayout, twoShelfLibrary } from "../src/lib/mobile-library.js";
import { MOBILE_COVER_RATIO, mobileItemDimensions } from "../src/lib/mobile-library-layout.js";
import { isValidLibrarySnapshot, serializeLibrary } from "../src/lib/library-storage.js";

const ids = items => items.map(item => item.id).sort();
const config = { decorations: DECOS, walls: WALLS, cases: CASES, lights: LIGHTS };

test("two-shelf view preserves legacy saved items and independent reading statuses without mutating the snapshot", () => {
  const page = new LandingController({});
  const legacy = page.state.lib.map(item => { const copy = { ...item }; delete copy.status; return copy; });
  const preferences = { manualOrder: rememberLayout(legacy) };
  const before = JSON.stringify({ legacy, preferences });
  const view = twoShelfLibrary(legacy, preferences);
  assert.equal(SHELF_LABELS.length, 2);
  assert.deepEqual(ids(view.lib), ids(legacy));
  assert.ok(view.lib.every(item => [0, 1].includes(item.shelf)));
  for (const item of view.lib.filter(item => !item.deco)) assert.equal(bookStatus(item), legacy.find(old => old.id === item.id).shelf);
  assert.ok(view.preferences.manualOrder.every(item => item.shelf < 2));
  assert.equal(JSON.stringify({ legacy, preferences }), before);
  assert.deepEqual(twoShelfLibrary(view.lib, view.preferences), view);
});

test("two-shelf status and saga grouping preserve every item and all three reading statuses", () => {
  const page = new LandingController({});
  const view = twoShelfLibrary(page.state.lib);
  const status = new Map(view.lib.filter(item => !item.deco).map(item => [item.id, item.status]));
  for (const group of ["status", "saga", "all"]) {
    const result = groupLibrary(view.lib, view.preferences, group, 2);
    assert.deepEqual(ids(result.lib), ids(view.lib));
    assert.ok(result.lib.every(item => item.shelf < 2));
    for (const item of result.lib.filter(item => !item.deco)) assert.equal(item.status, status.get(item.id));
    if (group === "status") assert.ok(result.lib.filter(item => !item.deco).every(item => item.shelf === Math.min(item.status, 1)));
    if (group === "saga") {
      const families = new Map();
      for (const item of result.lib.filter(item => !item.deco)) {
        const saga = libraryBookInfo(item).saga;
        if (!families.has(saga)) families.set(saga, new Set());
        families.get(saga).add(item.shelf);
      }
      assert.ok([...families.values()].every(rows => rows.size === 1));
    }
  }
});

test("two-shelf moves and sorting retain a manual order, modes and all decorations", () => {
  const page = new LandingController({});
  const view = twoShelfLibrary(page.state.lib);
  const book = view.lib.find(item => !item.deco && item.shelf === 0);
  const moved = moveLibraryItem(view.lib, view.preferences, book.id, 1, null, 2);
  assert.equal(moved.lib.find(item => item.id === book.id).mode, book.mode);
  assert.equal(bookStatus(moved.lib.find(item => item.id === book.id)), bookStatus(book));
  assert.deepEqual(ids(moved.lib), ids(view.lib));
  assert.deepEqual(moveLibraryItem(moved.lib, moved.preferences, book.id, 2, null, 2).lib, moved.lib);
  const manual = rememberLayout(moved.lib);
  for (const order of ["colour", "height", "author", "saga"]) {
    const sorted = arrangeLibrary(moved.lib, moved.preferences, order, 2);
    assert.ok(sorted.lib.every(item => item.shelf < 2));
    assert.deepEqual(rememberLayout(arrangeLibrary(sorted.lib, sorted.preferences, "manual", 2).lib), manual);
  }
});

test("both legacy three-row and new two-row snapshots remain valid and serializable", () => {
  const page = new LandingController({});
  const before = serializeLibrary(page.state);
  const view = twoShelfLibrary(page.state.lib, page.state.libraryPreferences);
  assert.equal(serializeLibrary(page.state), before);
  const compact = serializeLibrary({ ...page.state, lib: view.lib, libraryPreferences: view.preferences });
  assert.equal(isValidLibrarySnapshot(JSON.parse(before), config), true);
  assert.equal(isValidLibrarySnapshot(JSON.parse(compact), config), true);
  assert.deepEqual(ids(JSON.parse(compact).lib), ids(JSON.parse(before).lib));
});

test("mobile book covers keep their artwork ratio, and zoom scales both axes together", () => {
  const page = new LandingController({});
  for (const book of page.state.lib.filter(item => !item.deco)) {
    for (const mode of ["cover", "spine", "lying"]) {
      const size = mobileItemDimensions({ ...book, mode });
      const zoom = mobileItemDimensions({ ...book, mode }, true);
      assert.ok(size.w > 0 && size.h > 0);
      assert.ok(Math.abs(zoom.w / size.w - 1.3) < 1e-10);
      assert.ok(Math.abs(zoom.h / size.h - 1.3) < 1e-10);
      if (mode === "cover") assert.ok(Math.abs(size.w / size.h - MOBILE_COVER_RATIO) < 1e-10);
      if (mode === "spine") assert.ok(size.h / size.w <= 4.8);
      if (mode === "lying") assert.ok(size.w > size.h);
    }
  }
});

test("decoration proportions survive uniform zoom and narrow shelf scaling", () => {
  const page = new LandingController({});
  for (const item of page.state.lib.filter(item => item.deco)) {
    const size = mobileItemDimensions(item), zoom = mobileItemDimensions(item, true);
    assert.ok(Math.abs(size.w / size.h - zoom.w / zoom.h) < 1e-10);
    for (const scale of [.82, .9, 1]) assert.ok(Math.abs((size.w * scale) / (size.h * scale) - size.w / size.h) < 1e-10);
  }
});
