import React from "react";
import { illustratedCoverFor } from "../../../data/landing/illustrated-covers.js";

export default function LibraryBookFaces({ title }) {
  const cover = illustratedCoverFor(title);
  return (
    <div className="salon-s232" aria-hidden="true">
      <div className="salon-s225"><span className="salon-s224">{title}</span></div>
      <div className="salon-s228" data-illustrated-cover={cover ? "true" : undefined}>
        {cover && <img className="library-book-cover-art" src={cover.responsiveSrc} alt="" width="5" height="7" loading="lazy" decoding="async" draggable={false} />}
        {(!cover || cover.liveTitle) && <span className="salon-s227">{title}</span>}
      </div>
      <div className="salon-s229" />
      <div className="salon-s230" />
      <div className="salon-s231" />
      <div className="library-book-bottom" />
    </div>
  );
}
