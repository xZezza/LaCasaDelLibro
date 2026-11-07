import React from "react";
import "./styles.css";

export default function QuoteHardDays(values) {
  const {
    q2Cap,
    q2Line,
    q2Words,
    quote2Ref,
  } = values;
  return (
    <>
      <div className={"salon-s56"}>
        <figure ref={quote2Ref} className={"salon-s55"}>
          <span className={"salon-s24"} style={{ transform: q2Line }}></span>
          <span className={"salon-s25"} style={{ transform: q2Line }}></span>
          <blockquote
            aria-label={"Don’t let the hard days win."}
            className={"salon-s53"}
          >
            {q2Words.map((w, index3) => (
              <React.Fragment key={index3}>
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
          <figcaption className={"salon-s54"} style={{ opacity: q2Cap }}>
            {"Sarah J. Maas · "}
            <span className={"salon-s28"}>{"A Court of Mist and Fury"}</span>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
