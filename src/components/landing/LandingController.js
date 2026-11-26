import React from "react";

export default class LandingController extends React.Component {
  quote2Ref = React.createRef();
  quote4Ref = React.createRef();
  quote5Ref = React.createRef();
  state = { soon: null };

  componentDidMount() {
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
    this._qio5 && this._qio5.disconnect();
    this._qio4 && this._qio4.disconnect();
    this._qio2 && this._qio2.disconnect();
    window.removeEventListener("keydown", this._key);
  }
  renderVals() {
    return {
      quote2Ref: this.quote2Ref, q2Visible: !!this.state.quote2In,
      quote4Ref: this.quote4Ref, q4Visible: !!this.state.quote4In,
      quote5Ref: this.quote5Ref, q5Visible: !!this.state.quote5In,
      showNotes: this.props.notes ?? true,
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
