import React, { useEffect, useRef, useState } from "react";
import { READ, WOODS } from "../../../data/landing/library.js";

const FEATURED_MATERIALS = ["Walnut", "Oak", "Cream", "Sage", "Lavender"]
  .map(name => WOODS.find(wood => wood.name === name));
const ALL_MATERIALS = [...WOODS, ...WOODS];
const BOOKS = READ.slice(0, 7);
const MARQUEE_DURATION = 26000;

export default function DesktopLibraryPreview({ openLibrary }) {
  const [wood, setWood] = useState(FEATURED_MATERIALS[0]);
  const [showAllWoods, setShowAllWoods] = useState(false);
  const track = useRef(null);
  const animatingFrame = useRef(null);
  const hovering = useRef(false);

  useEffect(() => () => cancelAnimationFrame(animatingFrame.current), []);

  function setTrackHover(hover) {
    hovering.current = hover;
    const animation = track.current.getAnimations()[0];
    if (hover) animation?.pause();
    else animation?.play();
  }

  function moveMaterials(pixels) {
    const element = track.current;
    const animation = element.getAnimations()[0];
    if (!animation) return;

    const delta = pixels * MARQUEE_DURATION / (element.scrollWidth / 2);
    const from = animation.currentTime || 0;
    const start = performance.now();
    animation.pause();
    cancelAnimationFrame(animatingFrame.current);
    function step(now) {
      const progress = Math.min((now - start) / 450, 1);
      const time = from + delta * (1 - (1 - progress) ** 3);
      animation.currentTime = ((time % MARQUEE_DURATION) + MARQUEE_DURATION) % MARQUEE_DURATION;
      if (progress < 1) animatingFrame.current = requestAnimationFrame(step);
      else if (!hovering.current) animation.play();
    }
    animatingFrame.current = requestAnimationFrame(step);
  }

  return (
    <div className="salon-s78 library-editorial-card" data-all-materials={showAllWoods} data-reading-tab="read" data-wood={wood.name}>
      <div className="salon-s70">
        <div className="salon-s64">
          <span className="salon-s63 salon-marker-control"><span className="salon-marker-text">Read</span></span>
        </div>
        <div className="salon-s69">
          <span>Shelf</span>
          <button type="button" onClick={() => moveMaterials(-90)} aria-label="More colours" className="salon-s65 salon-hover74">‹</button>
          <div className="salon-s68" onMouseEnter={() => setTrackHover(true)} onMouseLeave={() => setTrackHover(false)}>
            <div ref={track} className="salon-s67">
              {(showAllWoods ? ALL_MATERIALS : FEATURED_MATERIALS).map((material, index) => (
                <button
                  key={`${material.name}-${index}`}
                  onClick={() => setWood(material)}
                  title={material.name}
                  aria-label={material.name}
                  type="button"
                  className="salon-s66"
                  data-material={material.name}
                  aria-pressed={wood === material}
                  style={{ background: material.top }}
                />
              ))}
            </div>
          </div>
          <button type="button" onClick={() => moveMaterials(90)} aria-label="More colours" className="salon-s65 salon-hover78">›</button>
          <button type="button" className="library-materials-more" aria-expanded={showAllWoods} onClick={() => setShowAllWoods(value => !value)} aria-label={showAllWoods ? "Show five main materials" : "Show all shelf materials"}>{showAllWoods ? "Less ⌃" : "More ⌄"}</button>
        </div>
      </div>
      <button
        type="button"
        onClick={openLibrary}
        aria-label="Open the full library"
        aria-haspopup="dialog"
        className="salon-s76 library-editorial-scene"
        data-reading-tab="read"
        data-wood={wood.name}
      >
        <span className="library-editorial-hint" aria-hidden="true">drag to arrange <span>⤵</span></span>
        <span className="library-editorial-prop library-editorial-ivy" aria-hidden="true" />
        <span className="library-editorial-prop library-editorial-vase" aria-hidden="true" />
        <span className="salon-s75">
          <span className="salon-s73">
            {BOOKS.map((title, index) => (
              <span key={title} className="salon-s72 salon-hover83" data-art-index={index}>
                <span className="salon-s71">{title}</span>
              </span>
            ))}
          </span>
          <span className="salon-s74" />
        </span>
      </button>
      <p className="salon-s77">Books you’ve finished, kept where you can see them.</p>
    </div>
  );
}
