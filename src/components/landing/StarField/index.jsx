import React from "react";
import "../shared/ambient.css";
import "./styles.css";
export default function StarField() {
  return <div className="quote-sky" aria-hidden="true"><div className="quote-stars">{Array.from({length:46},(_,i)=><span key={i}/>)}</div><i className="shooting-star"/><i className="shooting-star second"/></div>;
}
