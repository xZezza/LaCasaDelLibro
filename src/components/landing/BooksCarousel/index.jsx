import QuoteText from "../QuoteText";
import BookCover from "../BookCover";
import React from "react";
import "./styles.css";

export default function BooksCarousel(values) {
  const {
    coverDragging,
    covers,
    dragEndCovers,
    dragMoveCovers,
    dragStartCovers,
    pauseCovers,
    prevCovers,
    nextCovers,
    openingQuoteRevealed,
    quoteRef,
    resumeCovers,
    trackRef,
  } = values;
  return (
    <>
      <section className={"salon-s52"}>
        <div className={"salon-s33"}>
          <figure
            ref={quoteRef}
            className="salon-s30 salon-opening-quote quote-reveal" data-visible={true}
            data-reveal={openingQuoteRevealed}
          >
            <span className={"salon-s24"} ></span>
            <span className={"salon-s25"} ></span>
            <QuoteText text={"One must always be careful of books… and what is inside them, for words have the power to change us."} className="salon-s27" />
            <figcaption className={"salon-s29"} >
              {"Cassandra Clare · "}
              <span className={"salon-s28"}>{"Clockwork Angel"}</span>
            </figcaption>
          </figure>
          <h2 className={"salon-s31"}>{"The stories you carry with you."}</h2>
          <p className={"salon-s32"}>
            {
              "The books that made you dream, laugh, cry and feel everything. Keep them close, with your memories beside them."
            }
          </p>
        </div>
        <div className="salon-s51 salon-carousel-wrap">
          <button
            type="button"
            aria-label="Previous books"
            className="salon-carousel-arrow previous"
            onClick={prevCovers}
            onMouseEnter={pauseCovers}
            onMouseLeave={resumeCovers}
            onFocus={pauseCovers}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next books"
            className="salon-carousel-arrow next"
            onClick={nextCovers}
            onMouseEnter={pauseCovers}
            onMouseLeave={resumeCovers}
            onFocus={pauseCovers}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>
          <div
            data-salon-carousel=""
            onFocus={pauseCovers}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) resumeCovers();
            }}
            onMouseEnter={pauseCovers}
            onMouseLeave={resumeCovers}
            onPointerDown={dragStartCovers}
            onPointerMove={dragMoveCovers}
            onPointerUp={dragEndCovers}
            onPointerCancel={dragEndCovers}
            className={"salon-s50"}
            data-dragging={coverDragging}
          >
            <div ref={trackRef} className={"salon-s49"}>
              {covers.map((c, index2) => (
                <React.Fragment key={index2}>
                  <div className={"salon-s48"} aria-hidden={c.duplicate}>
                    <div
                      onClick={c.open}
                      role={"button"}
                      aria-label={"Open " + c.t}
                      tabIndex={c.duplicate ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.currentTarget.click();
                        }
                      }}
                      className={"salon-s47"}
                    >
                      <div className={"salon-s46 salon-hover53"}>
                        <div
                          className={"salon-s34"}
                          style={{background: c.bg}}
                        ></div>
                        <div className={"salon-s35"}></div>
                        <div
                          className={"salon-s36"}
                          style={{"--cover-bg": c.bg}}
                        ></div>
                        <div className={"salon-s45"}>
                          <BookCover book={c} titleClass="salon-s40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
