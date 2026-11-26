import React from "react";
import { illustratedColour } from "../../../data/landing/library-art.js";
import { BRIGHT, WALLS, SHELVES, CATALOG, LIB, DECOS, mkDeco, CASES, LIGHTS, libraryIds } from "../../../data/landing/library.js";
import { bookRotation, bookBounds, LIBRARY_PRESENTATION_SCALE } from "../../../lib/library-motion.js";
import { serializeLibrary, isValidLibrarySnapshot } from "../../../lib/library-storage.js";
import { libraryPreferences } from "../../../lib/mobile-library.js";

const STORAGE_KEY = "the-salon-library-layout-v1";

export default class LibraryController extends React.Component {
  state = {
    savedLayoutSignature: serializeLibrary({
      lib: LIB,
      wall: 0,
      caseC: 0,
      lights: "warm",
      angle: -10,
    }),
    libOpen: false,
    q: "",
    qOpen: false,
    toast: "",
    expanded: {},
    lib: LIB,
    wall: 0,
    caseC: 0,
    lights: "warm",
    sel: null,
    angle: -10,
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
        const lib = saved.lib.map(book => book.deco ? book : { ...book, status: book.status ?? book.shelf });
        this.setState({
          savedLayoutSignature: serializeLibrary({ ...saved, lib }),
          lib,
          libraryPreferences: libraryPreferences(saved.libraryPreferences),
          wall: saved.wall,
          caseC: saved.caseC,
          lights: saved.lights,
          angle: saved.angle,
        });
      }
    } catch {
      /* A disabled store or older snapshot leaves the demo usable. */
    }
    window.addEventListener("keydown", this.handleEscape);
  }

  componentWillUnmount() {
    clearTimeout(this._saveConfirmationTimer);
    clearTimeout(this._toastT);
    window.removeEventListener("keydown", this.handleEscape);
  }

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
      const cnt = [0, 1, 2].map(
        (s) => this.state.lib.filter((b) => b.shelf === s).length,
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
      while (j >= 0 && j < lib.length && lib[j].shelf !== sh) j += dir;
      if (j >= 0 && j < lib.length) [lib[i], lib[j]] = [lib[j], lib[i]];
      return lib;
    });
  }
  shelfJump(dir) {
    const b = this.state.lib.find((x) => x.id === this.state.sel);
    if (!b) return;
    const s = b.shelf + dir;
    if (s < 0 || s > 2) return;
    this.move(b.id, s, null);
  }
  sortBy(fn) {
    this.setLib((lib) =>
      [0, 1, 2].flatMap((s) => lib.filter((b) => b.shelf === s).sort(fn)),
    );
  }
  bookVals(b) {
    if (b.deco) {
      const d = DECOS[b.deco],
        displayW = d.w * LIBRARY_PRESENTATION_SCALE, displayH = d.h * LIBRARY_PRESENTATION_SCALE,
        sel = this.state.sel === b.id;
      return {
        ...b,
        isBook: false,
        isDeco: true,
        objectW: displayW, objectH: displayH,
        rotation: { x: 0, y: 0, z: 0 },
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
    const { mode } = b,
      T = b.T * 1.92 * LIBRARY_PRESENTATION_SCALE, H = b.H * 1.28 * LIBRARY_PRESENTATION_SCALE, D = b.D * 1.4 * LIBRARY_PRESENTATION_SCALE,
      a = this.state.angle,
      sel = this.state.sel === b.id;
    const rotation = bookRotation(b);
    const bounds = b.rotation ? bookBounds(T, H, D, rotation, a, 700) : null;
    const fw = bounds ? bounds.width : mode === "spine" ? T : mode === "cover" ? D : H;
    const fh = bounds ? bounds.height : mode === "lying" ? T : H;
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
      T, H, D, rotation,
      offsetX: bounds?.offsetX || 0, offsetY: bounds?.offsetY || 0,
      fw,
      fh,
      selected: sel,
      angle: a,
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
    const shelves = [0, 1, 2].map((s) => {
      const segs = [];
      this.state.lib
        .filter((b) => b.shelf === s && b.onShelf !== false)
        .forEach((b) => {
          const v = this.bookVals(b),
            last = segs[segs.length - 1];
          if (b.mode === "lying" && last && last.lying) last.books.unshift(v);
          else segs.push({ lying: b.mode === "lying", books: [v] });
        });
      const CAP = 9,
        exp = !!this.state.expanded[s],
        over = segs.length > CAP;
      const hidden = over && !exp ? segs.length - (CAP - 1) : 0;
      const shown = hidden ? segs.slice(0, CAP - 1) : segs;
      const toggle = () =>
        this.setState((st) => ({
          expanded: { ...st.expanded, [s]: !st.expanded[s] },
        }));
      return {
        label: SHELVES[s],
        segs: shown,
        hasMore: hidden > 0,
        more: segs.slice(CAP - 1).reduce((a, g) => a + g.books.length, 0),
        stubH: 96,
        canFold: over,
        toggleLabel: exp ? "fold away" : "show all",
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
    const setMode = (mode) => () =>
      this.setLib((lib) =>
        lib.map((b) => (b.id === this.state.sel ? { ...b, mode, rotation: undefined } : b)),
      );
    const modes = [
      ["spine", "Spine out"],
      ["cover", "Cover out"],
      ["lying", "Lay flat"],
    ].map(([k, name]) => {
      const on = selB && !selB.rotation && selB.mode === k;
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
      commitBookMotion: (id, target) => {
        if (target.rotation) {
          this.setLib(lib => lib.map(b => b.id === id && !b.deco ? { ...b, rotation: { ...target.rotation } } : b));
        } else {
          this.move(id, target.shelf, target.beforeId);
        }
        this.setState({ sel: id });
      },
      discardLibrary: () => {
        clearTimeout(this._saveConfirmationTimer);
        clearTimeout(this._toastT);
        this._drag = null;
        this._newType = null;
        this.setState((current) => {
          const snapshot = JSON.parse(current.savedLayoutSignature);
          return {
            lib: snapshot.lib, wall: snapshot.wall, caseC: snapshot.caseC,
            lights: snapshot.lights, angle: snapshot.angle,
            libraryPreferences: libraryPreferences(snapshot.libraryPreferences),
            sel: null, toast: "", saveMessage: "", saveError: false,
            q: "", qOpen: false, expanded: {},
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
      angle: this.state.angle,
      setAngle: (e) => this.setState({ angle: +e.target.value }),
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
      q: this.state.q,
      hasQ: !!this.state.q,
      setQ: (e) => this.setState({ q: e.target.value, qOpen: true }),
      focusQ: () => this.setState({ qOpen: true }),
      clearQ: () => this.setState({ q: "", qOpen: false }),
      ...(() => {
        const q = this.state.q.trim().toLowerCase();
        if (!q || !this.state.qOpen)
          return { showResults: false, results: [], noResults: false };
        const pool = [
          ...CATALOG,
          ...LIB.filter((b) => !b.deco).map((b) => [b.t, ""]),
        ].filter((x, i, arr) => arr.findIndex((y) => y[0] === x[0]) === i);
        const found = pool
          .filter(
            ([t, a]) =>
              t.toLowerCase().includes(q) || a.toLowerCase().includes(q),
          )
          .slice(0, 5);
        return {
          showResults: true,
          noResults: !found.length,
          results: found.map(([t, a], i) => {
            const [hh, ll] = BRIGHT[(t.length * 3 + i) % BRIGHT.length];
            const owned = this.state.lib.find((b) => b.t === t);
            return {
              t,
              a: a || "In your library",
              inLib: owned && a ? " · on your shelf" : "",
              bg: `oklch(${ll} 0.15 ${hh})`,
              adds: [
                [0, "Read", "finished"],
                [1, "Reading", "reading now"],
                [2, "To read", "still waiting for me"],
              ].map(([sh, name, label]) => ({
                name,
                label,
                run: () => {
                  clearTimeout(this._toastT);
                  this.setState((st) => {
                    let lib = st.lib.map((b) => ({ ...b }));
                    const ex = lib.findIndex((b) => b.t === t);
                    if (ex >= 0) {
                      const [b] = lib.splice(ex, 1);
                      b.shelf = sh;
                      b.status = sh;
                      if (b.onShelf === false) b.onShelf = true;
                      lib.push(b);
                    } else
                      lib.push({
                        id: "n" + libraryIds.book++,
                        t,
                        shelf: sh,
                        status: sh,
                        h: hh,
                        l: ll,
                        c: 0.15,
                        T: 18 + ((t.length * 5) % 10),
                        H: 92 + ((t.length * 11) % 28),
                        D: 66,
                        mode: "spine",
                      });
                    return {
                      lib,
                      q: "",
                      qOpen: false,
                      toast: `“${t}” added to ${label} ✦`,
                      expanded: { ...st.expanded, [sh]: true },
                    };
                  });
                  this._toastT = setTimeout(
                    () => this.setState({ toast: "" }),
                    3200,
                  );
                },
              })),
            };
          }),
        };
      })(),
      toast: this.state.toast,
      hasToast: !!this.state.toast,
      shelves,
      hasSel: !!selB,
      noSel: !selB,
      selTitle: selB ? selB.t : "",
      modes,
      moves: [
        { icon: "←", label: "Move left", run: () => this.nudge(-1) },
        { icon: "→", label: "Move right", run: () => this.nudge(1) },
        { icon: "↑", label: "Shelf above", run: () => this.shelfJump(-1) },
        { icon: "↓", label: "Shelf below", run: () => this.shelfJump(1) },
      ],
    };
  }
}
