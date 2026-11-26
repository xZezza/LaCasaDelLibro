import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.css";
import StoryGuests from "../StoryGuests";
import guests from "../../../data/library-visitors.json";
import { shelfGuestPosition, visitorScale } from "../../../lib/guest-layout.js";

const maxScale = Math.max(...guests.filter(guest => guest.kind === "creature").map(guest => visitorScale(guest, "shelf")));

// A decorative visit needs a clear stretch of a visible shelf.
export default function LibraryPets({ layoutKey }) {
  const rootRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [suppressed, setSuppressed] = useState(false);
  useEffect(() => {
    const stage = rootRef.current?.closest("[data-guest-stage]");
    if (!stage) return;
    let timer;
    const begin = (event) => {
      if (event.target.closest('[data-hand-id], [draggable="true"]')) {
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
    const room = stage.closest(".library-room");
    const dialog = stage.closest('[role="dialog"]');
    const header = room.querySelector(".library-room-header");
    let frame;
    function measure() {
      const bounds = stage.getBoundingClientRect();
      const zoom = bounds.width / stage.offsetWidth;
      if (!zoom) return;
      const viewport = dialog.getBoundingClientRect();
      const visibleTop = Math.max(viewport.top, header.getBoundingClientRect().bottom);
      const rows = [...stage.querySelectorAll("[data-library-shelf-items]")].flatMap(row => {
        const box = row.getBoundingClientRect();
        if (box.bottom <= visibleTop || box.bottom > viewport.bottom) return [];
        const top = (Math.max(visibleTop, box.top) - bounds.top) / zoom;
        const gaps = [];
        let edge = box.left;
        const addGap = right => gaps.push({
          left: (edge - bounds.left) / zoom,
          right: (right - bounds.left) / zoom,
          top,
          bottom: (box.bottom - bounds.top) / zoom,
          occupiedRight: (edge - bounds.left) / zoom,
        });
        for (const item of row.children) {
          const rect = item.getBoundingClientRect();
          // Projected page edges and companion zoom extend past the wrapper.
          const left = rect.left - 12;
          if (left > edge) addGap(Math.min(left, box.right));
          edge = Math.max(edge, rect.right + 12);
          if (edge >= box.right) break;
        }
        if (edge < box.right) addGap(box.right);
        return gaps;
      });
      const hoverScale = parseFloat(getComputedStyle(stage).getPropertyValue("--visitor-hover-scale")) || 1.2;
      const next = shelfGuestPosition(rows, { size: 152, maxScale, hoverScale });
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
    dialog.addEventListener("scroll", schedule, { capture: true });
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      dialog.removeEventListener("scroll", schedule, { capture: true });
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
