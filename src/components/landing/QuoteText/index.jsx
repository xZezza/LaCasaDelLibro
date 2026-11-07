import React from "react";
import "./styles.css";

export default function QuoteText({text, className}) {
  return <blockquote aria-label={text} className={className}>
    {('“'+text+'”').split(' ').map((word,index)=><span aria-hidden="true" className="quote-word" key={index} style={{'--word-index':index}}>{word}</span>)}
  </blockquote>;
}
