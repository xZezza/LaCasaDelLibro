export const LIBRARY_PRESENTATION_SCALE = 1.495;

// CSS transform order: rotateX, rotateY, rotateZ. Values are relative to the room view.
export function bookRotation(book) {
  return book.rotation || { x: -7, y: book.mode === 'cover' ? -90 : 0, z: book.mode === 'lying' ? 90 : 0 };
}
export function normalizeDegrees(value) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}
export function bookBounds(width, height, depth, rotation, viewAngle = 0, perspective = 0) {
  const rad = Math.PI / 180;
  const x = rotation.x * rad, y = (rotation.y + viewAngle) * rad, z = rotation.z * rad;
  const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z);
  if (perspective > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const a of [-width / 2, width / 2]) for (const b of [-height / 2, height / 2]) for (const c of [-depth / 2, depth / 2]) {
      const rx = cz * a - sz * b, ry = sz * a + cz * b;
      const tx = cy * rx + sy * c, tz = -sy * rx + cy * c;
      const ty = cx * ry - sx * tz, zz = sx * ry + cx * tz;
      const factor = perspective / (perspective - zz);
      minX = Math.min(minX, tx * factor); maxX = Math.max(maxX, tx * factor);
      minY = Math.min(minY, ty * factor); maxY = Math.max(maxY, ty * factor);
    }
    return { width: maxX - minX, height: maxY - minY, offsetX: (minX + maxX) / 2, offsetY: (minY + maxY) / 2 };
  }
  return {
    width: Math.abs(cy * cz) * width + Math.abs(cy * sz) * height + Math.abs(sy) * depth,
    height: Math.abs(cx * sz + sx * sy * cz) * width + Math.abs(cx * cz - sx * sy * sz) * height + Math.abs(sx * cy) * depth,
  };
}
export function isValidBookRotation(rotation) {
  return rotation === undefined || !!rotation && ['x', 'y', 'z'].every(key => Number.isFinite(rotation[key]) && Math.abs(rotation[key]) <= 180);
}
