import React from "react";
import StoryGuests from "./StoryGuests";

export default function QuoteStars(values) {
  const { q4Cap, q4Sky, q4Words, quote4Ref, w, x } = values;
  return (
    <>
      <div className={"salon-s166"}>
        <figure
          ref={quote4Ref}
          className="salon-s165 quote-with-guest quote-guest-stars"
        >
          <StoryGuests group="acotar" placement="stars" />
          {"\n    "}
          {q4Sky}
          {"\n    "}
          <span
            aria-hidden={"true"}
            className={"salon-s162"}
            style={{ opacity: q4Cap }}
          >
            {"✦ ✧ ✦"}
          </span>
          <blockquote
            aria-label={
              "To the stars who listen — and the dreams that are answered."
            }
            className={"salon-s163"}
          >
            {q4Words.map((w, index15) => (
              <React.Fragment key={index15}>
                <span
                  aria-hidden={"true"}
                  className={"salon-s26"}
                  style={{
                    opacity: w.op,
                    filter: w.blur,
                    transform: w.tf,
                    transition:
                      "opacity 1.1s ease " +
                      w.d +
                      ", filter 1.1s ease " +
                      w.d +
                      ", transform 1.2s cubic-bezier(.2,.8,.2,1) " +
                      w.d,
                  }}
                >
                  {w.t}
                </span>
              </React.Fragment>
            ))}
          </blockquote>
          <figcaption className={"salon-s164"} style={{ opacity: q4Cap }}>
            {"Sarah J. Maas · "}
            <span className={"salon-s28"}>{"A Court of Mist and Fury"}</span>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
