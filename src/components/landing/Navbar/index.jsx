import "../shared/actions.css";
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
          <a href={"#library"} className={"salon-s2 salon-marker-action salon-marker-nav"}><span className="salon-marker-text">
            {"Library"}
          </span>
          </a>
          <a href={"#journal"} className={"salon-s2 salon-marker-action salon-marker-nav"}><span className="salon-marker-text">
            {"Journal"}
          </span>
          </a>
          <a href={"#salon"} className={"salon-s2 salon-marker-action salon-marker-nav"}><span className="salon-marker-text">
            {"Community"}
          </span>
          </a>
          <a href={"#follow"} className={"salon-s3 salon-marker-action salon-marker-nav"}><span className="salon-marker-text">
            {"Follow along"}
          </span>
          </a>
        </div>
      </nav>
    </>
  );
}
