import { useLayoutEffect, useRef } from "react";
import { MEDIA_QUERIES } from "../config/breakpoints.js";

// Use layout zoom rather than a visual transform so drag/drop and pointer targets
// stay aligned with the displayed books at every desktop window size.
export default function useLibraryFit(open) {
  const dialogRef = useRef(null);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const desktop = matchMedia(MEDIA_QUERIES.tabletAndPhone);
    let frame;
    function fit() {
      if (desktop.matches) {
        dialog.style.removeProperty("--library-scale");
        return;
      }
      dialog.style.setProperty("--library-scale", "1");
      const padding = getComputedStyle(dialog.parentElement);
      const height =
        innerHeight -
        parseFloat(padding.paddingTop) -
        parseFloat(padding.paddingBottom) -
        2;
      const width =
        innerWidth -
        parseFloat(padding.paddingLeft) -
        parseFloat(padding.paddingRight) -
        2;
      const scale = Math.min(
        0.9,
        height / Math.max(dialog.scrollHeight, dialog.offsetHeight),
        width / dialog.offsetWidth,
      );
      dialog.style.setProperty("--library-scale", String(scale));
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    }
    fit();
    const observer = new ResizeObserver(schedule);
    // Observe the contents, whose natural size stays stable when zoom changes.
    [...dialog.children]
      .filter((el) => el.tagName === "DIV")
      .forEach((el) => observer.observe(el));
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, [open]);
  return dialogRef;
}
