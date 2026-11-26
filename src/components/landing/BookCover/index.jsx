import React from "react";
import { illustratedCoverFor } from "../../../data/landing/illustrated-covers.js";
import IllustratedCover from "./IllustratedCover.jsx";
import "./styles.css";
export default function BookCover({book,titleClass}){
  const illustrated = illustratedCoverFor(book.t);
  return <div className="salon-s44 book-cover-face" data-illustrated={!!illustrated} style={{'--cover-bg':book.bg,'--cover-ink':book.ink,'--cover-accent':book.accent}}>
    {illustrated && <span className="book-cover-mobile-art" aria-hidden="true">
      <IllustratedCover art={illustrated} book={book} sizes="(max-width: 650px) 220px, 110px"
        letteringClass="book-cover-mobile-lettering" />
    </span>}
    <div className="salon-s37"/><div className="salon-s38"/><div className="salon-s39">{book.g}</div>
    <div className="book-cover-motif" data-motif={book.motif}/>
    <div className="salon-s43"><div className={titleClass}>{book.t}</div><div className="salon-s41"/><div className="salon-s42">{book.a}</div></div>
  </div>;
}
