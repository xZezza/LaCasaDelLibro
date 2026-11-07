import "../shared/typography.css";
import React from "react";
import "./styles.css";

export default function Library(values) {
  const {
    openLib,
    readingTab,
    shelfBooks,
    shelfCaption,
    showNotes,
    showRead,
    showToRead,
    woodGrad,
    woodNext,
    woodPause,
    woodPlay,
    woodPrev,
    woodRef,
    woods,
  } = values;
  return (
    <>
      <section id={"library"} className={"salon-s79 salon-library"}>
        <div>
          <div className={"salon-s57"}>{"I · The Library"}</div>
          <h2 className={"salon-s58"}>{"Shelves that look like you."}</h2>
          <p className={"salon-s59"}>
            {
              "A three-dimensional library you can arrange and personalise. The books you’ve finished and the ones still waiting for you, side by side, in a room that feels like yours."
            }
          </p>
          <div className={"salon-s62"}>
            <button
              onClick={openLib}
              type="button"
              className={"salon-s60 salon-hover68"}
            >
              {"Open the full library"}
            </button>
            {Boolean(showNotes) && (
              <>
                <span className={"salon-s61"}>{"drag, turn, stack them"}</span>
              </>
            )}
          </div>
        </div>
        <div className={"salon-s78"}>
          <div className={"salon-s70"}>
            <div className={"salon-s64"}>
              <button
                onClick={showRead}
                type="button"
                className={"salon-s63"}
                aria-pressed={readingTab === "read"}
              >
                {"Read"}
              </button>
              <button
                onClick={showToRead}
                type="button"
                className={"salon-s63"}
                aria-pressed={readingTab === "toread"}
              >
                {"To read"}
              </button>
            </div>
            <div className={"salon-s69"}>
              <span>{"Shelf"}</span>
              <button
                onClick={woodPrev}
                aria-label={"More colours"}
                type="button"
                className={"salon-s65 salon-hover74"}
              >
                {"‹"}
              </button>
              <div
                onMouseEnter={woodPause}
                onMouseLeave={woodPlay}
                className={"salon-s68"}
              >
                <div ref={woodRef} className={"salon-s67"}>
                  {woods.map((w, index4) => (
                    <React.Fragment key={index4}>
                      <button
                        onClick={w.pick}
                        title={w.name}
                        aria-label={w.name}
                        type="button"
                        className={"salon-s66"}
                        aria-pressed={w.selected} style={{background:w.top}}
                      ></button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                onClick={woodNext}
                aria-label={"More colours"}
                type="button"
                className={"salon-s65 salon-hover78"}
              >
                {"›"}
              </button>
            </div>
          </div>
          <div className={"salon-s76"}>
            <div className={"salon-s75"}>
              <div className={"salon-s73"}>
                {shelfBooks.map((b, index5) => (
                  <React.Fragment key={index5}>
                    <div
                      className={"salon-s72 salon-hover83"}
                      style={{
                        width: b.w + "px",
                        height: b.h + "px",
                        background: b.bg,
                        transform: b.tf,
                      }}
                    >
                      <span className={"salon-s71"}>{b.t}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div
                className={"salon-s74"}
                style={{ background: woodGrad }}
              ></div>
            </div>
          </div>
          <p className={"salon-s77"}>{shelfCaption}</p>
        </div>
      </section>
    </>
  );
}
