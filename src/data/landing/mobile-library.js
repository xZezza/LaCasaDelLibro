import { COVERS } from "./books.js";
import { CATALOG } from "./library.js";

export const MOBILE_WOODS = [
  { name: "Walnut", colour: "#91643c", filter: "none" },
  { name: "Oak", colour: "#d8b888", filter: "brightness(1.3) saturate(.8)" },
];
export const MOBILE_WALLS = [
  { name: "Linen", colour: "#f3ebdc", ink: "#342539" },
  { name: "Sage", colour: "#c7cfb9", ink: "#30382d" },
  { name: "Lavender", colour: "#d6c9df", ink: "#392b45" },
  { name: "Peach", colour: "#e7c4ab", ink: "#4a302c" },
  { name: "Forest", colour: "#3f5044", ink: "#f5eddb" },
];
export const MOBILE_GROUPS = [["all", "All together"], ["status", "By reading status"], ["saga", "By saga"]];
export const MOBILE_ORDERS = [["saga", "Saga"], ["colour", "Colour"], ["height", "Height"], ["author", "Author"], ["manual", "My order"]];
export const STATUS_LABELS = ["Read", "Reading", "To read"];
export const SHELF_LABELS = ["Top shelf", "Middle shelf", "Bottom shelf"];
export const MOBILE_DECORATIONS = [
  { key: "candle", label: "Candle", icon: "candle" },
  { key: "lights", label: "Fairy lights", icon: "lights" },
  { key: "plant", label: "Small plant", icon: "plant" },
  { key: "ivy", label: "Trailing ivy", icon: "ivy" },
  { key: "sleeping-cat", label: "Sleeping cat", icon: "cat" },
  { key: "teacup", label: "Teacup", icon: "cup" },
  { key: "hourglass", label: "Hourglass", icon: "hourglass" },
  { key: "crystal", label: "Crystal", icon: "crystal" },
  { key: "frame", label: "Framed illustration", icon: "frame" },
  { key: "lavender", label: "Dried flowers", icon: "flowers" },
  { key: "bookends", label: "Bookends", icon: "bookends" },
];
const SERIES = [
  ["ACOTAR", ["A Court of Thorns and Roses", "A Court of Mist and Fury", "A Court of Wings and Ruin"]],
  ["The Empyrean", ["Fourth Wing", "Iron Flame", "Onyx Storm"]],
  ["The Hunger Games", ["The Hunger Games", "Catching Fire", "Mockingjay", "The Ballad of Songbirds and Snakes"]],
  ["Six of Crows", ["Six of Crows", "Crooked Kingdom"]],
  ["The Folk of the Air", ["The Cruel Prince", "The Wicked King", "The Queen of Nothing"]],
  ["Divergent", ["Divergent", "Insurgent"]],
  ["Throne of Glass", ["Throne of Glass", "Crown of Midnight"]],
  ["Shadow and Bone", ["Shadow and Bone", "Siege and Storm"]],
  ["Mistborn", ["Mistborn"]], ["Red Queen", ["Red Queen"]],
  ["Legendborn", ["Legendborn"]], ["Serpent & Dove", ["Serpent & Dove"]],
  ["Shatter Me", ["Shatter Me"]], ["The Roots of Chaos", ["The Priory of the Orange Tree"]],
];
const authors = new Map([...COVERS.map(book => [book.t, book.a]), ...CATALOG]);
authors.set("The Priory of the Orange Tree", "Samantha Shannon");
authors.set("Serpent & Dove", "Shelby Mahurin");
export function libraryBookInfo(book) {
  const family = SERIES.find(([, titles]) => titles.includes(book.t));
  return { author: authors.get(book.t) || "", saga: family?.[0] || book.t, order: family ? family[1].indexOf(book.t) : 0 };
}

// Reuse the approved botanical atlas; percentages are the same as the existing room.
export const MOBILE_ORNAMENT_ART = {
  ivy: { w: 44, h: 100, src: "/images/decorations/library-editorial/approved-cutout.png", size: "808.4211% 239.2523%", position: "3.3432% 91.7785%", drop: .53, clip: "polygon(1.05% 17.76%,41.05% 2.10%,71.58% 1.40%,73.68% 14.72%,95.26% 32.01%,88.95% 44.16%,68.95% 48.83%,82.11% 60.98%,60% 65.89%,60% 81.54%,37.37% 99.07%,26.32% 96.03%,32.63% 75.93%,6.32% 70.79%,14.21% 55.61%,1.58% 50.23%,15.79% 36.68%,1.58% 32.71%)" },
  lavender: { w: 38, h: 70, size: "388.8608% 208.1301%", position: "50.3944% 0%" },
  candle: { w: 29, h: 62, size: "676.6520% 214.2259%", position: "88.0061% 1.4652%" },
  teacup: { w: 52, h: 35, size: "322.6891% 315.0769%", position: "3.0189% 89.9857%" },
  blossoms: { w: 36, h: 62, size: "546.6192% 209.8361%", position: "48.6056% 95.8955%" },
  moon: { w: 36, h: 55, size: "505.2632% 224.5614%", position: "90.0162% 95.2465%" },
  plant: { w: 22, h: 38 }, crystal: { w: 26, h: 33 }, dragon: { w: 40, h: 34 },
  fairy: { w: 22, h: 37 }, cactus: { w: 22, h: 35 }, potion: { w: 22, h: 38 },
  hourglass: { w: 30, h: 55 }, frame: { w: 42, h: 55 }, bookends: { w: 64, h: 31 },
  "sleeping-cat": { w: 62, h: 32 },
};
