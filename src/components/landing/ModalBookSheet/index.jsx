import "../shared/dialog.css";
import BookCover from "../BookCover";
import "../shared/typography.css";
import React from "react";
import "./styles.css";

export default function ModalBookSheet(values) {
  const {
    closeSheet,
    goForum,
    goJournal,
    sb,
    sheetOpen,
    sheetStatus,
    stopSheet,
  } = values;
  return (
    <>
      {Boolean(sheetOpen) && (
        <>
          <div onClick={closeSheet} className={"salon-s295"}>
            <div
              onClick={stopSheet}
              role={"dialog"}
              aria-label={sb.t}
              aria-modal="true"
              tabIndex={-1}
              className={"salon-s294 salon-dialog"}
            >
              <button
                onClick={closeSheet}
                aria-label={"Close"}
                type="button"
                className={"salon-s268 salon-hover293"}
              >
                {"×"}
              </button>
              <div className={"salon-s276"}>
                <div className={"salon-s275"}>
                  <div className={"salon-s274"}>
                    <div
                      className={"salon-s269"}
                      style={{background: sb.bg}}
                    ></div>
                    <div className={"salon-s270"}></div>
                    <div
                      className={"salon-s271"}
                      style={{"--cover-bg": sb.bg}}
                    ></div>
                    <div className={"salon-s273"}>
                      <BookCover book={sb} titleClass="salon-s272" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={"salon-s293"}>
                <div>
                  <div className={"salon-s277"}>{sb.g}</div>
                  <div className={"salon-s278"}>{sb.t}</div>
                  <div className={"salon-s279"}>{sb.a}</div>
                  <p className={"salon-s280"}>{sb.blurb}</p>
                  <div className={"salon-s281"}>
                    {"Pages, saga and details fill in automatically"}
                  </div>
                </div>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"On my shelf"}</span>
                  <div className={"salon-s283"}>
                    {sheetStatus.map((o, index31) => (
                      <React.Fragment key={index31}>
                        <button
                          onClick={o.pick}
                          type="button"
                          className={"salon-s282"}
                          aria-pressed={o.selected}
                        >
                          {o.name}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className={"salon-s288"}>
                  <span className={"salon-s99"}>{"My journal"}</span>
                  <div className={"salon-s287"}>
                    <div>
                      <div className={"salon-s284"}>
                        {"Favourite character"}
                      </div>
                      <div className={"salon-s285"}>
                        {"who stole your heart?"}
                      </div>
                    </div>
                    <div>
                      <div className={"salon-s284"}>{"Its song"}</div>
                      <div className={"salon-s285"}>{"add a song…"}</div>
                    </div>
                    <div>
                      <div className={"salon-s284"}>{"Part to remember"}</div>
                      <div className={"salon-s285"}>
                        {"the scene you’ll keep…"}
                      </div>
                    </div>
                    <div>
                      <div className={"salon-s284"}>{"Total score"}</div>
                      <div className={"salon-s286"}>{"☆☆☆☆☆"}</div>
                    </div>
                  </div>
                </div>
                <div className={"salon-s291"}>
                  <button
                    onClick={goJournal}
                    type="button"
                    className={"salon-s289 salon-hover315"}
                  >
                    {"Start my journal"}
                  </button>
                  <button
                    onClick={goForum}
                    type="button"
                    className={"salon-s290 salon-hover317"}
                  >
                    {"Forum →"}
                  </button>
                </div>
                <p className={"salon-s292"}>
                  {"Preview of the app. Cover art is illustrative."}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
