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

function MobileRatings({ ratings }) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsId = useId();
  const swipe = useRef(null);
  const suppressClick = useRef(false);
  const total = ratings.find(rating => rating.total);

  function startSwipe(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    swipe.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  }

  function finishSwipe(event) {
    const start = swipe.current;
    if (start?.pointerId !== event.pointerId) return;
    swipe.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    suppressClick.current = true;
    setShowDetails(dx > 0);
  }

  function filterSwipeClick(event) {
    if (!suppressClick.current || event.detail === 0) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return <div className="mj-rating-swipe" onPointerDown={startSwipe} onPointerUp={finishSwipe}
    onPointerCancel={() => { swipe.current = null; }} onClickCapture={filterSwipeClick}>
    {total && <div className="mj-rating-overview" hidden={showDetails}
      style={{ "--mj-rating-colour": total.color }}>
      <h4 className="mj-label">{total.name}</h4>
      <p className="mj-total-score">{total.icons.filter(item => item.selected).length}<span> / {total.icons.length}</span></p>
      <div className="mj-total-stars" aria-hidden="true">
        {total.icons.map(item => <span key={item.label} data-selected={item.selected}><RatingMark rating={total} /></span>)}
      </div>
    </div>}

    <div className="mj-rating-navigation">
      <button type="button" className="mj-rating-toggle salon-marker-control"
        aria-expanded={showDetails} aria-controls={detailsId} onClick={() => setShowDetails(current => !current)}>
        {showDetails && <Icon name="chevron-left" />}
        <span className="salon-marker-text">{showDetails ? "Back to total" : "View details"}</span>
        {!showDetails && <Icon name="chevron-right" />}
      </button>
      {!showDetails && <span className="mj-swipe-hint">Swipe right</span>}
    </div>

    <div className="mj-rating-breakdown" id={detailsId} hidden={!showDetails}>
      <p className="mj-rating-hint">Tap to rate.</p>
      {ratings.map(rating => <fieldset key={rating.name} className="mj-rating" data-filled={rating.filled} style={{ "--mj-rating-colour": rating.color }}>
        <legend>{rating.name}<span>{rating.icons.filter(item => item.selected).length} / {rating.icons.length}</span></legend>
        <div className="mj-rating-values">
          {rating.icons.map(item => <button key={item.label} type="button" aria-label={item.label} aria-pressed={item.selected} onClick={item.set}>
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
    </div>
  </div>;
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
          <JournalDisclosure summary={
            <>
              <span className="mj-label">{character.label}</span>
              <span className="mj-character-name">{character.name}</span>
            </>
          }>
            <p className="mj-character-note">{character.note}</p>
          </JournalDisclosure>
        </section>)}
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
        <button type="button" className="mj-previous" aria-label={`Previous page: ${JOURNAL_TABS[previous]}`} onClick={() => select(previous)}><Icon name="chevron-left" /></button>
        <span aria-live="polite" aria-atomic="true"><span className="mj-sr-only">{JOURNAL_TABS[page]}, page </span>{page + 1} / 3</span>
        <button type="button" className="mj-next" aria-label={`Next page: ${JOURNAL_TABS[next]}`} onClick={() => select(next)}>{JOURNAL_TABS[next]}<Icon name="chevron-right" /></button>
      </nav>
    </div>

    <p className="mj-privacy-summary" role="status"><Icon name="lock" />{jSummary}</p>
    <p className="mj-caption">A little of you, between the pages.</p>
  </div>;
}
