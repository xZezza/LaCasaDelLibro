// Match the approved relative sizes in every scene and in shelf-space checks.
const CREATURE_SCALE = {
  crookshanks: 0.52, buttercup: 0.52, hedwig: 0.58, fleetfoot: 0.62,
  andarna: 0.6, abraxos: 0.78, tairn: 0.78, sgaeyl: 0.78,
};

export function visitorScale(guest, placement) {
  return (guest.scale || 1) * (placement === 'potter' ? 1 : CREATURE_SCALE[guest.id] || 1);
}

// Coordinates are in unzoomed stage pixels. Hide a visit rather than borrowing
// space from books, shelf labels or an adjacent row. Include the name and arrival.
export function shelfGuestPosition(rows, {
  size = 112, minSize = 80, maxScale = 1, hoverScale = 1.2,
  clearance = 12, labelHeight = 20, arrivalDistance = 12,
} = {}) {
  if (![size, minSize, maxScale, hoverScale, clearance, labelHeight, arrivalDistance]
    .every(Number.isFinite) || size <= 0 || minSize <= 0 || maxScale <= 0 || hoverScale < 1) return null;
  const spots = [];
  for (const row of rows) {
    if (![row.left, row.right, row.top, row.bottom, row.occupiedRight].every(Number.isFinite)) continue;
    const availableHeight = row.bottom - row.top - clearance;
    const fittedSize = Math.min(size, (availableHeight / hoverScale - labelHeight) / maxScale);
    if (fittedSize < minSize) continue;
    // The name can be wider than a small cat. Reserve half a zoomed label on
    // either side, so small creatures receive the same protection as dragons.
    const largestArt = fittedSize * maxScale;
    const overhang = Math.max(fittedSize * hoverScale / 2,
      largestArt * (1 + hoverScale) / 2 - fittedSize,
      largestArt / 2 + fittedSize * hoverScale / 2 - fittedSize);
    const leftEdge = Math.max(row.left, row.occupiedRight) + clearance + arrivalDistance;
    const left = leftEdge + overhang;
    const rightEdge = left + fittedSize + overhang + arrivalDistance;
    if (rightEdge > row.right - clearance) continue;
    spots.push({ left, top: row.bottom - fittedSize, size: fittedSize,
      free: row.right - row.occupiedRight });
  }
  spots.sort((a, b) => b.free - a.free);
  if (!spots.length) return null;
  const {left, top, size: fittedSize} = spots[0];
  return {left, top, size: fittedSize};
}
