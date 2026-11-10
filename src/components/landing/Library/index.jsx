import "../shared/actions.css";
import "../shared/typography.css";
import React from "react";
import "./styles.css";

export default function Library(values) {
  const [showAllWoods, setShowAllWoods] = React.useState(false);
  const {
    openLib,
    readingTab,
    shelfBooks,
    shelfCaption,
    showNotes,
    showRead,
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
              className={"salon-s60 salon-marker-action salon-marker-primary"}
            >
              <span className="salon-marker-text">
              {"Open the full library"}
            </span>
            </button>
            {Boolean(showNotes) && (
              <>
                <span className={"salon-s61"}>{"drag, turn, stack them"}</span>
              </>
            )}
          </div>
        </div>
        <div className={"salon-s78 library-editorial-card"} data-all-materials={showAllWoods} data-reading-tab={readingTab} data-wood={woods.find((w) => w.selected)?.name || "Walnut"}>
          <div className={"salon-s70"}>
            <div className={"salon-s64"}>
              <button
                onClick={showRead}
                type="button"
                className={"salon-s63 salon-marker-control"}
                aria-pressed={readingTab === "read"}
              >
                <span className="salon-marker-text">
                {"Read"}
              </span>
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
                  {(showAllWoods ? woods : ["Walnut", "Oak", "Cream", "Sage", "Lavender"].map((name) => woods.find((w) => w.name === name)).filter(Boolean)).map((w, index4) => (
                    <React.Fragment key={index4}>
                      <button
                        onClick={w.pick}
                        title={w.name}
                        aria-label={w.name}
                        type="button"
                        className={"salon-s66"}
                        data-material={w.name} aria-pressed={w.selected} style={{background:w.top}}
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
              <button type="button" className="library-materials-more" aria-expanded={showAllWoods} onClick={() => setShowAllWoods((v) => !v)} aria-label={showAllWoods ? "Show five main materials" : "Show all shelf materials"}>{showAllWoods ? "Less ⌃" : "More ⌄"}</button>
            </div>
          </div>
          <button
            type="button"
            onClick={openLib}
            aria-label="Open the full library"
            aria-haspopup="dialog"
            className={"salon-s76 library-editorial-scene"} data-reading-tab={readingTab} data-wood={woods.find((w) => w.selected)?.name || "Walnut"}
          >
            <span className="library-editorial-hint" aria-hidden="true">drag, turn, stack them <span>⤵</span></span>
            <span className="library-editorial-prop library-editorial-ivy" aria-hidden="true" />
            <span className="library-editorial-prop library-editorial-vase" aria-hidden="true" />
            <span className={"salon-s75"}>
              <span className={"salon-s73"}>
                {shelfBooks.map((b, index5) => (
                  <React.Fragment key={index5}>
                    <span
                      className={"salon-s72 salon-hover83"} data-art-index={index5}
                      style={{
                        width: b.w + "px",
                        height: b.h + "px",
                        background: b.bg,
                        transform: b.tf,
                      }}
                    >
                      <span className={"salon-s71"}>{b.t}</span>
                    </span>
                  </React.Fragment>
                ))}
              </span>
              <span
                className={"salon-s74"}
                style={{ background: woodGrad }}
              ></span>
            </span>
          </button>
          <p className={"salon-s77"}>{shelfCaption}</p>
        </div>
      </section>
    </>
  );
}
