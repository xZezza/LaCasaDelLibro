const BLURBS = {
  "The Night Circus":
    "A mysterious circus that opens only at night hides a duel between two young magicians bound to compete, and to fall in love.",
  "A Court of Thorns and Roses":
    "A huntress kills a wolf in the woods and is taken across the wall into the faerie lands of Prythian as payment.",
  "The Hunger Games":
    "In the ruins of North America, Katniss volunteers in her sister’s place for a televised fight to the death.",
  "Fourth Wing":
    "Violet is forced into a brutal war college for dragon riders, where the dragons choose who survives.",
  "Six of Crows":
    "Kaz Brekker gathers six outcasts for an impossible heist in the most heavily guarded fortress in the world.",
  Divergent:
    "In a city divided into five factions, Tris discovers she doesn’t fit any of them, and that this makes her dangerous.",
  "The Cruel Prince":
    "Jude, a mortal raised in the High Court of Faerie, wants a place among those who despise her, whatever the cost.",
  "Throne of Glass":
    "Assassin Celaena Sardothien is freed from a death camp to compete for the role of the king’s champion.",
  "Red Queen":
    "In a world split by the colour of blood, a Red girl discovers she has a power only the Silver elite should have.",
  "Shadow and Bone":
    "A mapmaker in a war-torn country uncovers a rare power that could destroy the darkness tearing her land apart.",
};
const COVERS = [
  ["The Night Circus", "Erin Morgenstern", "Fantasy"],
  ["A Court of Thorns and Roses", "Sarah J. Maas", "Romantasy"],
  ["The Hunger Games", "Suzanne Collins", "Dystopian"],
  ["Fourth Wing", "Rebecca Yarros", "Romantasy"],
  ["Six of Crows", "Leigh Bardugo", "Fantasy"],
  ["Divergent", "Veronica Roth", "Dystopian"],
  ["The Cruel Prince", "Holly Black", "Fantasy"],
  ["Throne of Glass", "Sarah J. Maas", "Fantasy"],
  ["Red Queen", "Victoria Aveyard", "Dystopian"],
  ["Shadow and Bone", "Leigh Bardugo", "Fantasy"],
].map(([t, a, g], i) => {
  const P = [
    [
      "oklch(0.42 0.14 20)",
      "oklch(0.95 0.03 85)",
      "oklch(0.85 0.11 82)",
      "ring",
    ],
    [
      "oklch(0.42 0.08 175)",
      "oklch(0.96 0.02 85)",
      "oklch(0.84 0.08 15)",
      "arch",
    ],
    [
      "oklch(0.3 0.02 50)",
      "oklch(0.95 0.02 85)",
      "oklch(0.74 0.15 50)",
      "diamond",
    ],
    [
      "oklch(0.36 0.09 258)",
      "oklch(0.96 0.02 85)",
      "oklch(0.85 0.11 82)",
      "moon",
    ],
    [
      "oklch(0.36 0.09 320)",
      "oklch(0.95 0.02 300)",
      "oklch(0.86 0.03 260)",
      "arch",
    ],
    [
      "oklch(0.62 0.11 230)",
      "oklch(0.98 0.01 230)",
      "oklch(0.95 0.04 90)",
      "ring",
    ],
    [
      "oklch(0.84 0.07 12)",
      "oklch(0.3 0.06 340)",
      "oklch(0.48 0.12 10)",
      "diamond",
    ],
    [
      "oklch(0.88 0.04 220)",
      "oklch(0.28 0.06 260)",
      "oklch(0.5 0.1 250)",
      "arch",
    ],
    [
      "oklch(0.5 0.17 25)",
      "oklch(0.97 0.01 85)",
      "oklch(0.88 0.02 250)",
      "diamond",
    ],
    [
      "oklch(0.27 0.04 285)",
      "oklch(0.95 0.02 85)",
      "oklch(0.86 0.1 85)",
      "moon",
    ],
  ][i % 10];
  const [bg, ink, accent, m] = P;
  return {t, a, g, bg, ink, accent, motif: m, blurb: BLURBS[t] || ""};
});

export { COVERS };
