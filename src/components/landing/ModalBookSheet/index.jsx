import "../shared/actions.css";
import "../shared/dialog.css";
import "../shared/typography.css";
import BookCover from "../BookCover";
import { imageAsset } from "../../../lib/image-assets.js";
import React, { useId, useRef, useState } from "react";
import "./styles.css";

const fields = [
  { key: "character", label: "Favourite character", hint: "who stole your heart?", icon: "heart", limit: 120 },
  { key: "song", label: "Its song", hint: "add a song…", icon: "music", limit: 160 },
  { key: "moment", label: "Part to remember", hint: "the scene you’ll keep…", icon: "quote", limit: 500 },
];

function Icon({ name }) {
  const paths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    music: <><path d="M9 18V5l12-2v13M9 8l12-2" /><ellipse cx="6" cy="18" rx="3" ry="3" /><ellipse cx="18" cy="16" rx="3" ry="3" /></>,
    quote: <><path d="M9 5C5 7 3 10 3 14v4h6v-6H4M21 5c-4 2-6 5-6 9v4h6v-6h-5" /></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
    book: <><path d="M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z" /></>,
    rotate: <><path d="M3 10a9 9 0 0 1 15-5l3 3M21 3v5h-5M21 14a9 9 0 0 1-15 5l-3-3M3 21v-5h5" /></>,
    plus: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
    star: <path d="m12 3 2.8 5.7 6.3.9-4.55 4.45 1.07 6.28L12 17.37l-5.62 2.96 1.07-6.28L2.9 9.6l6.3-.9Z" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function BookSheet({ sb, closeSheet, stopSheet, entry, updateEntry }) {
  const [page, setPage] = useState("journal");
  const [angled, setAngled] = useState(false);
  const [turn, setTurn] = useState(0);
  const tabsId = useId();
  const tabsRef = useRef(null);
  const paperStyle = { "--book-sheet-paper": `url("${imageAsset("/images/decorations/ivory-paper-texture.png")}")` };
  const score = entry.score || 0;
  const changeTab = event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "journal" : event.key === "End" ? "forum" : page === "journal" ? "forum" : "journal";
    setPage(next);
    tabsRef.current.querySelector(`[data-page="${next}"]`).focus();
  };
  return (
    <div onClick={closeSheet} className="salon-s295">
      <div onClick={stopSheet} role="dialog" aria-labelledby={`${tabsId}-title`} aria-modal="true" tabIndex={-1} className="salon-s294 salon-dialog">
        <button onClick={closeSheet} aria-label="Close" type="button" className="book-sheet-close">×</button>
        <div className="book-sheet-art" style={{ "--book-sheet-landscape": `url("${imageAsset("/images/decorations/book-sheet-starry-landscape.png")}")` }}>
          <button type="button" className="book-sheet-icon-button book-sheet-favourite" aria-label={`Favourite ${sb.t}`} aria-pressed={!!entry.favourite} onClick={() => updateEntry({ favourite: !entry.favourite })}>
            <Icon name="heart" />
          </button>
          <button type="button" className="book-sheet-book-scene" data-angled={angled}
            aria-label={`Rotate ${sb.t}`} title="Tap to rotate" onClick={() => setTurn(current => current + 1)}>
            <div key={turn} className="book-sheet-motion" data-motion={turn === 0 ? "fan" : "spin"}>
            <div className="salon-s275">
              <div className="salon-s274">
                <div className="salon-s269" style={{ background: sb.bg }} />
                <div className="salon-s270" />
                <div className="salon-s271" style={{ "--cover-bg": sb.bg }} />
                {Array.from({ length: 18 }, (_, index) => index + 1).map(leaf => <span key={leaf} className="book-sheet-fan-leaf" aria-hidden="true"
                  style={{ "--leaf-angle": `${-leaf * 9.5}deg`, "--leaf-depth": `${leaf * .5}px` }} />)}
                <div className="salon-s273"><BookCover book={sb} titleClass="salon-s272" /></div>
              </div>
            </div>
            </div>
          </button>
          <div className="book-sheet-view-controls" role="group" aria-label="Book view">
            <button type="button" className="book-sheet-icon-button" aria-label="Show cover" aria-pressed={!angled} onClick={() => setAngled(false)}><Icon name="book" /></button>
            <button type="button" className="book-sheet-icon-button" aria-label="Rotate book" aria-pressed={angled} onClick={() => setAngled(current => !current)}><Icon name="rotate" /></button>
          </div>
        </div>
        <div className="book-sheet-content" style={paperStyle}>
          <header className="book-sheet-heading">
            <div className="book-sheet-genre">{sb.g}</div>
            <h2 id={`${tabsId}-title`} className="book-sheet-title">{sb.t}</h2>
            <div className="book-sheet-author">{sb.a}</div>
            <p className="book-sheet-synopsis">{sb.blurb}</p>
            <p className="book-sheet-metadata">Pages, saga and details fill in automatically</p>
          </header>
          <section className="book-sheet-shelf" aria-labelledby={`${tabsId}-shelf`}>
            <h3 className="salon-s99" id={`${tabsId}-shelf`}>On my shelf</h3>
            <div className="book-sheet-status-controls" role="group" aria-label="Reading status">
              {["To read", "Reading", "Read"].map(status => (
                <button type="button" key={status} className="salon-marker-control book-sheet-status" aria-pressed={(entry.status || "To read") === status} onClick={() => updateEntry({ status })}>
                  <span className="salon-marker-text">{status}</span>
                </button>
              ))}
              <span className="book-sheet-shelf-icon"><Icon name="bookmark" /></span>
            </div>
          </section>
          <div className="book-sheet-pages">
            <section key={page} id={`${tabsId}-page`} role="tabpanel" tabIndex={0} aria-labelledby={`${tabsId}-${page}-tab`} className="book-sheet-page" data-page={page}>
              <span className="book-sheet-ribbon" aria-hidden="true" />
              {page === "journal" ? (
                <>
                  <h3 className="salon-s99 book-sheet-page-heading">My journal</h3>
                  <div className="book-sheet-journal-grid">
                    {fields.map(field => (
                      <label className="book-sheet-field" key={field.key}>
                        <span className="book-sheet-field-heading"><span>{field.label}</span><span className="book-sheet-field-icons"><Icon name={field.icon} /><Icon name="plus" /></span></span>
                        <input type="text" maxLength={field.limit} value={entry[field.key] || ""} placeholder={field.hint} onChange={event => updateEntry({ [field.key]: event.target.value })} />
                      </label>
                    ))}
                    <div className="book-sheet-rating">
                      <div className="book-sheet-field-heading" id={`${tabsId}-score`}>Total score</div>
                      <div className="book-sheet-stars" role="radiogroup" aria-labelledby={`${tabsId}-score`}>
                        {[1, 2, 3, 4, 5].map(value => (
                          <button key={value} type="button" role="radio" aria-checked={score === value} aria-label={`${value} out of 5 stars`} data-filled={value <= score} tabIndex={value === (score || 1) ? 0 : -1} onClick={() => updateEntry({ score: value })}
                            onKeyDown={event => {
                              const direction = ["ArrowRight", "ArrowUp"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 0;
                              if (!direction && event.key !== "Home" && event.key !== "End") return;
                              event.preventDefault();
                              const next = event.key === "Home" ? 1 : event.key === "End" ? 5 : (value - 1 + direction + 5) % 5 + 1;
                              updateEntry({ score: next });
                              event.currentTarget.parentElement.children[next - 1].focus();
                            }}><Icon name="star" /></button>
                        ))}
                      </div>
                      <span className="book-sheet-announcement" aria-live="polite">{score ? `${score} out of 5 stars` : "Not rated yet"}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="salon-s99 book-sheet-page-heading">Book discussion</h3>
                  <h4 className="book-sheet-discussion-title">What stayed with you after the last page?</h4>
                  <div className="book-sheet-reply"><span className="book-sheet-reader">Mia</span><p>“I finished the book, but I’m not quite ready to leave its world.”</p></div>
                  <div className="book-sheet-reply"><span className="book-sheet-reader">Lena</span><p>“Same here. Sometimes talking about it is part of finishing it.”</p></div>
                  <p className="book-sheet-page-footnote">Sample conversation · fictional readers · spoiler-free</p>
                </>
              )}
            </section>
          </div>
          <div ref={tabsRef} className="book-sheet-tabs" role="tablist" aria-label="Explore this book" onKeyDown={changeTab}>
            {[["journal", "Start my journal"], ["forum", "Forum →"]].map(([key, label]) => (
              <button key={key} id={`${tabsId}-${key}-tab`} data-page={key} role="tab" type="button" aria-selected={page === key} aria-controls={`${tabsId}-page`} tabIndex={page === key ? 0 : -1} onClick={() => setPage(key)} className="salon-marker-control book-sheet-tab"><span className="salon-marker-text">{label}</span></button>
            ))}
          </div>
          <p className="book-sheet-footnote">Preview of the app. Cover art is illustrative.</p>
        </div>
      </div>
    </div>
  );
}

export default function ModalBookSheet({ closeSheet, sb, sheetOpen, stopSheet }) {
  const [entries, setEntries] = useState({});
  if (!sheetOpen) return null;
  return <BookSheet key={sb.t} sb={sb} closeSheet={closeSheet} stopSheet={stopSheet} entry={entries[sb.t] || {}} updateEntry={patch => setEntries(current => ({ ...current, [sb.t]: { ...current[sb.t], ...patch } }))} />;
}
