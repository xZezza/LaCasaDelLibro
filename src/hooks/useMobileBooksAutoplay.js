import { useCallback, useEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../config/breakpoints.js";

export default function useMobileBooksAutoplay({ viewportRef, currentRef, targetRef, pointerRef, settleRef, count, onCurrent }) {
  const frameRef = useRef(0);
  const untilRef = useRef(0);
  const hoverRef = useRef(false);
  const [moving, setMoving] = useState(false);
  const pause = useCallback(() => {
    untilRef.current = performance.now() + 6000;
    const track = viewportRef.current;
    setMoving(false);
    if (!frameRef.current || !track) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    track.removeAttribute("data-auto-moving");
    targetRef.current = null;
    const distance = track.children[1].offsetLeft - track.children[0].offsetLeft;
    if (distance) {
      currentRef.current = (Math.round(track.scrollLeft / distance) - 1 + count) % count;
      onCurrent(currentRef.current);
    }
  }, [count, onCurrent]);

  useEffect(() => {
    const track = viewportRef.current;
    if (!track || count < 2) { pause(); return; }
    const root = track.closest(".mobile-books");
    const phone = matchMedia(MEDIA_QUERIES.phone);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const blocked = () => !visible || !phone.matches || reduced.matches || document.hidden || pointerRef.current || hoverRef.current || root.contains(document.activeElement) || document.querySelector('[role="dialog"][aria-modal="true"], dialog[open]') || performance.now() < untilRef.current;
    const advance = () => {
      if (blocked() || frameRef.current || targetRef.current !== null) return;
      const distance = track.children[1].offsetLeft - track.children[0].offsetLeft;
      if (!distance) return;
      const from = track.scrollLeft;
      const to = (currentRef.current + 2) * distance;
      const next = (currentRef.current + 1) % count;
      targetRef.current = next;
      currentRef.current = next;
      onCurrent(next);
      clearTimeout(settleRef.current);
      track.setAttribute("data-auto-moving", "true");
      setMoving(true);
      let started;
      const glide = time => {
        if (blocked()) { pause(); return; }
        started ??= time;
        const progress = Math.min(1, (time - started) / 1800);
        const eased = progress * progress * (3 - 2 * progress);
        track.scrollTo({ left: from + (to - from) * eased, behavior: "instant" });
        if (progress < 1) frameRef.current = requestAnimationFrame(glide);
        else {
          frameRef.current = 0;
          track.removeAttribute("data-auto-moving");
          setMoving(false);
        }
      };
      frameRef.current = requestAnimationFrame(glide);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      if (!visible) pause();
    }, { threshold: 0.35 });
    observer.observe(track);
    const interval = setInterval(advance, 6000);
    phone.addEventListener("change", pause);
    reduced.addEventListener("change", pause);
    document.addEventListener("visibilitychange", pause);
    return () => {
      clearInterval(interval);
      pause();
      observer.disconnect();
      phone.removeEventListener("change", pause);
      reduced.removeEventListener("change", pause);
      document.removeEventListener("visibilitychange", pause);
    };
  }, [count, pause]);
  return { pause, moving, hoverRef };
}
