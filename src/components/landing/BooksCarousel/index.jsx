import React from "react";
import "./styles.css";

export default function BooksCarousel(values) {
  const {
    coverCursor,
    covers,
    dragEndCovers,
    dragMoveCovers,
    dragStartCovers,
    pauseCovers,
    prevCovers,
    nextCovers,
    openingQuoteRevealed,
    qCap,
    qLine,
    qWords,
    quoteRef,
    resumeCovers,
    trackRef,
    wheelCovers,
  } = values;
  return (
    <>
      <section className={"salon-s52"}>
        <div className={"salon-s33"}>
          <figure
            ref={quoteRef}
            className="salon-s30 salon-opening-quote"
            data-reveal={openingQuoteRevealed}
          >
            <span className={"salon-s24"} style={{ transform: qLine }}></span>
            <span className={"salon-s25"} style={{ transform: qLine }}></span>
            <blockquote
              aria-label={
                "One must always be careful of books… and what is inside them, for words have the power to change us."
              }
              className={"salon-s27"}
            >
              {qWords.map((w, index1) => (
                <React.Fragment key={index1}>
                  <span
                    aria-hidden={"true"}
                    className={"salon-s26"}
                    style={{
                      "--quote-delay": w.d,
                      opacity: w.op,
                      filter: w.blur,
                      transform: w.tf,
                      transition:
                        "opacity 1.1s ease " +
                        w.d +
                        ", filter 1.1s ease " +
                        w.d +
                        ", transform 1.2s cubic-bezier(.2,.8,.2,1) " +
                        w.d,
                    }}
                  >
                    {w.t}
                  </span>
                </React.Fragment>
              ))}
            </blockquote>
            <figcaption className={"salon-s29"} style={{ opacity: qCap }}>
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
            onWheel={wheelCovers}
            onPointerDown={dragStartCovers}
            onPointerMove={dragMoveCovers}
            onPointerUp={dragEndCovers}
            onPointerCancel={dragEndCovers}
            className={"salon-s50"}
            style={{ cursor: coverCursor }}
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
                          style={{ background: c.bg }}
                        ></div>
                        <div className={"salon-s35"}></div>
                        <div
                          className={"salon-s36"}
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(0,0,0,.35), rgba(255,255,255,.08) 50%, rgba(0,0,0,.35)), " +
                              c.bg,
                          }}
                        ></div>
                        <div className={"salon-s45"}>
                          <div
                            className={"salon-s44"}
                            style={{
                              background:
                                "radial-gradient(ellipse 90% 60% at 30% 20%, rgba(255,255,255,.16), transparent 60%), linear-gradient(90deg, rgba(0,0,0,.28), transparent 7%, rgba(255,255,255,.08) 9%, transparent 14%), " +
                                c.bg,
                              color: c.ink,
                            }}
                          >
                            <div
                              className={"salon-s37"}
                              style={{ border: "1px solid " + c.accent }}
                            ></div>
                            <div
                              className={"salon-s38"}
                              style={{ border: "1px solid " + c.accent }}
                            ></div>
                            <div
                              className={"salon-s39"}
                              style={{ color: c.accent }}
                            >
                              {c.g}
                            </div>
                            <div
                              style={{
                                width: c.mw + "px",
                                height: c.mh + "px",
                                borderRadius: c.mr,
                                border: c.mb,
                                boxShadow: c.ms,
                                transform: c.mt,
                              }}
                            ></div>
                            <div className={"salon-s43"}>
                              <div className={"salon-s40"}>{c.t}</div>
                              <div
                                className={"salon-s41"}
                                style={{ background: c.accent }}
                              ></div>
                              <div className={"salon-s42"}>{c.a}</div>
                            </div>
                          </div>
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
