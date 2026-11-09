import { visitorScale } from "../../../lib/guest-layout.js";
import { imageAsset } from "../../../lib/image-assets.js";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import guests from "../../../data/library-visitors.json";

const groups = {
  all: () => true,
  creatures: (guest) => guest.kind === "creature",
  potter: (guest) => guest.series === "Harry Potter",
  acotar: (guest) => guest.series === "A Court of Thorns and Roses",
  throne: (guest) =>
    guest.series === "Throne of Glass" && guest.kind !== "creature",
};
const seenThisPage = new Set();

// Keep approved artwork intact. Re-entering a scene starts a fresh visit; shelf animals also rotate while visible.
export default function StoryGuests({
  group = "all",
  placement = "hero",
  repeat = false,
}) {
  const hostRef = useRef(null);
  const [visit, setVisit] = useState(null);
  const [phase, setPhase] = useState("entering");
  useEffect(() => {
    const host = hostRef.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!host || motion.matches) return;
    const pool = guests.filter(groups[group] || groups.all);
    const storageKey = `the-salon-landing-visitors-v1:${group}`;
    const catalog = pool.map((g) => g.id).join("|");
    let disposed = false,
      visible = false,
      running = false,
      consumed = false,
      request = 0;
    let timers = [];
    const later = (delay, fn) => timers.push(setTimeout(fn, delay));
    function clearVisit() {
      request++;
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
      setVisit(null);
    }
    async function start() {
      if (
        disposed ||
        motion.matches ||
        document.hidden ||
        !visible ||
        running ||
        (consumed && !repeat)
      )
        return;
      running = true;
      const token = ++request;
      let saved = {};
      try {
        saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      } catch {}
      let queue =
        saved.catalog === catalog && Array.isArray(saved.queue)
          ? [...new Set(saved.queue)].filter((id) =>
              pool.some((g) => g.id === id),
            )
          : [];
      if (!queue.length) {
        queue = pool.map((g) => g.id);
        for (let i = queue.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [queue[i], queue[j]] = [queue[j], queue[i]];
        }
        if (queue.length > 1 && queue[0] === saved.last)
          [queue[0], queue[1]] = [queue[1], queue[0]];
      }
      const fresh = queue.filter((id) => !seenThisPage.has(id));
      for (const id of fresh.length ? fresh : queue) {
        const guest = pool.find((g) => g.id === id);
        const image = new Image();
        image.src = imageAsset(guest.image);
        try {
          await image.decode();
        } catch {
          continue;
        }
        if (disposed || token !== request) return;
        consumed = true;
        seenThisPage.add(id);
        setVisit(guest);
        setPhase("entering");
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
          [11000, "leaving"],
        ])
          later(delay, () => setPhase(next));
        later(12200, () => {
          setVisit(null);
          running = false;
          if (repeat) later(3200, start);
        });
        return;
      }
      running = false;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        if (visible) void start();
        else {
          clearVisit();
          // Rearm only after leaving the scene, not during a small scroll at
          // the entrance threshold. The saved queue chooses a new character.
          if (!entry.isIntersecting) consumed = false;
        }
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(host.parentElement);
    const onVisibility = () => {
      if (document.hidden) clearVisit();
      else if (repeat) void start();
    };
    const onMotion = () => {
      if (motion.matches) clearVisit();
      else if (repeat) void start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      disposed = true;
      request++;
      timers.forEach(clearTimeout);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, [group, placement, repeat]);
  return (
    <div
      ref={hostRef}
      className={`story-guest-host story-guest-${placement}`}
      data-guest-group={group}
      aria-hidden="true"
    >
      {visit && (
        <div
          className="library-visitor salon-story-guest"
          data-character={visit.id}
          data-phase={phase}
          data-motion={visit.motion || "pad"}
          style={{
            "--visitor-art": `url("${imageAsset(visit.image)}")`,
            "--visitor-size": `calc(var(--guest-size, 160px) * ${visitorScale(visit, placement)})`,
          }}
        >
          <div className="visitor-zoom">
            <div className="visitor-figure">
              <span className="visitor-pose visitor-closed" />
              <span className="visitor-pose visitor-reading" />
              <span className="visitor-foot-shadow" />
            </div>
            <span className="visitor-name">{visit.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
