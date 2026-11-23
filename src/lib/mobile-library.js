import { illustratedColour } from "../data/landing/library-art.js";
import { libraryBookInfo } from "../data/landing/mobile-library.js";

export const MOBILE_LIBRARY_DEFAULTS = Object.freeze({
  name: "Your library", bookcase: "Walnut", wall: "Linen", light: "Daylight",
  grouping: "all", arrange: "manual", manualOrder: null,
});
export function libraryPreferences(value) { return { ...MOBILE_LIBRARY_DEFAULTS, ...value }; }
export function validLibraryPreferences(value) {
  if (value === undefined) return true;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const p = libraryPreferences(value);
  return typeof p.name === "string" && p.name.length <= 80 &&
    ["Walnut", "Oak"].includes(p.bookcase) && ["Linen", "Sage", "Lavender", "Peach", "Forest"].includes(p.wall) &&
    ["Daylight", "Evening"].includes(p.light) && ["all", "status", "saga"].includes(p.grouping) &&
    ["saga", "colour", "height", "author", "manual"].includes(p.arrange) &&
    (p.manualOrder === null || Array.isArray(p.manualOrder) && p.manualOrder.length <= 400 &&
      new Set(p.manualOrder.map(item => item?.id)).size === p.manualOrder.length &&
      p.manualOrder.every(item => typeof item?.id === "string" && [0, 1, 2].includes(item.shelf)));
}
export function bookStatus(book) { return book.status ?? book.shelf; }
// Project legacy three-row layouts without changing their saved data on open.
export function twoShelfLibrary(lib, preferences) {
  const p = libraryPreferences(preferences);
  return {
    lib: lib.map(item => ({
      ...item,
      ...(!item.deco ? { status: bookStatus(item) } : {}),
      shelf: Math.min(item.shelf, 1),
    })),
    preferences: { ...p, manualOrder: p.manualOrder?.map(item => ({ ...item, shelf: Math.min(item.shelf, 1) })) ?? null },
  };
}
export function rememberLayout(lib) { return lib.map(({ id, shelf }) => ({ id, shelf })); }
function replaceBooks(lib, sorted) { let i = 0; return lib.map(item => item.deco ? item : sorted[i++]); }
export function arrangeLibrary(lib, preferences, order, shelfCount = 3) {
  if (shelfCount === 2) ({ lib, preferences } = twoShelfLibrary(lib, preferences));
  const p = libraryPreferences(preferences);
  if (order === "manual") {
    const remembered = p.manualOrder || rememberLayout(lib);
    const saved = new Map(remembered.map((item, i) => [item.id, { ...item, i }]));
    const next = lib.map(item => ({ ...item, shelf: saved.get(item.id)?.shelf ?? item.shelf }));
    next.sort((a, b) => (saved.get(a.id)?.i ?? 1e6) - (saved.get(b.id)?.i ?? 1e6));
    return { lib: next, preferences: { ...p, arrange: "manual", grouping: "all" } };
  }
  const compare = (a, b) => {
    const first = libraryBookInfo(a), second = libraryBookInfo(b);
    if (order === "height") return b.H - a.H;
    if (order === "author") return first.author.localeCompare(second.author) || a.t.localeCompare(b.t);
    if (order === "colour") {
      const x = illustratedColour(a), y = illustratedColour(b);
      return x.hue - y.hue || x.lightness - y.lightness;
    }
    return first.saga.localeCompare(second.saga) || first.order - second.order || a.t.localeCompare(b.t);
  };
  const next = Array.from({ length: shelfCount }, (_, shelf) => shelf).flatMap(shelf => {
    const items = lib.filter(item => item.shelf === shelf);
    return replaceBooks(items, items.filter(item => !item.deco).sort(compare));
  });
  return { lib: next, preferences: { ...p, arrange: order, manualOrder: p.manualOrder || rememberLayout(lib) } };
}
export function groupLibrary(lib, preferences, grouping, shelfCount = 3) {
  if (shelfCount === 2) ({ lib, preferences } = twoShelfLibrary(lib, preferences));
  const p = libraryPreferences(preferences);
  let next = lib.map(item => ({ ...item, ...(!item.deco ? { status: bookStatus(item) } : {}) }));
  if (grouping === "status") {
    next = next.map(item => item.deco ? item : { ...item, shelf: Math.min(item.status, shelfCount - 1) });
    next = Array.from({ length: shelfCount }, (_, shelf) => {
      const row = next.filter(item => item.shelf === shelf);
      return replaceBooks(row, row.filter(item => !item.deco).sort((a, b) => a.status - b.status));
    }).flat();
  }
  if (grouping === "saga") {
    const families = new Map();
    for (const item of next.filter(item => !item.deco)) {
      const saga = libraryBookInfo(item).saga;
      if (!families.has(saga)) families.set(saga, []);
      families.get(saga).push(item);
    }
    const rows = Array.from({ length: shelfCount }, () => []);
    for (const family of families.values()) {
      const shelf = rows.reduce((best, row, i) => row.length < rows[best].length ? i : best, 0);
      rows[shelf].push(...family.sort((a, b) => libraryBookInfo(a).order - libraryBookInfo(b).order));
    }
    next = rows.flatMap((row, shelf) => [...row.map(item => ({ ...item, shelf })), ...next.filter(item => item.deco && item.shelf === shelf)]);
  }
  return { lib: next, preferences: { ...p, grouping, arrange: grouping === "saga" ? "saga" : p.arrange, manualOrder: p.manualOrder || rememberLayout(lib) } };
}
export function moveLibraryItem(lib, preferences, id, shelf, beforeId = null, shelfCount = 3) {
  if (id === beforeId || !Number.isInteger(shelf) || shelf < 0 || shelf >= shelfCount) return { lib, preferences };
  if (shelfCount === 2) ({ lib, preferences } = twoShelfLibrary(lib, preferences));
  const next = lib.map(item => ({ ...item, ...(!item.deco ? { status: bookStatus(item) } : {}) }));
  const index = next.findIndex(item => item.id === id);
  if (index < 0) return { lib, preferences };
  const [item] = next.splice(index, 1);
  item.shelf = shelf;
  if (item.onShelf === false) item.onShelf = true;
  let at = beforeId ? next.findIndex(book => book.id === beforeId && book.shelf === shelf) : -1;
  if (at < 0) {
    at = next.reduce((last, book, i) => book.shelf === shelf ? i + 1 : last, next.length);
  }
  next.splice(at, 0, item);
  return { lib: next, preferences: { ...libraryPreferences(preferences), arrange: "manual", grouping: "all", manualOrder: rememberLayout(next) } };
}
// Shelf presence is independent of reading status and cover/spine orientation.
export function placeLibraryBook(lib, preferences, id, destination, shelfCount = 2) {
  const book = lib.find(item => item.id === id && !item.deco);
  if (!book) return { lib, preferences };
  if (destination === "") return {
    lib: lib.map(item => item.id === id ? { ...item, onShelf: false } : item), preferences,
  };
  const shelf = Number(destination);
  if (!Number.isInteger(shelf) || shelf < 0 || shelf >= shelfCount) return { lib, preferences };
  return moveLibraryItem(lib, preferences, id, shelf, null, shelfCount);
}
export function chooseShelfCover(lib, shelf, id) {
  return lib.map(item => !item.deco && item.onShelf !== false && item.shelf === shelf ? {
    ...item, mode: item.id === id ? "cover" : item.mode === "cover" ? "spine" : item.mode,
    rotation: undefined,
  } : item);
}
