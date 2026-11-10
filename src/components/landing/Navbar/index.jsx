import "../shared/actions.css";
import React, { useState } from "react";
import "./styles.css";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "ink" : "light"; };
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
          <button type="button" className="theme-toggle" aria-label="Dark mode" aria-pressed={dark} onClick={toggleTheme}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dark ? <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : <path d="M20.1 14.1A8.4 8.4 0 0 1 9.9 3.9 8.4 8.4 0 1 0 20.1 14.1Z"/>}</svg></button>
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
