import React, { useCallback, useEffect, useRef } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./postcard.css";

const reducedMotion = "(prefers-reduced-motion: reduce)";

export default function Postcard({ children }) {
  const postcard = useRef(null);
  const art = useRef(null);

  const replay = useCallback(() => {
    const card = postcard.current;
    if (!card || window.matchMedia(reducedMotion).matches) return;
    if (window.matchMedia(MEDIA_QUERIES.phone).matches && !art.current.querySelector("img")?.naturalWidth) return;
    card.classList.remove("community-postcard-lift");
    void card.offsetWidth;
    card.classList.add("community-postcard-lift");
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia(reducedMotion).matches) return;
    const card = postcard.current;
    const image = art.current.querySelector("img");
    if (!image) return;
    let inView = false;

    function playWhenReady() {
      if (!inView || (window.matchMedia(MEDIA_QUERIES.phone).matches && !image.naturalWidth)) return;
      replay();
      observer.disconnect();
      image.removeEventListener("load", playWhenReady);
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      playWhenReady();
    }, { threshold: .55 });

    image.addEventListener("load", playWhenReady);
    observer.observe(card);
    return () => {
      observer.disconnect();
      image.removeEventListener("load", playWhenReady);
    };
  }, [replay]);

  return (
    <div className="community-postcard-stage">
      <figure ref={postcard} className="community-postcard" onMouseEnter={() => {
        if (!window.matchMedia(MEDIA_QUERIES.phone).matches) replay();
      }}>
        <span className="community-postcard-tape" aria-hidden="true" />
        <div ref={art} className="community-postcard-art">
          {children}
          <span className="community-ceiling" aria-hidden="true" />
        </div>
        <button type="button" className="community-postcard-replay"
          aria-label="Replay the enchanted postcard" onClick={replay}>↻</button>
        <figcaption className="community-postcard-caption">your people</figcaption>
      </figure>
    </div>
  );
}
