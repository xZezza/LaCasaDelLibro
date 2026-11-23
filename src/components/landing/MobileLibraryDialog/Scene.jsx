import React, { useLayoutEffect, useRef, useState } from "react";
import { DECOS } from "../../../data/landing/library.js";
import { illustratedBinding } from "../../../data/landing/library-art.js";
import { ILLUSTRATED_COVERS } from "../../../data/landing/illustrated-covers.js";
import { MOBILE_ORNAMENT_ART, MOBILE_WOODS, SHELF_LABELS, STATUS_LABELS, libraryBookInfo } from "../../../data/landing/mobile-library.js";
import { imageAsset } from "../../../lib/image-assets.js";
import { mobileItemDimensions } from "../../../lib/mobile-library-layout.js";
import FairyLights from "../FairyLights";

const atlas = imageAsset("/images/decorations/library-editorial/binding-atlas.png");
const botanical = imageAsset("/images/decorations/library-editorial/ornament-botanical-v2.png");
const shelfArt = imageAsset("/images/decorations/library-mobile/clean-shelf.png");

export function MobileBookArt({ book, thumbnail = false }) {
  const { index } = illustratedBinding(book.t);
  const face = thumbnail || book.mode === "cover";
  const art = ILLUSTRATED_COVERS.find(cover => cover.title === book.t);
  if (face && art) return <span className="ml-cover-image" style={{ backgroundImage: `url("${art.responsiveSrc || imageAsset(art.src)}")` }} aria-hidden="true">
    {art.liveTitle && <span className="ml-live-cover-title">{book.t}</span>}
  </span>;
  const darkText = index === 4;
  const position = `${index % 3 * 50}% ${index > 2 ? 100 : 0}%`;
  return <span className={`ml-binding ${face ? "ml-binding-face" : ""}`} style={{ backgroundImage: `url("${atlas}")`, backgroundPosition: position, color: darkText ? "#44281d" : "#fae6b4" }} aria-hidden="true">
    <span>{book.t}</span>
  </span>;
}
export function MobileDecorationArt({ item }) {
  const d = DECOS[item.deco];
  if (!d) return null;
  const art = MOBILE_ORNAMENT_ART[item.deco];
  if (art?.size) return <span className="ml-ornament-image" aria-hidden="true" style={{ backgroundImage: `url("${art.src || botanical}")`, backgroundSize: art.size, backgroundPosition: art.position, clipPath: art.clip, bottom: art.drop ? `${-art.drop * 100}%` : 0 }} />;
  return <span className="ml-ornament-image" aria-hidden="true" style={{ backgroundImage: `url("${d.src}")`, backgroundSize: d.pet ? "200% 100%" : "contain", backgroundPosition: d.pet ? "left center" : "center" }} />;
}
export default function MobileLibraryScene({ items, preferences, lights, shelf, onSelect, onZoom, focusItemId, closeUp = false, filter = "" }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(342);
  const zoom = shelf !== undefined;
  useLayoutEffect(() => {
    const node = ref.current;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (!focusItemId) return;
    const item = ref.current?.querySelector(`[data-mobile-item="${CSS.escape(focusItemId)}"]`);
    const scroll = item?.closest(".ml-shelf-scroll");
    if (!scroll) return;
    const box = item.getBoundingClientRect(), viewport = scroll.getBoundingClientRect();
    scroll.scrollLeft += box.left - viewport.left - (scroll.clientWidth - box.width) / 2;
  }, [focusItemId, shelf, width, closeUp]);
  const wood = MOBILE_WOODS.find(w => w.name === preferences.bookcase) || MOBILE_WOODS[0];
  const rows = zoom ? [shelf] : SHELF_LABELS.map((_, row) => row);
  return <div ref={ref} className={`ml-room ${zoom ? "ml-room-zoom" : ""}`} data-light={preferences.light} style={{ "--shelf-filter": wood.filter }}>
    {rows.map(row => {
      const content = items.filter(item => item.shelf === row);
      const sizes = content.map(item => mobileItemDimensions(item, closeUp ? 2 : zoom));
      const total = sizes.reduce((sum, d) => sum + d.w, 0) + Math.max(0, content.length - 1) * 5;
      const scale = zoom ? 1 : Math.max(.82, Math.min(1, (width - 28) / Math.max(1, total)));
      const tallest = Math.max(zoom ? 126 : 96, ...sizes.map(d => d.h * scale));
      const sagaNames = [...new Set(content.filter(item => !item.deco).map(item => libraryBookInfo(item).saga))];
      const label = preferences.grouping === "status" ? (row === SHELF_LABELS.length - 1 ? STATUS_LABELS.slice(row).join(" · ") : STATUS_LABELS[row]) : SHELF_LABELS[row];
      return <div className="ml-shelf" key={row}>
        {!zoom && <h3>{label}</h3>}
        <div className="ml-shelf-scroll">
          <div className="ml-shelf-items" data-mobile-shelf={row} aria-label={SHELF_LABELS[row]} style={{ minHeight: tallest + 14, minWidth: Math.max(width, total * scale + 28) }}>
            {lights !== "off" && <FairyLights mode={lights} />}
            {content.map((item, i) => <button type="button" key={item.id} data-mobile-item={item.id} data-mobile-activate="true" data-zoom-target={focusItemId === item.id || undefined} className={`ml-item ${item.deco ? "ml-item-deco" : "ml-item-book"}`} data-mode={item.mode} data-shade={filter && !item.t.toLowerCase().includes(filter) ? "dim" : undefined}
              aria-label={`Arrange ${item.t}`} title={item.t} onClick={event => onSelect(event, item.id)} onDoubleClick={event => onZoom?.(event, item.id)}
              style={{ width: sizes[i].w * scale, height: sizes[i].h * scale, "--spine-font": `${Math.max(8, Math.min(13, 10 * scale * (closeUp ? 1.8 : zoom ? 1.25 : 1)))}px` }}>
              {item.deco ? <MobileDecorationArt item={item} /> : <MobileBookArt book={item} />}
            </button>)}
            {!content.length && <p className="ml-empty-shelf">Drop a book here.</p>}
          </div>
        </div>
        <div className="ml-shelf-wood" aria-hidden="true" style={{ backgroundImage: `url("${shelfArt}")` }} />
        {preferences.grouping === "saga" && !zoom && <p className="ml-saga-label">{sagaNames.join(" · ")}</p>}
      </div>;
    })}
  </div>;
}
