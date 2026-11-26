import React from "react";

export default class LandingController extends React.Component {
  quote2Ref = React.createRef();
  quote4Ref = React.createRef();
  state = {};

  componentDidMount() {
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
  }
  componentWillUnmount() {
    this._qio4 && this._qio4.disconnect();
    this._qio2 && this._qio2.disconnect();
  }
  renderVals() {
    return {
      quote2Ref: this.quote2Ref, q2Visible: !!this.state.quote2In,
      quote4Ref: this.quote4Ref, q4Visible: !!this.state.quote4In,
    };
  }
}
