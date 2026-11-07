import React from "react";
import StoryGuests from "./StoryGuests";

export default function Hero(values) {
  const { openLib, x } = values;
  return (
    <>
      <div className={"salon-s23 salon-hero"}>
        <div className={"salon-s8"}>
          <div className={"salon-s7"}>
            <div
              role={"img"}
              aria-label={
                "A sunlit reading room with a bookcase decorated with flowers and fairy lights"
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
            <div className={"salon-s19"}>
              <a href={"#follow"} className={"salon-s17 salon-hover22"}>
                {"Follow the journey"}
              </a>
              <button
                onClick={openLib}
                type="button"
                className={"salon-s18 salon-hover24"}
              >
                {"Open the library"}
              </button>
            </div>
            <p className={"salon-s20"}>
              {"made for fantasy, romantasy & dystopian worlds · 15+"}
              <br />
              {"open to every story you love"}
            </p>
          </div>
        </header>
        <StoryGuests group="all" placement="hero" />
      </div>
    </>
  );
}
