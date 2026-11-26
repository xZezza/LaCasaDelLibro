import React from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import { illustratedColour } from "../../../data/landing/library-art.js";
import { WALLS, LIB, DECOS, mkDeco, CASES, LIGHTS, libraryIds } from "../../../data/landing/library.js";
import { SHELF_LABELS } from "../../../data/landing/mobile-library.js";
import { bookFacing, bookBounds, LIBRARY_BOOK_PERSPECTIVE, LIBRARY_PRESENTATION_SCALE } from "../../../lib/library-motion.js";
import { serializeLibrary, isValidLibrarySnapshot } from "../../../lib/library-storage.js";
import { libraryPreferences, twoShelfLibrary } from "../../../lib/mobile-library.js";

const STORAGE_KEY = "the-salon-library-layout-v1";
const DEFAULT_LIBRARY = twoShelfLibrary(LIB).lib;
const SHELF_HEIGHT = 213;

export default class LibraryController extends React.Component {
  state = {
    savedLayoutSignature: serializeLibrary({
      lib: DEFAULT_LIBRARY,
      wall: 0,
      caseC: 0,
      lights: "warm",
    }),
    libOpen: false,
    toast: "",
    expanded: {},
    lib: DEFAULT_LIBRARY,
    wall: 0,
    caseC: 0,
    lights: "warm",
    sel: null,
    shelfHeight: SHELF_HEIGHT,
  };

  componentDidMount() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null",
      );
      if (isValidLibrarySnapshot(saved, {
        decorations: DECOS, walls: WALLS, cases: CASES, lights: LIGHTS,
      })) {
        const nextId = (prefix) =>
          Math.max(
            0,
            ...saved.lib
              .filter((b) => b.id.startsWith(prefix))
              .map((b) => Number(b.id.slice(1)))
              .filter(Number.isFinite),
          ) + 1;
        libraryIds.book = Math.max(libraryIds.book, nextId("n"));
        libraryIds.decoration = Math.max(libraryIds.decoration, nextId("d"));
        const { lib: savedItems, preferences } = twoShelfLibrary(saved.lib, saved.libraryPreferences);
        // Former flat and hand-rotated books open upright without rewriting the saved snapshot.
        const lib = savedItems.map(({ rotation, ...item }) => item.mode === "lying" ? { ...item, mode: "spine" } : item);
        this.setState({
          savedLayoutSignature: serializeLibrary({ ...saved, lib, libraryPreferences: preferences }),
          lib,
          libraryPreferences: preferences,
          wall: saved.wall,
          caseC: saved.caseC,
          lights: saved.lights,
        });
      }
    } catch {
      /* A disabled store or older snapshot leaves the demo usable. */
    }
    this.fitShelves();
    window.addEventListener("resize", this.fitShelves);
    window.addEventListener("keydown", this.handleEscape);
  }

  componentWillUnmount() {
    clearTimeout(this._saveConfirmationTimer);
    window.removeEventListener("resize", this.fitShelves);
    window.removeEventListener("keydown", this.handleEscape);
  }

  fitShelves = () => {
    // Keep headers and room controls at reading size. Only the shelf scene adapts to the viewport height.
    const shelfHeight = window.matchMedia(MEDIA_QUERIES.phone).matches
      ? SHELF_HEIGHT
      : Math.max(144, Math.min(SHELF_HEIGHT, Math.floor((window.innerHeight - 336) / 2)));
    this.setState(current => current.shelfHeight === shelfHeight ? null : { shelfHeight });
  };

  handleEscape = (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || !this.state.libOpen || document.querySelector(".character-sheet[open]")) return;
    this.setState(state => state.sel ? { sel: null } : { libOpen: false });
  };

  saveLibrary = () => {
    try {
      const snapshot = serializeLibrary(this.state);
      localStorage.setItem(STORAGE_KEY, snapshot);
      this.setState({
        savedLayoutSignature: snapshot,
        saveMessage: "Changes saved in this browser.",
        saveError: false,
      });
      clearTimeout(this._saveConfirmationTimer);
      this._saveConfirmationTimer = setTimeout(
        () => this.setState({ saveMessage: "" }),
        3000,
      );
      return true;
    } catch {
      this.setState({
        saveMessage:
          "Couldn’t save here. Please allow browser storage and try again.",
        saveError: true,
      });
      return false;
    }
  };
  updateMobileLibrary = (update) => this.setState(current => {
    const change = update({ lib: current.lib.map(item => ({ ...item })), preferences: libraryPreferences(current.libraryPreferences), lights: current.lights });
    return {
      ...(change.lib ? { lib: change.lib } : {}),
      ...(change.preferences ? { libraryPreferences: change.preferences } : {}),
      ...(change.lights ? { lights: change.lights } : {}),
      sel: null, saveMessage: "", saveError: false,
    };
  });
  setLib(fn) {
    this.setState((s) => ({ lib: fn(s.lib.map((b) => ({ ...b }))) }));
  }
  addDeco(type, shelf, beforeId) {
    if (!DECOS[type]) return;
    const existing = DECOS[type].pet && this.state.lib.find((b) => b.deco === type);
    if (existing) {
      this.setState({ sel: existing.id, toast: `${existing.t} is already on your shelf.` });
      return;
    }
    if (shelf == null) {
      const cnt = SHELF_LABELS.map(
        (_, s) => this.state.lib.filter((b) => b.shelf === s && b.onShelf !== false).length,
      );
      shelf = cnt.indexOf(Math.min(...cnt));
    }
    const nb = mkDeco(type, shelf);
    this.setState((s) => {
      const lib = s.lib.map((b) => ({ ...b }));
      const j = beforeId ? lib.findIndex((x) => x.id === beforeId) : -1;
      if (j < 0) {
        let last = -1;
        lib.forEach((x, k) => {
          if (x.shelf === shelf) last = k;
        });
        lib.splice(last + 1, 0, nb);
      } else lib.splice(j, 0, nb);
      return { lib, sel: nb.id };
    });
  }
  move(id, shelf, beforeId) {
    if (!Number.isInteger(shelf) || shelf < 0 || shelf >= SHELF_LABELS.length) return;
    if (this._newType) {
      const t = this._newType;
      this._newType = null;
      return this.addDeco(t, shelf, beforeId);
    }
    if (!id || id === beforeId) return;
    this.setLib((lib) => {
      const i = lib.findIndex((b) => b.id === id);
      if (i < 0) return lib;
      const [b] = lib.splice(i, 1);
      b.shelf = shelf;
      const j = beforeId ? lib.findIndex((x) => x.id === beforeId) : -1;
      if (j < 0) {
        let last = -1;
        lib.forEach((x, k) => {
          if (x.shelf === shelf) last = k;
        });
        lib.splice(last + 1, 0, b);
      } else lib.splice(j, 0, b);
      return lib;
    });
  }
  nudge(dir) {
    const id = this.state.sel;
    this.setLib((lib) => {
      const i = lib.findIndex((b) => b.id === id);
      if (i < 0) return lib;
      const sh = lib[i].shelf;
      let j = i + dir;
      while (j >= 0 && j < lib.length && (lib[j].shelf !== sh || lib[j].onShelf === false)) j += dir;
      if (j >= 0 && j < lib.length) [lib[i], lib[j]] = [lib[j], lib[i]];
      return lib;
    });
  }
  shelfJump(dir) {
    const b = this.state.lib.find((x) => x.id === this.state.sel);
    if (!b) return;
    const s = b.shelf + dir;
    if (s < 0 || s >= SHELF_LABELS.length) return;
    this.move(b.id, s, null);
  }
  sortBy(fn) {
    this.setLib((lib) =>
      SHELF_LABELS.flatMap((_, s) => lib.filter((b) => b.shelf === s).sort(fn)),
    );
  }
  bookVals(b) {
    const presentationScale = LIBRARY_PRESENTATION_SCALE * this.state.shelfHeight / SHELF_HEIGHT;
    if (b.deco) {
      const d = DECOS[b.deco],
        scale = presentationScale * (d.pet || b.deco === "dragon" ? 1.24 : 0.68),
        displayW = d.w * scale, displayH = d.h * scale,
        sel = this.state.sel === b.id;
      return {
        ...b,
        isBook: false,
        isDeco: true,
        fw: displayW,
        fh: displayH,
        bgImg: `url("${d.src}")`,
        isPet: !!d.pet,
        selected: sel,
        hasGlow: !!d.glow,
        dragStart: (e) => {
          this._newType = null;
          this._drag = b.id;
          try {
            e.dataTransfer.setData("text/plain", b.id);
            e.dataTransfer.effectAllowed = "move";
          } catch (_) {}
        },
        over: (e) => e.preventDefault(),
        drop: (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.move(this._drag, b.shelf, b.id);
          this._drag = null;
        },
        select: (e) => {
          e.stopPropagation();
          this.setState((s) => ({ sel: s.sel === b.id ? null : b.id }));
        },
      };
    }
    const T = b.T * 1.92 * presentationScale, H = b.H * 1.28 * presentationScale, D = b.D * 1.4 * presentationScale,
      sel = this.state.sel === b.id;
    const facing = bookFacing(b.mode);
    const bounds = bookBounds(T, H, D, facing, LIBRARY_BOOK_PERSPECTIVE);
    const drag = (e) => {
      this._newType = null;
      this._drag = b.id;
      try {
        e.dataTransfer.setData("text/plain", b.id);
        e.dataTransfer.effectAllowed = "move";
      } catch (_) {}
    };
    return {
      ...b,
      isBook: true,
      isDeco: false,
      T, H, D, facing,
      offsetX: bounds.offsetX,
      fw: bounds.width,
      fh: bounds.height,
      selected: sel,
      dragStart: drag,
      over: (e) => e.preventDefault(),
      drop: (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.move(this._drag, b.shelf, b.id);
        this._drag = null;
      },
      select: (e) => {
        e.stopPropagation();
        this.setState((s) => ({ sel: s.sel === b.id ? null : b.id }));
      },
    };
  }
  renderVals() {
    const libraryDirty = serializeLibrary(this.state) !== this.state.savedLayoutSignature;
    const shelves = SHELF_LABELS.map((label, s) => {
      const items = this.state.lib.filter(book => book.shelf === s && book.onShelf !== false);
      const cap = 9;
      const expanded = !!this.state.expanded[s];
      const canFold = items.length > cap;
      const shown = (canFold && !expanded ? items.slice(0, cap - 1) : items).map(book => this.bookVals(book));
      const toggle = () =>
        this.setState((st) => ({
          expanded: { ...st.expanded, [s]: !st.expanded[s] },
        }));
      return {
        label,
        height: Math.max(this.state.shelfHeight, ...shown.map(book => book.fh + 8)),
        items: shown,
        more: items.length - (cap - 1),
        canFold,
        expanded,
        toggle,
        lightsMode: this.state.lights,
        over: (e) => e.preventDefault(),
        drop: (e) => {
          e.preventDefault();
          this.move(this._drag, s, null);
          this._drag = null;
        },
      };
    });
    const selB = this.state.lib.find((b) => b.id === this.state.sel);
    const selectedRow = selB ? this.state.lib.filter(book => book.shelf === selB.shelf && book.onShelf !== false) : [];
    const selectedIndex = selectedRow.indexOf(selB);
    const setMode = (mode) => () =>
      this.setLib((lib) =>
        lib.map((b) => (b.id === this.state.sel ? { ...b, mode } : b)),
      );
    const modes = [
      ["spine", "Spine out"],
      ["cover", "Cover out"],
    ].map(([k, name]) => {
      const on = selB?.mode === k;
      return {
        name,
        run: setMode(k),
        selected: !!on,
      };
    });
    return {
      libraryDirty,
      saveLibrary: this.saveLibrary,
      mobileLibrary: { lib: this.state.lib, preferences: libraryPreferences(this.state.libraryPreferences), lights: this.state.lights },
      updateMobileLibrary: this.updateMobileLibrary,
      dropLibraryItem: (id, target) => {
        this.move(id, target.shelf, target.beforeId);
        this.setState({ sel: id });
      },
      discardLibrary: () => {
        clearTimeout(this._saveConfirmationTimer);
            this._drag = null;
        this._newType = null;
        this.setState((current) => {
          const snapshot = JSON.parse(current.savedLayoutSignature);
          return {
            lib: snapshot.lib, wall: snapshot.wall, caseC: snapshot.caseC,
            lights: snapshot.lights,
            libraryPreferences: libraryPreferences(snapshot.libraryPreferences),
            sel: null, toast: "", saveMessage: "", saveError: false,
            expanded: {},
          };
        });
      },
      saveMessage: this.state.saveError || !libraryDirty ? this.state.saveMessage || "" : "",
      saveError: !!this.state.saveError,
      libOpen: this.state.libOpen,
      closeLib: () => this.setState({ libOpen: false, sel: null }),
      stop: (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) this.setState({ sel: null });
      },
      sorts: [
        {
          name: "Colour",
          run: () => this.sortBy((a, b) => {
            const first = illustratedColour(a), second = illustratedColour(b);
            return first.hue - second.hue || first.lightness - second.lightness;
          }),
        },
        { name: "Height", run: () => this.sortBy((a, b) => b.H - a.H) },
        {
          name: "Title",
          run: () => this.sortBy((a, b) => a.t.localeCompare(b.t)),
        },
      ],
      wallBg: WALLS[this.state.wall].bg,
      wallInk: WALLS[this.state.wall].ink,
      walls: WALLS.map((w, i) => ({
        ...w,
        selected: i === this.state.wall,
        pick: () => this.setState({ wall: i }),
      })),
      cases: CASES.map((c, i) => ({
        ...c,
        selected: i === this.state.caseC,
        pick: () => this.setState({ caseC: i }),
      })),
      caseFrame: CASES[this.state.caseC].frame,
      caseShelf: CASES[this.state.caseC].shelf,
      lightOpts: [
        ["warm", "Warm"],
        ["pastel", "Pastel"],
        ["off", "Off"],
      ].map(([k, name]) => ({
        name,
        pick: () => this.setState({ lights: k }),
        selected: this.state.lights === k,
      })),
      companions: Object.entries(DECOS).filter(([, d]) => d.pet).map(([key, d]) => ({
        key, name: d.name, image: d.src, series: d.series,
        add: () => {
          const selected = this.state.lib.find((b) => b.id === this.state.sel);
          this.addDeco(key, selected ? selected.shelf : null, null);
        },
      })),
      tray: Object.keys(DECOS).filter((k) => !DECOS[k].pet).map((k) => ({
        key: k,
        name: DECOS[k].name,
        bgImg: `url("${DECOS[k].src}")`,
        dragStart: (e) => {
          this._newType = k;
          this._drag = null;
          try {
            e.dataTransfer.setData("text/plain", k);
            e.dataTransfer.effectAllowed = "copy";
          } catch (_) {}
        },
        add: () => {
          const sb = this.state.lib.find((b) => b.id === this.state.sel);
          this.addDeco(k, sb ? sb.shelf : null, null);
        },
      })),
      selIsBook: !!selB && !selB.deco,
      selIsDeco: !!selB && !!selB.deco,
      removeSel: () =>
        this.setState((s) => ({
          lib: s.lib.filter((b) => b.id !== s.sel),
          sel: null,
        })),
      deselect: () => this.setState({ sel: null }),
      toast: this.state.toast,
      hasToast: !!this.state.toast,
      shelves,
      hasSel: !!selB,
      selTitle: selB ? selB.t : "",
      modes,
      moves: [
        { icon: "←", label: "Move left", disabled: selectedIndex <= 0, run: () => this.nudge(-1) },
        { icon: "→", label: "Move right", disabled: selectedIndex < 0 || selectedIndex === selectedRow.length - 1, run: () => this.nudge(1) },
        { icon: "↑", label: "Shelf above", disabled: !selB || selB.shelf === 0, run: () => this.shelfJump(-1) },
        { icon: "↓", label: "Shelf below", disabled: !selB || selB.shelf === SHELF_LABELS.length - 1, run: () => this.shelfJump(1) },
      ],
    };
  }
}
