import React from "react";
import { ILLUSTRATED_COVERS } from "../../../data/landing/illustrated-covers.js";
import { imageAsset } from "../../../lib/image-assets.js";
import "./styles.css";
export default function BookCover({book,titleClass}){
  const illustrated = ILLUSTRATED_COVERS.find(cover => cover.title === book.t);
  return <div className="salon-s44 book-cover-face" data-illustrated={!!illustrated} style={{'--cover-bg':book.bg,'--cover-ink':book.ink,'--cover-accent':book.accent}}>
    {illustrated && <span className="book-cover-mobile-art" aria-hidden="true">
      <img src={illustrated.responsiveSrc} srcSet={`${illustrated.responsiveSrc} 600w, ${imageAsset(illustrated.src)} 1060w`} sizes="(max-width: 650px) 220px, 110px" alt="" width="1000" height="1400" loading="lazy" decoding="async" />
      {illustrated.liveTitle && <span className="book-cover-mobile-lettering"><span>{book.t}</span><small>{book.a}</small></span>}
    </span>}
    <div className="salon-s37"/><div className="salon-s38"/><div className="salon-s39">{book.g}</div>
    <div className="book-cover-motif" data-motif={book.motif}/>
    <div className="salon-s43"><div className={titleClass}>{book.t}</div><div className="salon-s41"/><div className="salon-s42">{book.a}</div></div>
  </div>;
}
