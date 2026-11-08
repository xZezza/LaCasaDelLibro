import imageVariants from "../data/image-variants.json" with { type: "json" };

// Keep the artwork catalog and original URLs intact. Only display URLs change.
export function imageAsset(originalUrl) {
  return imageVariants[originalUrl] || originalUrl;
}
