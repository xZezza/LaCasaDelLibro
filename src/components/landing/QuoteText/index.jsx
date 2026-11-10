import React from "react";
import "./styles.css";

export default function QuoteText({ text, className = "", breakBefore }) {
  const words = ('“' + text + '”').split(/\s+/);
  const breakIndex = breakBefore ? words.indexOf(breakBefore) : -1;
  return (
    <blockquote aria-label={text} className={"salon-quote-text " + className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {index > 0 ? index === breakIndex ? <br /> : " " : null}
          <span aria-hidden="true" className="quote-word" style={{ "--word-index": index }}>{word}</span>
        </React.Fragment>
      ))}
    </blockquote>
  );
}
