import { useState } from "react";
import { JOURNAL_COLOURS, JOURNAL_CHARACTERS, JOURNAL_RATINGS, JOURNAL_RATING_COLOURS, JOURNAL_PREVIEWS } from "../../../data/landing/journal.js";

export function useJournal() {
  const [cover, setCover] = useState(0);
  const [scores, setScores] = useState({ romance: 4, flow: 5, mystery: 3, total: 4 });
  const [ink, setInk] = useState({ romance: 0, flow: 3, mystery: 2, total: 4 });
  const [shared, setShared] = useState({ best: true, review: false });
  const [activePreview, setPreview] = useState(0);

  const bookColor = JOURNAL_COLOURS[cover][1];
  const bookColors = JOURNAL_COLOURS.map(([name, v], index) => ({
    name,
    v,
    selected: index === cover,
    pick: () => setCover(index),
  }));

  const ratings = JOURNAL_RATINGS.map(({ key, name, path, sw, filled }) => ({
    name,
    path,
    sw,
    filled,
    color: JOURNAL_RATING_COLOURS[ink[key]][1],
    total: key === "total",
    icons: [1, 2, 3, 4, 5].map(value => ({
      label: `${name} ${value}`,
      selected: value <= scores[key],
      set: () => setScores(current => ({ ...current, [key]: current[key] === value ? value - 1 : value })),
    })),
    colors: JOURNAL_RATING_COLOURS.map(([name, v], index) => ({
      label: `${name} ink`,
      v,
      selected: index === ink[key],
      pick: () => setInk(current => ({ ...current, [key]: index })),
    })),
  }));

  const sh = Object.fromEntries(Object.keys(shared).map(key => [key, {
    state: shared[key] ? "Shared" : "Private",
    selected: shared[key],
    toggle: () => setShared(current => ({ ...current, [key]: !current[key] })),
  }]));
  const jSummary = [
    "Everything on this page is private.",
    "One thought is visible on your profile. The rest stays yours.",
    "Both thoughts are visible on your profile. The rest stays yours.",
  ][Number(shared.best) + Number(shared.review)];

  const previewLinks = JOURNAL_PREVIEWS.map(({ action }, index) => ({
    name: action,
    selected: activePreview === index,
    pick: () => setPreview(index),
  }));
  const example = JOURNAL_PREVIEWS[activePreview];
  const preview = {
    ...example,
    covers: example.covers.map(([w, h, bg = bookColor]) => ({ w, h, bg })),
  };
  return { bookColor, bookColors, chars: JOURNAL_CHARACTERS, ratings, sh, jSummary, preview, previewLinks, activePreview };
}
