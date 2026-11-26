import BookCover from "../BookCover";
import MobileBooksCarousel from "../MobileBooksCarousel";
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
    openMobileCover,
    sheetOpen,
    resumeCovers,
    trackRef,
  } = values;
  return (
    <>
      <section className={"salon-s52"}>
        <div className={"salon-s33"}>
          <h2 id="stories-title" className={"salon-s31"}>{"The stories you carry with you."}</h2>
          <p className={"salon-s32"}>
            <span className="books-copy-wide">The books that made you dream, laugh, cry and feel everything. Keep them close, with your memories beside them.</span>
            <span className="books-copy-phone">The books you love, with your memories beside them.</span>
          </p>
        </div>
        <MobileBooksCarousel books={covers.filter(book => !book.duplicate)} onOpen={openMobileCover} dialogOpen={sheetOpen} />
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
