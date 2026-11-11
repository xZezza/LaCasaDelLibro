import test from 'node:test';
import assert from 'node:assert/strict';
import { bookBounds, bookRotation, normalizeDegrees, isValidBookRotation } from '../src/lib/library-motion.js';

test('rotated book bounds support upright, face-out and flat books without negative geometry', () => {
  for (const [rotation, expected] of [
    [{ x: 0, y: 0, z: 0 }, [40, 180]],
    [{ x: 0, y: -90, z: 0 }, [100, 180]],
    [{ x: 0, y: 0, z: 90 }, [180, 40]],
  ]) {
    const bounds = bookBounds(40, 180, 100, rotation);
    assert.ok(Math.abs(bounds.width - expected[0]) < 1e-8);
    assert.ok(Math.abs(bounds.height - expected[1]) < 1e-8);
  }
  for (let x = -180; x <= 180; x += 30) for (let y = -180; y <= 180; y += 30) {
    const bounds = bookBounds(40, 180, 100, { x, y, z: 35 }, -10);
    assert.ok(bounds.width > 0 && bounds.height > 0);
    assert.ok(Number.isFinite(bounds.width + bounds.height));
  }
});

test('saved rotations accept older layouts and reject malformed browser data', () => {
  assert.equal(isValidBookRotation(undefined), true);
  for (const bad of [null, {}, { x: NaN, y: 0, z: 0 }, { x: 181, y: 0, z: 0 }]) assert.equal(isValidBookRotation(bad), false);
  assert.equal(isValidBookRotation({ x: -90, y: 45, z: 180 }), true);
  assert.equal(normalizeDegrees(730), 10);
  assert.deepEqual(bookRotation({ mode: 'cover' }), { x: -7, y: -90, z: 0 });
});
