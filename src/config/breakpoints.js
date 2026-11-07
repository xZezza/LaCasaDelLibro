// Keep these boundaries aligned with the media queries in component styles.
export const BREAKPOINTS = Object.freeze({ phoneMax: 650, tabletMax: 960 });
export const MEDIA_QUERIES = Object.freeze({
  phone: "(max-width: 650px)",
  tablet: "(min-width: 651px) and (max-width: 960px)",
  tabletAndPhone: "(max-width: 960px)",
  desktop: "(width > 960px)",
});
