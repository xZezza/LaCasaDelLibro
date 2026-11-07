export function serializeLibrary({ lib, wall, caseC, lights, angle }) {
  return JSON.stringify({ version: 1, lib, wall, caseC, lights, angle });
}

// Validate browser data before it enters the live preview state.
export function isValidLibrarySnapshot(saved, { decorations, walls, cases, lights }) {
  if (saved?.version !== 1 || !Array.isArray(saved.lib) || saved.lib.length > 400) return false;
  const ids = new Set();
  const booksValid = saved.lib.every(book => {
    if (!book || typeof book.id !== "string" || ids.has(book.id) ||
        typeof book.t !== "string" || book.t.length > 240 || ![0, 1, 2].includes(book.shelf)) return false;
    ids.add(book.id);
    if (book.deco) return Object.hasOwn(decorations, book.deco);
    return ["spine", "cover", "lying"].includes(book.mode) &&
      ["h", "l", "c", "T", "H", "D"].every(key => Number.isFinite(book[key])) &&
      book.h >= 0 && book.h <= 360 && book.l > 0 && book.l <= 1 &&
      book.c >= 0 && book.c <= 0.5 && book.T >= 1 && book.T <= 100 &&
      book.H >= 1 && book.H <= 200 && book.D >= 1 && book.D <= 200;
  });
  return booksValid && Number.isInteger(saved.wall) && !!walls[saved.wall] &&
    Number.isInteger(saved.caseC) && !!cases[saved.caseC] &&
    (saved.lights === "off" || Object.hasOwn(lights, saved.lights)) &&
    Number.isFinite(saved.angle) && Math.abs(saved.angle) <= 40;
}
