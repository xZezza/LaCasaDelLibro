export const LIBRARY_PRESENTATION_SCALE = 1.32;
export const LIBRARY_BOOK_PERSPECTIVE = 700;

export function bookFacing(mode) {
  return mode === 'cover' ? -100 : -10;
}

// The camera looks along the shelf. Every bottom corner shares its horizon.
export function bookBounds(width, height, depth, facing, perspective = 0) {
  const angle = facing * Math.PI / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  let minX = Infinity;
  let maxX = -Infinity;
  let maxHeight = 0;
  for (const x of [-width / 2, width / 2]) {
    for (const z of [-depth / 2, depth / 2]) {
      const rotatedZ = -sin * x + cos * z;
      const factor = perspective > 0 ? perspective / (perspective - rotatedZ) : 1;
      const projectedX = (cos * x + sin * z) * factor;
      minX = Math.min(minX, projectedX);
      maxX = Math.max(maxX, projectedX);
      maxHeight = Math.max(maxHeight, height * factor);
    }
  }
  return { width: maxX - minX, height: maxHeight, offsetX: (minX + maxX) / 2 };
}
export function isValidBookRotation(rotation) {
  return rotation === undefined || !!rotation && ['x', 'y', 'z'].every(key => Number.isFinite(rotation[key]) && Math.abs(rotation[key]) <= 180);
}
