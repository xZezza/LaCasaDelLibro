import React from "react";
import "../shared/ambient.css";
import "./styles.css";
export default function FairyLights({mode}) {
  if(mode==='off')return null;
  return <div className="fairy-lights" data-mode={mode} aria-hidden="true"><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0 3 Q50 27 100 3"/></svg>{Array.from({length:20},(_,i)=><span key={i} style={{'--bulb-index':i}}/>)}</div>;
}
