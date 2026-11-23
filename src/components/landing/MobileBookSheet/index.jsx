import React, { useId, useRef, useState } from "react";
import BookCover from "../BookCover";
import { imageAsset } from "../../../lib/image-assets.js";
import "../shared/actions.css";
import "./styles.css";

function Icon({ name, className = "" }) {
  return <span aria-hidden="true" className={`mbs-icon ${className}`} style={{ maskImage: `url(/images/icons/${name}.svg)` }} />;
}

export default function MobileBookSheet({ sb, closeSheet, stopSheet, entry, updateEntry }) {
  const id = useId();
  const [panel, setPanel] = useState(null);
  const [coverOpen, setCoverOpen] = useState(false);
  const scoreRef = useRef(null);
  const score = entry.score || 0;
  const toggle = name => setPanel(current => current === name ? null : name);
  const toggleCover = () => setCoverOpen(current => !current);

  function changeScore(event, value) {
    const direction = ["ArrowRight", "ArrowUp"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 0;
    if (!direction && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next = event.key === "Home" ? 1 : event.key === "End" ? 5 : (value - 1 + direction + 5) % 5 + 1;
    updateEntry({ score: next });
    scoreRef.current.children[next - 1].focus();
  }

  return <div className="mbs-overlay" onClick={closeSheet}>
    <div className="mbs-dialog salon-dialog" data-book-sheet-dialog role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} tabIndex={-1} onClick={stopSheet}>
      <header className="mbs-toolbar">
        <span className="mbs-preview-label">Book preview</span>
        <button className="mbs-close" type="button" aria-label="Close" onClick={closeSheet}><Icon name="x" /></button>
      </header>

      <div className="mbs-body">
        <div className="mbs-identity">
          <button className="mbs-cover" type="button" onClick={toggleCover} aria-label={`View cover for ${sb.t}`} aria-expanded={coverOpen} aria-controls={`${id}-cover`}>
            <BookCover book={sb} titleClass="mbs-cover-lettering" />
          </button>
          <div className="mbs-book-info">
            <p className="mbs-genre">{sb.g}</p>
            <h2 id={`${id}-title`}>{sb.t}</h2>
            <p className="mbs-author">{sb.a}</p>
            <button className="mbs-favourite" type="button" aria-label={`Favourite ${sb.t}`} aria-pressed={!!entry.favourite} onClick={() => updateEntry({ favourite: !entry.favourite })}>
              <Icon name={entry.favourite ? "heart-filled" : "heart"} /><span>Favourite</span>
            </button>
          </div>
        </div>

        <p className="mbs-synopsis">{sb.blurb}</p>
        <button className="mbs-view-cover salon-marker-control" type="button" aria-expanded={coverOpen} aria-controls={`${id}-cover`} onClick={toggleCover}>
          <span className="salon-marker-text">{coverOpen ? "Hide cover" : "View cover"}</span><Icon name="arrow-right" className={coverOpen ? "mbs-up" : ""} />
        </button>
        <div id={`${id}-cover`} className="mbs-cover-preview" hidden={!coverOpen} role="region" aria-label={`Cover preview for ${sb.t}`}>
          <div className="mbs-large-cover" role="img" aria-label={`Illustrative cover of ${sb.t}`}><div aria-hidden="true"><BookCover book={sb} titleClass="mbs-cover-lettering" /></div></div>
        </div>

        <section className="mbs-shelf" aria-labelledby={`${id}-shelf`}>
          <h3 id={`${id}-shelf`}>On my shelf</h3>
          <div className="mbs-statuses" role="group" aria-label="Reading status">
            {["To read", "Reading", "Read"].map(status => <button key={status} type="button" className="salon-marker-control" aria-pressed={(entry.status || "To read") === status} onClick={() => updateEntry({ status })}><span className="salon-marker-text">{status}</span></button>)}
          </div>
        </section>

        <div className="mbs-disclosures">
          <section className="mbs-disclosure">
            <h3><button id={`${id}-journal-toggle`} className="mbs-disclosure-toggle" type="button" aria-expanded={panel === "journal"} aria-controls={`${id}-journal`} onClick={() => toggle("journal")}>
              My journal<Icon name="chevron-right" className="mbs-journal-chevron" />
            </button></h3>
            <div id={`${id}-journal`} className="mbs-panel mbs-journal" role="region" aria-labelledby={`${id}-journal-toggle`} hidden={panel !== "journal"} style={{ "--mbs-paper": `url("${imageAsset("/images/decorations/ivory-paper-texture.png")}")` }}>
              <img className="mbs-bookmark" src="/images/decorations/journal-bookmark.svg" alt="" width="18" height="43" />
              <label className="mbs-field"><span>Favourite character</span><input type="text" maxLength={120} value={entry.character || ""} placeholder="who stole your heart?" onChange={event => updateEntry({ character: event.target.value })} /></label>
              <label className="mbs-field"><span>Its song</span><input type="text" maxLength={160} value={entry.song || ""} placeholder="add a song…" onChange={event => updateEntry({ song: event.target.value })} /></label>
              <label className="mbs-field"><span>Part to remember</span><textarea rows={2} maxLength={500} value={entry.moment || ""} placeholder="the scene you’ll keep…" onChange={event => updateEntry({ moment: event.target.value })} /></label>
              <div className="mbs-score">
                <div className="mbs-field-label" id={`${id}-score-label`}>Total score</div>
                <div ref={scoreRef} className="mbs-stars" role="radiogroup" aria-labelledby={`${id}-score-label`}>
                  {[1, 2, 3, 4, 5].map(value => <button key={value} type="button" role="radio" aria-checked={score === value} aria-label={`${value} out of 5 stars`} data-filled={value <= score} tabIndex={value === (score || 1) ? 0 : -1} onClick={() => updateEntry({ score: value })} onKeyDown={event => changeScore(event, value)}><Icon name={value <= score ? "star-filled" : "star"} /></button>)}
                </div>
                <span className="mbs-sr-only" aria-live="polite">{score ? `${score} out of 5 stars` : "Not rated yet"}</span>
              </div>
            </div>
          </section>
          <section className="mbs-disclosure">
            <h3><button id={`${id}-forum-toggle`} className="mbs-disclosure-toggle" type="button" aria-expanded={panel === "forum"} aria-controls={`${id}-forum`} onClick={() => toggle("forum")}>
              Forum<Icon name="arrow-right" />
            </button></h3>
            <div id={`${id}-forum`} className="mbs-panel mbs-forum" role="region" aria-labelledby={`${id}-forum-toggle`} hidden={panel !== "forum"}>
              <h4>What stayed with you after the last page?</h4>
              <div className="mbs-reply"><span>Mia</span><p>“I finished the book, but I’m not quite ready to leave its world.”</p></div>
              <div className="mbs-reply"><span>Lena</span><p>“Same here. Sometimes talking about it is part of finishing it.”</p></div>
              <p className="mbs-sample-note">Sample conversation · fictional readers · spoiler-free</p>
            </div>
          </section>
        </div>
        <p className="mbs-footnote">Preview of the app · Cover art is illustrative.</p>
      </div>
    </div>
  </div>;
}
