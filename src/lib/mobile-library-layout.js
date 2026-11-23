import { MOBILE_ORNAMENT_ART } from "../data/landing/mobile-library.js";

export const MOBILE_COVER_RATIO = 5 / 7;

export function mobileItemDimensions(item, zoom = false) {
  const factor = typeof zoom === "number" ? zoom : zoom ? 1.3 : 1;
  if (item.deco) {
    const size = MOBILE_ORNAMENT_ART[item.deco] || { w: 39, h: 39 };
    return { w: size.w * factor, h: size.h * factor };
  }
  const height = Math.max(72, Math.min(96, item.H * .78));
  const thickness = Math.max(20, Math.min(32, item.T * 1.15));
  const size = item.mode === "cover" ? { w: height * MOBILE_COVER_RATIO, h: height }
    : item.mode === "lying" ? { w: height, h: Math.max(16, thickness * .8) }
    : { w: thickness, h: height };
  return { w: size.w * factor, h: size.h * factor };
}
