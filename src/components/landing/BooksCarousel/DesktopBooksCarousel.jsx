import React from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import BookCover from "../BookCover/index.jsx";
import "./DesktopBooksCarousel.css";

const MARQUEE_DURATION = 70_000;
const REPEATS = 4;

function loopTime(time) {
  return ((time % MARQUEE_DURATION) + MARQUEE_DURATION) % MARQUEE_DURATION;
}

export default class DesktopBooksCarousel extends React.Component {
  trackRef = React.createRef();
  state = { dragging: false };
  _dragMoved = 0;

  componentDidMount() {
    this._coversViewport = this.trackRef.current.parentElement;
    this._coversViewport.addEventListener("wheel", this.wheelCovers, { passive: false });

    this._desktop = matchMedia(MEDIA_QUERIES.desktop);
    this._desktop.addEventListener("change", this.scheduleCoverScale);
    this._coverResize = new ResizeObserver(this.measureCovers);
    this._coverResize.observe(this.trackRef.current);
    this._coverVisibility = new IntersectionObserver(([entry]) => {
      this._coversVisible = entry.isIntersecting;
      this.scheduleCoverScale();
    });
    this._coverVisibility.observe(this._coversViewport);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.dialogOpen !== this.props.dialogOpen) {
      this.setPaused(this.props.dialogOpen);
    }
  }

  componentWillUnmount() {
    this._coversViewport.removeEventListener("wheel", this.wheelCovers);
    this._desktop.removeEventListener("change", this.scheduleCoverScale);
    this._coverResize.disconnect();
    this._coverVisibility.disconnect();
    cancelAnimationFrame(this._coverScaleFrame);
    cancelAnimationFrame(this._coverWheelFrame);
    cancelAnimationFrame(this._nudge);
    clearTimeout(this._scrubT);
  }

  measureCovers = () => {
    this._coverPositions = Array.from(this.trackRef.current.children, slide => {
      const cover = slide.firstElementChild;
      return { cover, center: slide.offsetLeft + cover.offsetWidth / 2 };
    });
    this._lastCoverOffset = null;
    this.scheduleCoverScale();
  };

  scheduleCoverScale = () => {
    if (!this._desktop.matches || !this._coversVisible || !this._coverPositions) {
      cancelAnimationFrame(this._coverScaleFrame);
      this._coverScaleFrame = null;
      return;
    }
    this._coverScaleFrame ??= requestAnimationFrame(this.scaleCovers);
  };

  scaleCovers = () => {
    this._coverScaleFrame = null;
    if (!this._desktop.matches || !this._coversVisible) return;

    const viewport = this._coversViewport.getBoundingClientRect();
    const halfWidth = viewport.width / 2;
    const offset = this.trackRef.current.getBoundingClientRect().left - viewport.left;
    // Use the rendered track position for autoplay, gestures and native scrolling alike.
    if (halfWidth && (offset !== this._lastCoverOffset || halfWidth !== this._lastCoverHalfWidth)) {
      this._lastCoverOffset = offset;
      this._lastCoverHalfWidth = halfWidth;
      for (const position of this._coverPositions) {
        const distance = Math.min(1, Math.abs(position.center + offset - halfWidth) / halfWidth);
        const scale = (1.03 - 0.24 * distance ** 1.3).toFixed(3);
        if (scale === position.scale) continue;
        position.cover.style.setProperty("--carousel-cover-scale", scale);
        position.scale = scale;
      }
    }
    this.scheduleCoverScale();
  };

  pauseCovers = () => this.setPaused(true);
  resumeCovers = () => this.setPaused(false);

  scrubCovers(px) {
    const a = this.anim(),
      el = this.trackRef.current;
    if (!a || !el) return;
    const loopWidth = el.scrollWidth / REPEATS;
    // Direct input takes over from an arrow animation immediately.
    cancelAnimationFrame(this._nudge);
    this._nudging = false;
    a.pause();
    a.currentTime = loopTime((a.currentTime || 0) + (px / loopWidth) * MARQUEE_DURATION);
    clearTimeout(this._scrubT);
    this._scrubT = setTimeout(() => {
      this._scrubT = null;
      if (!this._hover && !this.props.dialogOpen && !this._pointerDrag && !this._coverWheelFrame) a.play();
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
      if (p || this.props.dialogOpen || this._coverWheelFrame || this._scrubT || this._pointerDrag) a.pause();
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
    const loopWidth = el.scrollWidth / REPEATS;
    const delta = ((d * 260) / loopWidth) * MARQUEE_DURATION;
    const from = a.currentTime || 0,
      t0 = performance.now();
    this._nudging = true;
    a.pause();
    cancelAnimationFrame(this._nudge);
    const step = (now) => {
      const k = Math.min((now - t0) / 500, 1),
        e = 1 - Math.pow(1 - k, 3);
      a.currentTime = loopTime(from + delta * e);
      if (k < 1) this._nudge = requestAnimationFrame(step);
      else {
        this._nudging = false;
        if (!this._hover && !this.props.dialogOpen) a.play();
      }
    };
    this._nudge = requestAnimationFrame(step);
  }

  dragStartCovers = (e) => {
    this._dragMoved = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || (e.pointerType === "mouse" && e.button !== 0)) return;
    this.flushCoverWheel();
    this._pointerDrag = {
      x: e.clientX,
      moved: 0,
      el: e.currentTarget,
      id: e.pointerId,
      cap: false,
    };
  };
  dragMoveCovers = (e) => {
    const d = this._pointerDrag;
    if (!d) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    d.moved += Math.abs(dx);
    if (!d.cap && d.moved > 6) {
      d.cap = true;
      try {
        d.el.setPointerCapture(d.id);
      } catch (_) {}
      this.setState({ dragging: true });
    }
    if (d.cap) this.scrubCovers(-dx);
  };
  dragEndCovers = () => {
    const d = this._pointerDrag;
    this._dragMoved = d ? d.moved : 0;
    this._pointerDrag = null;
    if (d && d.cap) {
      this.setState({ dragging: false });
      this.scrubCovers(0);
    }
  };

  render() {
    const { books, onOpen } = this.props;
    const slides = Array.from({ length: REPEATS }, (_, copy) =>
      books.map(book => ({ book, duplicate: copy !== 1 })),
    ).flat();

    return (
      <div className="salon-s51 salon-carousel-wrap">
        <button
          type="button"
          aria-label="Previous books"
          className="salon-carousel-arrow previous"
          onClick={() => this.scrollCovers(-1)}
          onMouseEnter={this.pauseCovers}
          onMouseLeave={this.resumeCovers}
          onFocus={this.pauseCovers}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14 6-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next books"
          className="salon-carousel-arrow next"
          onClick={() => this.scrollCovers(1)}
          onMouseEnter={this.pauseCovers}
          onMouseLeave={this.resumeCovers}
          onFocus={this.pauseCovers}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m10 6 6 6-6 6" />
          </svg>
        </button>
        <div
          data-salon-carousel=""
          onFocus={this.pauseCovers}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) this.resumeCovers();
          }}
          onMouseEnter={this.pauseCovers}
          onMouseLeave={this.resumeCovers}
          onPointerDown={this.dragStartCovers}
          onPointerMove={this.dragMoveCovers}
          onPointerUp={this.dragEndCovers}
          onPointerCancel={this.dragEndCovers}
          className={"salon-s50"}
          data-dragging={this.state.dragging}
        >
          <div ref={this.trackRef} className={"salon-s49"}>
            {slides.map(({ book, duplicate }, index) => (
              <div key={index} className="salon-s48" aria-hidden={duplicate}>
                <div
                  className="salon-s47"
                  role="button"
                  aria-label={`Open ${book.t}`}
                  tabIndex={duplicate ? -1 : 0}
                  onClick={event => {
                    if (!event.detail || this._dragMoved <= 6) onOpen(book, event.currentTarget);
                  }}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.currentTarget.click();
                    }
                  }}
                >
                  <div className="salon-s46 salon-hover53">
                    <div className="salon-s34" style={{ background: book.bg }} />
                    <div className="salon-s35" />
                    <div className="salon-s36" style={{ "--cover-bg": book.bg }} />
                    <div className="salon-s45">
                      <BookCover book={book} titleClass="salon-s40" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
