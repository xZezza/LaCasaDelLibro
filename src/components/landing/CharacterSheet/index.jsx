import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import guests from "../../../data/library-visitors.json";
import frames from "../../../data/character-art-frames.json";
import profiles from "../../../data/character-profiles.json";
import { imageAsset } from "../../../lib/image-assets.js";
import "./styles.css";

export function openCharacterSheet(id, trigger) {
  window.dispatchEvent(new CustomEvent("salon:character", { detail: { id, trigger } }));
}

function CharacterDialog({ guest, trigger, onClose }) {
  const ref = useRef(null);
  const [turn, setTurn] = useState(0);
  const profile = profiles[guest.id];
  const frame = frames[guest.id];
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);
  return createPortal(
    <dialog ref={ref} className="character-sheet" aria-labelledby="character-sheet-name"
      onClose={onClose} onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => { if (event.key === "Escape") event.stopPropagation(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="character-sheet-card">
        <button type="button" className="character-sheet-close" aria-label="Close character portrait" onClick={onClose}>×</button>
        <button type="button" className="character-sheet-art" data-tone={profile.tone}
          aria-label={`Rotate ${profile.name}`} title="Tap to rotate"
          onClick={() => setTurn(current => current + 1)}>
          <span className="character-sheet-arch" aria-hidden="true" />
          <svg key={turn} className="character-sheet-figure" aria-hidden="true"
            viewBox={`0 0 ${frame.cut} ${frame.height}`} preserveAspectRatio="xMidYMid meet">
            <image href={imageAsset(guest.image)} width={frame.width} height={frame.height} />
          </svg>
        </button>
        <div className="character-sheet-copy">
          <p className="character-sheet-series">{guest.series}</p>
          <h2 id="character-sheet-name">{profile.name}</h2>
          <p className="character-sheet-description">{profile.description}</p>
          <dl className="character-sheet-traits">
            <div><dt>Personality</dt><dd>{profile.personality}</dd></div>
            <div><dt>Strengths</dt><dd>{profile.strength}<span>{profile.strengthDetail}</span></dd></div>
            <div><dt>Vulnerability</dt><dd>{profile.vulnerability}<span>{profile.vulnerabilityDetail}</span></dd></div>
          </dl>
        </div>
      </article>
    </dialog>, document.body);
}

export default function CharacterSheet() {
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    const open = event => {
      const guest = guests.find(item => item.id === event.detail?.id);
      if (guest && profiles[guest.id]) setSelection({ guest, trigger: event.detail.trigger });
    };
    window.addEventListener("salon:character", open);
    return () => window.removeEventListener("salon:character", open);
  }, []);
  return selection ? <CharacterDialog key={selection.guest.id} {...selection} onClose={() => setSelection(null)} /> : null;
}
