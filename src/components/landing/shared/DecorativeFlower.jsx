import React from "react";
import "./typography.css";

const PETALS = [0, 72, 144, 216, 288];
const COLOURS = {
  lilac: ["oklch(0.7 0.08 295)", "oklch(0.86 0.05 295)", "light-dark(oklch(0.74 0.12 85), oklch(0.86 0.12 85))"],
  rose: ["light-dark(oklch(0.74 0.09 350), oklch(0.86 0.09 350))", "light-dark(oklch(0.88 0.05 350), oklch(0.3 0.035 350))", "light-dark(oklch(0.72 0.12 80), oklch(0.86 0.12 80))"],
};

export default function DecorativeFlower({ colour }) {
  const [outer, inner, centre] = COLOURS[colour];
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" className="decorative-flower" aria-hidden="true">
      <path d="M60 64 C 58 84, 50 98, 38 114" fill="none" stroke="light-dark(oklch(0.55 0.07 130), oklch(0.73 0.07 130))" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 92 C 36 88, 28 94, 22 102 C 34 104, 44 100, 50 92 Z" fill="light-dark(oklch(0.66 0.07 135), oklch(0.84 0.07 135))" opacity=".85" />
      <path d="M56 80 C 68 72, 80 74, 88 80 C 78 88, 66 88, 56 80 Z" fill="light-dark(oklch(0.62 0.07 135), oklch(0.8 0.07 135))" opacity=".8" />
      {PETALS.map(angle => (
        <ellipse key={angle} cx="60" cy="38" rx="11" ry="22" fill={outer} opacity=".88" transform={`rotate(${angle} 60 60)`} />
      ))}
      {PETALS.map(angle => (
        <ellipse key={angle} cx="60" cy="44" rx="6" ry="13" fill={inner} opacity=".6" transform={`rotate(${angle + 36} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="8" fill={centre} />
      <circle cx="57" cy="57" r="2" fill="light-dark(oklch(0.95 0.06 90), oklch(0.23 0.042 90))" opacity=".8" />
    </svg>
  );
}
