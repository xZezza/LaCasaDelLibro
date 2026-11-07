import React from "react";
// Logic for The Salon landing page (design reference).
// renderVals() returns every value used by {{ }} holes in sections/*.html.
// DCLogic ≈ React.Component without render(); React is a global.

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
let NB = 0;
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
      i === 2 || i === 11 ? "cover" : i === 7 || i === 8 ? "lying" : "spine",
  };
});
const svgUri = (s) => "data:image/svg+xml," + encodeURIComponent(s);
const DECO_SVG = {
  plant:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 96"><g fill="#5f9e6e"><ellipse cx="28" cy="30" rx="9" ry="24"/><ellipse cx="14" cy="42" rx="7" ry="18" transform="rotate(-32 14 42)"/><ellipse cx="42" cy="42" rx="7" ry="18" transform="rotate(32 42 42)"/></g><g fill="#86c48d"><ellipse cx="20" cy="28" rx="5" ry="15" transform="rotate(-16 20 28)"/><ellipse cx="37" cy="30" rx="5" ry="15" transform="rotate(18 37 30)"/></g><path d="M10 60h36l-5 34H15z" fill="#c9714f"/><rect x="8" y="56" width="40" height="8" rx="2" fill="#de8a66"/></svg>',
  cactus:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 72"><rect x="16" y="8" width="12" height="44" rx="6" fill="#6aa97a"/><path d="M16 32h-6a4 4 0 0 1-4-4V20a3 3 0 0 1 6 0v6h4z" fill="#6aa97a"/><path d="M28 26h6V16a3 3 0 0 1 6 0v12a4 4 0 0 1-4 4h-8z" fill="#6aa97a"/><circle cx="22" cy="7" r="4" fill="#f29bb0"/><path d="M8 50h28l-4 22H12z" fill="#e8c9a0"/><rect x="6" y="47" width="32" height="6" rx="2" fill="#f3dab4"/></svg>',
  candle:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 78"><ellipse cx="15" cy="12" rx="7" ry="12" fill="#ffd27a" opacity=".45"/><path d="M15 2c4 6 5 9 5 12a5 5 0 0 1-10 0c0-3 1-6 5-12z" fill="#ffb347"/><path d="M15 8c2 3 2.5 5 2.5 6.5a2.5 2.5 0 0 1-5 0c0-1.5.5-3.5 2.5-6.5z" fill="#fff3c4"/><rect x="14.3" y="18" width="1.4" height="6" fill="#4a3a30"/><rect x="5" y="24" width="20" height="46" rx="2" fill="#f6ead2"/><path d="M7 25c3 3 3 8 2 12" stroke="#e9d8b4" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="1" y="68" width="28" height="8" rx="4" fill="#c9a35a"/></svg>',
  crystal:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 72"><defs><radialGradient id="g" cx=".35" cy=".35"><stop offset="0" stop-color="#f6ecff"/><stop offset=".5" stop-color="#b48be8"/><stop offset="1" stop-color="#6a4bb0"/></radialGradient></defs><circle cx="28" cy="28" r="24" fill="url(#g)"/><circle cx="20" cy="19" r="5" fill="#fff" opacity=".6"/><path d="M34 24l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#fff"/><path d="M12 52h32l4 14H8z" fill="#c9a35a"/><rect x="6" y="64" width="44" height="7" rx="2" fill="#a8833f"/></svg>',
  dragon:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 80"><defs><linearGradient id="db" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6cc7b0"/><stop offset="1" stop-color="#3f9a87"/></linearGradient><linearGradient id="dw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a4e6"/><stop offset="1" stop-color="#8a6fcf"/></linearGradient></defs><path d="M22 66c-14 2-18-8-11-12 5-3 9 1 6 5" fill="none" stroke="#3f9a87" stroke-width="6" stroke-linecap="round"/><path d="M8 57l-4 3 5 1z" fill="#f2c46b"/><path d="M38 40C30 22 14 18 10 26c8-1 12 4 14 10-6-3-12-2-14 3 7 0 12 3 16 8z" fill="url(#dw)"/><path d="M38 40C30 22 14 18 10 26M24 36C18 33 12 34 10 39" fill="none" stroke="#6e55b5" stroke-width="1.2" stroke-linecap="round" opacity=".7"/><ellipse cx="42" cy="56" rx="20" ry="17" fill="url(#db)"/><ellipse cx="45" cy="59" rx="11" ry="12" fill="#f6e3b4"/><path d="M38 53h14M37 58h16M38 63h14M40 68h10" stroke="#e2c98d" stroke-width="1.3" stroke-linecap="round"/><path d="M27 47l2-5 3 4 2-5 3 4 2-5 3 4" fill="none" stroke="#f2c46b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="32" cy="72" rx="8" ry="5" fill="#3f9a87"/><ellipse cx="52" cy="73" rx="8" ry="5" fill="#3f9a87"/><path d="M27 75h3M31 76h3M48 76h3M52 77h3" stroke="#f6e3b4" stroke-width="1.6" stroke-linecap="round"/><path d="M55 56c5 2 7 6 5 9" fill="none" stroke="#3f9a87" stroke-width="5" stroke-linecap="round"/><circle cx="61" cy="31" r="15" fill="url(#db)"/><ellipse cx="73" cy="36" rx="10" ry="8" fill="#6cc7b0"/><ellipse cx="74" cy="38" rx="6.5" ry="4" fill="#8fd8c4"/><circle cx="76" cy="35" r="1.2" fill="#2c4f48"/><circle cx="80" cy="36" r="1" fill="#2c4f48"/><path d="M52 19l-5-11 10 6zM62 17l1-12 6 10z" fill="#f2c46b"/><path d="M48 25c-5-3-8 0-6 4 2 3 5 2 6-1" fill="#8a6fcf"/><ellipse cx="62" cy="29" rx="4.6" ry="5.4" fill="#fff"/><circle cx="63" cy="30" r="3.4" fill="#2b2540"/><circle cx="64.4" cy="28.4" r="1.3" fill="#fff"/><circle cx="61.8" cy="31.8" r=".6" fill="#fff"/><path d="M58 22.5c2-1.5 5-1.5 7 0" fill="none" stroke="#2c4f48" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="57" cy="38" rx="3.4" ry="2.2" fill="#f29bb0" opacity=".75"/><path d="M68 42c2 1.5 4 1.5 6 0" fill="none" stroke="#2c4f48" stroke-width="1.2" stroke-linecap="round"/><circle cx="85" cy="28" r="2.4" fill="#e9e4f2" opacity=".85"/><circle cx="88" cy="22" r="1.6" fill="#e9e4f2" opacity=".65"/><circle cx="87" cy="17" r="1" fill="#e9e4f2" opacity=".45"/></svg>',
  fairy:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 80"><defs><radialGradient id="fg" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".45" stop-color="#ffe58a" stop-opacity=".45"/><stop offset="1" stop-color="#ffe58a" stop-opacity="0"/></radialGradient></defs><path d="M17 10h16v5c8 3 13 10 13 19v34a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V34c0-9 5-16 13-19z" fill="#eaf6f4" fill-opacity=".55" stroke="#a9cfc9" stroke-width="1.4"/><circle cx="25" cy="48" r="20" fill="url(#fg)"/><path d="M23 46c-6-9-15-8-14-2 1 5 9 5 14 2z" fill="#cdeeff" fill-opacity=".9" stroke="#9fd2ea" stroke-width=".8"/><path d="M27 46c6-9 15-8 14-2-1 5-9 5-14 2z" fill="#cdeeff" fill-opacity=".9" stroke="#9fd2ea" stroke-width=".8"/><path d="M23 49c-4 4-9 5-10 2 0-3 6-4 10-2zM27 49c4 4 9 5 10 2 0-3-6-4-10-2z" fill="#e6d8ff" fill-opacity=".85"/><circle cx="25" cy="41" r="3.6" fill="#f7d9c2"/><path d="M21.6 40.4c0-3 1.8-4.6 3.4-4.6s3.6 1.6 3.4 4.6c-1-1.4-2.2-2-3.4-2s-2.4.6-3.4 2z" fill="#e8a76a"/><path d="M22.6 45h4.8l2.2 10h-9.2z" fill="#f29bb0"/><path d="M24 55l-1 5M26 55l1 5" stroke="#f7d9c2" stroke-width="1.2" stroke-linecap="round"/><path d="M29 45l5-6" stroke="#c9a35a" stroke-width="1" stroke-linecap="round"/><path d="M34 37.5l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" fill="#fff3a8"/><circle cx="12" cy="62" r="1.2" fill="#fff6c4"/><circle cx="38" cy="30" r="1" fill="#fff6c4"/><circle cx="37" cy="64" r="1.3" fill="#fff6c4"/><circle cx="14" cy="30" r=".9" fill="#fff6c4"/><path d="M10 26c4-2 8-2 10 0" stroke="#fff" stroke-opacity=".7" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M8 38v22" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/><rect x="15" y="4" width="20" height="8" rx="2" fill="#b07a4a"/><path d="M15 7h20" stroke="#8a5a33" stroke-width="1"/><path d="M33 8c4 0 6 3 4 6" fill="none" stroke="#c9a35a" stroke-width="1" stroke-linecap="round"/></svg>',
  potion:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 74"><rect x="15" y="2" width="10" height="8" rx="2" fill="#a0704c"/><rect x="16" y="10" width="8" height="16" fill="#e8f1f4" opacity=".75"/><circle cx="20" cy="50" r="18" fill="#e8f1f4" opacity=".65"/><path d="M3 52a17 17 0 0 0 34 0z" fill="#ef7fa6"/><circle cx="14" cy="58" r="2" fill="#ffd1e0"/><circle cx="25" cy="62" r="1.4" fill="#ffd1e0"/><circle cx="13" cy="44" r="3" fill="#fff" opacity=".75"/></svg>',
  moon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 76"><circle cx="30" cy="30" r="28" fill="#fff4cc" opacity=".35"/><circle cx="30" cy="30" r="22" fill="#fbecc0"/><circle cx="22" cy="24" r="4" fill="#efd9a0"/><circle cx="36" cy="37" r="5" fill="#efd9a0"/><circle cx="37" cy="20" r="2.5" fill="#efd9a0"/><rect x="28" y="52" width="4" height="10" fill="#8a5a33"/><rect x="12" y="62" width="36" height="12" rx="3" fill="#b07a4a"/></svg>',
};
const DECOS = {
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
  DECOS[k].src = svgUri(DECO_SVG[k]);
});
let DN = 0;
const mkDeco = (type, shelf) => {
  const d = DECOS[type];
  return {
    id: "d" + DN++,
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
const LIGHTS = {
  warm: ["oklch(0.93 0.12 85)"],
  pastel: [
    "oklch(0.86 0.1 0)",
    "oklch(0.88 0.1 160)",
    "oklch(0.85 0.1 300)",
    "oklch(0.93 0.11 95)",
    "oklch(0.86 0.09 230)",
  ],
};
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
  const M = {
    ring: {
      mw: 54,
      mh: 54,
      mr: "50%",
      mb: `1.5px solid ${accent}`,
      ms: `0 0 0 6px transparent, inset 0 0 0 8px transparent, 0 0 0 7px ${bg}, 0 0 0 8px ${accent}`,
      mt: "none",
    },
    arch: {
      mw: 46,
      mh: 62,
      mr: "999px 999px 0 0",
      mb: `1.5px solid ${accent}`,
      ms: "none",
      mt: "none",
    },
    diamond: {
      mw: 34,
      mh: 34,
      mr: "2px",
      mb: `1.5px solid ${accent}`,
      ms: `inset 0 0 0 6px ${bg}, inset 0 0 0 20px ${accent}`,
      mt: "rotate(45deg)",
    },
    moon: {
      mw: 50,
      mh: 50,
      mr: "50%",
      mb: "0",
      ms: `inset -12px 6px 0 0 ${accent}`,
      mt: "rotate(-20deg)",
    },
  }[m];
  return { t, a, g, bg, ink, accent, blurb: BLURBS[t] || "", ...M };
});
function serializeLibrary({ lib, wall, caseC, lights, angle }) {
  return JSON.stringify({ version: 1, lib, wall, caseC, lights, angle });
}

export default class LandingLogic extends React.Component {
  trackRef = React.createRef();
  woodRef = React.createRef();
  quoteRef = React.createRef();
  quote2Ref = React.createRef();
  quote3Ref = React.createRef();
  quote4Ref = React.createRef();
  quote5Ref = React.createRef();
  quote6Ref = React.createRef();
  jGridRef = React.createRef();
  linksRef = React.createRef();
  pvBoxRef = React.createRef();
  measureThread() {
    const g = this.jGridRef.current,
      row = this.linksRef.current,
      box = this.pvBoxRef.current;
    if (!g || !row || !box) return;
    const link =
      row.querySelectorAll("button")[this.state.pv === "saga" ? 1 : 0];
    if (!link) return;
    const gr = g.getBoundingClientRect(),
      lr = link.getBoundingClientRect(),
      br = box.getBoundingClientRect();
    const s = [lr.right - gr.left + 8, lr.top + lr.height / 2 - gr.top];
    let e = [
        br.left - gr.left - 6,
        br.top - gr.top + Math.min(70, br.height * 0.3),
      ],
      side = true;
    if (e[0] < s[0] + 40) {
      e = [
        br.left - gr.left + Math.min(80, br.width * 0.25),
        br.top - gr.top - 8,
      ];
      side = false;
    }
    const key = [...s, ...e].map(Math.round).join(",") + side;
    if (key !== this._threadKey) {
      this._threadKey = key;
      this.setState({ thread: { s, e, side } });
    }
  }
  componentDidUpdate() {
    cancelAnimationFrame(this._mt);
    this._mt = requestAnimationFrame(() => this.measureThread());
  }
  nudgeMarquee(ref, dur, px) {
    const el = ref.current,
      a = el && el.getAnimations && el.getAnimations()[0];
    if (!a) return;
    const delta = (px / (el.scrollWidth / 2)) * dur,
      from = a.currentTime || 0,
      t0 = performance.now(),
      hov = ref === this.woodRef ? () => this._woodHover : () => this._hover;
    a.pause();
    cancelAnimationFrame(ref._n);
    const step = (now) => {
      const k = Math.min((now - t0) / 450, 1),
        e = 1 - Math.pow(1 - k, 3);
      a.currentTime = (((from + delta * e) % dur) + dur) % dur;
      if (k < 1) ref._n = requestAnimationFrame(step);
      else if (!hov()) a.play();
    };
    ref._n = requestAnimationFrame(step);
  }
  scrubCovers(px) {
    const a = this.anim(),
      el = this.trackRef.current;
    if (!a || !el) return;
    const dur = 70000,
      half = el.scrollWidth / 4;
    a.pause();
    a.currentTime =
      ((((a.currentTime || 0) + (px / half) * dur) % dur) + dur) % dur;
    clearTimeout(this._scrubT);
    this._scrubT = setTimeout(() => {
      if (!this._hover && !this._drag2) a.play();
    }, 1200);
  }
  anim() {
    const el = this.trackRef.current;
    return el && el.getAnimations ? el.getAnimations()[0] : null;
  }
  setPaused(p) {
    this._hover = p;
    const a = this.anim();
    if (a && !this._nudging) p ? a.pause() : a.play();
  }
  scrollCovers(d) {
    const a = this.anim(),
      el = this.trackRef.current;
    if (!el) return;
    if (!a) {
      el.parentElement.scrollBy({ left: d * 260, behavior: "auto" });
      return;
    }
    const dur = 70000,
      half = el.scrollWidth / 4,
      delta = ((d * 260) / half) * dur;
    const from = a.currentTime || 0,
      t0 = performance.now();
    this._nudging = true;
    a.pause();
    cancelAnimationFrame(this._nudge);
    const step = (now) => {
      const k = Math.min((now - t0) / 500, 1),
        e = 1 - Math.pow(1 - k, 3);
      a.currentTime = (((from + delta * e) % dur) + dur) % dur;
      if (k < 1) this._nudge = requestAnimationFrame(step);
      else {
        this._nudging = false;
        if (!this._hover) a.play();
      }
    };
    this._nudge = requestAnimationFrame(step);
  }
  state = {
    savedLayoutSignature: serializeLibrary({
      lib: LIB,
      wall: 0,
      caseC: 0,
      lights: "warm",
      angle: -10,
    }),
    tab: this.props.initialShelf === "To read" ? "toread" : "read",
    wood: 1,
    shared: { quotes0: true },
    jTab: "thoughts",
    moods: ["Cried", "Couldn’t sleep"],
    bookC: 0,
    rate: { romance: 4, flow: 5, mystery: 3, total: 4 },
    rateC: { romance: 0, flow: 3, mystery: 2, total: 4 },
    jShare: { best: true },
    pv: "book",
    libOpen: false,
    q: "",
    qOpen: false,
    toast: "",
    expanded: {},
    sheet: null,
    statuses: {},
    lib: LIB,
    wall: 0,
    caseC: 0,
    lights: "warm",
    sel: null,
    angle: -10,
  };
  componentDidMount() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("the-salon-library-layout-v1") || "null",
      );
      if (
        saved?.version === 1 &&
        Array.isArray(saved.lib) &&
        saved.lib.length <= 400
      ) {
        const ids = new Set();
        const valid = saved.lib.every((b) => {
          if (
            !b ||
            typeof b.id !== "string" ||
            ids.has(b.id) ||
            typeof b.t !== "string" ||
            b.t.length > 240 ||
            ![0, 1, 2].includes(b.shelf)
          )
            return false;
          ids.add(b.id);
          if (b.deco) return Object.hasOwn(DECOS, b.deco);
          return (
            ["spine", "cover", "lying"].includes(b.mode) &&
            ["h", "l", "c", "T", "H", "D"].every((k) =>
              Number.isFinite(b[k]),
            ) &&
            b.h >= 0 &&
            b.h <= 360 &&
            b.l > 0 &&
            b.l <= 1 &&
            b.c >= 0 &&
            b.c <= 0.5 &&
            b.T >= 1 &&
            b.T <= 100 &&
            b.H >= 1 &&
            b.H <= 200 &&
            b.D >= 1 &&
            b.D <= 200
          );
        });
        if (
          valid &&
          Number.isInteger(saved.wall) &&
          WALLS[saved.wall] &&
          Number.isInteger(saved.caseC) &&
          CASES[saved.caseC] &&
          Object.hasOwn(LIGHTS, saved.lights) &&
          Number.isFinite(saved.angle) &&
          Math.abs(saved.angle) <= 40
        ) {
          const nextId = (prefix) =>
            Math.max(
              0,
              ...saved.lib
                .filter((b) => b.id.startsWith(prefix))
                .map((b) => Number(b.id.slice(1)))
                .filter(Number.isFinite),
            ) + 1;
          NB = Math.max(NB, nextId("n"));
          DN = Math.max(DN, nextId("d"));
          this.setState({
            savedLayoutSignature: serializeLibrary(saved),
            lib: saved.lib,
            wall: saved.wall,
            caseC: saved.caseC,
            lights: saved.lights,
            angle: saved.angle,
          });
        }
      }
    } catch {
      /* A disabled store or older snapshot leaves the demo usable. */
    }

    if (window.IntersectionObserver && this.quote6Ref.current) {
      this._qio6 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote6In) this.setState({ quote6In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote6In)
            this.setState({ quote6In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio6.observe(this.quote6Ref.current);
    } else this.setState({ quote6In: true });
    if (window.IntersectionObserver && this.quote5Ref.current) {
      this._qio5 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote5In) this.setState({ quote5In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote5In)
            this.setState({ quote5In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio5.observe(this.quote5Ref.current);
    } else this.setState({ quote5In: true });
    if (window.IntersectionObserver && this.quote4Ref.current) {
      this._qio4 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote4In) this.setState({ quote4In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote4In)
            this.setState({ quote4In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio4.observe(this.quote4Ref.current);
    } else this.setState({ quote4In: true });
    if (window.IntersectionObserver && this.quote3Ref.current) {
      this._qio3 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.intersectionRatio >= 0.6) {
            if (!this.state.quote3In) this.setState({ quote3In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote3In)
            this.setState({ quote3In: false });
        },
        { threshold: [0, 0.6], rootMargin: "0px 0px -22% 0px" },
      );
      this._qio3.observe(this.quote3Ref.current);
    } else this.setState({ quote3In: true });
    if (window.IntersectionObserver && this.quote2Ref.current) {
      this._qio2 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.intersectionRatio >= 0.6) {
            if (!this.state.quote2In) this.setState({ quote2In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote2In)
            this.setState({ quote2In: false });
        },
        { threshold: [0, 0.6], rootMargin: "0px 0px -28% 0px" },
      );
      this._qio2.observe(this.quote2Ref.current);
    } else this.setState({ quote2In: true });
    if (window.IntersectionObserver && this.quoteRef.current) {
      this._qio = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.setState({ openingQuoteRevealed: true });
            this._qio.disconnect();
          }
        },
        { threshold: 0.01 },
      );
      this._qio.observe(this.quoteRef.current);
    }
    this._onResize = () => this.measureThread();
    window.addEventListener("resize", this._onResize);
    if (window.ResizeObserver && this.jGridRef.current) {
      this._ro = new ResizeObserver(this._onResize);
      this._ro.observe(this.jGridRef.current);
    }
    setTimeout(this._onResize, 400);
    if (document.fonts) document.fonts.ready.then(this._onResize);
    this._key = (e) => {
      if (e.key === "Escape" && this.state.soon) {
        this.setState({ soon: null });
        return;
      }
      if (e.key === "Escape" && this.state.sheet != null) {
        this.setState({ sheet: null });
        return;
      }
      if (e.key === "Escape" && this.state.libOpen)
        this.setState((s) => (s.sel ? { sel: null } : { libOpen: false }));
    };
    window.addEventListener("keydown", this._key);
  }
  componentWillUnmount() {
    clearTimeout(this._saveConfirmationTimer);
    clearTimeout(this._toastT);
    clearTimeout(this._scrubT);
    cancelAnimationFrame(this._mt);
    cancelAnimationFrame(this.woodRef._n);
    cancelAnimationFrame(this.trackRef._n);
    this._qio6 && this._qio6.disconnect();
    this._qio5 && this._qio5.disconnect();
    this._qio4 && this._qio4.disconnect();
    this._qio3 && this._qio3.disconnect();
    this._qio2 && this._qio2.disconnect();
    this._qio && this._qio.disconnect();
    window.removeEventListener("resize", this._onResize);
    this._ro && this._ro.disconnect();
    cancelAnimationFrame(this._nudge);
    window.removeEventListener("keydown", this._key);
  }
  saveLibrary = () => {
    try {
      const snapshot = serializeLibrary(this.state);
      localStorage.setItem("the-salon-library-layout-v1", snapshot);
      this.setState({
        savedLayoutSignature: snapshot,
        saveMessage: "Changes saved in this browser.",
        saveError: false,
      });
      clearTimeout(this._saveConfirmationTimer);
      this._saveConfirmationTimer = setTimeout(
        () => this.setState({ saveMessage: "" }),
        3000,
      );
    } catch {
      this.setState({
        saveMessage:
          "Couldn’t save here. Please allow browser storage and try again.",
        saveError: true,
      });
    }
  };
  setLib(fn) {
    this.setState((s) => ({ lib: fn(s.lib.map((b) => ({ ...b }))) }));
  }
  addDeco(type, shelf, beforeId) {
    if (shelf == null) {
      const cnt = [0, 1, 2].map(
        (s) => this.state.lib.filter((b) => b.shelf === s).length,
      );
      shelf = cnt.indexOf(Math.min(...cnt));
    }
    const nb = mkDeco(type, shelf);
    this.setState((s) => {
      const lib = s.lib.map((b) => ({ ...b }));
      const j = beforeId ? lib.findIndex((x) => x.id === beforeId) : -1;
      if (j < 0) {
        let last = -1;
        lib.forEach((x, k) => {
          if (x.shelf === shelf) last = k;
        });
        lib.splice(last + 1, 0, nb);
      } else lib.splice(j, 0, nb);
      return { lib, sel: nb.id };
    });
  }
  move(id, shelf, beforeId) {
    if (this._newType) {
      const t = this._newType;
      this._newType = null;
      return this.addDeco(t, shelf, beforeId);
    }
    if (!id || id === beforeId) return;
    this.setLib((lib) => {
      const i = lib.findIndex((b) => b.id === id);
      if (i < 0) return lib;
      const [b] = lib.splice(i, 1);
      b.shelf = shelf;
      const j = beforeId ? lib.findIndex((x) => x.id === beforeId) : -1;
      if (j < 0) {
        let last = -1;
        lib.forEach((x, k) => {
          if (x.shelf === shelf) last = k;
        });
        lib.splice(last + 1, 0, b);
      } else lib.splice(j, 0, b);
      return lib;
    });
  }
  nudge(dir) {
    const id = this.state.sel;
    this.setLib((lib) => {
      const i = lib.findIndex((b) => b.id === id);
      if (i < 0) return lib;
      const sh = lib[i].shelf;
      let j = i + dir;
      while (j >= 0 && j < lib.length && lib[j].shelf !== sh) j += dir;
      if (j >= 0 && j < lib.length) [lib[i], lib[j]] = [lib[j], lib[i]];
      return lib;
    });
  }
  shelfJump(dir) {
    const b = this.state.lib.find((x) => x.id === this.state.sel);
    if (!b) return;
    const s = b.shelf + dir;
    if (s < 0 || s > 2) return;
    this.move(b.id, s, null);
  }
  sortBy(fn) {
    this.setLib((lib) =>
      [0, 1, 2].flatMap((s) => lib.filter((b) => b.shelf === s).sort(fn)),
    );
  }
  bookVals(b) {
    if (b.deco) {
      const d = DECOS[b.deco],
        sel = this.state.sel === b.id;
      return {
        ...b,
        isBook: false,
        isDeco: true,
        fw: d.w,
        fh: d.h,
        bgImg: `url("${d.src}")`,
        lift: sel ? "translateY(-8px)" : "none",
        glow:
          (d.glow
            ? "drop-shadow(0 0 10px oklch(0.92 0.12 85 / 0.85))"
            : "drop-shadow(0 6px 5px oklch(0.3 0.04 50 / 0.3))") +
          (sel
            ? " drop-shadow(0 0 2px oklch(0.55 0.09 300)) drop-shadow(0 0 2px oklch(0.55 0.09 300))"
            : ""),
        dragStart: (e) => {
          this._newType = null;
          this._drag = b.id;
          try {
            e.dataTransfer.setData("text/plain", b.id);
            e.dataTransfer.effectAllowed = "move";
          } catch (_) {}
        },
        over: (e) => e.preventDefault(),
        drop: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.move(this._drag, b.shelf, b.id);
          this._drag = null;
        },
        select: (e) => {
          e.stopPropagation();
          this.setState((s) => ({ sel: s.sel === b.id ? null : b.id }));
        },
      };
    }
    const { T, H, D, mode } = b,
      a = this.state.angle,
      sel = this.state.sel === b.id;
    const fw = mode === "spine" ? T : mode === "cover" ? D : H;
    const fh = mode === "lying" ? T : H;
    const rot = mode === "cover" ? a - 90 : a;
    const boxTf = `rotateX(-7deg) rotateY(${rot}deg)${mode === "lying" ? " rotateZ(90deg)" : ""}`;
    const drag = (e) => {
      this._newType = null;
      this._drag = b.id;
      try {
        e.dataTransfer.setData("text/plain", b.id);
        e.dataTransfer.effectAllowed = "move";
      } catch (_) {}
    };
    return {
      ...b,
      isBook: true,
      isDeco: false,
      fw,
      fh,
      ml: -T / 2,
      mt: -H / 2,
      boxTf,
      sideL: (T - D) / 2,
      topT: (H - D) / 2,
      spineTf: `translateZ(${D / 2}px)`,
      pagesTf: `rotateY(180deg) translateZ(${D / 2}px)`,
      coverTf: `rotateY(90deg) translateZ(${T / 2}px)`,
      backTf: `rotateY(-90deg) translateZ(${T / 2}px)`,
      topTf: `rotateX(90deg) translateZ(${H / 2}px)`,
      spineBg: shade(b.h, b.l, b.c),
      coverBg: `linear-gradient(90deg, rgba(0,0,0,.25), transparent 12%), oklch(${b.l} ${b.c} ${b.h})`,
      backBg: `oklch(${b.l - 0.06} ${b.c} ${b.h})`,
      edge: `oklch(${b.l} ${b.c} ${b.h})`,
      lift: sel ? "translateY(-10px)" : "none",
      ring: sel ? "0 14px 0 -11px oklch(0.82 0.11 78)" : "none",
      dragStart: drag,
      over: (e) => e.preventDefault(),
      drop: (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.move(this._drag, b.shelf, b.id);
        this._drag = null;
      },
      select: (e) => {
        e.stopPropagation();
        this.setState((s) => ({ sel: s.sel === b.id ? null : b.id }));
      },
    };
  }
  renderVals() {
    const gold = "oklch(0.82 0.11 78)",
      ink = "oklch(0.25 0.035 305)",
      paper = "oklch(0.955 0.018 82)",
      muted = "oklch(0.42 0.03 305)";
    const tilt = (this.props.shelfStyle ?? "3D") === "3D";
    const all = [...READ, ...TOREAD];
    const heroBooks = all.map((t, i) =>
      book(t, i, tilt && i === all.length - 1),
    );
    const list = this.state.tab === "read" ? READ : TOREAD;
    const shelfBooks = list
      .slice(0, 7)
      .map((t, i) =>
        book(t, i + 2, tilt && i === Math.min(list.length, 7) - 1),
      );
    const JT = this.state.jTab;
    const JTABS = [
      ["thoughts", "Thoughts", "oklch(0.88 0.06 85)"],
      ["characters", "Characters", "oklch(0.86 0.06 15)"],
      ["quotes", "Quotes", "oklch(0.86 0.05 230)"],
      ["mood", "Mood", "oklch(0.87 0.06 150)"],
      ["rating", "Rating", "oklch(0.85 0.05 300)"],
    ];
    const PAGES = {
      thoughts: [
        {
          label: "First impressions",
          text: "Slow start, then I couldn’t put it down after chapter nine.",
        },
        {
          label: "How it felt",
          text: "Read the last hundred pages in one night. Still thinking about the bridge scene.",
        },
        {
          label: "Theories",
          text: "Pretty sure the ferryman knows more than he says.",
        },
      ],
      characters: [
        {
          label: "Favourite character",
          text: "Maren, who never once asked to be the chosen one.",
        },
        {
          label: "Couldn’t stand",
          text: "Lord Aske. Every scene with him made me want to throw the book.",
        },
        { label: "Ship", text: "Maren & Corin. Slow burn, worth every page." },
      ],
      quotes: [
        { label: "Page 112", text: "“Even ash remembers it was once a fire.”" },
        {
          label: "Page 340",
          text: "“You don’t get to choose the war. Only who stands next to you.”",
        },
      ],
      mood: [{ label: "In one word", text: "Heartbroken, in the good way." }],
      rating: [
        {
          label: "Verdict",
          text: "Four stars. The ending deserved one more chapter.",
        },
      ],
    };
    const shared = this.state.shared;
    const entries = PAGES[JT].map((e, i) => {
      const key = JT + i,
        on = !!shared[key];
      return {
        ...e,
        state: on ? "Shared" : "Private",
        bg: on ? ink : "transparent",
        fg: on ? "oklch(0.94 0.02 82)" : "oklch(0.35 0.03 305)",
        border: on ? ink : "oklch(0.25 0.035 305 / 0.3)",
        toggle: () =>
          this.setState((s) => ({
            shared: { ...s.shared, [key]: !s.shared[key] },
          })),
      };
    });
    const BC = [
      ["Coral", "oklch(0.66 0.15 30)"],
      ["Cherry", "oklch(0.48 0.15 20)"],
      ["Rose", "oklch(0.74 0.11 5)"],
      ["Lavender", "oklch(0.62 0.12 300)"],
      ["Midnight", "oklch(0.38 0.1 265)"],
      ["Teal", "oklch(0.52 0.09 195)"],
      ["Sage", "oklch(0.62 0.07 145)"],
      ["Gold", "oklch(0.72 0.13 80)"],
    ];
    const bookColor = BC[this.state.bookC][1];
    const bookColors = BC.map(([name, v], i) => ({
      name,
      v,
      ring: i === this.state.bookC ? ink : "transparent",
      pick: () => this.setState({ bookC: i }),
    }));
    const RC = [
      "oklch(0.6 0.19 18)",
      "oklch(0.74 0.13 355)",
      "oklch(0.6 0.15 300)",
      "oklch(0.55 0.1 200)",
      "oklch(0.75 0.14 75)",
    ];
    const RDEF = [
      [
        "romance",
        "Romance",
        "M12 20.5s-7.6-4.6-9.5-9.3C1.1 7.8 3.2 4.2 6.7 4.2c2.1 0 3.6 1.2 5.3 3.2 1.7-2 3.2-3.2 5.3-3.2 3.5 0 5.6 3.6 4.2 7C19.6 15.9 12 20.5 12 20.5z",
        1.6,
        true,
        "heart",
      ],
      [
        "flow",
        "Page-turner",
        "M2.5 5.5c3.2-1.1 6.3-.8 9.5 1.3 3.2-2.1 6.3-2.4 9.5-1.3v13c-3.2-1.1-6.3-.8-9.5 1.3-3.2-2.1-6.3-2.4-9.5-1.3zM12 6.8v13",
        1.6,
        true,
        "book",
      ],
      [
        "mystery",
        "Mystery",
        "M8.2 8.6a3.8 3.8 0 1 1 5.6 3.3c-1.2.7-1.8 1.4-1.8 2.8v.6M12 19.2v.3",
        2.6,
        false,
        "question mark",
      ],
      [
        "total",
        "Total score",
        "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z",
        1.6,
        true,
        "star",
      ],
    ];
    const ratings = RDEF.map(([k, name, path, sw, filled, noun]) => {
      const v = this.state.rate[k],
        col = RC[this.state.rateC[k]];
      return {
        name,
        path,
        sw,
        weight: k === "total" ? 500 : 400,
        icons: [1, 2, 3, 4, 5].map((n) => ({
          label: name + " " + n,
          fill: filled ? (n <= v ? col : "transparent") : "none",
          stroke: n <= v ? col : "oklch(0.25 0.035 305 / 0.3)",
          set: () =>
            this.setState((s) => ({
              rate: { ...s.rate, [k]: s.rate[k] === n ? n - 1 : n },
            })),
        })),
        colors: RC.map((c, i) => ({
          v: c,
          ring: i === this.state.rateC[k] ? ink : "transparent",
          pick: () => this.setState((s) => ({ rateC: { ...s.rateC, [k]: i } })),
        })),
      };
    });
    const chars = [
      {
        label: "Favourite",
        name: "Maren",
        note: "never asked to be chosen",
        bg: "oklch(0.9 0.05 150 / 0.7)",
      },
      {
        label: "Can’t stand",
        name: "Lord Aske",
        note: "wanted to throw the book",
        bg: "oklch(0.88 0.06 20 / 0.7)",
      },
      {
        label: "Pointless",
        name: "Brother Ivo",
        note: "what was he even for?",
        bg: "oklch(0.88 0.04 260 / 0.7)",
      },
    ];
    const shK = ["best", "review"];
    const sh = Object.fromEntries(
      shK.map((k) => {
        const on = !!this.state.jShare[k];
        return [
          k,
          {
            state: on ? "Shared" : "Private",
            bg: on ? ink : "transparent",
            fg: on ? "oklch(0.94 0.02 82)" : "oklch(0.35 0.03 305)",
            border: on ? ink : "oklch(0.25 0.035 305 / 0.3)",
            toggle: () =>
              this.setState((s) => ({
                jShare: { ...s.jShare, [k]: !s.jShare[k] },
              })),
          },
        ];
      }),
    );
    const nSh = shK.filter((k) => this.state.jShare[k]).length;
    const jSummary =
      nSh === 0
        ? "Everything on this page is private."
        : nSh === 1
          ? "One thought is visible on your profile. The rest stays yours."
          : "Both thoughts are visible on your profile. The rest stays yours.";
    const saga = this.state.pv === "saga";
    const pvLinks = [
      ["book", "Go to the book page"],
      ["saga", "Go to the saga"],
    ].map(([k, name]) => ({
      name,
      pick: () => this.setState({ pv: k }),
      fg: this.state.pv === k ? "oklch(0.55 0.09 300)" : "oklch(0.42 0.03 305)",
      line:
        this.state.pv === k
          ? "oklch(0.55 0.09 300)"
          : "oklch(0.25 0.035 305 / 0.25)",
    }));
    const pv = saga
      ? {
          pvKind: "Saga",
          pvTitle: "The Ashborn Saga",
          pvMeta: "M. Hale · 3 books",
          pvAbout:
            "Every book in reading order, the readers following the series, and where you are in it.",
          pvCovers: [
            { w: 30, h: 46, bg: bookColor },
            { w: 30, h: 50, bg: "oklch(0.5 0.1 200)" },
            { w: 30, h: 54, bg: "oklch(0.45 0.1 300)" },
          ],
          pvChars: ["Maren", "Corin", "Lord Aske", "The Ferryman"],
          pvThread: "Rereading the whole saga before book three?",
        }
      : {
          pvKind: "Book",
          pvTitle: "The Ember Crown",
          pvMeta: "M. Hale · 512 pages · Book 1 of The Ashborn Saga",
          pvAbout:
            "Everything about the book in one place, plus what other readers chose to share.",
          pvCovers: [{ w: 40, h: 60, bg: bookColor }],
          pvChars: ["Maren", "Corin", "Lord Aske"],
          pvThread: "Was the bridge scene a betrayal or a rescue?",
        };
    let thread = null;
    const th = this.state.thread;
    if (th && th.side) {
      const [sx, sy] = th.s,
        [ex, ey] = th.e,
        dx = ex - sx;
      const c1 = th.side ? [sx + dx * 0.55, sy + 30] : [sx + 90, sy + 40],
        c2 = th.side ? [ex - dx * 0.5, ey] : [ex, ey - 90];
      const d = `M${sx} ${sy} C${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${ex} ${ey}`;
      const mx = (sx + 3 * c1[0] + 3 * c2[0] + ex) / 8,
        my = (sy + 3 * c1[1] + 3 * c2[1] + ey) / 8;
      const G = "oklch(0.6 0.12 65)",
        C = React.createElement;
      thread = C(
        "svg",
        {
          key: "thread",
          "aria-hidden": true,
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 6,
          },
        },
        C("path", {
          d,
          fill: "none",
          stroke: G,
          strokeOpacity: 0.18,
          strokeWidth: 7,
          strokeLinecap: "round",
        }),
        C("path", {
          d,
          fill: "none",
          stroke: G,
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeDasharray: "1 8",
          style: { animation: "threadflow 1.4s linear infinite" },
        }),
        C("circle", { cx: sx, cy: sy, r: 4, fill: G }),
        C("circle", {
          cx: ex,
          cy: ey,
          r: 6,
          fill: "none",
          stroke: G,
          strokeWidth: 1.6,
        }),
        C("circle", { cx: ex, cy: ey, r: 2.5, fill: G }),
        C(
          "circle",
          {
            key: d,
            r: 3.5,
            fill: "oklch(0.75 0.13 75)",
            style: { filter: "drop-shadow(0 0 5px oklch(0.8 0.12 80))" },
          },
          C("animateMotion", {
            dur: "2.4s",
            repeatCount: "indefinite",
            path: d,
          }),
        ),
        C(
          "text",
          {
            x: mx + 10,
            y: my - 10,
            fill: "oklch(0.55 0.09 300)",
            style: { font: "300 15px 'Kalam', cursive" },
            transform: `rotate(-8 ${mx} ${my})`,
          },
          "opens this",
        ),
      );
    }
    // The opening quote is readable in the initial HTML, without a scroll trigger.
    const qIn = true;
    const qWords =
      "“One must always be careful of books… and what is inside them, for words have the power to change us.”"
        .split(" ")
        .map((t, k) => ({
          t,
          op: qIn ? 1 : 0,
          blur: qIn ? "blur(0)" : "blur(8px)",
          tf: qIn ? "none" : "translateY(14px)",
          d: (qIn ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
        }));
    const q2In = !!this.state.quote2In;
    const q2Words = "“Don’t let the hard days win.”".split(" ").map((t, k) => ({
      t,
      op: q2In ? 1 : 0,
      blur: q2In ? "blur(0)" : "blur(12px)",
      tf: q2In ? "none" : "translateY(26px) rotate(-3deg)",
      d: (q2In ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
    }));
    const q3In = !!this.state.quote3In;
    const q3Words =
      "Keep the memory of every story. Find your own words again, months or years later. Share the feelings with people who understand."
        .split(" ")
        .map((t, k) => ({
          t,
          basis: t === "Find" || t === "Share" ? "100%" : "0px",
          op: q3In ? 1 : 0,
          blur: q3In ? "blur(0)" : "blur(10px)",
          tf: q3In ? "none" : "translateY(20px)",
          d: (q3In ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
        }));
    const q4In = !!this.state.quote4In;
    const q4Words =
      "“To the stars who listen — and the dreams that are answered.”"
        .split(" ")
        .map((t, k) => ({
          t,
          op: q4In ? 1 : 0,
          blur: q4In ? "blur(0)" : "blur(12px)",
          tf: q4In ? "none" : "translateY(24px)",
          d: (q4In ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
        }));
    const C = React.createElement;
    const q4Sky = C(
      "div",
      {
        key: "sky",
        "aria-hidden": true,
        style: { position: "absolute", inset: 0, pointerEvents: "none" },
      },
      ...Array.from({ length: 46 }, (_, k) => {
        const s = 1 + ((k * 7) % 3),
          big = k % 9 === 0;
        return C("span", {
          key: k,
          style: {
            position: "absolute",
            left: ((k * 37 + 11) % 100) + "%",
            top: ((k * 53 + 7) % 100) + "%",
            width: big ? 3 : s,
            height: big ? 3 : s,
            borderRadius: "50%",
            background:
              k % 5 === 0 ? "oklch(0.9 0.08 85)" : "oklch(0.97 0.02 270)",
            boxShadow: big
              ? "0 0 8px 2px oklch(0.9 0.08 85 / 0.8)"
              : "0 0 4px oklch(0.97 0.02 270 / 0.7)",
            opacity: q4In ? 1 : 0,
            transition: `opacity 1.2s ease ${(k % 12) * 0.06}s`,
            animation: `twinkle ${1.8 + (k % 6) * 0.5}s ease-in-out ${-(k * 0.41)}s infinite`,
          },
        });
      }),
      ...[0, 1].map((k) =>
        C("span", {
          key: "s" + k,
          style: {
            position: "absolute",
            right: k ? "8%" : "28%",
            top: k ? "6%" : "-4%",
            width: 110,
            height: 1.5,
            borderRadius: 2,
            background:
              "linear-gradient(90deg, oklch(0.97 0.03 85), transparent)",
            boxShadow: "0 0 6px oklch(0.95 0.05 85)",
            opacity: 0,
            animation: q4In
              ? `shoot ${k ? 9 : 7}s cubic-bezier(.3,.6,.4,1) ${k ? 4.5 : 1.2}s infinite`
              : "none",
          },
        }),
      ),
    );
    const q5In = !!this.state.quote5In;
    const q5Words =
      "“You could rattle the stars. You could do anything, if only you dared.”"
        .split(" ")
        .map((t, k) => ({
          t,
          op: q5In ? 1 : 0,
          blur: q5In ? "blur(0)" : "blur(12px)",
          tf: q5In ? "none" : "translateY(24px)",
          d: (q5In ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
        }));
    const q6In = !!this.state.quote6In;
    const q6Words = "“I solemnly swear that I am up to no good.”"
      .split(" ")
      .map((t, k) => ({
        t,
        op: q6In ? 1 : 0,
        blur: q6In ? "blur(0)" : "blur(12px)",
        tf: q6In ? "none" : "translateY(24px)",
        d: (q6In ? 0.1 + k * 0.045 : 0).toFixed(2) + "s",
      }));
    const quoteVals = {
      openingQuoteRevealed: !!this.state.openingQuoteRevealed,
      quote6Ref: this.quote6Ref,
      q6Words,
      q6Cap: q6In ? 1 : 0,
      quote5Ref: this.quote5Ref,
      q5Words,
      q5Cap: q5In ? 1 : 0,
      q4Sky,
      quote4Ref: this.quote4Ref,
      q4Words,
      q4Line: q4In ? "scaleX(1)" : "scaleX(0)",
      q4Cap: q4In ? 1 : 0,
      quote3Ref: this.quote3Ref,
      q3Words,
      quote2Ref: this.quote2Ref,
      q2Words,
      q2Line: q2In ? "scaleX(1)" : "scaleX(0)",
      q2Cap: q2In ? 1 : 0,
      quoteRef: this.quoteRef,
      qWords,
      qLine: qIn ? "scaleX(1)" : "scaleX(0)",
      qCap: qIn ? 1 : 0,
    };
    const journalVals = {
      ...quoteVals,
      thread,
      jGridRef: this.jGridRef,
      linksRef: this.linksRef,
      pvBoxRef: this.pvBoxRef,
      bookColor,
      bookColors,
      ratings,
      chars,
      sh,
      jSummary,
      pvLinks,
      ...pv,
    };
    const total = Object.values(PAGES).reduce((a, p) => a + p.length, 0);
    const jTabs = JTABS.map(([k, name, c]) => ({
      name,
      pick: () => this.setState({ jTab: k }),
      bg: k === JT ? "oklch(0.94 0.02 82)" : c,
      pad: k === JT ? "12px 16px 10px" : "8px 14px 8px",
      mt: k === JT ? "0px" : "6px",
    }));
    const MOODS = [
      "Cried",
      "Gasped",
      "Swooned",
      "Couldn’t sleep",
      "Laughed",
      "Furious",
      "Comforted",
      "Shook",
    ];
    const moods = MOODS.map((m) => {
      const on = this.state.moods.includes(m);
      return {
        name: m,
        bg: on ? "oklch(0.87 0.06 150)" : "transparent",
        border: on ? "oklch(0.55 0.08 150)" : "oklch(0.25 0.035 305 / 0.25)",
        toggle: () =>
          this.setState((s) => ({
            moods: s.moods.includes(m)
              ? s.moods.filter((x) => x !== m)
              : [...s.moods, m],
          })),
      };
    });
    const criteria = [
      ["Plot", 4],
      ["Characters", 5],
      ["Worldbuilding", 5],
      ["Romance", 3],
      ["Ending", 3],
    ].map(([name, v]) => ({ name, stars: "★".repeat(v) + "☆".repeat(5 - v) }));
    const n = Object.values(shared).filter(Boolean).length;
    let embers = null;
    if (this.props.embers ?? true) {
      embers = React.createElement(
        "div",
        {
          key: "em",
          "aria-hidden": true,
          style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          },
        },
        Array.from({ length: 22 }, (_, i) =>
          React.createElement("span", {
            key: i,
            style: {
              position: "absolute",
              left: `${(i * 37) % 100}%`,
              top: `${40 + ((i * 23) % 60)}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: "50%",
              background: i % 4 === 0 ? "oklch(0.68 0.09 300)" : gold,
              boxShadow: `0 0 10px ${gold}`,
              animation: `ember ${9 + (i % 7) * 1.7}s linear ${-(i * 1.3)}s infinite`,
            },
          }),
        ),
      );
    }
    const shelves = [0, 1, 2].map((s) => {
      const segs = [];
      this.state.lib
        .filter((b) => b.shelf === s)
        .forEach((b) => {
          const v = this.bookVals(b),
            last = segs[segs.length - 1];
          if (b.mode === "lying" && last && last.lying) last.books.unshift(v);
          else segs.push({ lying: b.mode === "lying", books: [v] });
        });
      const lc = LIGHTS[this.state.lights];
      const lights = lc
        ? React.createElement(
            "div",
            {
              key: "l" + s,
              "aria-hidden": true,
              style: {
                position: "absolute",
                left: 18,
                right: 18,
                top: 2,
                height: 30,
                pointerEvents: "none",
                zIndex: 3,
              },
            },
            React.createElement(
              "svg",
              {
                viewBox: "0 0 100 30",
                preserveAspectRatio: "none",
                style: {
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                },
              },
              React.createElement("path", {
                d: "M0 3 Q50 27 100 3",
                stroke: "oklch(0.38 0.04 140)",
                strokeWidth: 1.2,
                fill: "none",
                vectorEffect: "non-scaling-stroke",
              }),
            ),
            ...Array.from({ length: 20 }, (_, i) => {
              const t = (i + 0.5) / 20,
                c = lc[i % lc.length];
              return React.createElement("span", {
                key: i,
                style: {
                  position: "absolute",
                  left: t * 100 + "%",
                  top: 3 + 48 * t * (1 - t) - 1,
                  width: 7,
                  height: 9,
                  marginLeft: -3.5,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  background: c,
                  boxShadow: `0 0 8px 2px ${c}`,
                  animation: `twinkle ${2 + (i % 5) * 0.6}s ease-in-out ${-(i * 0.37)}s infinite`,
                },
              });
            }),
          )
        : null;
      const CAP = 9,
        exp = !!this.state.expanded[s],
        over = segs.length > CAP;
      const hidden = over && !exp ? segs.length - (CAP - 1) : 0;
      const shown = hidden ? segs.slice(0, CAP - 1) : segs;
      const toggle = () =>
        this.setState((st) => ({
          expanded: { ...st.expanded, [s]: !st.expanded[s] },
        }));
      return {
        label: SHELVES[s],
        segs: shown,
        hasMore: hidden > 0,
        more: segs.slice(CAP - 1).reduce((a, g) => a + g.books.length, 0),
        stubH: 96,
        canFold: over,
        toggleLabel: exp ? "fold away" : "show all",
        toggle,
        lights,
        over: (e) => e.preventDefault(),
        drop: (e) => {
          e.preventDefault();
          this.move(this._drag, s, null);
          this._drag = null;
        },
      };
    });
    const selB = this.state.lib.find((b) => b.id === this.state.sel);
    const setMode = (mode) => () =>
      this.setLib((lib) =>
        lib.map((b) => (b.id === this.state.sel ? { ...b, mode } : b)),
      );
    const modes = [
      ["spine", "Spine out"],
      ["cover", "Cover out"],
      ["lying", "Lay flat"],
    ].map(([k, name]) => {
      const on = selB && selB.mode === k;
      return {
        name,
        run: setMode(k),
        bg: on ? "oklch(0.55 0.09 300)" : "transparent",
        fg: on ? "oklch(0.97 0.01 82)" : ink,
        border: on ? "oklch(0.55 0.09 300)" : "oklch(0.25 0.035 305 / 0.25)",
      };
    });
    return {
      embers,
      heroBooks,
      shelfBooks,
      covers: Array.from({ length: 4 }, () => COVERS)
        .flat()
        .map((c, j) => ({
          duplicate: j < COVERS.length || j >= COVERS.length * 2,
          ...c,
          open: () => {
            if (this._dragMoved > 6) return;
            this.setPaused && this.setPaused(true);
            this.setState({ sheet: j % COVERS.length });
          },
        })),
      sheetOpen: this.state.sheet != null,
      sb: COVERS[this.state.sheet ?? 0],
      goForum: () => {
        this.setState({ sheet: null, libOpen: false });
        this.setPaused && this.setPaused(false);
        setTimeout(() => {
          const el = document.getElementById("salon");
          if (el)
            window.scrollTo({
              top: el.getBoundingClientRect().top + window.scrollY - 20,
              behavior: "smooth",
            });
        }, 60);
      },
      goJournal: () => {
        this.setState({ sheet: null, libOpen: false });
        this.setPaused && this.setPaused(false);
        setTimeout(() => {
          const el = document.getElementById("journal");
          if (el)
            window.scrollTo({
              top: el.getBoundingClientRect().top + window.scrollY - 20,
              behavior: "smooth",
            });
        }, 60);
      },
      closeSheet: () => {
        this.setState({ sheet: null });
        this.setPaused && this.setPaused(false);
      },
      stopSheet: (e) => e.stopPropagation(),
      sheetStatus: [
        ["toread", "To read"],
        ["reading", "Reading"],
        ["read", "Read"],
      ].map(([k, name]) => {
        const on =
          (this.state.statuses[this.state.sheet ?? 0] || "toread") === k;
        return {
          name,
          bg: on ? "oklch(0.25 0.035 305)" : "transparent",
          fg: on ? "oklch(0.97 0.012 82)" : "oklch(0.38 0.03 305)",
          pick: () =>
            this.setState((s) => ({
              statuses: { ...s.statuses, [s.sheet]: k },
            })),
        };
      }),
      trackRef: this.trackRef,
      wheelCovers: (e) => {
        const d =
          Math.abs(e.deltaX) > Math.abs(e.deltaY)
            ? e.deltaX
            : e.shiftKey
              ? e.deltaY
              : 0;
        if (d) this.scrubCovers(d);
      },
      dragStartCovers: (e) => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        this._dragMoved = 0;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        this._drag2 = {
          x: e.clientX,
          moved: 0,
          el: e.currentTarget,
          id: e.pointerId,
          cap: false,
        };
      },
      dragMoveCovers: (e) => {
        const d = this._drag2;
        if (!d) return;
        const dx = e.clientX - d.x;
        d.x = e.clientX;
        d.moved += Math.abs(dx);
        if (!d.cap && d.moved > 6) {
          d.cap = true;
          try {
            d.el.setPointerCapture(d.id);
          } catch (_) {}
          this.setState({ coverDrag: true });
        }
        if (d.cap) this.scrubCovers(-dx);
      },
      dragEndCovers: () => {
        const d = this._drag2;
        this._dragMoved = d ? d.moved : 0;
        this._drag2 = null;
        if (d && d.cap) {
          this.setState({ coverDrag: false });
          this.scrubCovers(0);
        }
      },
      coverCursor: this.state.coverDrag ? "grabbing" : "grab",
      pauseCovers: () => this.setPaused(true),
      resumeCovers: () => this.setPaused(false),
      prevCovers: () => this.scrollCovers(-1),
      nextCovers: () => this.scrollCovers(1),
      showNotes: this.props.notes ?? true,
      showRead: () => this.setState({ tab: "read" }),
      showToRead: () => this.setState({ tab: "toread" }),
      readTabBg:
        this.state.tab === "read" ? "oklch(0.86 0.1 78)" : "transparent",
      readTabFg: this.state.tab === "read" ? "oklch(0.28 0.04 60)" : muted,
      toReadTabBg:
        this.state.tab === "toread" ? "oklch(0.86 0.1 78)" : "transparent",
      toReadTabFg: this.state.tab === "toread" ? "oklch(0.28 0.04 60)" : muted,
      woods: [...WOODS, ...WOODS].map((w, j, arr) => {
        const i = j % WOODS.length;
        return {
          ...w,
          ring: i === this.state.wood ? ink : "transparent",
          pick: () => this.setState({ wood: i }),
        };
      }),
      woodGrad: WOODS[this.state.wood].grad,
      woodRef: this.woodRef,
      woodPrev: () => this.nudgeMarquee(this.woodRef, 26000, -90),
      woodNext: () => this.nudgeMarquee(this.woodRef, 26000, 90),
      woodPause: () => {
        this._woodHover = true;
        const a =
          this.woodRef.current && this.woodRef.current.getAnimations()[0];
        a && a.pause();
      },
      woodPlay: () => {
        this._woodHover = false;
        const a =
          this.woodRef.current && this.woodRef.current.getAnimations()[0];
        a && a.play();
      },
      woodPrevC: "oklch(0.42 0.03 305 / 0.6)",
      woodNextC: "oklch(0.42 0.03 305 / 0.6)",
      shelfCaption:
        this.state.tab === "read"
          ? "Books you’ve finished, kept where you can see them."
          : "The ones still waiting for you.",
      ...journalVals,
      entries,
      jTabs,
      moods,
      criteria,
      isMood: JT === "mood",
      isRating: JT === "rating",
      jTabName: JTABS.find((t) => t[0] === JT)[1],
      shareSummary:
        n === 0
          ? "Everything in this journal is private."
          : `${n} of ${total} entries visible on your profile. The rest stay yours.`,
      forums: [
        {
          kind: "Saga forum",
          meta: "Spoilers up to book 1",
          name: "The Ashborn Saga",
          thread: "Was the bridge scene a betrayal or a rescue?",
          bg: "oklch(0.4 0.09 20)",
          edge: "oklch(0.52 0.11 15 / 0.6)",
          rot: "-0.8deg",
          hasQuote: !!this.state.jShare.best,
          quote:
            "The bridge scene. Corin turning back for her when the whole city was burning.",
        },
        {
          kind: "Book forum",
          meta: "Started by a reader",
          name: "Salt & Starlight",
          thread:
            "Favourite side character, and why it’s the lighthouse keeper",
          bg: "oklch(0.32 0.09 200)",
          edge: "oklch(0.55 0.1 200 / 0.6)",
          rot: "0.6deg",
        },
        {
          kind: "Reading group",
          meta: "Reading together",
          name: "Night owls read Moonward",
          thread:
            "A small group reading one book at the same pace, with a thread for each part.",
          bg: "oklch(0.4 0.08 150)",
          edge: "oklch(0.62 0.07 145 / 0.7)",
          rot: "-0.4deg",
          hasProgress: true,
          pct: "38%",
          progress: "Part 2 of 5",
          next: "Next chat: end of part 2",
        },
      ],
      socials: ["Instagram", "TikTok", "Threads"].map((name) => ({
        name,
        href: "#",
        open: (e) => {
          e.preventDefault();
          this.setState({ soon: name });
        },
      })),
      soonOpen: !!this.state.soon,
      soonName: this.state.soon || "",
      closeSoon: () => this.setState({ soon: null }),
      libraryDirty:
        serializeLibrary(this.state) !== this.state.savedLayoutSignature,
      saveLibrary: this.saveLibrary,
      saveMessage:
        this.state.saveError ||
        serializeLibrary(this.state) === this.state.savedLayoutSignature
          ? this.state.saveMessage || ""
          : "",
      saveError: !!this.state.saveError,
      libOpen: this.state.libOpen,
      openLib: () => this.setState({ libOpen: true }),
      closeLib: () => this.setState({ libOpen: false, sel: null }),
      stop: (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) this.setState({ sel: null });
      },
      angle: this.state.angle,
      setAngle: (e) => this.setState({ angle: +e.target.value }),
      sorts: [
        {
          name: "Colour",
          run: () => this.sortBy((a, b) => a.h - b.h || a.l - b.l),
        },
        { name: "Height", run: () => this.sortBy((a, b) => b.H - a.H) },
        {
          name: "Title",
          run: () => this.sortBy((a, b) => a.t.localeCompare(b.t)),
        },
      ],
      wallBg: WALLS[this.state.wall].bg,
      wallInk: WALLS[this.state.wall].ink,
      walls: WALLS.map((w, i) => ({
        ...w,
        ring: i === this.state.wall ? ink : "oklch(0.25 0.035 305 / 0.15)",
        pick: () => this.setState({ wall: i }),
      })),
      cases: CASES.map((c, i) => ({
        ...c,
        ring: i === this.state.caseC ? ink : "oklch(0.25 0.035 305 / 0.15)",
        pick: () => this.setState({ caseC: i }),
      })),
      caseFrame: CASES[this.state.caseC].frame,
      caseShelf: CASES[this.state.caseC].shelf,
      lightOpts: [
        ["warm", "Warm"],
        ["pastel", "Pastel"],
        ["off", "Off"],
      ].map(([k, name]) => ({
        name,
        pick: () => this.setState({ lights: k }),
        bg: this.state.lights === k ? ink : "transparent",
        fg: this.state.lights === k ? paper : muted,
      })),
      tray: Object.keys(DECOS).map((k) => ({
        name: DECOS[k].name,
        bgImg: `url("${DECOS[k].src}")`,
        dragStart: (e) => {
          this._newType = k;
          this._drag = null;
          try {
            e.dataTransfer.setData("text/plain", k);
            e.dataTransfer.effectAllowed = "copy";
          } catch (_) {}
        },
        add: () => {
          const sb = this.state.lib.find((b) => b.id === this.state.sel);
          this.addDeco(k, sb ? sb.shelf : null, null);
        },
      })),
      selIsBook: !!selB && !selB.deco,
      selIsDeco: !!selB && !!selB.deco,
      removeSel: () =>
        this.setState((s) => ({
          lib: s.lib.filter((b) => b.id !== s.sel),
          sel: null,
        })),
      deselect: () => this.setState({ sel: null }),
      q: this.state.q,
      hasQ: !!this.state.q,
      setQ: (e) => this.setState({ q: e.target.value, qOpen: true }),
      focusQ: () => this.setState({ qOpen: true }),
      clearQ: () => this.setState({ q: "", qOpen: false }),
      ...(() => {
        const q = this.state.q.trim().toLowerCase();
        if (!q || !this.state.qOpen)
          return { showResults: false, results: [], noResults: false };
        const pool = [
          ...CATALOG,
          ...LIB.filter((b) => !b.deco).map((b) => [b.t, ""]),
        ].filter((x, i, arr) => arr.findIndex((y) => y[0] === x[0]) === i);
        const found = pool
          .filter(
            ([t, a]) =>
              t.toLowerCase().includes(q) || a.toLowerCase().includes(q),
          )
          .slice(0, 5);
        return {
          showResults: true,
          noResults: !found.length,
          results: found.map(([t, a], i) => {
            const [hh, ll] = BRIGHT[(t.length * 3 + i) % BRIGHT.length];
            const owned = this.state.lib.find((b) => b.t === t);
            return {
              t,
              a: a || "In your library",
              inLib: owned && a ? " · on your shelf" : "",
              bg: `oklch(${ll} 0.15 ${hh})`,
              adds: [
                [0, "Read", "finished"],
                [1, "Reading", "reading now"],
                [2, "To read", "still waiting for me"],
              ].map(([sh, name, label]) => ({
                name,
                label,
                run: () => {
                  clearTimeout(this._toastT);
                  this.setState((st) => {
                    let lib = st.lib.map((b) => ({ ...b }));
                    const ex = lib.findIndex((b) => b.t === t);
                    if (ex >= 0) {
                      const [b] = lib.splice(ex, 1);
                      b.shelf = sh;
                      lib.push(b);
                    } else
                      lib.push({
                        id: "n" + NB++,
                        t,
                        shelf: sh,
                        h: hh,
                        l: ll,
                        c: 0.15,
                        T: 18 + ((t.length * 5) % 10),
                        H: 92 + ((t.length * 11) % 28),
                        D: 66,
                        mode: "spine",
                      });
                    return {
                      lib,
                      q: "",
                      qOpen: false,
                      toast: `“${t}” added to ${label} ✦`,
                      expanded: { ...st.expanded, [sh]: true },
                    };
                  });
                  this._toastT = setTimeout(
                    () => this.setState({ toast: "" }),
                    3200,
                  );
                },
              })),
            };
          }),
        };
      })(),
      toast: this.state.toast,
      hasToast: !!this.state.toast,
      shelves,
      hasSel: !!selB,
      noSel: !selB,
      selTitle: selB ? selB.t : "",
      modes,
      moves: [
        { icon: "←", label: "Move left", run: () => this.nudge(-1) },
        { icon: "→", label: "Move right", run: () => this.nudge(1) },
        { icon: "↑", label: "Shelf above", run: () => this.shelfJump(-1) },
        { icon: "↓", label: "Shelf below", run: () => this.shelfJump(1) },
      ],
    };
  }
}
