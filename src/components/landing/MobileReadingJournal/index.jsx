import React, { useId, useRef, useState } from "react";
import { JOURNAL_EXAMPLE as book, JOURNAL_TABS } from "../../../data/landing/journal.js";
import "../shared/actions.css";
import "./styles.css";

function Icon({ name, className = "" }) {
  return <span aria-hidden="true" className={`mj-icon ${className}`} style={{ maskImage: `url(/images/icons/${name}.svg)` }} />;
}

function ColourChoices({ colours, label }) {
  return <div className="mj-colours" role="group" aria-label={label}>
    {colours.map((colour, index) => <button
      key={colour.name || index} type="button" className="mj-colour"
      style={{ "--mj-colour": colour.v }} aria-pressed={colour.selected}
      aria-label={colour.name || `${label} ${index + 1}`} onClick={colour.pick}
    />)}
  </div>;
}

function Thought({ title, text, sharing }) {
  return <section className="mj-thought">
    <div className="mj-thought-heading">
      <h3 className="mj-label">{title}</h3>
      <button type="button" className="mj-sharing" aria-pressed={sharing.selected}
        aria-label={`Make ${title.toLowerCase()} ${sharing.selected ? "private" : "shared"}`}
        onClick={sharing.toggle}>
        <Icon name={sharing.selected ? "check" : "lock"} />{sharing.state}
      </button>
    </div>
    <p className="mj-writing">{text.split("\n").map((line, index) => <React.Fragment key={index}><span>{line}</span>{" "}</React.Fragment>)}</p>
  </section>;
}

export default function MobileReadingJournal({ bookColor, bookColors, chars, ratings, sh, jSummary }) {
  const [page, setPage] = useState(0);
  const id = useId();
  const tabs = useRef([]);
  function select(index, focus = false) {
    setPage(index);
    if (focus) tabs.current[index]?.focus();
  }
  function onTabKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % JOURNAL_TABS.length;
    if (event.key === "ArrowLeft") next = (index + JOURNAL_TABS.length - 1) % JOURNAL_TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = JOURNAL_TABS.length - 1;
    if (next !== undefined) { event.preventDefault(); select(next, true); }
  }
  const previous = (page + 2) % 3;
  const next = (page + 1) % 3;

  return <div className="mobile-reading-journal">
    <header className="mj-intro">
      <div className="mj-eyebrow">II · The Journal</div>
      <h2>A private diary<br />for every book.</h2>
      <p>Keep the story. Keep how it felt.</p>
    </header>

    <div className="mj-notebook" style={{ "--mj-book-colour": bookColor }}>
      <img className="mj-bookmark" src="/images/decorations/journal-bookmark.svg" alt="" width="18" height="43" />
      <header className="mj-book">
        <h3>{book.title}</h3>
        <p>{book.meta}</p>
      </header>

      <div className="mj-tabs" role="tablist" aria-label="Reading journal pages">
        {JOURNAL_TABS.map((name, index) => <button key={name} type="button" role="tab"
          className="salon-marker-control" ref={element => { tabs.current[index] = element; }}
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
          aria-selected={page === index} tabIndex={page === index ? 0 : -1}
          onClick={() => select(index)} onKeyDown={event => onTabKey(event, index)}>
          <span className="salon-marker-text">{name}</span>
        </button>)}
      </div>

      <div className="mj-panel" role="tabpanel" id={`${id}-panel-0`} aria-labelledby={`${id}-tab-0`} hidden={page !== 0} tabIndex={0}>
        <Thought title="The part to remember" text={book.memory} sharing={sh.best} />
        <Thought title="My review" text={book.review} sharing={sh.review} />
      </div>

      <div className="mj-panel mj-characters" role="tabpanel" id={`${id}-panel-1`} aria-labelledby={`${id}-tab-1`} hidden={page !== 1} tabIndex={0}>
        {chars.map(character => <section key={character.label} className="mj-character" style={{ "--mj-character-colour": character.bg }}>
          <h3 className="mj-label">{character.label}</h3>
          <p className="mj-character-name">{character.name}</p>
          <p className="mj-character-note">{character.note}</p>
        </section>)}
        <p className="mj-private-detail"><Icon name="lock" />These little opinions stay yours.</p>
      </div>

      <div className="mj-panel mj-ratings" role="tabpanel" id={`${id}-panel-2`} aria-labelledby={`${id}-tab-2`} hidden={page !== 2} tabIndex={0}>
        <p className="mj-rating-hint">Tap to fill, pick your colour.</p>
        {ratings.map(rating => <fieldset key={rating.name} className="mj-rating" data-filled={rating.filled} style={{ "--mj-rating-colour": rating.color }}>
          <legend>{rating.name}<span>{rating.icons.filter(item => item.selected).length} / 5</span></legend>
          <div className="mj-rating-tools">
            <div className="mj-rating-values">
              {rating.icons.map(item => <button key={item.label} type="button" aria-label={item.label} aria-pressed={item.selected} onClick={item.set}>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path d={rating.path} strokeWidth={rating.sw} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>)}
            </div>
            <ColourChoices colours={rating.colors} label={`${rating.name} colour`} />
          </div>
        </fieldset>)}
        <dl className="mj-reading-details"><div><dt className="mj-label">Reading time</dt><dd>{book.readingTime}</dd></div><div><dt className="mj-label">Read in</dt><dd>{book.language}</dd></div><div className="mj-reading-song"><dt className="mj-label">Its song</dt><dd>{book.song} · {book.artist}</dd></div></dl>
      </div>

      <div className="mj-personal-details">
        <div><h3 className="mj-label">My colour for it</h3><ColourChoices colours={bookColors} label="Book colour" /></div>
        <div className="mj-song"><h3 className="mj-label"><Icon name="music" />Its song</h3><p>{book.song}</p></div>
      </div>

      <nav className="mj-pagination" aria-label="Journal page navigation">
        <button type="button" className="mj-previous" aria-label={`Previous page: ${JOURNAL_TABS[previous]}`} onClick={() => select(previous)}><Icon name="chevron-left" /></button>
        <span aria-live="polite" aria-atomic="true"><span className="mj-sr-only">{JOURNAL_TABS[page]}, page </span>{page + 1} / 3</span>
        <button type="button" className="mj-next" aria-label={`Next page: ${JOURNAL_TABS[next]}`} onClick={() => select(next)}>{JOURNAL_TABS[next]}<Icon name="chevron-right" /></button>
      </nav>
    </div>

    <p className="mj-privacy-summary" role="status"><Icon name="lock" />{jSummary}</p>
    <p className="mj-caption">A little of you, between the pages.</p>
  </div>;
}
