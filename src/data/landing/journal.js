export const JOURNAL_TABS = ["Memories", "Characters", "Ratings"];

export const JOURNAL_EXAMPLE = {
  title: "The Ember Crown",
  series: "The Ashborn Saga",
  desktopMeta: "M. Hale · 512 pages · Romantasy",
  meta: "M. Hale · The Ashborn Saga, 1",
  memory: "The bridge scene. Corin turning\nback for her when the whole\ncity was burning.",
  review: "Slow start, then I couldn’t put\nit down. The ending broke me\na little. Already planning a reread.",
  desktopReview: "Slow start, then I couldn’t put it down. The magic system finally makes sense in part three, and the ending broke me a little. Already planning a reread.",
  song: "Ashes of Us",
  artist: "Wildwood",
  readingTime: "11 days, mostly at night",
  language: "English",
};

export const JOURNAL_COLOURS = [
  ["Coral", "oklch(0.66 0.15 30)"],
  ["Cherry", "oklch(0.48 0.15 20)"],
  ["Rose", "oklch(0.74 0.11 5)"],
  ["Lavender", "oklch(0.62 0.12 300)"],
  ["Midnight", "oklch(0.38 0.1 265)"],
  ["Teal", "oklch(0.52 0.09 195)"],
  ["Sage", "oklch(0.62 0.07 145)"],
  ["Gold", "oklch(0.72 0.13 80)"],
];

export const JOURNAL_RATING_COLOURS = [
  ["Red", "oklch(0.6 0.19 18)"],
  ["Pink", "oklch(0.74 0.13 355)"],
  ["Purple", "oklch(0.6 0.15 300)"],
  ["Teal", "oklch(0.55 0.1 200)"],
  ["Gold", "oklch(0.75 0.14 75)"],
];

export const JOURNAL_RATINGS = [
  {
    key: "romance", name: "Romance", sw: 1.6, filled: true,
    path: "M12 20.5s-7.6-4.6-9.5-9.3C1.1 7.8 3.2 4.2 6.7 4.2c2.1 0 3.6 1.2 5.3 3.2 1.7-2 3.2-3.2 5.3-3.2 3.5 0 5.6 3.6 4.2 7C19.6 15.9 12 20.5 12 20.5z",
  },
  {
    key: "flow", name: "Page-turner", sw: 1.6, filled: true,
    path: "M2.5 5.5c3.2-1.1 6.3-.8 9.5 1.3 3.2-2.1 6.3-2.4 9.5-1.3v13c-3.2-1.1-6.3-.8-9.5 1.3-3.2-2.1-6.3-2.4-9.5-1.3zM12 6.8v13",
  },
  {
    key: "mystery", name: "Mystery", sw: 2.6, filled: false,
    path: "M8.2 8.6a3.8 3.8 0 1 1 5.6 3.3c-1.2.7-1.8 1.4-1.8 2.8v.6M12 19.2v.3",
  },
  {
    key: "total", name: "Total score", sw: 1.6, filled: true,
    path: "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z",
  },
];

export const JOURNAL_CHARACTERS = [
  { label: "Favourite", name: "Maren", note: "never asked to be chosen", bg: "oklch(0.9 0.05 150 / 0.7)" },
  { label: "Can’t stand", name: "Lord Aske", note: "wanted to throw the book", bg: "oklch(0.88 0.06 20 / 0.7)" },
  { label: "Pointless", name: "Brother Ivo", note: "what was he even for?", bg: "oklch(0.88 0.04 260 / 0.7)" },
];

export const JOURNAL_PREVIEWS = [
  {
    kind: "Book",
    title: JOURNAL_EXAMPLE.title,
    action: "Go to the book page",
    meta: "M. Hale · 512 pages · Book 1 of The Ashborn Saga",
    about: "Everything about the book in one place, plus what other readers chose to share.",
    covers: [[40, 60]],
    chars: ["Maren", "Corin", "Lord Aske"],
    thread: "Was the bridge scene a betrayal or a rescue?",
  },
  {
    kind: "Saga",
    title: JOURNAL_EXAMPLE.series,
    action: "Go to the saga",
    meta: "M. Hale · 3 books",
    about: "Every book in reading order, the readers following the series, and where you are in it.",
    covers: [[30, 46], [30, 50, "oklch(0.5 0.1 200)"], [30, 54, "oklch(0.45 0.1 300)"]],
    chars: ["Maren", "Corin", "Lord Aske", "The Ferryman"],
    thread: "Rereading the whole saga before book three?",
  },
];
