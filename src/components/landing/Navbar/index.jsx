import React from "react";
import "./styles.css";

export default function Navbar() {
  return (
    <>
      <nav aria-label="Main navigation" className={"salon-s5 salon-nav"}>
        <a href={"#top"} aria-label={"The Salon"} className={"salon-s1"}>
          <span
            role={"img"}
            aria-label={"The Salon"}
            className={"salon-s0"}
          ></span>
        </a>
        <div className={"salon-s4"}>
          <a href={"#library"} className={"salon-s2 salon-hover3"}>
            {"Library"}
          </a>
          <a href={"#journal"} className={"salon-s2 salon-hover4"}>
            {"Journal"}
          </a>
          <a href={"#salon"} className={"salon-s2 salon-hover5"}>
            {"Community"}
          </a>
          <a href={"#follow"} className={"salon-s3 salon-hover7"}>
            {"Follow along"}
          </a>
        </div>
      </nav>
    </>
  );
}
