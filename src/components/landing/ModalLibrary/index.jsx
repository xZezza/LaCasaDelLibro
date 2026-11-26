import "../shared/actions.css";
import FairyLights from "../FairyLights";
import "../shared/dialog.css";
import "../shared/typography.css";
import React, { useState, useLayoutEffect, useRef } from "react";
import MobileLibraryDialog from "../MobileLibraryDialog";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./styles.css";
import useLibraryHands from "../../../hooks/useLibraryHands.js";
import LibraryBookFaces from "./LibraryBookFaces.jsx";
import LibraryPets from "../LibraryPets";
import { BOOK_SEARCH_NOTE } from "../../../data/landing/library.js";
import { illustratedBinding } from "../../../data/landing/library-art.js";
import { LIBRARY_BOOK_PERSPECTIVE } from "../../../lib/library-motion.js";
export default function ModalLibrary(values) {
  const {
    caseFrame,
    caseShelf,
    cases,
    companions,
    closeLib,
    deselect,
    hasSel,
    hasToast,
    libOpen,
    libraryDirty,
    saveLibrary,
    discardLibrary,
    dropLibraryItem,
    saveMessage,
    saveError,
    lightOpts,
    modes,
    moves,
    removeSel,
    selIsBook,
    selIsDeco,
    selTitle,
    shelves,
    sorts,
    stop,
    toast,
    tray,
    wallBg,
    wallInk,
    walls,
  } = values;
  const [phone, setPhone] = useState(false);
  useLayoutEffect(() => {
    const query = matchMedia(MEDIA_QUERIES.phone);
    const preview = document.querySelector(".library-mobile-preview");
    // Follow the visible phone layout as well as the media query in device previews.
    const change = () => setPhone(query.matches || !!preview?.getClientRects().length);
    const observer = new ResizeObserver(change);
    if (preview) observer.observe(preview);
    change(); query.addEventListener("change", change);
    return () => { observer.disconnect(); query.removeEventListener("change", change); };
  }, []);
  const desktopOpen = libOpen && !phone;
  const dialogRef = useRef(null);
  useLibraryHands(dialogRef, desktopOpen, dropLibraryItem);
  const [showMoreTreasures, setShowMoreTreasures] = useState(false);
  const visibleTreasures = showMoreTreasures ? tray : ["ivy", "lavender", "blossoms", "candle"].map((key) => tray.find((item) => item.key === key)).filter(Boolean);
  const [companionKey, setCompanionKey] = useState("pet-hedwig");
  const companion = companions.find((pet) => pet.key === companionKey) || companions[0];
  if (phone) return libOpen ? <MobileLibraryDialog {...values} /> : null;
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
              <div className="salon-s256 library-room">
                <div className="library-room-header">
                  <div className={"salon-s223"}>
                    <div className="library-room-title">
                      <h2 className="salon-s206">Your library</h2>
                      <p className="salon-s127">Drag books and objects to arrange them.</p>
                    </div>
                    <p className="library-search-note">{BOOK_SEARCH_NOTE}</p>
                  </div>
                  {hasToast && <p className="salon-s221" role="status">{toast}</p>}
                  {hasSel && (
                    <div className="salon-s255">
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
                                    className={"salon-s251 salon-marker-control"}
                                    aria-pressed={m.selected}
                                  >
                                    <span className="salon-marker-text">
                                    {m.name}
                                  </span>
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
                                className={"salon-s252 salon-marker-action salon-marker-secondary"}
                              >
                                <span className="salon-marker-text">
                                {"Remove"}
                              </span>
                              </button>
                            </>
                          )}
                          {moves.map((m, index25) => (
                            <React.Fragment key={index25}>
                              <button
                                onClick={m.run}
                                title={m.label}
                                aria-label={m.label}
                                disabled={m.disabled}
                                type="button"
                                className={"salon-s253 salon-hover275"}
                              >
                                {m.icon}
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                    </div>
                  )}
                </div>
                <div
                  className={"salon-s247"}
                  data-guest-stage=""
                  style={{
                    position: "relative",
                    background: wallBg,
                    boxShadow: "none",
                    "--case-frame": caseFrame,
                  }}
                >
                  <LibraryPets
                    layoutKey={shelves.map(sh => sh.items.map(b => [b.id, b.fw, b.fh].join(":")).join("|")).join("/")}
                  />
                  {shelves.map((sh, index23) => (
                    <React.Fragment key={index23}>
                      <div
                        onDragOver={sh.over}
                        onDrop={sh.drop}
                        className={"salon-s246"} data-shelf={index23}
                      >
                        {"\n            "}
                        <div className="salon-s245" style={{ color: wallInk }}>
                          <h3 className="salon-s243">{sh.label}</h3>
                          {sh.canFold && (
                            <button type="button" className="salon-s244" aria-expanded={sh.expanded}
                              aria-controls={`library-shelf-${index23}`} onClick={sh.toggle}>
                              {sh.expanded ? "Show fewer" : `Show ${sh.more} more`}
                              <span aria-hidden="true">{sh.expanded ? "−" : "+"}</span>
                            </button>
                          )}
                        </div>
                        <FairyLights mode={sh.lightsMode} />
                        {"\n            "}
                        <div
                          className={"salon-s241"}
                          id={`library-shelf-${index23}`}
                          data-library-shelf-items=""
                          style={{ height: sh.height }}
                        >
                          {sh.items.map(b => (
                            <div className="salon-s236" key={b.id}>
                              {Boolean(b.isBook) && (
                                <>
                                  <div
                                    draggable={false}
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
                                    data-hand-id={b.id} data-book-id={b.id} data-library-item-id={b.id}
                                    data-binding={illustratedBinding(b.t).index} data-mode={b.mode} data-selected={b.selected}
                                    style={{
                                      width: b.fw,
                                      height: b.fh,
                                      "--book-width": `${b.T}px`,
                                      "--book-height": `${b.H}px`,
                                      "--book-depth": `${b.D}px`,
                                      "--book-perspective": `${LIBRARY_BOOK_PERSPECTIVE}px`,
                                      "--book-hue": b.h,
                                      "--book-lightness": b.l,
                                      "--book-chroma": b.c,
                                      "--book-facing": `${b.facing}deg`,
                                      "--book-offset-x": `${b.offsetX}px`,
                                    }}
                                  >
                                    <LibraryBookFaces title={b.t} />
                                  </div>
                                </>
                              )}
                              {Boolean(b.isDeco) && (
                                <>
                                  <div
                                    draggable={false}
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
                                    className={"salon-s235"} data-hand-id={b.id} data-library-item-id={b.id} data-deco={b.deco}
                                    data-companion={b.isPet || b.deco === "dragon" ? "true" : undefined}
                                    data-selected={b.selected} data-glow={b.hasGlow} style={{
                                    width: b.fw,
                                    height: b.fh,
                                    "--companion-width": `${b.fw}px`,
                                    "--companion-height": `${b.fh}px`,
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
                            </div>
                          ))}
                        </div>
                        <div
                          className={"salon-s242"}
                          style={{ background: caseShelf }}
                        ><span className="library-shelf-support library-shelf-support-left" aria-hidden="true"/><span className="library-shelf-support library-shelf-support-right" aria-hidden="true"/></div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <aside className="salon-s265 library-customize" aria-labelledby="library-customize-title">
                <h3 className="library-customize-title" id="library-customize-title">Make it yours</h3>
                <div className="library-customize-fields">
                  <div className={"salon-s258"}>
                    <div className="library-option-heading">
                      <span className="salon-s99">Shelf finish</span>
                      <span className="library-current-option">{cases.find(option => option.selected)?.name}</span>
                    </div>
                    <div className="salon-s254 library-swatch-row" role="group" aria-label="Shelf finish">
                      {cases.map((c, index26) => (
                        <React.Fragment key={index26}>
                          <button
                            onClick={c.pick}
                            title={c.name}
                            aria-label={c.name}
                            type="button"
                            className={"salon-s257"} aria-pressed={c.selected} style={{background:c.sw}}
                          ></button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className={"salon-s258"}>
                    <div className="library-option-heading">
                      <span className="salon-s99">Wall colour</span>
                      <span className="library-current-option">{walls.find(option => option.selected)?.name}</span>
                    </div>
                    <div className="salon-s254 library-swatch-row" role="group" aria-label="Wall colour">
                      {walls.map((w, index27) => (
                        <React.Fragment key={index27}>
                          <button
                            onClick={w.pick}
                            title={w.name}
                            aria-label={w.name}
                            type="button"
                            className={"salon-s257"} aria-pressed={w.selected} style={{background:w.swatch}}
                          ></button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className={"salon-s258"}>
                    <span className={"salon-s99"}>{"Fairy lights"}</span>
                    <div className="salon-s260" role="group" aria-label="Fairy lights">
                      {lightOpts.map((o, index28) => (
                        <React.Fragment key={index28}>
                          <button
                            onClick={o.pick}
                            type="button"
                            className={"salon-s259 salon-marker-control"}
                            aria-pressed={o.selected}
                          >
                            <span className="salon-marker-text">
                            {o.name}
                          </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className={"salon-s258"}>
                    <span className={"salon-s99"}>{"Decorate"}</span>
                    <div className="salon-s262" id="library-decoration-options">
                      {visibleTreasures.map((d, index29) => (
                        <React.Fragment key={index29}>
                          <button
                            draggable={true}
                            onDragStart={d.dragStart}
                            onClick={d.add}
                            title={"Add " + d.name}
                            aria-label={"Add " + d.name}
                            type="button"
                            className={"salon-s261 salon-hover284"} data-deco={d.key}
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
                    <button type="button" className="library-more-treasures salon-marker-action salon-marker-secondary" aria-controls="library-decoration-options" aria-expanded={showMoreTreasures} onClick={() => setShowMoreTreasures(value => !value)}>
                      <span className="salon-marker-text">{showMoreTreasures ? "Show fewer decorations" : "Show all decorations"}</span>
                    </button>
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
                      <button type="button" onClick={companion.add} className="salon-companion-add salon-marker-action salon-marker-secondary"
                        aria-label={"Add " + companion.name + " as a permanent companion"}><span className="salon-marker-text">Add</span></button>
                    </div>
                    <p className="library-companion-hint">Stays on your shelf. Drag to move, select to remove.</p>
                  </div>
                  <div className={"salon-s258"}>
                    <span className={"salon-s99"}>{"Tidy by"}</span>
                    <div className="salon-s254 library-tidy-options">
                      {sorts.map((s, index30) => (
                        <React.Fragment key={index30}>
                          <button
                            onClick={s.run}
                            type="button"
                            className={"salon-s263 salon-marker-action salon-marker-secondary"}
                          >
                            <span className="salon-marker-text">
                            {s.name}
                          </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="library-save">
                  <div className="library-save-actions">
                    <button type="button" onClick={discardLibrary} disabled={!libraryDirty} className="library-discard-button salon-marker-action salon-marker-secondary"><span className="salon-marker-text">Discard changes</span></button>
                    <button type="button" onClick={saveLibrary} disabled={!libraryDirty} className="library-save-button salon-marker-action salon-marker-primary"><span className="salon-marker-text">Save changes</span></button>
                  </div>
                  {saveMessage && <p role="status" className="library-save-status" data-error={saveError}>{saveMessage}</p>}
                </div>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
}
