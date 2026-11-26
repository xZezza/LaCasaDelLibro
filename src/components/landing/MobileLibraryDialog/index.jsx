import React, { useEffect, useMemo, useRef, useState } from "react";
import { BOOK_SEARCH_NOTE, mkDeco } from "../../../data/landing/library.js";
import { MOBILE_WOODS, MOBILE_WALLS, MOBILE_GROUPS, MOBILE_ORDERS, MOBILE_DECORATIONS, STATUS_LABELS, SHELF_LABELS, MOBILE_SHELF_COUNT, libraryBookInfo } from "../../../data/landing/mobile-library.js";
import { arrangeLibrary, bookStatus, chooseShelfCover, groupLibrary, moveLibraryItem, placeLibraryBook, twoShelfLibrary } from "../../../lib/mobile-library.js";
import useMobileLibraryActivation from "../../../hooks/useMobileLibraryActivation.js";
import useMobileLibraryDrag from "../../../hooks/useMobileLibraryDrag.js";
import MobileLibraryScene, { MobileBookArt } from "./Scene.jsx";
import "../shared/actions.css";
import "./styles.css";

// Feather-style interface icons, matching the landing navigation.
const paths = {
  close: "M6 6l12 12M18 6 6 18",
  left: "M15 18l-6-6 6-6", right: "M9 18l6-6-6-6", shelf: "M3 20h18M4 19V5h4v14M10 19V8h4v11M16 19l-2-9 4-1 3 10",
  sun: "M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z",
  candle: "M8 21h8M10 21V11h4v10M12 8c-4-2 0-6 0-6s4 4 0 6Z",
  lights: "M2 5q10 8 20 0M5 8v4M10 10v4M15 10v4M20 8v4",
  plant: "M8 21h8l2-9H6l2 9ZM12 12V6M12 8Q4 8 6 2q6 0 6 6ZM12 9q0-6 6-5 0 5-6 5Z",
  ivy: "M13 2q-5 9 0 20M12 6q-8-3-7 3 5 3 7-3ZM11 13q8-4 8 2-5 3-8-2Z",
  cat: "M4 19q-1-7 5-8l3-4 2 5q6 2 5 7ZM18 18q5 1 3-4M7 15h.01M11 15h.01",
  cup: "M4 8h12v6a6 6 0 0 1-12 0ZM16 9h2a3 3 0 0 1 0 6h-2M2 22h18M8 2v3M12 2v3",
  hourglass: "M6 2h12M6 22h12M7 2q0 8 5 10-5 2-5 10M17 2q0 8-5 10 5 2 5 10",
  crystal: "M12 2l6 5-2 15H8L6 7 12 2ZM6 7h12M12 2v20",
  frame: "M3 3h18v18H3ZM6 6h12v12H6ZM6 15l4-5 3 3 2-2 3 4",
  flowers: "M8 22h8l1-9H7l1 9ZM12 13V3M8 13 5 5M16 13l3-8M10 3h4M3 5h4M17 5h4",
  bookends: "M2 21h20M4 20V6h3v14M10 20V3h3v17M16 20V6h3v14", check: "M5 12l4 4L19 6",
};
function Icon({ name }) { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>; }
function Marker({ children, selected, onClick, ...props }) { return <button type="button" className="salon-marker-control" aria-pressed={selected} onClick={onClick} {...props}><span className="salon-marker-text">{children}</span></button>; }

export default function MobileLibraryDialog(values) {
  const { mobileLibrary, updateMobileLibrary: commitMobileLibrary, closeLib, discardLibrary, saveLibrary, libraryDirty, saveMessage, saveError } = values;
  const { lib: items, preferences: p } = useMemo(() => twoShelfLibrary(mobileLibrary.lib, mobileLibrary.preferences), [mobileLibrary.lib, mobileLibrary.preferences]);
  const { lights } = mobileLibrary;
  const updateMobileLibrary = update => commitMobileLibrary(state => {
    const compact = twoShelfLibrary(state.lib, state.preferences);
    return { ...compact, ...update({ ...compact, lights: state.lights }) };
  });
  const wall = MOBILE_WALLS.find(value => value.name === p.wall) || MOBILE_WALLS[0];
  const root = useRef(null), editButton = useRef(null), editTitle = useRef(null), selectionDone = useRef(null), bookZoom = useRef(null), bookZoomTitle = useRef(null);
  const [view, setView] = useState("shelves"), [editing, setEditing] = useState(false), [zoomShelf, setZoomShelf] = useState(0);
  const [filter, setFilter] = useState("all"), [selection, setSelection] = useState(null), [announcement, announce] = useState("");
  const [zoomTarget, setZoomTarget] = useState(null);
  const [bookZoomId, setBookZoomId] = useState(null);
  const zoomedBook = items.find(item => item.id === bookZoomId && !item.deco);
  const selected = items.find(item => item.id === selection);
  const bookList = items.filter(item => !item.deco);
  const visible = bookList.filter(item => filter === "all" || bookStatus(item) === filter);
  const patch = change => updateMobileLibrary(({ preferences }) => ({ preferences: { ...preferences, ...change } }));
  const move = (id, shelf, beforeId) => updateMobileLibrary(state => moveLibraryItem(state.lib, state.preferences, id, shelf, beforeId, MOBILE_SHELF_COUNT));
  const { activate, doubleActivate, cancel: cancelActivation } = useMobileLibraryActivation(root, setSelection, openZoom);
  useMobileLibraryDrag(root, move, announce, cancelActivation);
  const focusedShelf = items.find(item => item.id === zoomTarget?.id)?.shelf;
  useEffect(() => { if (editing && focusedShelf !== undefined) setZoomShelf(focusedShelf); }, [editing, focusedShelf, zoomTarget?.id]);
  function openZoom(id) {
    const item = items.find(value => value.id === id);
    if (!item) return;
    if (item.deco) { openShelfZoom(id); return; }
    cancelActivation(); setSelection(null); setBookZoomId(id);
    announce(`Cover close-up of ${item.t}.`);
  }
  function openShelfZoom(id) {
    const item = items.find(value => value.id === id);
    if (!item) return;
    if (item.onShelf === false) updateMobileLibrary(state => placeLibraryBook(state.lib, state.preferences, id, String(item.shelf), MOBILE_SHELF_COUNT));
    cancelActivation(); setBookZoomId(null); setSelection(null); setZoomShelf(item.shelf); setZoomTarget({ id }); setEditing(true);
    requestAnimationFrame(() => editTitle.current?.focus({ preventScroll: true }));
    announce(`Close-up of ${item.t}. Scroll along the shelf or choose an item to arrange it.`);
  }
  useEffect(() => { root.current?.querySelector('[aria-label="Close library"]')?.focus({ preventScroll: true }); }, []);
  useEffect(() => { if (editing) editTitle.current?.focus({ preventScroll: true }); }, [editing]);
  useEffect(() => { if (selected) selectionDone.current?.focus({ preventScroll: true }); }, [selection]);
  useEffect(() => {
    if (!zoomedBook) return;
    const siblings = [...root.current.children].filter(node => node !== bookZoom.current);
    const previous = siblings.map(node => ({ inert: node.inert, hidden: node.getAttribute("aria-hidden") }));
    siblings.forEach(node => { node.inert = true; node.setAttribute("aria-hidden", "true"); });
    bookZoomTitle.current?.focus({ preventScroll: true });
    return () => siblings.forEach((node, index) => {
      node.inert = previous[index].inert;
      if (previous[index].hidden === null) node.removeAttribute("aria-hidden");
      else node.setAttribute("aria-hidden", previous[index].hidden);
    });
  }, [zoomedBook?.id]);
  function closeBookZoom() {
    const id = bookZoomId; setBookZoomId(null);
    requestAnimationFrame(() => {
      const source = root.current?.querySelector(`[data-mobile-item="${CSS.escape(id)}"], [data-list-book="${CSS.escape(id)}"]`);
      (source || editTitle.current || editButton.current)?.focus({ preventScroll: true });
    });
  }
  function leaveEdit() {
    const id = zoomTarget?.id;
    cancelActivation(); setEditing(false); setSelection(null); setZoomTarget(null);
    requestAnimationFrame(() => {
      const book = id && root.current?.querySelector(`[data-mobile-item="${CSS.escape(id)}"], [data-list-book="${CSS.escape(id)}"]`);
      (book || editButton.current)?.focus({ preventScroll: true });
      book?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    });
  }
  function save() { if (saveLibrary()) { setView("shelves"); if (editing) leaveEdit(); announce("Your library has been saved in this browser."); } }
  function discard() { discardLibrary(); setSelection(null); announce("Restored your last saved library."); }
  function closeSelection() {
    const id = selection; setSelection(null);
    requestAnimationFrame(() => root.current?.querySelector(`[data-mobile-item="${CSS.escape(id)}"], [data-list-book="${CSS.escape(id)}"]`)?.focus({ preventScroll: true }));
  }
  function choosePlacement(book, destination) {
    updateMobileLibrary(state => placeLibraryBook(state.lib, state.preferences, book.id, destination, MOBILE_SHELF_COUNT));
    announce(destination === "" ? `${book.t} is off the shelves and still in your book list.` : `${book.t} is on the ${SHELF_LABELS[Number(destination)].toLowerCase()}.`);
  }
  function toggleDecoration(key) {
    if (key === "lights") { updateMobileLibrary(state => ({ lights: state.lights === "off" ? "warm" : "off" })); return; }
    const exists = items.some(item => item.deco === key);
    const added = exists ? null : mkDeco(key, zoomShelf);
    updateMobileLibrary(state => ({ lib: exists ? state.lib.filter(item => item.deco !== key) : [...state.lib, added] }));
    announce(exists ? "Removed from your shelves." : `Added to the ${SHELF_LABELS[zoomShelf].toLowerCase()}.`);
  }
  function setMode(mode) {
    updateMobileLibrary(state => ({ lib: mode === "cover" && selected.onShelf !== false ? chooseShelfCover(state.lib, selected.shelf, selected.id) : state.lib.map(item => item.id === selection ? { ...item, mode } : item) }));
  }
  function nudge(direction) {
    const row = items.filter(item => item.shelf === selected.shelf && item.onShelf !== false);
    const index = row.findIndex(item => item.id === selection);
    if (direction < 0 && index > 0) move(selection, selected.shelf, row[index - 1].id);
    if (direction > 0 && index < row.length - 1) move(selection, selected.shelf, row[index + 2]?.id || null);
  }
  function keydown(event) {
    if (event.key !== "Escape") return;
    if (zoomedBook) { event.preventDefault(); event.stopPropagation(); closeBookZoom(); return; }
    if (selected || editing) { event.preventDefault(); event.stopPropagation(); if (selected) closeSelection(); else leaveEdit(); }
  }
  return <div className="mobile-library-overlay">
    <div role="dialog" aria-modal="true" aria-label="Your library" tabIndex={-1} ref={root} className="mobile-library-dialog salon-dialog" data-library-layout="mobile-two-shelves" data-editing={editing} data-close-up={!!zoomTarget} data-room-light={p.light} style={{ "--ml-wall-tint": wall.colour }} onKeyDownCapture={keydown}>
      <header className="ml-header">
        <button type="button" className="ml-icon-button ml-close" aria-label={editing ? "Back to library" : "Close library"} onClick={editing ? leaveEdit : closeLib}><Icon name="close" /></button>
        {editing ? <>
          <h2 ref={editTitle} tabIndex={-1}>{zoomTarget ? "A closer look" : "Make it yours"}</h2>
          {zoomTarget && <p className="ml-handwritten">Scroll along the shelf to arrange it.</p>}
        </> : <>
          <div className="ml-title-row"><h2>{p.name.trim() || "Your library"}</h2><button type="button" ref={editButton} className="ml-edit salon-marker-action" onClick={() => { cancelActivation(); setSelection(null); setZoomTarget(null); setEditing(true); }}><span className="salon-marker-text">Edit</span></button></div>
          <div className="ml-view-bar">
            <div className="ml-view-tabs" role="group" aria-label="Library view">
              <Marker selected={view === "shelves"} onClick={() => setView("shelves")} aria-label="Show shelves" title="Shelves"><span className="ml-view-icon" aria-hidden="true" style={{ maskImage: "url(/images/icons/grid.svg)" }} /></Marker>
              <Marker selected={view === "list"} onClick={() => setView("list")} aria-label="Show book list" title="Book list"><span className="ml-view-icon" aria-hidden="true" style={{ maskImage: "url(/images/icons/list.svg)" }} /></Marker>
            </div>
            <p className="ml-search-note">{BOOK_SEARCH_NOTE}</p>
          </div>
        </>}
      </header>

      {editing ? <>
        <div className="ml-edit-preview">
          <div className="ml-zoom-controls"><span>{SHELF_LABELS[zoomShelf]} · zoomed</span><div><button type="button" className="ml-icon-button" aria-label="Previous shelf" disabled={zoomShelf === 0} onClick={() => { setZoomShelf(s => s - 1); if (zoomTarget) setZoomTarget({ id: null }); }}><Icon name="left" /></button><button type="button" className="ml-icon-button" aria-label="Next shelf" disabled={zoomShelf === MOBILE_SHELF_COUNT - 1} onClick={() => { setZoomShelf(s => s + 1); if (zoomTarget) setZoomTarget({ id: null }); }}><Icon name="right" /></button></div></div>
          <MobileLibraryScene items={items} preferences={p} lights={lights} shelf={zoomShelf} onSelect={activate} onZoom={doubleActivate} closeUp={!!zoomTarget} focusItemId={zoomTarget?.id} />
        </div>
        <div className="ml-settings" aria-label="Library settings">
          <label className="ml-setting"><span>Bookcase name</span><input value={p.name} maxLength={80} placeholder="Your library" onChange={event => patch({ name: event.target.value })} /></label>
          <fieldset className="ml-setting"><legend>Bookcase</legend><div className="ml-swatches">{MOBILE_WOODS.map(w => <button type="button" key={w.name} aria-label={`${w.name} bookcase`} aria-pressed={p.bookcase === w.name} title={w.name} onClick={() => patch({ bookcase: w.name })}><span style={{ background: w.colour }} /></button>)}</div></fieldset>
          <fieldset className="ml-setting"><legend>Wall</legend><div className="ml-swatches">{MOBILE_WALLS.map(w => <button type="button" key={w.name} aria-label={`${w.name} wall`} aria-pressed={p.wall === w.name} title={w.name} onClick={() => patch({ wall: w.name })}><span style={{ background: w.colour }} /></button>)}</div></fieldset>
          <fieldset className="ml-setting"><legend>Light</legend><div className="ml-option-row">{["Daylight", "Evening"].map(light => <Marker key={light} selected={p.light === light} onClick={() => patch({ light })}><Icon name={light === "Daylight" ? "sun" : "moon"} />{light}</Marker>)}</div></fieldset>
          <fieldset className="ml-setting"><legend>Shelves</legend><div className="ml-option-row">{MOBILE_GROUPS.map(([key, label]) => <Marker key={key} selected={p.grouping === key} onClick={() => updateMobileLibrary(state => groupLibrary(state.lib, state.preferences, key, MOBILE_SHELF_COUNT))}>{label}</Marker>)}</div></fieldset>
          <fieldset className="ml-setting"><legend>Arrange books by</legend><div className="ml-option-row ml-order-row">{MOBILE_ORDERS.map(([key, label]) => <Marker key={key} selected={p.arrange === key} onClick={() => updateMobileLibrary(state => arrangeLibrary(state.lib, state.preferences, key, MOBILE_SHELF_COUNT))}>{label}</Marker>)}</div><p className="ml-handwritten">Hold and drag books to reorder them.</p></fieldset>
          <fieldset className="ml-setting"><legend>Cover facing out</legend><div className="ml-cover-options">{SHELF_LABELS.map((label, shelf) => {
            const row = items.filter(item => !item.deco && item.onShelf !== false && item.shelf === shelf);
            return <label key={shelf}><span>{label}</span><select aria-label={`${label} cover facing out`} value={row.find(item => item.mode === "cover")?.id || ""} disabled={!row.length} onChange={event => updateMobileLibrary(state => ({ lib: chooseShelfCover(state.lib, shelf, event.target.value) }))}><option value="">None</option>{row.map(book => <option value={book.id} key={book.id}>{book.t}</option>)}</select></label>;
          })}</div></fieldset>
          <fieldset className="ml-setting"><legend>On the shelves</legend><div className="ml-decoration-options">{MOBILE_DECORATIONS.map(d => {
            const on = d.key === "lights" ? lights !== "off" : items.some(item => item.deco === d.key);
            return <button type="button" key={d.key} aria-pressed={on} onClick={() => toggleDecoration(d.key)}><Icon name={d.icon} /><span>{d.label}</span>{on && <span className="ml-decoration-check"><Icon name="check" /></span>}</button>;
          })}</div></fieldset>
        </div>
      </> : <div className="ml-content" data-view={view}>
        {view === "shelves" ? <>
          <p className="ml-drag-hint">Hold and drag to arrange · double-tap to zoom.</p>
          <MobileLibraryScene items={items} preferences={p} lights={lights} onSelect={activate} onZoom={doubleActivate} />
          <p className="ml-room-note">A little room, entirely yours.</p>
        </> : <>
          <div className="ml-filters" role="group" aria-label="Reading status">
            <Marker selected={filter === "all"} onClick={() => setFilter("all")}>All <small>{bookList.length}</small></Marker>
            {[2, 1, 0].map(status => <Marker key={status} data-status={status} selected={filter === status} onClick={() => setFilter(status)}>{STATUS_LABELS[status]} <small>{bookList.filter(book => bookStatus(book) === status).length}</small></Marker>)}
          </div>
          <p className="ml-list-hint">Choose which books go on your shelves.</p>
          <div className="ml-book-list">{visible.map(book => {
            const info = libraryBookInfo(book), status = bookStatus(book), shown = book.onShelf !== false;
            return <div key={book.id} className="ml-list-book">
              <button type="button" className="ml-list-cover" data-list-book={book.id} data-mobile-activate="true" aria-label={`Arrange ${book.t}`} onClick={event => activate(event, book.id)} onDoubleClick={event => doubleActivate(event, book.id)}><MobileBookArt book={book} thumbnail /></button>
              <div className="ml-list-book-copy"><h3>{book.t}</h3>{info.author && <p>{info.author}</p>}<span className="ml-reading-label" data-status={status}>{STATUS_LABELS[status]}</span></div>
              <label className="ml-display-picker" data-selected={shown} title={shown ? `On the ${SHELF_LABELS[book.shelf].toLowerCase()}` : "Not on shelves"}><Icon name="shelf" /><select aria-label={`Shelf for ${book.t}`} value={shown ? String(book.shelf) : ""} onChange={event => choosePlacement(book, event.target.value)}><option value="">Not on shelves</option>{SHELF_LABELS.map((label, i) => <option key={i} value={i}>{label}</option>)}</select></label>
            </div>;
          })}</div>
          {!visible.length && <p className="ml-empty-result">No books match this reading status.</p>}
        </>}
      </div>}

      {(editing || libraryDirty) && <footer className="ml-save-bar"><button type="button" onClick={discard} disabled={!libraryDirty}>Discard</button><button type="button" className="ml-save" onClick={save} disabled={!libraryDirty}>Save changes</button></footer>}
      {saveMessage && <p className="ml-save-message" data-error={saveError} role="status">{saveMessage}</p>}
      {values.hasToast && <p className="ml-save-message" role="status">{values.toast.replace("✦", "").trim()}</p>}
      <span className="ml-announcement" role="status">{announcement}</span>
      {zoomedBook && <div ref={bookZoom} className="ml-book-zoom" role="group" aria-labelledby="ml-book-zoom-title">
        <header className="ml-book-zoom-header">
          <span className="ml-eyebrow">A closer look</span>
          <button type="button" className="ml-icon-button" aria-label="Close book zoom" onClick={closeBookZoom}><Icon name="close" /></button>
        </header>
        <div className="ml-book-zoom-content">
          <div className="ml-book-zoom-art" role="img" aria-label={`Cover of ${zoomedBook.t}`}><MobileBookArt book={zoomedBook} thumbnail /></div>
          <h2 id="ml-book-zoom-title" ref={bookZoomTitle} tabIndex={-1}>{zoomedBook.t}</h2>
          {libraryBookInfo(zoomedBook).author && <p>{libraryBookInfo(zoomedBook).author}</p>}
        </div>
        <footer className="ml-book-zoom-actions">
          <button type="button" className="salon-marker-action" onClick={closeBookZoom}><span className="salon-marker-text">Back to library</span></button>
          <button type="button" className="salon-marker-action salon-marker-primary" onClick={() => openShelfZoom(zoomedBook.id)}><span className="salon-marker-text">Arrange on shelf</span></button>
        </footer>
      </div>}
      {selected && <div className="ml-selection" role="group" aria-label={`Arrange ${selected.t}`}>
        <div className="ml-selection-header"><h3>{selected.t}</h3><div className="ml-selection-actions"><button type="button" onClick={() => openZoom(selected.id)}>Zoom in</button><button ref={selectionDone} type="button" onClick={closeSelection}>Done</button></div></div>
        {!selected.deco ? <><div className="ml-selection-modes">{[["spine", "Spine"], ["cover", "Cover"]].map(([mode, label]) => <Marker key={mode} selected={selected.mode === mode} onClick={() => setMode(mode)}>{label}</Marker>)}</div></> : <button className="ml-remove" type="button" onClick={() => { updateMobileLibrary(state => ({ lib: state.lib.filter(item => item.id !== selection) })); setSelection(null); }}>Remove from shelf</button>}
        <label className="ml-selection-destination">Move to <select value={selected.onShelf === false ? "" : selected.shelf} onChange={event => selected.deco ? move(selection, Number(event.target.value)) : choosePlacement(selected, event.target.value)}>{!selected.deco && <option value="">Not on shelves</option>}{SHELF_LABELS.map((label, i) => <option key={i} value={i}>{label}</option>)}</select></label>
        <div className="ml-selection-position"><button type="button" disabled={selected.onShelf === false || items.filter(item => item.shelf === selected.shelf && item.onShelf !== false)[0]?.id === selected.id} onClick={() => nudge(-1)}><Icon name="left" />Left</button><button type="button" disabled={selected.onShelf === false || items.filter(item => item.shelf === selected.shelf && item.onShelf !== false).at(-1)?.id === selected.id} onClick={() => nudge(1)}>Right<Icon name="right" /></button></div>
      </div>}
    </div>
  </div>;
}
