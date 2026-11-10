import "../shared/actions.css";
import "../shared/dialog.css";
import BookCover from "../BookCover";
import { imageAsset } from "../../../lib/image-assets.js";
import "../shared/typography.css";
import React, { useId, useState } from "react";
import "./styles.css";

const hints = [
  ["Favourite character", "who stole your heart?"],
  ["Its song", "add a song…"],
  ["Part to remember", "the scene you’ll keep…"],
];

function BookSheet({ sb, closeSheet, stopSheet, score, onRate }) {
  const [page, setPage] = useState("journal");
  const tabsId = useId();
  const changeTab = (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "journal" : event.key === "End" ? "forum" : page === "journal" ? "forum" : "journal";
    setPage(next);
    document.getElementById(`${tabsId}-${next}-tab`)?.focus();
  };
  return (
    <div onClick={closeSheet} className="salon-s295">
      <div onClick={stopSheet} role="dialog" aria-label={sb.t} aria-modal="true" tabIndex={-1}
        className="salon-s294 salon-dialog">
        <button onClick={closeSheet} aria-label="Close" type="button" className="salon-s268 salon-hover293">×</button>
        <div className="salon-s276 book-sheet-still-life"
          style={{ "--book-sheet-texture": `url("${imageAsset("/images/decorations/ivory-paper-texture.png")}")` }}>
          <div className="book-sheet-book-scene">
            <div className="book-sheet-paper" aria-hidden="true" />
            <svg className="book-sheet-glasses" viewBox="0 0 160 70" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 27 6 6m134 21 12-21M68 39c7-7 17-7 24 0" />
                <ellipse cx="43" cy="43" rx="27" ry="20" /><ellipse cx="117" cy="43" rx="27" ry="20" />
                <path d="M16 38 9 34m135 4 7-4" />
              </g>
            </svg>
            <div className="salon-s275">
              <div className="salon-s274">
                <div className="salon-s269" style={{ background: sb.bg }} />
                <div className="salon-s270" />
                <div className="salon-s271" style={{ "--cover-bg": sb.bg }} />
                <div className="salon-s273"><BookCover book={sb} titleClass="salon-s272" /></div>
              </div>
              <span className="book-sheet-ribbon" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="salon-s293">
          <div>
            <div className="salon-s277">{sb.g}</div>
            <div className="salon-s278">{sb.t}</div>
            <div className="salon-s279">{sb.a}</div>
            <p className="salon-s280">{sb.blurb}</p>
            <div className="salon-s281">Pages, saga and details fill in automatically</div>
          </div>
          <div className="book-sheet-tabs" role="tablist" aria-label="Explore this book" onKeyDown={changeTab}>
            {[["journal", "Start my journal"], ["forum", "Forum"]].map(([key, label]) => (
              <button key={key} id={`${tabsId}-${key}-tab`} role="tab" type="button"
                aria-selected={page === key} aria-controls={`${tabsId}-page`}
                tabIndex={page === key ? 0 : -1} onClick={() => setPage(key)}
                className="salon-marker-control book-sheet-tab"><span className="salon-marker-text">{label}</span></button>
            ))}
          </div>
          <div className="book-sheet-pages">
            <section key={page} id={`${tabsId}-page`} role="tabpanel" tabIndex={0}
              aria-labelledby={`${tabsId}-${page}-tab`} className="salon-s288 book-sheet-page" data-page={page}>
              {page === "journal" ? (
                <>
                  <div className="book-sheet-page-heading"><span className="salon-s99">My journal</span><span className="book-sheet-page-number">01</span></div>
                  <div className="salon-s287">
                    {hints.map(([label, hint], index) => (
                      <div key={label}>
                        <div className="salon-s284">{label}</div>
                        <div className="salon-s285"><span className="book-sheet-typed" style={{ "--typing-steps": hint.length, "--typing-delay": `${index * 0.35 + 0.2}s` }}>{hint}</span></div>
                      </div>
                    ))}
                    <div>
                      <div className="salon-s284" id={`${tabsId}-score`}>Total score</div>
                      <div className="book-sheet-stars" role="radiogroup" aria-labelledby={`${tabsId}-score`}>
                        {[1, 2, 3, 4, 5].map(value => (
                          <button key={value} type="button" role="radio" aria-checked={score === value}
                            aria-label={`${value} out of 5 stars`} data-filled={value <= score}
                            tabIndex={value === (score || 1) ? 0 : -1} onClick={() => onRate(value)}
                            onKeyDown={event => {
                              const direction = ["ArrowRight", "ArrowUp"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 0;
                              if (!direction && event.key !== "Home" && event.key !== "End") return;
                              event.preventDefault();
                              const next = event.key === "Home" ? 1 : event.key === "End" ? 5 : (value - 1 + direction + 5) % 5 + 1;
                              onRate(next);
                              event.currentTarget.parentElement.children[next - 1].focus();
                            }}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.3.9-4.55 4.45 1.07 6.28L12 17.37l-5.62 2.96 1.07-6.28L2.9 9.6l6.3-.9Z" /></svg>
                          </button>
                        ))}
                      </div>
                      <span className="book-sheet-score" aria-live="polite">{score ? `${score} / 5` : "How did it feel?"}</span>
                    </div>
                  </div>
                  <p className="book-sheet-page-footnote">Private by default. Share only what you choose.</p>
                </>
              ) : (
                <>
                  <div className="book-sheet-page-heading"><span className="salon-s99">Book discussion</span><span className="book-sheet-page-number">02</span></div>
                  <h3 className="book-sheet-discussion-title">What stayed with you after the last page?</h3>
                  <div className="book-sheet-reply"><span className="book-sheet-reader">Mia</span><p>“I finished the book, but I’m not quite ready to leave its world.”</p></div>
                  <div className="book-sheet-reply"><span className="book-sheet-reader">Lena</span><p>“Same here. Sometimes talking about it is part of finishing it.”</p></div>
                  <p className="book-sheet-page-footnote">Sample conversation · fictional readers · spoiler-free</p>
                </>
              )}
            </section>
          </div>
          <p className="salon-s292">Interactive concept preview. Cover art is illustrative.</p>
        </div>
      </div>
    </div>
  );
}

export default function ModalBookSheet({ closeSheet, sb, sheetOpen, stopSheet }) {
  const [ratings, setRatings] = useState({});
  if (!sheetOpen) return null;
  return <BookSheet key={sb.t} sb={sb} closeSheet={closeSheet} stopSheet={stopSheet}
    score={ratings[sb.t] || 0} onRate={value => setRatings(current => ({ ...current, [sb.t]: value }))} />;
}
