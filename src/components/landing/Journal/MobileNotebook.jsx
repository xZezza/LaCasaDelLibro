import React, { useId, useRef, useState } from "react";
import { JOURNAL_EXAMPLE as book, JOURNAL_TABS } from "../../../data/landing/journal.js";
import "./mobile.css";

function Icon({ name, className = "" }) {
  return <span aria-hidden="true" className={`mj-icon ${className}`} style={{ maskImage: `url(/images/icons/${name}.svg)` }} />;
}

function ColourChoices({ colours, label }) {
  return <div className="mj-colours" role="group" aria-label={label}>
    {colours.map(colour => <button key={colour.name} type="button" className="mj-colour"
      style={{ "--mj-colour": colour.v }} aria-pressed={colour.selected}
      aria-label={colour.name} onClick={colour.pick} />)}
  </div>;
}

function JournalDisclosure({ summary, action, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return <>
    <div className="mj-disclosure-heading">
      <h4 className="mj-disclosure-title">
        <button type="button" className="mj-disclosure-toggle" aria-controls={id}
          aria-expanded={open} onClick={() => setOpen(current => !current)}>
          <span className="mj-disclosure-text">{summary}</span>
          <Icon name="chevron-right" />
        </button>
      </h4>
      {action}
    </div>
    <div className="mj-disclosure-body" id={id} inert={!open}>
      <div className="mj-disclosure-clip">{children}</div>
    </div>
  </>;
}

function Thought({ title, text, sharing }) {
  return <section className="mj-thought">
    <JournalDisclosure summary={<span className="mj-label">{title}</span>} action={
      <button type="button" className="mj-sharing" aria-pressed={sharing.selected}
        aria-label={`Make ${title.toLowerCase()} ${sharing.selected ? "private" : "shared"}`}
        onClick={sharing.toggle}>
        <Icon name={sharing.selected ? "check" : "lock"} />{sharing.state}
      </button>
    }>
      <p className="mj-writing">{text.split("\n").map((line, index) => <React.Fragment key={index}><span>{line}</span>{" "}</React.Fragment>)}</p>
    </JournalDisclosure>
  </section>;
}

function RatingMark({ rating }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
    <path d={rating.path} strokeWidth={rating.sw} strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function horizontalSwipe(start, event) {
  if (start?.pointerId !== event.pointerId) return 0;
  const dx = event.clientX - start.x;
  const dy = event.clientY - start.y;
  return Math.abs(dx) >= 48 && Math.abs(dx) >= Math.abs(dy) * 1.5 ? Math.sign(dx) : 0;
}

function MobileRatings({ ratings }) {
  return <>
    <div className="mj-rating-heading">
      <h4 className="mj-label">Rating</h4>
      <p>tap to fill</p>
    </div>
    {ratings.map(rating => <fieldset key={rating.name} className="mj-rating"
      data-filled={rating.filled} data-total={rating.total} style={{ "--mj-rating-colour": rating.color }}>
      <legend>
        {rating.name}<span>{rating.icons.filter(item => item.selected).length} / {rating.icons.length}</span>
      </legend>
      <div className="mj-rating-values">
        {rating.icons.map(item => <button key={item.label} type="button"
          aria-label={item.label} aria-pressed={item.selected} onClick={item.set}>
          <RatingMark rating={rating} />
        </button>)}
      </div>
    </fieldset>)}
    <section className="mj-reading">
      <JournalDisclosure summary={<span className="mj-label">Reading details</span>} defaultOpen={false}>
        <dl className="mj-reading-details">
          <div><dt className="mj-label">Reading time</dt><dd>{book.readingTime}</dd></div>
          <div><dt className="mj-label">Read in</dt><dd>{book.language}</dd></div>
          <div className="mj-reading-song"><dt className="mj-label">Its song</dt><dd>{book.song} · {book.artist}</dd></div>
        </dl>
      </JournalDisclosure>
    </section>
  </>;
}

export default function MobileNotebook({ bookColor, bookColors, caption, chars, ratings, sh, jSummary }) {
  const [{ page, turn }, setPage] = useState({ page: 0, turn: undefined });
  const id = useId();
  const tabs = useRef([]);
  const pageSwipe = useRef(null);
  const suppressClick = useRef(false);
  const pageCount = JOURNAL_TABS.length;
  const previous = (page + pageCount - 1) % pageCount;
  const next = (page + 1) % pageCount;

  function select(index, focus = false, direction = index > page ? "next" : "previous") {
    if (index !== page) setPage({ page: index, turn: direction });
    if (focus) tabs.current[index]?.focus();
  }

  function onTabKey(event, index) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select((index + 1) % pageCount, true, "next");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select((index + pageCount - 1) % pageCount, true, "previous");
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : pageCount - 1, true);
    }
  }

  function startPageSwipe(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    pageSwipe.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function finishPageSwipe(event) {
    if (pageSwipe.current?.pointerId !== event.pointerId) return;
    const direction = horizontalSwipe(pageSwipe.current, event);
    pageSwipe.current = null;
    if (!direction) return;
    suppressClick.current = true;
    select(direction < 0 ? next : previous, false, direction < 0 ? "next" : "previous");
  }

  function cancelPageSwipe(event) {
    if (pageSwipe.current?.pointerId === event.pointerId) pageSwipe.current = null;
  }

  function filterPageClick(event) {
    if (!suppressClick.current || event.detail === 0) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return <div className="mobile-reading-journal">
    <div className="mj-notebook" data-turn={turn} style={{ "--mj-book-colour": bookColor }}
      onPointerDown={startPageSwipe} onPointerUp={finishPageSwipe}
      onPointerCancel={cancelPageSwipe} onPointerLeave={cancelPageSwipe} onClickCapture={filterPageClick}>
      <img className="mj-bookmark" src="/images/decorations/journal-bookmark.svg" alt="" width="18" height="43" draggable={false} />
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
        <div className="mj-character-list">
          {chars.map(character => <section key={character.label} className="salon-s109 mj-character"
            style={{ background: character.bg }}>
            <JournalDisclosure summary={
              <>
                <span className="mj-label salon-s99">{character.label}</span>
                <span className="salon-s107">{character.name}</span>
              </>
            }>
              <p className="salon-s108">{character.note}</p>
            </JournalDisclosure>
          </section>)}
        </div>
        <p className="mj-private-detail"><Icon name="lock" />These little opinions stay yours.</p>
      </div>

      <div className="mj-panel mj-ratings" role="tabpanel" id={`${id}-panel-2`} aria-labelledby={`${id}-tab-2`} hidden={page !== 2} tabIndex={0}>
        <MobileRatings ratings={ratings} />
      </div>

      <div className="mj-personal-details" hidden={page === 2}>
        <div><h3 className="mj-label">My colour for it</h3><ColourChoices colours={bookColors} label="Book colour" /></div>
        <div className="mj-song"><h3 className="mj-label"><Icon name="music" />Its song</h3><p>{book.song}</p></div>
      </div>

      <nav className="mj-pagination" aria-label="Journal page navigation">
        <button type="button" className="mj-previous" aria-label={`Previous page: ${JOURNAL_TABS[previous]}`} onClick={() => select(previous, false, "previous")}><Icon name="chevron-left" /></button>
        <span aria-live="polite" aria-atomic="true"><span className="mj-sr-only">{JOURNAL_TABS[page]}, page </span>{page + 1} / {pageCount}</span>
        <button type="button" className="mj-next" aria-label={`Next page: ${JOURNAL_TABS[next]}`} onClick={() => select(next, false, "next")}>{JOURNAL_TABS[next]}<Icon name="chevron-right" /></button>
      </nav>
    </div>

    <p className="mj-privacy-summary" role="status"><Icon name="lock" />{jSummary}</p>
    {caption}
  </div>;
}
