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
  // Reserve space for the largest pose and the name as the guest enters or is hovered.
  const overhangRatio = Math.max(hoverScale / 2, maxScale * (1 + hoverScale) / 2 - 1,
    maxScale / 2 + hoverScale / 2 - 1);
  for (const row of rows) {
    if (![row.left, row.right, row.top, row.bottom, row.occupiedRight].every(Number.isFinite)) continue;
    const availableHeight = row.bottom - row.top - clearance;
    const start = Math.max(row.left, row.occupiedRight);
    const free = row.right - start;
    const widthLimit = (free - 2 * (clearance + arrivalDistance)) / (1 + 2 * overhangRatio);
    const fittedSize = Math.min(size, (availableHeight / hoverScale - labelHeight) / maxScale, widthLimit);
    if (fittedSize < minSize) continue;
    const left = start + clearance + arrivalDistance + fittedSize * overhangRatio;
    spots.push({ left, top: row.bottom - fittedSize, size: fittedSize, free });
  }
  spots.sort((a, b) => b.size - a.size || b.free - a.free);
  if (!spots.length) return null;
  const {left, top, size: fittedSize} = spots[0];
  return {left, top, size: fittedSize};
}
