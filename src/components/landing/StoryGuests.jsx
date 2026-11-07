import React, { useEffect, useState } from "react";
import guests from "../../data/library-visitors.json";
import "./story-guests.css";

// Keep the approved artwork and the original no-repeat rotation across visits.
const storageKey = "the-salon-library-visitors-v1";
export default function StoryGuests() {
  const [visit, setVisit] = useState(null);
  const [phase, setPhase] = useState("entering");
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let cancelled = false;
    const timers = [];
    const stop = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      setVisit(null);
    };
    const catalog = guests.map((g) => g.id).join("|");
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {}
    let queue =
      saved.catalog === catalog && Array.isArray(saved.queue)
        ? [...new Set(saved.queue)].filter((id) =>
            guests.some((g) => g.id === id),
          )
        : [];
    if (!queue.length) {
      queue = guests.map((g) => g.id);
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      if (queue[0] === saved.last) [queue[0], queue[1]] = [queue[1], queue[0]];
    }
    async function start() {
      for (const id of queue) {
        const guest = guests.find((g) => g.id === id);
        const image = new Image();
        image.src = guest.image;
        try {
          await image.decode();
        } catch {
          continue;
        }
        if (cancelled) return;
        setVisit(guest);
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              catalog,
              last: id,
              queue: queue.filter((x) => x !== id),
            }),
          );
        } catch {}
        for (const [delay, next] of [
          [1550, "opening"],
          [2450, "reading"],
          [6500, "leaving"],
        ]) {
          timers.push(setTimeout(() => setPhase(next), delay));
        }
        timers.push(setTimeout(stop, 7600));
        return;
      }
    }
    start();
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", stop);
    const library = document.querySelector('[aria-label="Your library"]');
    library?.addEventListener("pointerdown", stop, { once: true });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", stop);
      library?.removeEventListener("pointerdown", stop);
    };
  }, []);
  if (!visit) return null;
  return (
    <div
      className="library-visitor salon-story-guest"
      aria-hidden="true"
      data-character={visit.id}
      data-phase={phase}
      data-motion={visit.motion || "pad"}
      style={{
        "--visitor-art": `url("${visit.image}")`,
        "--visitor-size": `${112 * (visit.scale || 1)}px`,
      }}
    >
      <div className="visitor-figure">
        <span className="visitor-pose visitor-closed" />
        <span className="visitor-pose visitor-reading" />
        <span className="visitor-foot-shadow" />
      </div>
      <span className="visitor-name">{visit.name}</span>
    </div>
  );
}
