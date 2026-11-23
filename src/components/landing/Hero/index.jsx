import React from "react";
import "./styles.css";
import StoryGuests from "../StoryGuests";
import { imageAsset } from "../../../lib/image-assets.js";

export default function Hero() {
  return (
    <>
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
                <span className="hero-copy-wide">The Salon is a home for your books and the feelings they leave behind. Arrange your shelves, keep a private journal for every story, and find people who want to talk about it as much as you do.</span>
                <span className="hero-copy-phone">Your books. Your memories. Your people. Arrange your shelves and keep a journal for every story.</span>
              </p>

              <p className={"salon-s20"}>
                {"made for fantasy, romantasy & dystopian worlds · 15+"}
                <br />
                {"open to every story you love"}
              </p>
            </div>
          </header>
          <picture className="hero-mobile-illustration">
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
