import React from "react";
import { imageAsset } from "../../../lib/image-assets.js";

export default function IllustratedCover({ art, book, sizes, letteringClass, draggable }) {
  return (
    <>
      {art && (
        <img src={art.responsiveSrc} srcSet={`${art.responsiveSrc} 600w, ${imageAsset(art.src)} 1060w`}
          sizes={sizes} width="1000" height="1400" alt="" loading="lazy" decoding="async" draggable={draggable} />
      )}
      {(!art || art.liveTitle) && (
        <span className={letteringClass}><span>{book.t}</span><small>{book.a}</small></span>
      )}
    </>
  );
}
