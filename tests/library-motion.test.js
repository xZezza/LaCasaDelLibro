import test from 'node:test';
import assert from 'node:assert/strict';
import { bookBounds, bookFacing, isValidBookRotation, LIBRARY_BOOK_PERSPECTIVE } from '../src/lib/library-motion.js';

test('rotated book bounds support upright and face-out books without negative geometry', () => {
  for (const [facing, expected] of [
    [0, [40, 180]],
    [-90, [100, 180]],
  ]) {
    const bounds = bookBounds(40, 180, 100, facing);
    assert.ok(Math.abs(bounds.width - expected[0]) < 1e-8);
    assert.ok(Math.abs(bounds.height - expected[1]) < 1e-8);
  }
  for (const mode of ['spine', 'cover']) {
    const bounds = bookBounds(40, 180, 100, bookFacing(mode), LIBRARY_BOOK_PERSPECTIVE);
    assert.ok(bounds.width > 0 && bounds.height > 0);
    assert.ok(Number.isFinite(bounds.width + bounds.height));
  }
});

test('saved rotations accept older layouts and reject malformed browser data', () => {
  assert.equal(isValidBookRotation(undefined), true);
  for (const bad of [null, {}, { x: NaN, y: 0, z: 0 }, { x: 181, y: 0, z: 0 }]) assert.equal(isValidBookRotation(bad), false);
  assert.equal(isValidBookRotation({ x: -90, y: 45, z: 180 }), true);
  assert.equal(bookFacing('cover'), -100);
});
