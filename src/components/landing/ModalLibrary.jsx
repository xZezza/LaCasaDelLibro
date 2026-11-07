import React, { useState } from "react";
import useLibraryFit from "./useLibraryFit";
import LibraryPets from "./LibraryPets";

export default function ModalLibrary(values) {
  const {
    ad,
    angle,
    b,
    c,
    caseFrame,
    caseShelf,
    cases,
    companions,
    clearQ,
    closeLib,
    d,
    deselect,
    focusQ,
    hasQ,
    hasSel,
    hasToast,
    libOpen,
    libraryDirty,
    saveLibrary,
    discardLibrary,
    saveMessage,
    saveError,
    lightOpts,
    m,
    modes,
    moves,
    noResults,
    noSel,
    o,
    q,
    r,
    removeSel,
    results,
    s,
    selIsBook,
    selIsDeco,
    selTitle,
    setAngle,
    setQ,
    sg,
    sh,
    shelves,
    showResults,
    sorts,
    stop,
    toast,
    tray,
    w,
    wallBg,
    wallInk,
    walls,
    x,
  } = values;
  const dialogRef = useLibraryFit(libOpen);
  const [companionKey, setCompanionKey] = useState("pet-hedwig");
  const companion = companions.find((pet) => pet.key === companionKey) || companions[0];
  return (
    <>
      {Boolean(libOpen) && (
        <>
          <div
            onClick={closeLib}
            className={"salon-s267 salon-library-overlay"}
          >
            <div
              onClick={stop}
              role={"dialog"}
              aria-label={"Your library"}
              aria-modal="true"
              tabIndex={-1}
              ref={dialogRef}
              className={"salon-s266 salon-dialog salon-library-dialog"}
            >
              <button
                onClick={closeLib}
                aria-label={"Close"}
                type="button"
                className={"salon-s204 salon-hover220"}
              >
                {"×"}
              </button>
              <div className={"salon-s256"}>
                <div className={"salon-s223"}>
                  <div className={"salon-s205"}>{"Preview · The Library"}</div>
                  <div className={"salon-s208"}>
                    <span className={"salon-s206"}>{"Your library"}</span>
                    <span className={"salon-s207"}>
                      {"drag, turn, lay them flat"}
                    </span>
                  </div>
                  <div className={"salon-s222"}>
                    <div className={"salon-s212"}>
                      <svg
                        viewBox={"0 0 20 20"}
                        width={"16"}
                        height={"16"}
                        fill={"none"}
                        stroke={"oklch(0.42 0.03 305)"}
                        strokeWidth={"1.6"}
                        strokeLinecap={"round"}
                        className={"salon-s209"}
                      >
                        <circle cx={"8.5"} cy={"8.5"} r={"5.5"}></circle>
                        <path d={"M13 13l4.5 4.5"}></path>
                      </svg>
                      <input
                        type={"text"}
                        value={q}
                        onChange={setQ}
                        onFocus={focusQ}
                        placeholder={
                          "Search a book you’re reading, finished or want next…"
                        }
                        aria-label={"Search books"}
                        className={"salon-s210"}
                      />
                      {Boolean(hasQ) && (
                        <>
                          <button
                            onClick={clearQ}
                            aria-label={"Clear search"}
                            type="button"
                            className={"salon-s211"}
                          >
                            {"×"}
                          </button>
                        </>
                      )}
                    </div>
                    {Boolean(showResults) && (
                      <>
                        <div className={"salon-s220"}>
                          {results.map((r, index20) => (
                            <React.Fragment key={index20}>
                              <div className={"salon-s218 salon-hover236"}>
                                <div
                                  className={"salon-s213"}
                                  style={{
                                    background:
                                      "linear-gradient(90deg, rgba(0,0,0,.25), transparent 18%), " +
                                      r.bg,
                                  }}
                                ></div>
                                <div className={"salon-s96"}>
                                  <div className={"salon-s214"}>{r.t}</div>
                                  <div className={"salon-s215"}>
                                    {r.a}
                                    {r.inLib}
                                  </div>
                                </div>
                                <div className={"salon-s217"}>
                                  {r.adds.map((ad, index19) => (
                                    <React.Fragment key={index19}>
                                      <button
                                        onClick={ad.run}
                                        title={"Add to " + ad.label}
                                        type="button"
                                        className={"salon-s216 salon-hover233"}
                                      >
                                        {ad.name}
                                      </button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                          {Boolean(noResults) && (
                            <>
                              <div className={"salon-s219"}>
                                {
                                  "No match in this preview. In the app you’ll search every book."
                                }
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {Boolean(hasToast) && (
                      <>
                        <div className={"salon-s221"}>{toast}</div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={"salon-s247"}
                  data-guest-stage=""
                  style={{
                    position: "relative",
                    background: wallBg,
                    boxShadow: caseFrame,
                  }}
                >
                  <LibraryPets
                    layoutKey={shelves
                      .map(
                        (sh) =>
                          sh.label +
                          sh.segs
                            .map((sg) =>
                              sg.books.map((b) => [b.id, b.fw, b.fh].join(":")),
                            )
                            .join("|"),
                      )
                      .join("/")}
                  />
                  {shelves.map((sh, index23) => (
                    <React.Fragment key={index23}>
                      <div
                        onDragOver={sh.over}
                        onDrop={sh.drop}
                        className={"salon-s246"}
                      >
                        {"\n            "}
                        {sh.lights}
                        {"\n            "}
                        <div
                          className={"salon-s241"}
                          data-library-shelf-items=""
                        >
                          {sh.segs.map((sg, index22) => (
                            <React.Fragment key={index22}>
                              <div className={"salon-s236"}>
                                {sg.books.map((b, index21) => (
                                  <React.Fragment key={index21}>
                                    {Boolean(b.isBook) && (
                                      <>
                                        <div
                                          draggable={true}
                                          tabIndex={0}
                                          role="button"
                                          aria-label={b.t}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === " "
                                            ) {
                                              e.preventDefault();
                                              b.select(e);
                                            }
                                          }}
                                          onDragStart={b.dragStart}
                                          onDragOver={b.over}
                                          onDrop={b.drop}
                                          onClick={b.select}
                                          title={b.t}
                                          className={"salon-s233"}
                                          style={{
                                            width: b.fw + "px",
                                            height: b.fh + "px",
                                            transform: b.lift,
                                            boxShadow: b.ring,
                                          }}
                                        >
                                          <div
                                            className={"salon-s232"}
                                            style={{
                                              width: b.T + "px",
                                              height: b.H + "px",
                                              marginLeft: b.ml + "px",
                                              marginTop: b.mt + "px",
                                              transform: b.boxTf,
                                            }}
                                          >
                                            <div
                                              className={"salon-s225"}
                                              style={{
                                                width: b.T + "px",
                                                height: b.H + "px",
                                                transform: b.spineTf,
                                                background: b.spineBg,
                                              }}
                                            >
                                              <span className={"salon-s224"}>
                                                {b.t}
                                              </span>
                                            </div>
                                            <div
                                              className={"salon-s228"}
                                              style={{
                                                left: b.sideL + "px",
                                                width: b.D + "px",
                                                height: b.H + "px",
                                                transform: b.coverTf,
                                                background: b.coverBg,
                                              }}
                                            >
                                              <span
                                                className={"salon-s226"}
                                              ></span>
                                              <span className={"salon-s227"}>
                                                {b.t}
                                              </span>
                                            </div>
                                            <div
                                              className={"salon-s229"}
                                              style={{
                                                left: b.sideL + "px",
                                                width: b.D + "px",
                                                height: b.H + "px",
                                                transform: b.backTf,
                                                background: b.backBg,
                                              }}
                                            ></div>
                                            <div
                                              className={"salon-s230"}
                                              style={{
                                                width: b.T + "px",
                                                height: b.H + "px",
                                                transform: b.pagesTf,
                                              }}
                                            ></div>
                                            <div
                                              className={"salon-s231"}
                                              style={{
                                                top: b.topT + "px",
                                                width: b.T + "px",
                                                height: b.D + "px",
                                                transform: b.topTf,
                                                boxShadow:
                                                  "inset 0 0 0 2px " + b.edge,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {Boolean(b.isDeco) && (
                                      <>
                                        <div
                                          draggable={true}
                                          tabIndex={0}
                                          role="button"
                                          aria-label={b.t}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === " "
                                            ) {
                                              e.preventDefault();
                                              b.select(e);
                                            }
                                          }}
                                          onDragStart={b.dragStart}
                                          onDragOver={b.over}
                                          onDrop={b.drop}
                                          onClick={b.select}
                                          title={b.t}
                                          className={"salon-s235"}
                                          style={{
                                            width: b.fw + "px",
                                            height: b.fh + "px",
                                            transform: b.lift,
                                            filter: b.glow,
                                          }}
                                        >
                                          <div
                                            role={"img"}
                                            aria-label={b.t}
                                            className={"salon-s234"}
                                            style={{
                                              background:
                                                (b.isPet ? "left center / 200% 100% no-repeat " : "center / contain no-repeat ") +
                                                b.bgImg,
                                            }}
                                          ></div>
                                        </div>
                                      </>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </React.Fragment>
                          ))}
                          {Boolean(sh.hasMore) && (
                            <>
                              <button
                                onClick={sh.toggle}
                                title={"Show " + sh.more + " more"}
                                type="button"
                                className={"salon-s240 salon-hover259"}
                                style={{ height: sh.stubH + "px" }}
                              >
                                <span className={"salon-s237"}></span>
                                <span className={"salon-s238"}></span>
                                <span className={"salon-s239"}>
                                  {"+"}
                                  {sh.more}
                                </span>
                              </button>
                            </>
                          )}
                        </div>
                        <div
                          className={"salon-s242"}
                          style={{ background: caseShelf }}
                        ></div>
                        <div className={"salon-s245"}>
                          <span
                            className={"salon-s243"}
                            style={{ color: wallInk }}
                          >
                            {sh.label}
                          </span>
                          {Boolean(sh.canFold) && (
                            <>
                              <button
                                onClick={sh.toggle}
                                type="button"
                                className={"salon-s244"}
                                style={{ color: wallInk }}
                              >
                                {sh.toggleLabel}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className={"salon-s255"}>
                  {Boolean(hasSel) && (
                    <>
                      <div className={"salon-s250"}>
                        <button
                          onClick={deselect}
                          aria-label={"Close selection"}
                          title={"Done"}
                          type="button"
                          className={"salon-s248 salon-hover268"}
                        >
                          {"×"}
                        </button>
                        <span className={"salon-s249"}>{selTitle}</span>
                      </div>
                      <div className={"salon-s254"}>
                        {Boolean(selIsBook) && (
                          <>
                            {modes.map((m, index24) => (
                              <React.Fragment key={index24}>
                                <button
                                  onClick={m.run}
                                  type="button"
                                  className={"salon-s251"}
                                  style={{
                                    border: "1px solid " + m.border,
                                    background: m.bg,
                                    color: m.fg,
                                  }}
                                >
                                  {m.name}
                                </button>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                        {Boolean(selIsDeco) && (
                          <>
                            <button
                              onClick={removeSel}
                              type="button"
                              className={"salon-s252 salon-hover273"}
                            >
                              {"Remove"}
                            </button>
                          </>
                        )}
                        {moves.map((m, index25) => (
                          <React.Fragment key={index25}>
                            <button
                              onClick={m.run}
                              title={m.label}
                              aria-label={m.label}
                              type="button"
                              className={"salon-s253 salon-hover275"}
                            >
                              {m.icon}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  )}
                  {Boolean(noSel) && (
                    <>
                      <p className={"salon-s127"}>
                        {
                          "Tap a book to turn it or lay it flat. Drag books and decorations between shelves."
                        }
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className={"salon-s265"}>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Bookcase"}</span>
                  <div className={"salon-s254"}>
                    {cases.map((c, index26) => (
                      <React.Fragment key={index26}>
                        <button
                          onClick={c.pick}
                          title={c.name}
                          aria-label={c.name}
                          type="button"
                          className={"salon-s257"}
                          style={{
                            background: c.sw,
                            border: "2px solid " + c.ring,
                          }}
                        ></button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Wall"}</span>
                  <div className={"salon-s254"}>
                    {walls.map((w, index27) => (
                      <React.Fragment key={index27}>
                        <button
                          onClick={w.pick}
                          title={w.name}
                          aria-label={w.name}
                          type="button"
                          className={"salon-s257"}
                          style={{
                            background: w.swatch,
                            border: "2px solid " + w.ring,
                          }}
                        ></button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Fairy lights"}</span>
                  <div className={"salon-s260"}>
                    {lightOpts.map((o, index28) => (
                      <React.Fragment key={index28}>
                        <button
                          onClick={o.pick}
                          type="button"
                          className={"salon-s259"}
                          style={{ background: o.bg, color: o.fg }}
                        >
                          {o.name}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Decorate"}</span>
                  <div className={"salon-s262"}>
                    {tray.map((d, index29) => (
                      <React.Fragment key={index29}>
                        <button
                          draggable={true}
                          onDragStart={d.dragStart}
                          onClick={d.add}
                          title={"Add " + d.name}
                          aria-label={"Add " + d.name}
                          type="button"
                          className={"salon-s261 salon-hover284"}
                        >
                          <div
                            className={"salon-s234"}
                            style={{
                              background:
                                "center / contain no-repeat " + d.bgImg,
                            }}
                          ></div>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="salon-s258 library-companion">
                  <label htmlFor="library-companion" className="salon-s99">Keep a companion</label>
                  <div className="library-companion-picker">
                    <span className="library-companion-portrait" aria-hidden="true"
                      style={{ backgroundImage: `url("${companion.image}")` }} />
                    <select id="library-companion" value={companion.key}
                      onChange={(event) => setCompanionKey(event.target.value)}>
                      {companions.map((pet) => <option key={pet.key} value={pet.key}>{pet.name}</option>)}
                    </select>
                    <button type="button" onClick={companion.add}
                      aria-label={"Add " + companion.name + " as a permanent companion"}>Add</button>
                  </div>
                  <p className="library-companion-hint">Stays on your shelf. Drag to move, select to remove.</p>
                </div>
                <div className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Tidy by"}</span>
                  <div className={"salon-s254"}>
                    {sorts.map((s, index30) => (
                      <React.Fragment key={index30}>
                        <button
                          onClick={s.run}
                          type="button"
                          className={"salon-s263 salon-hover287"}
                        >
                          {s.name}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <label className={"salon-s258"}>
                  <span className={"salon-s99"}>{"Turn the view"}</span>
                  <input
                    type={"range"}
                    min={"-40"}
                    max={"40"}
                    step={"1"}
                    value={angle}
                    onChange={setAngle}
                    className={"salon-s264"}
                  />
                </label>
                {(libraryDirty || saveMessage) && (
                  <div className="library-save">
                    {libraryDirty && (
                      <div className="library-save-actions">
                        <button type="button" onClick={discardLibrary} className="library-discard-button">Discard changes</button>
                        <button type="button" onClick={saveLibrary} className="library-save-button">Save changes</button>
                      </div>
                    )}
                    {saveMessage && (
                      <p
                        role="status"
                        className="library-save-status"
                        data-error={saveError}
                      >
                        {saveMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
