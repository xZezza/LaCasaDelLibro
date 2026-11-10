import StarField from "../StarField";
import QuoteText from "../QuoteText";
import React from "react";
import "./styles.css";
import StoryGuests from "../StoryGuests";

export default function QuoteStars(values) {
  const {
    q4Visible,
    quote4Ref,
  } = values;
  return (
    <>
      <div className={"salon-s166"}>
        <figure
          ref={quote4Ref}
          className="salon-s165 quote-with-guest quote-guest-stars quote-reveal" data-visible={q4Visible}
        >
          <StoryGuests group="acotar" placement="stars" />
          {"\n    "}
          <StarField />
          {"\n    "}
          <span
            aria-hidden={"true"}
            className={"salon-s162"}

          >
            {"✦ ✧ ✦"}
          </span>
          <QuoteText text={"To the stars who listen and the dreams that are answered."} breakBefore="and" className="salon-s163" />
          <figcaption className={"salon-s164"} >
            {"Sarah J. Maas · "}
            <span className={"salon-s28"}>{"A Court of Mist and Fury"}</span>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
