import { imageAsset } from "../../lib/image-assets.js";
import visitors from "../library-visitors.json" with { type: "json" };

const SPINES = [
  [305, 0.4],
  [20, 0.38],
  [160, 0.32],
  [260, 0.36],
  [50, 0.42],
  [340, 0.34],
  [200, 0.34],
  [80, 0.4],
  [0, 0.3],
  [280, 0.3],
];
const READ = [
  "A Court of Thorns and Roses",
  "Fourth Wing",
  "The Hunger Games",
  "Six of Crows",
  "The Cruel Prince",
  "Divergent",
  "Throne of Glass",
  "Shadow and Bone",
];
const TOREAD = [
  "Iron Flame",
  "Red Queen",
  "Legendborn",
  "Serpent & Dove",
  "The Night Circus",
  "Shatter Me",
];
const shade = (h, l, c = 0.09) =>
  `linear-gradient(90deg, rgba(0,0,0,.3), transparent 18%, rgba(255,255,255,.14) 45%, transparent 75%, rgba(0,0,0,.32)), oklch(${l} ${c} ${h})`;
const BRIGHT = [
  [25, 0.6],
  [190, 0.55],
  [80, 0.62],
  [330, 0.55],
  [150, 0.54],
  [255, 0.55],
  [50, 0.63],
  [300, 0.5],
  [205, 0.56],
  [5, 0.56],
];
function book(t, i, lean) {
  const [h, l] = SPINES[(i * 3 + t.length) % SPINES.length];
  return {
    t,
    w: 30 + ((t.length * 7 + i * 5) % 22),
    h: 150 + ((t.length * 13 + i * 17) % 70),
    bg: shade(h, l),
    tf: lean ? "rotate(9deg) translateX(10px)" : "none",
  };
}
const WOODS = [
  ["Oak", 0.6, 0.08, 65],
  ["Walnut", 0.42, 0.06, 45],
  ["Ebony", 0.27, 0.02, 300],
  ["Cream", 0.92, 0.03, 85],
  ["Butter", 0.86, 0.11, 92],
  ["Coral", 0.72, 0.14, 30],
  ["Cherry", 0.5, 0.15, 20],
  ["Rose", 0.78, 0.09, 5],
  ["Lavender", 0.72, 0.09, 300],
  ["Plum", 0.42, 0.1, 320],
  ["Sky", 0.76, 0.08, 230],
  ["Midnight", 0.36, 0.09, 265],
  ["Teal", 0.55, 0.09, 195],
  ["Mint", 0.82, 0.08, 165],
  ["Sage", 0.68, 0.06, 145],
  ["Forest", 0.42, 0.08, 150],
].map(([name, l, c, hh]) => ({
  name,
  top: `oklch(${l} ${c} ${hh})`,
  grad: `linear-gradient(180deg, oklch(${l} ${c} ${hh}), oklch(${Math.max(l - 0.14, 0.16)} ${c} ${hh}))`,
}));
const LIGHT =
  "radial-gradient(ellipse 55% 50% at 80% 12%, oklch(0.99 0.03 85 / 0.75), transparent 70%), ";
const WALLS = [
  {
    name: "Linen",
    swatch: "oklch(0.94 0.015 85)",
    ink: "oklch(0.3 0.04 305)",
    bg: LIGHT + "oklch(0.94 0.015 85)",
  },
  {
    name: "Warm grey",
    swatch: "oklch(0.86 0.01 70)",
    ink: "oklch(0.3 0.04 305)",
    bg:
      LIGHT +
      "radial-gradient(circle, oklch(0.82 0.012 70) 0 0.6px, transparent 1px) 0 0 / 6px 6px, oklch(0.86 0.01 70)",
  },
  {
    name: "Greige wainscot",
    swatch: "oklch(0.8 0.02 75)",
    ink: "oklch(0.28 0.04 305)",
    bg:
      LIGHT +
      "linear-gradient(180deg, transparent 62%, oklch(0.78 0.02 75) 62%, oklch(0.78 0.02 75) 63%, transparent 63%), repeating-linear-gradient(90deg, oklch(0.84 0.018 75) 0 38px, oklch(0.82 0.02 75) 38px 40px), oklch(0.84 0.018 75)",
  },
  {
    name: "Sage stripes",
    swatch: "oklch(0.85 0.045 150)",
    ink: "oklch(0.3 0.04 305)",
    bg:
      LIGHT +
      "repeating-linear-gradient(90deg, oklch(0.87 0.04 150) 0 22px, oklch(0.84 0.045 150) 22px 44px)",
  },
  {
    name: "Blush dots",
    swatch: "oklch(0.88 0.05 20)",
    ink: "oklch(0.3 0.04 305)",
    bg:
      LIGHT +
      "radial-gradient(circle, oklch(0.78 0.08 20) 0 2px, transparent 2.6px) 0 0 / 30px 30px, radial-gradient(circle, oklch(0.8 0.07 60) 0 1.6px, transparent 2.2px) 15px 15px / 30px 30px, oklch(0.91 0.035 30)",
  },
  {
    name: "Starry night",
    swatch: "oklch(0.42 0.1 275)",
    ink: "oklch(0.92 0.04 85)",
    bg: "radial-gradient(circle, oklch(0.97 0.05 90) 0 1px, transparent 1.7px) 0 0 / 36px 36px, radial-gradient(circle, oklch(0.9 0.1 80) 0 1.3px, transparent 2.2px) 18px 23px / 52px 52px, radial-gradient(ellipse 50% 45% at 82% 15%, oklch(0.75 0.1 80 / 0.35), transparent 70%), linear-gradient(180deg, oklch(0.45 0.1 270), oklch(0.34 0.09 290))",
  },
];
const SHELVES = ["finished", "reading now", "still waiting for me"];
const CATALOG = [
  ["A Court of Mist and Fury", "Sarah J. Maas"],
  ["A Court of Wings and Ruin", "Sarah J. Maas"],
  ["House of Earth and Blood", "Sarah J. Maas"],
  ["Crown of Midnight", "Sarah J. Maas"],
  ["Onyx Storm", "Rebecca Yarros"],
  ["Catching Fire", "Suzanne Collins"],
  ["Mockingjay", "Suzanne Collins"],
  ["The Ballad of Songbirds and Snakes", "Suzanne Collins"],
  ["Crooked Kingdom", "Leigh Bardugo"],
  ["Siege and Storm", "Leigh Bardugo"],
  ["The Wicked King", "Holly Black"],
  ["The Queen of Nothing", "Holly Black"],
  ["Insurgent", "Veronica Roth"],
  ["City of Bones", "Cassandra Clare"],
  ["Clockwork Angel", "Cassandra Clare"],
  ["The Hobbit", "J.R.R. Tolkien"],
  ["The Fellowship of the Ring", "J.R.R. Tolkien"],
  ["Harry Potter and the Philosopher’s Stone", "J.K. Rowling"],
  ["The Name of the Wind", "Patrick Rothfuss"],
  ["From Blood and Ash", "Jennifer L. Armentrout"],
  ["The Song of Achilles", "Madeline Miller"],
  ["Circe", "Madeline Miller"],
  ["The Maze Runner", "James Dashner"],
  ["The Giver", "Lois Lowry"],
  ["Uprooted", "Naomi Novik"],
  ["The Invisible Life of Addie LaRue", "V.E. Schwab"],
  ["Caraval", "Stephanie Garber"],
  ["Once Upon a Broken Heart", "Stephanie Garber"],
  ["Powerless", "Lauren Roberts"],
  ["Divine Rivals", "Rebecca Ross"],
  ["Babel", "R.F. Kuang"],
  ["The Poppy War", "R.F. Kuang"],
  ["Mistborn", "Brandon Sanderson"],
  ["Legendborn", "Tracy Deonn"],
  ["Iron Flame", "Rebecca Yarros"],
  ["Red Queen", "Victoria Aveyard"],
  ["Shatter Me", "Tahereh Mafi"],
];
const libraryIds = { book: 0, decoration: 0 };
const LIB = [
  ["A Court of Thorns and Roses", 0],
  ["Fourth Wing", 0],
  ["The Hunger Games", 0],
  ["Six of Crows", 0],
  ["The Cruel Prince", 0],
  ["Divergent", 0],
  ["Throne of Glass", 1],
  ["Shadow and Bone", 1],
  ["Mistborn", 1],
  ["Iron Flame", 2],
  ["Red Queen", 2],
  ["Legendborn", 2],
  ["Serpent & Dove", 2],
  ["The Night Circus", 2],
  ["Shatter Me", 2],
  ["The Priory of the Orange Tree", 2],
].map(([t, shelf], i) => {
  const [h, l] = BRIGHT[(i * 7 + t.length) % BRIGHT.length];
  return {
    id: "b" + i,
    t,
    shelf,
    h,
    l,
    c: 0.15,
    T: 18 + ((t.length * 5 + i * 7) % 10),
    H: 92 + ((t.length * 11 + i * 13) % 28),
    D: 66,
    mode:
      i >= 6 && i <= 8 || i === 11 ? "cover" : i === 13 || i === 14 ? "lying" : "spine",
  };
});

const DECOS = {
  lavender: { name: "Lavender", w: 76, h: 146, hue: 300 },
  teacup: { name: "Teacup", w: 90, h: 82, hue: 80 },
  ivy: { name: "Ivy", w: 48, h: 130, hue: 145 },
  blossoms: { name: "Blossoms", w: 60, h: 65, hue: 80 },
  plant: { name: "Plant", w: 31, h: 53, hue: 145 },
  cactus: { name: "Cactus", w: 24, h: 39, hue: 140 },
  candle: { name: "Candle", w: 15, h: 40, hue: 85, glow: true },
  crystal: { name: "Crystal ball", w: 30, h: 37, hue: 290, glow: true },
  dragon: { name: "Little dragon", w: 54, h: 48, hue: 170 },
  fairy: { name: "Fairy jar", w: 25, h: 43, hue: 95, glow: true },
  potion: { name: "Potion", w: 21, h: 39, hue: 350 },
  moon: { name: "Moon lamp", w: 33, h: 43, hue: 90, glow: true },
};
Object.keys(DECOS).forEach((k) => {
  DECOS[k].src = `/images/decorations/${k}.svg`;
});
for (const key of ["lavender", "teacup", "ivy", "blossoms"]) {
  DECOS[key].src = imageAsset("/images/decorations/library-editorial/ornament-atlas.png");
}
// Permanent companions use the approved two-pose art, cropped to the first pose.
visitors.filter((guest) => guest.kind === "creature").forEach((guest) => {
  const size = ["tairn", "sgaeyl", "abraxos"].includes(guest.id) ? 62 : 46;
  DECOS["pet-" + guest.id] = {
    name: guest.name, w: size, h: size, hue: 145,
    src: imageAsset(guest.image), pet: true, series: guest.series,
  };
});

const mkDeco = (type, shelf) => {
  const d = DECOS[type];
  return {
    id: "d" + libraryIds.decoration++,
    deco: type,
    t: d.name,
    shelf,
    h: d.hue,
    l: 0.6,
    H: d.h,
    T: d.w,
    D: d.w,
    mode: "spine",
  };
};
LIB.splice(3, 0, mkDeco("plant", 0));
LIB.splice(10, 0, mkDeco("dragon", 1));
LIB.splice(11, 0, mkDeco("moon", 2));
LIB.splice(14, 0, mkDeco("candle", 2));
LIB.push(mkDeco("fairy", 2));
LIB.push(mkDeco("lavender", 0));
LIB.push(mkDeco("teacup", 1));
LIB.unshift(mkDeco("ivy", 0));
const CASES = [
  ["Oak", "oklch(0.7 0.08 70)", "oklch(0.6 0.08 62)", "oklch(0.76 0.08 72)"],
  [
    "Walnut",
    "oklch(0.48 0.07 50)",
    "oklch(0.38 0.06 45)",
    "oklch(0.54 0.07 52)",
  ],
  [
    "Cream",
    "oklch(0.93 0.02 85)",
    "oklch(0.84 0.025 80)",
    "oklch(0.96 0.015 85)",
  ],
  [
    "Sage",
    "oklch(0.7 0.06 150)",
    "oklch(0.6 0.06 150)",
    "oklch(0.75 0.06 150)",
  ],
  ["Rose", "oklch(0.78 0.07 15)", "oklch(0.68 0.08 15)", "oklch(0.82 0.06 15)"],
  [
    "Midnight",
    "oklch(0.4 0.08 270)",
    "oklch(0.32 0.07 270)",
    "oklch(0.45 0.08 270)",
  ],
].map(([name, a, b, c]) => ({
  name,
  sw: a,
  frame: `inset 0 0 0 12px ${a}, inset 0 0 0 14px ${b}, inset 0 0 50px oklch(0.4 0.05 60 / 0.3)`,
  shelf: `linear-gradient(180deg, ${c}, ${b})`,
}));
const LIGHTS = { warm: true, pastel: true };

export { shade, READ, TOREAD, BRIGHT, book, WOODS, WALLS, SHELVES, CATALOG, LIB, DECOS, mkDeco, CASES, LIGHTS, libraryIds };
