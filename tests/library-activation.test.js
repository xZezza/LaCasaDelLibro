import test from "node:test";
import assert from "node:assert/strict";
import { createLibraryActivation } from "../src/lib/library-activation.js";
import { mobileItemDimensions } from "../src/lib/mobile-library-layout.js";

function fixture() {
  let clock = 0, sequence = 0;
  const timers = new Map(), events = [];
  const control = createLibraryActivation({
    select: id => events.push(["select", id]), zoom: id => events.push(["zoom", id]), now: () => clock,
    schedule: (fn, ms) => { timers.set(++sequence, { fn, due: clock + ms }); return sequence; },
    unschedule: id => timers.delete(id),
  });
  function tick(ms) {
    const until = clock + ms;
    for (;;) {
      const next = [...timers.entries()].sort((a, b) => a[1].due - b[1].due)[0];
      if (!next || next[1].due > until) break;
      clock = next[1].due; timers.delete(next[0]); next[1].fn();
    }
    clock = until;
  }
  return { ...control, events, tick, timers };
}

test("a single pointer tap selects once after the double-tap window", () => {
  const f = fixture(); f.activate("book"); f.tick(349);
  assert.deepEqual(f.events, []);
  f.tick(1); f.tick(1000);
  assert.deepEqual(f.events, [["select", "book"]]);
});

test("two touch clicks zoom the same book without opening its selection sheet", () => {
  const f = fixture(); f.activate("book"); f.tick(170); f.suspend(); f.tick(50); f.activate("book");
  f.tick(1000);
  assert.deepEqual(f.events, [["zoom", "book"]]);
  assert.equal(f.timers.size, 0);
});

test("different books and late taps do not accidentally become a double tap", () => {
  const f = fixture(); f.activate("first"); f.tick(120); f.suspend(); f.activate("second"); f.tick(350);
  assert.deepEqual(f.events, [["select", "second"]]);
  f.activate("second"); f.tick(351); f.activate("second"); f.tick(350);
  assert.deepEqual(f.events.slice(1), [["select", "second"], ["select", "second"]]);
});

test("keyboard selection is immediate and native double-click counts still open zoom", () => {
  const f = fixture(); f.activate("old"); f.activate("keyboard", { keyboard: true });
  assert.deepEqual(f.events, [["select", "keyboard"]]);
  f.tick(1000); f.activate("mouse", { double: true }); f.tick(1000);
  assert.deepEqual(f.events, [["select", "keyboard"], ["zoom", "mouse"]]);
});

test("holding the second tap suspends selection, and consuming a drag cancels zoom", () => {
  const f = fixture(); f.activate("book"); f.tick(300); f.suspend(); f.tick(200);
  assert.deepEqual(f.events, []);
  f.cancel(); f.tick(1000);
  assert.deepEqual(f.events, []);
  f.activate("book"); f.tick(350);
  assert.deepEqual(f.events, [["select", "book"]]);
});

test("cancelling pending taps prevents callbacks after exit or unmount", () => {
  const f = fixture(); f.activate("book"); f.cancel(); f.cancel(); f.tick(1000);
  assert.deepEqual(f.events, []);
  assert.equal(f.timers.size, 0);
});

test("close-up doubles books and ornaments uniformly without altering saved dimensions", () => {
  for (const item of [
    ...["cover", "spine"].map(mode => ({ H: 110, T: 23, mode })),
    { deco: "plant" },
  ]) {
    const before = JSON.stringify(item);
    const normal = mobileItemDimensions(item), close = mobileItemDimensions(item, 2);
    assert.equal(close.w, normal.w * 2);
    assert.equal(close.h, normal.h * 2);
    assert.equal(JSON.stringify(item), before);
  }
});
