import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.css";
import StoryGuests from "../StoryGuests";
import guests from "../../../data/library-visitors.json";
import { shelfGuestPosition, visitorScale } from "../../../lib/guest-layout.js";

const maxScale = Math.max(...guests.filter(guest => guest.kind === "creature").map(guest => visitorScale(guest, "shelf")));

// A decorative visit can use only the unoccupied end of a shelf.
export default function LibraryPets({ layoutKey }) {
  const rootRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [suppressed, setSuppressed] = useState(false);
  useEffect(() => {
    const stage = rootRef.current?.closest("[data-guest-stage]");
    if (!stage) return;
    let timer;
    const begin = (event) => {
      if (event.target.closest('[draggable="true"]')) {
        clearTimeout(timer);
        setSuppressed(true);
      }
    };
    const end = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setSuppressed(false), 1500);
    };
    stage.addEventListener("pointerdown", begin, { capture: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("dragend", end);
    return () => {
      clearTimeout(timer);
      stage.removeEventListener("pointerdown", begin, { capture: true });
      window.removeEventListener("pointerup", end);
      window.removeEventListener("dragend", end);
    };
  }, []);
  useLayoutEffect(() => {
    const root = rootRef.current,
      stage = root?.closest("[data-guest-stage]");
    if (!stage || suppressed) return;
    let frame;
    function measure() {
      const bounds = stage.getBoundingClientRect();
      const zoom = bounds.width / stage.offsetWidth;
      if (!zoom) return;
      const rows = [...stage.querySelectorAll("[data-library-shelf-items]")].map(row => {
        const box = row.getBoundingClientRect();
        const last = Math.max(box.left,
          ...[...row.children].map(el => el.getBoundingClientRect().right));
        return {
          left: (box.left - bounds.left) / zoom,
          right: (box.right - bounds.left) / zoom,
          top: (box.top - bounds.top) / zoom,
          bottom: (box.bottom - bounds.top) / zoom,
          occupiedRight: (last - bounds.left) / zoom,
        };
      });
      const hoverScale = parseFloat(getComputedStyle(stage).getPropertyValue("--visitor-hover-scale")) || 1.2;
      const next = shelfGuestPosition(rows, {maxScale, hoverScale});
      setPosition((current) =>
        JSON.stringify(current) === JSON.stringify(next) ? current : next,
      );
    }
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    stage
      .querySelectorAll("[data-library-shelf-items]")
      .forEach((row) => observer.observe(row));
    stage.addEventListener("scroll", schedule, { capture: true });
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
    };
  }, [layoutKey, suppressed]);
  return (
    <div
      ref={rootRef}
      className="library-pet-placement"
      style={position && !suppressed ? {
        left: position.left, top: position.top,
        "--shelf-guest-size": position.size + "px",
      } : { display: "none" }}
    >
      {position && !suppressed && (
        <StoryGuests group="creatures" placement="shelf" repeat />
      )}
    </div>
  );
}
