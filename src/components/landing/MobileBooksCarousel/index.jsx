import React, { useEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import { imageAsset } from "../../../lib/image-assets.js";
import { ILLUSTRATED_COVERS } from "../../../data/landing/illustrated-covers.js";
import "./styles.css";

export default function MobileBooksCarousel({ books, onOpen }) {
  const viewportRef = useRef(null);
  const currentRef = useRef(0);
  const targetRef = useRef(null);
  const widthRef = useRef(0);
  const settleRef = useRef(0);
  const pointerRef = useRef(null);
  const blockClickRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const count = books.length;
  const slides = [books.at(-1), ...books, books[0]];
  const step = () => {
    const track = viewportRef.current;
    return track && track.children.length > 1 ? track.children[1].offsetLeft - track.children[0].offsetLeft : 0;
  };
  const move = (direction, focusBook = false) => {
    const track = viewportRef.current, distance = step();
    if (!track || !distance) return;
    const from = targetRef.current ?? currentRef.current;
    const slot = from + 1 + direction;
    const next = (from + direction + count) % count;
    targetRef.current = next;
    currentRef.current = next;
    setCurrent(next);
    if (focusBook) track.children[next + 1].querySelector("button")?.focus({ preventScroll: true });
    track.scrollTo({ left: slot * distance, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const onScroll = () => {
    const track = viewportRef.current, distance = step();
    if (!track || !distance || track.clientWidth !== widthRef.current) return;
    const slot = Math.round(track.scrollLeft / distance);
    const next = (slot - 1 + count) % count;
    if (targetRef.current === null) { currentRef.current = next; setCurrent(next); }
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const finalSlot = Math.round(track.scrollLeft / distance);
      targetRef.current = null;
      const settled = (finalSlot - 1 + count) % count;
      currentRef.current = settled;
      setCurrent(settled);
      if (track.contains(document.activeElement)) track.children[settled + 1].querySelector("button")?.focus({ preventScroll: true });
      // Identical end covers keep the first/last transition continuous.
      if (finalSlot === 0) track.scrollTo({ left: count * distance, behavior: "instant" });
      else if (finalSlot === count + 1) track.scrollTo({ left: distance, behavior: "instant" });
    }, 160);
  };
  useEffect(() => {
    const track = viewportRef.current;
    const phone = matchMedia(MEDIA_QUERIES.phone);
    let frame;
    const align = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (phone.matches && track.clientWidth) {
          clearTimeout(settleRef.current);
          targetRef.current = null;
          widthRef.current = track.clientWidth;
          track.scrollTo({ left: (currentRef.current + 1) * step(), behavior: "instant" });
        }
      });
    };
    const observer = new ResizeObserver(align);
    observer.observe(track);
    phone.addEventListener("change", align);
    align();
    return () => { observer.disconnect(); phone.removeEventListener("change", align); cancelAnimationFrame(frame); clearTimeout(settleRef.current); };
  }, [count]);
  return (
    <div className="mobile-books" role="region" aria-roledescription="carousel" aria-label="Featured books">
      <div className="mobile-books-stage">
        <div ref={viewportRef} className="mobile-books-track" onScroll={onScroll}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1, true); }
          }}
          onPointerDown={(event) => { targetRef.current = null; pointerRef.current = { x: event.clientX, y: event.clientY }; }}
          onPointerUp={(event) => {
            const start = pointerRef.current;
            if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) blockClickRef.current = performance.now() + 300;
            pointerRef.current = null;
          }}
          onPointerCancel={() => { pointerRef.current = null; blockClickRef.current = performance.now() + 300; }}>
          {slides.map((book, slot) => {
            const index = (slot - 1 + count) % count;
            const clone = slot === 0 || slot === count + 1;
            const art = ILLUSTRATED_COVERS[index];
            const Cover = clone ? "div" : "button";
            return <div key={slot} className="mobile-books-slide" data-active={index === current} aria-hidden={clone} inert={clone}>
              <Cover type={clone ? undefined : "button"} className="mobile-books-book" aria-label={clone ? undefined : `Open ${book.t}`} tabIndex={clone ? undefined : 0}
                onClick={() => { if (performance.now() >= blockClickRef.current) onOpen(index); }}>
                <span className="mobile-books-binding" style={{ "--binding-color": art.binding }}>
                  <img src={art.responsiveSrc} srcSet={`${art.responsiveSrc} 600w, ${imageAsset(art.src)} 1060w`} sizes="(max-width: 650px) 34vw, 170px" width="1000" height="1400" alt="" loading="lazy" decoding="async" draggable="false" />
                  {art.liveTitle && <span className="mobile-books-cover-lettering"><span>{book.t}</span><small>{book.a}</small></span>}
                </span>
              </Cover>
            </div>;
          })}
        </div>
        <img className="mobile-books-flowers" src={imageAsset("/images/decorations/carousel-covers/lilac-sprig.png")} alt="" width="400" height="500" loading="lazy" decoding="async" />
        <button type="button" className="mobile-books-arrow mobile-books-previous" aria-label="Previous book" onClick={() => move(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
        <button type="button" className="mobile-books-arrow mobile-books-next" aria-label="Next book" onClick={() => move(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
      </div>
      <p className="mobile-books-memory">The ending I still think about.</p>
      <span className="mobile-books-status" aria-live="polite" aria-atomic="true">{current + 1} of {count}: {books[current].t}</span>
    </div>
  );
}
