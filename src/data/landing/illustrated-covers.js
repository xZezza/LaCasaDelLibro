export const ILLUSTRATED_COVERS = [
  { title: "The Night Circus", src: "/images/decorations/carousel-covers/night-circus.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/night-circus-mobile.webp", binding: "#512437" },
  { title: "A Court of Thorns and Roses", src: "/images/decorations/carousel-covers/acotar.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/acotar-mobile.webp", binding: "#435b3c", liveTitle: true },
  { title: "The Hunger Games", src: "/images/decorations/carousel-covers/hunger-games.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/hunger-games-mobile.webp", binding: "#302d28" },
  { title: "Fourth Wing", src: "/images/decorations/carousel-covers/fourth-wing.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/fourth-wing-mobile.webp", binding: "#54413c" },
  { title: "Six of Crows", src: "/images/decorations/carousel-covers/six-of-crows.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/six-of-crows-mobile.webp", binding: "#382836" },
  { title: "Divergent", src: "/images/decorations/carousel-covers/divergent.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/divergent-mobile.webp", binding: "#36585f" },
  { title: "The Cruel Prince", src: "/images/decorations/carousel-covers/cruel-prince.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/cruel-prince-mobile.webp", binding: "#32462d" },
  { title: "Throne of Glass", src: "/images/decorations/carousel-covers/throne-of-glass.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/throne-of-glass-mobile.webp", binding: "#3d5b68" },
  { title: "Red Queen", src: "/images/decorations/carousel-covers/red-queen.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/red-queen-mobile.webp", binding: "#722d37" },
  { title: "Shadow and Bone", src: "/images/decorations/carousel-covers/shadow-bone.png", responsiveSrc: "/images/optimized/decorations/carousel-covers/shadow-bone-mobile.webp", binding: "#242d48" },
];

export function illustratedCoverFor(title) {
  return ILLUSTRATED_COVERS.find(cover => cover.title === title);
}
