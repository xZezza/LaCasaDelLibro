import React, { useEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./styles.css";
import StoryGuests from "../StoryGuests";
import { imageAsset } from "../../../lib/image-assets.js";

export default function Hero() {
  const illustrationRef = useRef(null);
  const flowerBendRef = useRef(null);
  const [flowersMoving, setFlowersMoving] = useState(false);
  useEffect(() => {
    const phone = window.matchMedia(MEDIA_QUERIES.phone);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setFlowersMoving(visible && phone.matches && !reduced.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(illustrationRef.current);
    phone.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    const bend = flowerBendRef.current;
    if (!flowersMoving || !bend) return;
    let frame;
    const entered = performance.now();
    function breathe(now) {
      const t = now / 1000;
      // Overlapping gusts keep speed and amplitude changing without timed stops.
      const wind = 26 * Math.sin(t * .92)
        + 14 * Math.sin(t * Math.SQRT2 + .7)
        + 8 * Math.sin(t * .31 + 2);
      const settling = Math.min(1, (now - entered) / 900);
      const easeIn = settling * settling * (3 - 2 * settling);
      bend.setAttribute("scale", (wind * easeIn).toFixed(3));
      frame = requestAnimationFrame(breathe);
    }
    frame = requestAnimationFrame(breathe);
    return () => {
      cancelAnimationFrame(frame);
      bend.setAttribute("scale", "0");
    };
  }, [flowersMoving]);
  return (
    <>
      {/* The neutral displacement map only bends the upper bouquet; the original artwork stays intact. */}
      <svg width="0" height="0" className="hero-flower-motion" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-flower-sway" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
            <feImage href="/images/hero/flower-sway-map.svg" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="sway-map" />
            <feDisplacementMap ref={flowerBendRef} in="SourceGraphic" in2="sway-map" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className={"salon-s23 salon-hero"}>
        <div className="salon-hero-stage">
          <div className={"salon-s8"}>
            <div className={"salon-s7"}>
              <div
                role={"img"}
                aria-label={
                  "A cozy reading room with a bookcase decorated with flowers and fairy lights"
                }
                className={"salon-s6"}
              ></div>
            </div>
          </div>
          <div className={"salon-s9"}></div>
          <header id={"top"} className={"salon-s22"}>
            <div className={"salon-s21"}>
              <div className={"salon-s11"}>
                <span className={"salon-s10"}></span>
                {"\n      Now in development\n    "}
              </div>
              <h1 className={"salon-s15"}>
                {"A story doesn’t end when you close "}
                <em className={"salon-s14"}>
                  {"the last page."}
                  <span aria-hidden={"true"} className={"salon-s12"}></span>
                  <span aria-hidden={"true"} className={"salon-s13"}></span>
                </em>
              </h1>
              <p className={"salon-s16"}>
                {
                  "The Salon is a home for your books and the feelings they leave behind. Arrange your shelves, keep a private journal for every story, and find people who want to talk about it as much as you do."
                }
              </p>

              <p className={"salon-s20"}>
                {"made for fantasy, romantasy & dystopian worlds · 15+"}
                <br />
                {"open to every story you love"}
              </p>
            </div>
          </header>
          <picture ref={illustrationRef} className="hero-mobile-illustration" data-flowers-moving={flowersMoving}>
            <source media="(max-width: 650px)" srcSet={imageAsset("/images/hero/reading-journal-fantasy.png")} />
            <img
              src="/images/hero/reading-room.jpg"
              width={1355}
              height={1161}
              alt="An open reading journal with handwritten memories, a pressed flower and a tiny fantasy world rising from its pages"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <StoryGuests group="all" placement="hero" />
        </div>
      </div>
    </>
  );
}
