// Stable visual identities shared by rendering and the Colour arrangement action.
const EDITIONS = ["A Court of Thorns and Roses", "Fourth Wing", "The Hunger Games", "Six of Crows", "The Cruel Prince", "Divergent", "Throne of Glass"];
const THEMES = { "Throne of Glass": 5, "Shadow and Bone": 3, "Mistborn": 1, "The Night Circus": 3 };
const COLOURS = [
  { hue: 15, lightness: .36 },
  { hue: 140, lightness: .35 },
  { hue: 80, lightness: .52 },
  { hue: 260, lightness: .31 },
  { hue: 80, lightness: .82 },
  { hue: 310, lightness: .45 },
];
export function illustratedBinding(title) {
  const edition = EDITIONS.indexOf(title);
  const index = THEMES[title] ?? (edition >= 0 ? edition % 6 : [...title].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 6);
  return { index, edition, ...COLOURS[index] };
}
export function illustratedColour(item) {
  return item.deco ? { hue: item.h, lightness: item.l } : illustratedBinding(item.t);
}
