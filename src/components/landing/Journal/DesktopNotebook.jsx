import React from "react";
import DecorativeFlower from "../shared/DecorativeFlower.jsx";
import { JOURNAL_EXAMPLE as book } from "../../../data/landing/journal.js";

function NotebookThought({ label, text, writingClass, sharing }) {
  return (
    <div className="salon-s113">
      <div>
        <div className="salon-s99">{label}</div>
        <div className={writingClass}>{text}</div>
      </div>
      <button type="button" className="salon-s112 salon-marker-control"
        aria-pressed={sharing.selected} onClick={sharing.toggle}>
        <span className="salon-marker-text">{sharing.state}</span>
      </button>
    </div>
  );
}

function NotebookRatings({ ratings }) {
  return (
    <div>
      <div className="salon-s118">
        <div className="salon-s116">Rating</div>
        <div className="salon-s117">tap to fill, pick your colour</div>
      </div>
      <div className="salon-s126">
        {ratings.map(rating => (
          <div key={rating.name} className="salon-s125" data-filled={rating.filled}
            style={{ "--rating-color": rating.color }}>
            <div className="salon-s119" data-total={rating.total}>{rating.name}</div>
            <div className="salon-s122">
              {rating.icons.map(icon => (
                <button key={icon.label} type="button" className="salon-s121 salon-hover133"
                  aria-label={icon.label} aria-pressed={icon.selected} onClick={icon.set}>
                  <svg className="salon-s120" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d={rating.path} strokeWidth={rating.sw} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="salon-s124" role="group" aria-label={`${rating.name} ink`}>
              {rating.colors.map(colour => (
                <button key={colour.label} type="button" className="salon-s123" style={{ background: colour.v }}
                  aria-label={colour.label} aria-pressed={colour.selected} onClick={colour.pick} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesktopNotebook({ bookColor, bookColors, chars, jSummary, linksRef, previewLinks, ratings, sh }) {
  return (
    <div className="journal-desktop-notebook">
      <div className="salon-s87"><DecorativeFlower colour="rose" /></div>
      <div className="salon-s131">
        <div className="salon-s88" />
        <div className="salon-s89" />
        <div className="salon-s130">
          <div className="salon-s90" style={{ background: bookColor }} />
          <div className="salon-s97">
            <div className="salon-s91" style={{ background: `linear-gradient(90deg, rgba(0,0,0,.25), transparent 12%), ${bookColor}` }} />
            <div className="salon-s96">
              <div className="salon-s92">{book.title}</div>
              <div className="salon-s94">
                {book.desktopMeta}<br />
                Book 1 of <span className="salon-s93">{book.series}</span>
              </div>
              <div className="salon-s95">Filled in automatically</div>
            </div>
          </div>
          <div className="salon-s98" />
          <div className="salon-s106">
            <div>
              <div className="salon-s99">My colour for it</div>
              <div className="salon-s101" role="group" aria-label="Book colour">
                {bookColors.map(colour => (
                  <button key={colour.name} type="button" className="salon-s100" style={{ background: colour.v }}
                    aria-label={colour.name} title={colour.name} aria-pressed={colour.selected} onClick={colour.pick} />
                ))}
              </div>
            </div>
            <div>
              <div className="salon-s99">Its song</div>
              <div className="salon-s104">
                <span className="salon-s102" style={{ "--journal-book-colour": bookColor }} />
                <span className="salon-s103">{book.song} · {book.artist}</span>
              </div>
            </div>
            <div>
              <div className="salon-s99">Reading time</div>
              <div className="salon-s105">{book.readingTime}</div>
            </div>
            <div>
              <div className="salon-s99">Read in</div>
              <div className="salon-s105">{book.language}</div>
            </div>
          </div>
          <div className="salon-s110">
            {chars.map(character => (
              <div key={character.label} className="salon-s109" style={{ background: character.bg }}>
                <div className="salon-s99">{character.label}</div>
                <div className="salon-s107">{character.name}</div>
                <div className="salon-s108">{character.note}</div>
              </div>
            ))}
          </div>
          <div className="salon-s115">
            <NotebookThought label="The part to remember" text={book.memory.replaceAll("\n", " ")} writingClass="salon-s111" sharing={sh.best} />
            <NotebookThought label="My review" text={book.desktopReview} writingClass="salon-s114" sharing={sh.review} />
          </div>
          <div className="salon-s98" />
          <NotebookRatings ratings={ratings} />
          <p className="salon-s127" role="status">{jSummary}</p>
          <div ref={linksRef} className="salon-s129">
            {previewLinks.map(link => (
              <button key={link.name} type="button" className="salon-s128 salon-marker-action salon-marker-link"
                aria-pressed={link.selected} onClick={link.pick}>
                <span className="salon-marker-text">{link.name} →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
