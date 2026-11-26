import React from "react";

export default class LandingController extends React.Component {
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
    if (!g || !row || !box || !g.getClientRects().length) return;
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
  state = {
    bookC: 0,
    rate: { romance: 4, flow: 5, mystery: 3, total: 4 },
    rateC: { romance: 0, flow: 3, mystery: 2, total: 4 },
    jShare: { best: true },
    pv: "book",
  };
  componentDidMount() {
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
    };
    window.addEventListener("keydown", this._key);
  }
  componentWillUnmount() {
    clearTimeout(this._measureTimer);
    cancelAnimationFrame(this._mt);
    this._qio6 && this._qio6.disconnect();
    this._qio5 && this._qio5.disconnect();
    this._qio4 && this._qio4.disconnect();
    this._qio2 && this._qio2.disconnect();
    window.removeEventListener("resize", this._onResize);
    this._ro && this._ro.disconnect();
    window.removeEventListener("keydown", this._key);
  }
  renderVals() {
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

    return {

      showNotes: this.props.notes ?? true,
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
      socials: [
        { name: "Instagram", href: "https://www.instagram.com/therealbooksalon/", primary: true },
        {
          name: "Threads",
          href: "#",
          open: (event) => {
            event.preventDefault();
            this.setState({ soon: "Threads" });
          },
        },
      ],
      soonOpen: !!this.state.soon,
      soonName: this.state.soon || "",
      closeSoon: () => this.setState({ soon: null }),
    };
  }
}
