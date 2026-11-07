import React from "react";
import "./styles.css";
export default function BookCover({book,titleClass}){
  return <div className="salon-s44 book-cover-face" style={{'--cover-bg':book.bg,'--cover-ink':book.ink,'--cover-accent':book.accent}}>
    <div className="salon-s37"/><div className="salon-s38"/><div className="salon-s39">{book.g}</div>
    <div className="book-cover-motif" data-motif={book.motif}/>
    <div className="salon-s43"><div className={titleClass}>{book.t}</div><div className="salon-s41"/><div className="salon-s42">{book.a}</div></div>
  </div>;
}
