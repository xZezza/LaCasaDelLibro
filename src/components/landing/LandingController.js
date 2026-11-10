import React from "react";
import { READ, TOREAD, BRIGHT, book, WOODS, WALLS, SHELVES, CATALOG, LIB, DECOS, mkDeco, CASES, LIGHTS, libraryIds } from "../../data/landing/library.js";
import { COVERS } from "../../data/landing/books.js";
import { serializeLibrary, isValidLibrarySnapshot } from "../../lib/library-storage.js";

export default class LandingController extends React.Component {
  trackRef = React.createRef();
  woodRef = React.createRef();
  quoteRef = React.createRef();
  quote2Ref = React.createRef();
  quote4Ref = React.createRef();
  quote5Ref = React.createRef();
  quote6Ref = React.createRef();
  jGridRef = React.createRef();
  linksRef = React.createRef();
  pvBoxRef = React.createRef();
  measureThread() {
    const g = this.jGridRef.current,
      row = this.linksRef.current,
      box = this.pvBoxRef.current;
    if (!g || !row || !box) return;
    const link =
      row.querySelectorAll("button")[this.state.pv === "saga" ? 1 : 0];
    if (!link) return;
    const gr = g.getBoundingClientRect(),
      lr = link.getBoundingClientRect(),
      br = box.getBoundingClientRect();
    const s = [lr.right - gr.left + 8, lr.top + lr.height / 2 - gr.top];
    let e = [
        br.left - gr.left - 6,
        br.top - gr.top + Math.min(70, br.height * 0.3),
      ],
      side = true;
    if (e[0] < s[0] + 40) {
      e = [
        br.left - gr.left + Math.min(80, br.width * 0.25),
        br.top - gr.top - 8,
      ];
      side = false;
    }
    const key = [...s, ...e].map(Math.round).join(",") + side;
    if (key !== this._threadKey) {
      this._threadKey = key;
      this.setState({ thread: { s, e, side } });
    }
  }
  componentDidUpdate() {
    cancelAnimationFrame(this._mt);
    this._mt = requestAnimationFrame(() => this.measureThread());
  }
  nudgeMarquee(ref, dur, px) {
    const el = ref.current,
      a = el && el.getAnimations && el.getAnimations()[0];
    if (!a) return;
    const delta = (px / (el.scrollWidth / 2)) * dur,
      from = a.currentTime || 0,
      t0 = performance.now(),
      hov = ref === this.woodRef ? () => this._woodHover : () => this._hover;
    a.pause();
    cancelAnimationFrame(ref._n);
    const step = (now) => {
      const k = Math.min((now - t0) / 450, 1),
        e = 1 - Math.pow(1 - k, 3);
      a.currentTime = (((from + delta * e) % dur) + dur) % dur;
      if (k < 1) ref._n = requestAnimationFrame(step);
      else if (!hov()) a.play();
    };
    ref._n = requestAnimationFrame(step);
  }
  scrubCovers(px) {
    const a = this.anim(),
      el = this.trackRef.current;
    if (!a || !el) return;
    const dur = 70000,
      half = el.scrollWidth / 4;
    // Direct input takes over from an arrow animation immediately.
    cancelAnimationFrame(this._nudge);
    this._nudging = false;
    a.pause();
    a.currentTime =
      ((((a.currentTime || 0) + (px / half) * dur) % dur) + dur) % dur;
    clearTimeout(this._scrubT);
    this._scrubT = setTimeout(() => {
      this._scrubT = null;
      if (!this._hover && !this._drag2 && !this._coverWheelFrame) a.play();
    }, 1200);
  }
  flushCoverWheel() {
    cancelAnimationFrame(this._coverWheelFrame);
    this._coverWheelFrame = null;
    const remaining = this._coverWheelPixels || 0;
    this._coverWheelPixels = 0;
    if (remaining) this.scrubCovers(remaining);
  }
  wheelCovers = (event) => {
    // Keep vertical page scrolling and trackpad pinch-to-zoom native.
    if (event.ctrlKey || event.metaKey || !this.anim()) return;
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (!delta) return;
    // A native non-passive listener is needed: React's wheel listener is passive.
    if (event.cancelable) event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this._coversViewport.clientWidth : 1;
    const pixels = delta * unit;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.scrubCovers(pixels);
      return;
    }
    this._coverWheelPixels = (this._coverWheelPixels || 0) + pixels;
    this.anim().pause();
    cancelAnimationFrame(this._nudge);
    this._nudging = false;
    if (this._coverWheelFrame) return;
    let previous = performance.now();
    const step = (now) => {
      const elapsed = Math.min(now - previous, 64);
      previous = now;
      const pending = this._coverWheelPixels;
      // Short, time-based smoothing preserves the trackpad's own momentum.
      const delta = Math.abs(pending) < 0.1 ? pending : pending * (1 - Math.exp(-elapsed / 32));
      this._coverWheelPixels -= delta;
      this.scrubCovers(delta);
      if (Math.abs(this._coverWheelPixels) >= 0.1) {
        this._coverWheelFrame = requestAnimationFrame(step);
      } else {
        this.scrubCovers(this._coverWheelPixels);
        this._coverWheelPixels = 0;
        this._coverWheelFrame = null;
      }
    };
    this._coverWheelFrame = requestAnimationFrame(step);
  };
  anim() {
    const el = this.trackRef.current;
    return el && el.getAnimations ? el.getAnimations()[0] : null;
  }
  setPaused(p) {
    this._hover = p;
    const a = this.anim();
    if (a && !this._nudging) {
      if (p || this._coverWheelFrame || this._scrubT || this._drag2) a.pause();
      else a.play();
    }
  }
  scrollCovers(d) {
    this.flushCoverWheel();
    const a = this.anim(),
      el = this.trackRef.current;
    if (!el) return;
    if (!a) {
      el.parentElement.scrollBy({ left: d * 260, behavior: "auto" });
      return;
    }
    const dur = 70000,
      half = el.scrollWidth / 4,
      delta = ((d * 260) / half) * dur;
    const from = a.currentTime || 0,
      t0 = performance.now();
    this._nudging = true;
    a.pause();
    cancelAnimationFrame(this._nudge);
    const step = (now) => {
      const k = Math.min((now - t0) / 500, 1),
        e = 1 - Math.pow(1 - k, 3);
      a.currentTime = (((from + delta * e) % dur) + dur) % dur;
      if (k < 1) this._nudge = requestAnimationFrame(step);
      else {
        this._nudging = false;
        if (!this._hover) a.play();
      }
    };
    this._nudge = requestAnimationFrame(step);
  }
  state = {
    savedLayoutSignature: serializeLibrary({
      lib: LIB,
      wall: 0,
      caseC: 0,
      lights: "warm",
      angle: -10,
    }),
    tab: this.props.initialShelf === "To read" ? "toread" : "read",
    wood: 1,
    bookC: 0,
    rate: { romance: 4, flow: 5, mystery: 3, total: 4 },
    rateC: { romance: 0, flow: 3, mystery: 2, total: 4 },
    jShare: { best: true },
    pv: "book",
    libOpen: false,
    q: "",
    qOpen: false,
    toast: "",
    expanded: {},
    sheet: null,
    lib: LIB,
    wall: 0,
    caseC: 0,
    lights: "warm",
    sel: null,
    angle: -10,
  };
  componentDidMount() {
    this._coversViewport = this.trackRef.current?.parentElement;
    this._coversViewport?.addEventListener("wheel", this.wheelCovers, { passive: false });
    try {
      const saved = JSON.parse(
        localStorage.getItem("the-salon-library-layout-v1") || "null",
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
        this.setState({
          savedLayoutSignature: serializeLibrary(saved),
          lib: saved.lib,
          wall: saved.wall,
          caseC: saved.caseC,
          lights: saved.lights,
          angle: saved.angle,
        });
      }
    } catch {
      /* A disabled store or older snapshot leaves the demo usable. */
    }

    if (window.IntersectionObserver && this.quote6Ref.current) {
      this._qio6 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote6In) this.setState({ quote6In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote6In)
            this.setState({ quote6In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio6.observe(this.quote6Ref.current);
    } else this.setState({ quote6In: true });
    if (window.IntersectionObserver && this.quote5Ref.current) {
      this._qio5 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote5In) this.setState({ quote5In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote5In)
            this.setState({ quote5In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio5.observe(this.quote5Ref.current);
    } else this.setState({ quote5In: true });
    if (window.IntersectionObserver && this.quote4Ref.current) {
      this._qio4 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.isIntersecting) {
            if (!this.state.quote4In) this.setState({ quote4In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote4In)
            this.setState({ quote4In: false });
        },
        { threshold: [0, 0.15], rootMargin: "0px" },
      );
      this._qio4.observe(this.quote4Ref.current);
    } else this.setState({ quote4In: true });
    if (window.IntersectionObserver && this.quote2Ref.current) {
      this._qio2 = new IntersectionObserver(
        (es) => {
          const e = es[es.length - 1];
          if (e.intersectionRatio >= 0.6) {
            if (!this.state.quote2In) this.setState({ quote2In: true });
          } else if (e.intersectionRatio === 0 && this.state.quote2In)
            this.setState({ quote2In: false });
        },
        { threshold: [0, 0.6], rootMargin: "0px 0px -28% 0px" },
      );
      this._qio2.observe(this.quote2Ref.current);
    } else this.setState({ quote2In: true });
    if (window.IntersectionObserver && this.quoteRef.current) {
      this._qio = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          if (entry.intersectionRatio >= 0.3) {
            this.setState({ openingQuoteRevealed: true });
          } else if (entry.intersectionRatio === 0) {
            this.setState({ openingQuoteRevealed: false });
          }
        },
        { threshold: [0, 0.3], rootMargin: "0px 0px -48px 0px" },
      );
      this._qio.observe(this.quoteRef.current);
    } else this.setState({ openingQuoteRevealed: true });
    this._onResize = () => this.measureThread();
    window.addEventListener("resize", this._onResize);
    if (window.ResizeObserver && this.jGridRef.current) {
      this._ro = new ResizeObserver(this._onResize);
      this._ro.observe(this.jGridRef.current);
    }
    this._measureTimer = setTimeout(this._onResize, 400);
    if (document.fonts) document.fonts.ready.then(this._onResize);
    this._key = (e) => {
      if (document.querySelector(".character-sheet[open]")) return;
      if (e.key === "Escape" && this.state.soon) {
        this.setState({ soon: null });
        return;
      }
      if (e.key === "Escape" && this.state.sheet != null) {
        this.setState({ sheet: null });
        return;
      }
      if (e.key === "Escape" && this.state.libOpen)
        this.setState((s) => (s.sel ? { sel: null } : { libOpen: false }));
    };
    window.addEventListener("keydown", this._key);
  }
  componentWillUnmount() {
    this._coversViewport?.removeEventListener("wheel", this.wheelCovers);
    cancelAnimationFrame(this._coverWheelFrame);
    clearTimeout(this._saveConfirmationTimer);
    clearTimeout(this._measureTimer);
    clearTimeout(this._toastT);
    clearTimeout(this._scrubT);
    cancelAnimationFrame(this._mt);
    cancelAnimationFrame(this.woodRef._n);
    cancelAnimationFrame(this.trackRef._n);
    this._qio6 && this._qio6.disconnect();
    this._qio5 && this._qio5.disconnect();
    this._qio4 && this._qio4.disconnect();
    this._qio2 && this._qio2.disconnect();
    this._qio && this._qio.disconnect();
    window.removeEventListener("resize", this._onResize);
    this._ro && this._ro.disconnect();
    cancelAnimationFrame(this._nudge);
    window.removeEventListener("keydown", this._key);
  }
  saveLibrary = () => {
    try {
      const snapshot = serializeLibrary(this.state);
      localStorage.setItem("the-salon-library-layout-v1", snapshot);
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
    } catch {
      this.setState({
        saveMessage:
          "Couldn’t save here. Please allow browser storage and try again.",
        saveError: true,
      });
    }
  };
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
        sel = this.state.sel === b.id;
      return {
        ...b,
        isBook: false,
        isDeco: true,
        fw: d.w,
        fh: d.h,
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
    const { T, H, D, mode } = b,
      a = this.state.angle,
      sel = this.state.sel === b.id;
    const fw = mode === "spine" ? T : mode === "cover" ? D : H;
    const fh = mode === "lying" ? T : H;
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
    const tilt = (this.props.shelfStyle ?? "3D") === "3D";

    const list = this.state.tab === "read" ? READ : TOREAD;
    const shelfBooks = list
      .slice(0, 7)
      .map((t, i) =>
        book(t, i + 2, tilt && i === Math.min(list.length, 7) - 1),
      );

    const BC = [
      ["Coral", "oklch(0.66 0.15 30)"],
      ["Cherry", "oklch(0.48 0.15 20)"],
      ["Rose", "oklch(0.74 0.11 5)"],
      ["Lavender", "oklch(0.62 0.12 300)"],
      ["Midnight", "oklch(0.38 0.1 265)"],
      ["Teal", "oklch(0.52 0.09 195)"],
      ["Sage", "oklch(0.62 0.07 145)"],
      ["Gold", "oklch(0.72 0.13 80)"],
    ];
    const bookColor = BC[this.state.bookC][1];
    const bookColors = BC.map(([name, v], i) => ({
      name,
      v,
      selected: i === this.state.bookC,
      pick: () => this.setState({ bookC: i }),
    }));
    const RC = [
      "oklch(0.6 0.19 18)",
      "oklch(0.74 0.13 355)",
      "oklch(0.6 0.15 300)",
      "oklch(0.55 0.1 200)",
      "oklch(0.75 0.14 75)",
    ];
    const RDEF = [
      [
        "romance",
        "Romance",
        "M12 20.5s-7.6-4.6-9.5-9.3C1.1 7.8 3.2 4.2 6.7 4.2c2.1 0 3.6 1.2 5.3 3.2 1.7-2 3.2-3.2 5.3-3.2 3.5 0 5.6 3.6 4.2 7C19.6 15.9 12 20.5 12 20.5z",
        1.6,
        true,
        "heart",
      ],
      [
        "flow",
        "Page-turner",
        "M2.5 5.5c3.2-1.1 6.3-.8 9.5 1.3 3.2-2.1 6.3-2.4 9.5-1.3v13c-3.2-1.1-6.3-.8-9.5 1.3-3.2-2.1-6.3-2.4-9.5-1.3zM12 6.8v13",
        1.6,
        true,
        "book",
      ],
      [
        "mystery",
        "Mystery",
        "M8.2 8.6a3.8 3.8 0 1 1 5.6 3.3c-1.2.7-1.8 1.4-1.8 2.8v.6M12 19.2v.3",
        2.6,
        false,
        "question mark",
      ],
      [
        "total",
        "Total score",
        "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z",
        1.6,
        true,
        "star",
      ],
    ];
    const ratings = RDEF.map(([k, name, path, sw, filled, noun]) => {
      const v = this.state.rate[k],
        col = RC[this.state.rateC[k]];
      return {
        name,
        path,
        sw,
        color: col,
        total: k === "total",
        filled,
        icons: [1, 2, 3, 4, 5].map((n) => ({
          label: name + " " + n,
          selected: n <= v,
          set: () =>
            this.setState((s) => ({
              rate: { ...s.rate, [k]: s.rate[k] === n ? n - 1 : n },
            })),
        })),
        colors: RC.map((c, i) => ({
          v: c,
          selected: i === this.state.rateC[k],
          pick: () => this.setState((s) => ({ rateC: { ...s.rateC, [k]: i } })),
        })),
      };
    });
    const chars = [
      {
        label: "Favourite",
        name: "Maren",
        note: "never asked to be chosen",
        bg: "oklch(0.9 0.05 150 / 0.7)",
      },
      {
        label: "Can’t stand",
        name: "Lord Aske",
        note: "wanted to throw the book",
        bg: "oklch(0.88 0.06 20 / 0.7)",
      },
      {
        label: "Pointless",
        name: "Brother Ivo",
        note: "what was he even for?",
        bg: "oklch(0.88 0.04 260 / 0.7)",
      },
    ];
    const shK = ["best", "review"];
    const sh = Object.fromEntries(
      shK.map((k) => {
        const on = !!this.state.jShare[k];
        return [
          k,
          {
            state: on ? "Shared" : "Private",
            selected: on,
            toggle: () =>
              this.setState((s) => ({
                jShare: { ...s.jShare, [k]: !s.jShare[k] },
              })),
          },
        ];
      }),
    );
    const nSh = shK.filter((k) => this.state.jShare[k]).length;
    const jSummary =
      nSh === 0
        ? "Everything on this page is private."
        : nSh === 1
          ? "One thought is visible on your profile. The rest stays yours."
          : "Both thoughts are visible on your profile. The rest stays yours.";
    const saga = this.state.pv === "saga";
    const pvLinks = [
      ["book", "Go to the book page"],
      ["saga", "Go to the saga"],
    ].map(([k, name]) => ({
      name,
      pick: () => this.setState({ pv: k }),
      fg: this.state.pv === k ? "oklch(0.55 0.09 300)" : "oklch(0.42 0.03 305)",
    }));
    const pv = saga
      ? {
          pvKind: "Saga",
          pvTitle: "The Ashborn Saga",
          pvMeta: "M. Hale · 3 books",
          pvAbout:
            "Every book in reading order, the readers following the series, and where you are in it.",
          pvCovers: [
            { w: 30, h: 46, bg: bookColor },
            { w: 30, h: 50, bg: "oklch(0.5 0.1 200)" },
            { w: 30, h: 54, bg: "oklch(0.45 0.1 300)" },
          ],
          pvChars: ["Maren", "Corin", "Lord Aske", "The Ferryman"],
          pvThread: "Rereading the whole saga before book three?",
        }
      : {
          pvKind: "Book",
          pvTitle: "The Ember Crown",
          pvMeta: "M. Hale · 512 pages · Book 1 of The Ashborn Saga",
          pvAbout:
            "Everything about the book in one place, plus what other readers chose to share.",
          pvCovers: [{ w: 40, h: 60, bg: bookColor }],
          pvChars: ["Maren", "Corin", "Lord Aske"],
          pvThread: "Was the bridge scene a betrayal or a rescue?",
        };
    const quoteVals = {
      openingQuoteRevealed: !!this.state.openingQuoteRevealed,
      quoteRef: this.quoteRef,
      quote2Ref: this.quote2Ref, q2Visible: !!this.state.quote2In,
      quote4Ref: this.quote4Ref, q4Visible: !!this.state.quote4In,
      quote5Ref: this.quote5Ref, q5Visible: !!this.state.quote5In,
      quote6Ref: this.quote6Ref, q6Visible: !!this.state.quote6In,
    };
    const journalVals = {
      ...quoteVals,
      threadGeometry: this.state.thread,
      jGridRef: this.jGridRef,
      linksRef: this.linksRef,
      pvBoxRef: this.pvBoxRef,
      bookColor,
      bookColors,
      ratings,
      chars,
      sh,
      jSummary,
      pvLinks,
      ...pv,
    };

    const shelves = [0, 1, 2].map((s) => {
      const segs = [];
      this.state.lib
        .filter((b) => b.shelf === s)
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
        lib.map((b) => (b.id === this.state.sel ? { ...b, mode } : b)),
      );
    const modes = [
      ["spine", "Spine out"],
      ["cover", "Cover out"],
      ["lying", "Lay flat"],
    ].map(([k, name]) => {
      const on = selB && selB.mode === k;
      return {
        name,
        run: setMode(k),
        selected: !!on,
      };
    });
    return {

      shelfBooks,
      covers: Array.from({ length: 4 }, () => COVERS)
        .flat()
        .map((c, j) => ({
          duplicate: j < COVERS.length || j >= COVERS.length * 2,
          ...c,
          open: () => {
            if (this._dragMoved > 6) return;
            this.setPaused(true);
            this.setState({ sheet: j % COVERS.length });
          },
        })),
      sheetOpen: this.state.sheet != null,
      sb: COVERS[this.state.sheet ?? 0],
      closeSheet: () => {
        this.setState({ sheet: null });
        this.setPaused(false);
      },
      stopSheet: (e) => e.stopPropagation(),
      trackRef: this.trackRef,
      dragStartCovers: (e) => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        this.flushCoverWheel();
        this._dragMoved = 0;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        this._drag2 = {
          x: e.clientX,
          moved: 0,
          el: e.currentTarget,
          id: e.pointerId,
          cap: false,
        };
      },
      dragMoveCovers: (e) => {
        const d = this._drag2;
        if (!d) return;
        const dx = e.clientX - d.x;
        d.x = e.clientX;
        d.moved += Math.abs(dx);
        if (!d.cap && d.moved > 6) {
          d.cap = true;
          try {
            d.el.setPointerCapture(d.id);
          } catch (_) {}
          this.setState({ coverDrag: true });
        }
        if (d.cap) this.scrubCovers(-dx);
      },
      dragEndCovers: () => {
        const d = this._drag2;
        this._dragMoved = d ? d.moved : 0;
        this._drag2 = null;
        if (d && d.cap) {
          this.setState({ coverDrag: false });
          this.scrubCovers(0);
        }
      },
      coverDragging: !!this.state.coverDrag,
      pauseCovers: () => this.setPaused(true),
      resumeCovers: () => this.setPaused(false),
      prevCovers: () => this.scrollCovers(-1),
      nextCovers: () => this.scrollCovers(1),
      showNotes: this.props.notes ?? true,
      showRead: () => this.setState({ tab: "read" }),
      showToRead: () => this.setState({ tab: "toread" }),
      readingTab: this.state.tab,
      woods: [...WOODS, ...WOODS].map((w, j, arr) => {
        const i = j % WOODS.length;
        return {
          ...w,
          selected: i === this.state.wood,
          pick: () => this.setState({ wood: i }),
        };
      }),
      woodGrad: WOODS[this.state.wood].grad,
      woodRef: this.woodRef,
      woodPrev: () => this.nudgeMarquee(this.woodRef, 26000, -90),
      woodNext: () => this.nudgeMarquee(this.woodRef, 26000, 90),
      woodPause: () => {
        this._woodHover = true;
        const a =
          this.woodRef.current && this.woodRef.current.getAnimations()[0];
        a && a.pause();
      },
      woodPlay: () => {
        this._woodHover = false;
        const a =
          this.woodRef.current && this.woodRef.current.getAnimations()[0];
        a && a.play();
      },
      shelfCaption:
        this.state.tab === "read"
          ? "Books you’ve finished, kept where you can see them."
          : "The ones still waiting for you.",
      ...journalVals,

      forums: [
        {
          kind: "Saga forum",
          meta: "Spoilers up to book 1",
          name: "The Ashborn Saga",
          thread: "Was the bridge scene a betrayal or a rescue?",
          bg: "oklch(0.4 0.09 20)",
          edge: "oklch(0.52 0.11 15 / 0.6)",
          rot: "-0.8deg",
          hasQuote: !!this.state.jShare.best,
          quote:
            "The bridge scene. Corin turning back for her when the whole city was burning.",
        },
        {
          kind: "Book forum",
          meta: "Started by a reader",
          name: "Salt & Starlight",
          thread:
            "Favourite side character, and why it’s the lighthouse keeper",
          bg: "oklch(0.32 0.09 200)",
          edge: "oklch(0.55 0.1 200 / 0.6)",
          rot: "0.6deg",
        },
        {
          kind: "Reading group",
          meta: "Reading together",
          name: "Night owls read Moonward",
          thread:
            "A small group reading one book at the same pace, with a thread for each part.",
          bg: "oklch(0.4 0.08 150)",
          edge: "oklch(0.62 0.07 145 / 0.7)",
          rot: "-0.4deg",
          hasProgress: true,
          pct: "38%",
          progress: "Part 2 of 5",
          next: "Next chat: end of part 2",
        },
      ],
      socials: ["Instagram", "TikTok", "Threads"].map((name) => ({
        name,
        href: "#",
        open: (e) => {
          e.preventDefault();
          this.setState({ soon: name });
        },
      })),
      soonOpen: !!this.state.soon,
      soonName: this.state.soon || "",
      closeSoon: () => this.setState({ soon: null }),
      libraryDirty:
        serializeLibrary(this.state) !== this.state.savedLayoutSignature,
      saveLibrary: this.saveLibrary,
      // Create the callback with the rendered controls, including on retained
      // development instances that predate the new discard class field.
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
            sel: null, toast: "", saveMessage: "", saveError: false,
            q: "", qOpen: false, expanded: {},
          };
        });
      },
      saveMessage:
        this.state.saveError ||
        serializeLibrary(this.state) === this.state.savedLayoutSignature
          ? this.state.saveMessage || ""
          : "",
      saveError: !!this.state.saveError,
      libOpen: this.state.libOpen,
      openLib: () => this.setState({ libOpen: true }),
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
          run: () => this.sortBy((a, b) => a.h - b.h || a.l - b.l),
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
                      lib.push(b);
                    } else
                      lib.push({
                        id: "n" + libraryIds.book++,
                        t,
                        shelf: sh,
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
