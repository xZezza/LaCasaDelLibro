import React, { useEffect, useState } from "react";
import "./thread.css";

export default function ReadingThread({ grid, links, preview, activePreview }) {
  const [endpoints, setEndpoints] = useState(null);

  useEffect(() => {
    const activeLink = links.current.children[activePreview];
    const frame = grid.current;
    const previewCard = preview.current;
    let animationFrame;
    let active = true;

    function measure() {
      const gridBox = frame.getBoundingClientRect();
      const linkBox = activeLink.getBoundingClientRect();
      const previewBox = previewCard.getBoundingClientRect();
      // The thread connects the two columns. The tablet and phone use a single column.
      const next = gridBox.width && previewBox.left - linkBox.right >= 54 ? [
        Math.round(linkBox.right - gridBox.left + 8),
        Math.round(linkBox.top + linkBox.height / 2 - gridBox.top),
        Math.round(previewBox.left - gridBox.left - 6),
        Math.round(previewBox.top - gridBox.top + Math.min(70, previewBox.height * 0.3)),
      ] : null;
      setEndpoints(current => current?.join() === next?.join() ? current : next);
    }

    function scheduleMeasure() {
      if (!active) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measure);
    }

    scheduleMeasure();
    const observer = window.ResizeObserver && new ResizeObserver(scheduleMeasure);
    if (observer) {
      [frame, activeLink, previewCard].forEach(element => observer.observe(element));
    }
    window.addEventListener("resize", scheduleMeasure);
    document.fonts?.ready.then(scheduleMeasure);
    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [grid, links, preview, activePreview]);

  if (!endpoints) return null;
  const [sx, sy, ex, ey] = endpoints;
  const gap = ex - sx;
  const c1 = [sx + gap * .55, sy + 30];
  const c2 = [ex - gap * .5, ey];
  const d = `M${sx} ${sy} C${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${ex} ${ey}`;
  const mx = (sx + 3 * c1[0] + 3 * c2[0] + ex) / 8;
  const my = (sy + 3 * c1[1] + 3 * c2[1] + ey) / 8;
  return (
    <svg className="reading-thread" aria-hidden="true">
      <path d={d} className="thread-halo" />
      <path d={d} className="thread-line" />
      <circle cx={sx} cy={sy} r="4" />
      <circle cx={ex} cy={ey} r="6" className="thread-ring" />
      <circle cx={ex} cy={ey} r="2.5" />
      <circle className="thread-spark" r="3.5" style={{ "--thread-path": `path("${d}")` }} />
      <text x={mx + 10} y={my - 10} transform={`rotate(-8 ${mx} ${my})`}>opens this</text>
    </svg>
  );
}
