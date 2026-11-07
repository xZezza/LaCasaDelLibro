import React from "react";
import "./styles.css";
export default function ReadingThread({geometry}) {
  if(!geometry?.side)return null;
  const [sx,sy]=geometry.s,[ex,ey]=geometry.e,dx=ex-sx;
  const c1=[sx+dx*.55,sy+30],c2=[ex-dx*.5,ey];
  const d=`M${sx} ${sy} C${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${ex} ${ey}`;
  const mx=(sx+3*c1[0]+3*c2[0]+ex)/8,my=(sy+3*c1[1]+3*c2[1]+ey)/8;
  return <svg className="reading-thread" aria-hidden="true">
    <path d={d} className="thread-halo"/><path d={d} className="thread-line"/>
    <circle cx={sx} cy={sy} r="4"/><circle cx={ex} cy={ey} r="6" className="thread-ring"/><circle cx={ex} cy={ey} r="2.5"/>
    <circle className="thread-spark" r="3.5" style={{'--thread-path':`path("${d}")`}}/>
    <text x={mx+10} y={my-10} transform={`rotate(-8 ${mx} ${my})`}>opens this</text>
  </svg>;
}
