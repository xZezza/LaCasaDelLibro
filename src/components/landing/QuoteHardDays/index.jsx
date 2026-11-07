import QuoteText from "../QuoteText";
import React from "react";
import "./styles.css";

export default function QuoteHardDays(values) {
  const {
    q2Visible,
    quote2Ref,
  } = values;
  return (
    <>
      <div className={"salon-s56"}>
        <figure ref={quote2Ref} className="salon-s55 quote-reveal" data-visible={q2Visible}>
          <span className={"salon-s24"} ></span>
          <span className={"salon-s25"} ></span>
          <QuoteText text={"Don’t let the hard days win."} className="salon-s53" />
          <figcaption className={"salon-s54"} >
            {"Sarah J. Maas · "}
            <span className={"salon-s28"}>{"A Court of Mist and Fury"}</span>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
