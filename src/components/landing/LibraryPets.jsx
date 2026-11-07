import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import StoryGuests from "./StoryGuests";

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
      const size = 112;
      const spots = [...stage.querySelectorAll("[data-library-shelf-items]")]
        .map((row) => {
          const box = row.getBoundingClientRect();
          const last = Math.max(
            box.left + 8 * zoom,
            ...[...row.children].map((el) => el.getBoundingClientRect().right),
          );
          const free = (box.right - last) / zoom - 28;
          return {
            free,
            left: (last - bounds.left) / zoom + 18,
            top: (box.bottom - bounds.top) / zoom - size,
          };
        })
        .filter((spot) => spot.free >= size + 8)
        .sort((a, b) => b.free - a.free);
      const next = spots[0]
        ? { left: Math.round(spots[0].left), top: Math.round(spots[0].top) }
        : null;
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
      style={position && !suppressed ? position : { display: "none" }}
    >
      {position && !suppressed && (
        <StoryGuests group="creatures" placement="shelf" repeat />
      )}
    </div>
  );
}
