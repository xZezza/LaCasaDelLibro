import React from "react";

export default function Library(values) {
  const {
    b,
    openLib,
    readTabBg,
    readTabFg,
    shelfBooks,
    shelfCaption,
    showNotes,
    showRead,
    showToRead,
    toReadTabBg,
    toReadTabFg,
    w,
    woodGrad,
    woodNext,
    woodNextC,
    woodPause,
    woodPlay,
    woodPrev,
    woodPrevC,
    woodRef,
    woods,
    x,
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
                style={{ background: readTabBg, color: readTabFg }}
              >
                {"Read"}
              </button>
              <button
                onClick={showToRead}
                type="button"
                className={"salon-s63"}
                style={{ background: toReadTabBg, color: toReadTabFg }}
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
                style={{ color: woodPrevC }}
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
                        style={{
                          background: w.top,
                          boxShadow:
                            "0 0 0 2px oklch(0.985 0.008 82), 0 0 0 3.5px " +
                            w.ring,
                        }}
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
                style={{ color: woodNextC }}
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
