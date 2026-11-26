import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import guests from "../../../data/library-visitors.json";
import frames from "../../../data/character-art-frames.json";
import profiles from "../../../data/character-profiles.json";
import { imageAsset } from "../../../lib/image-assets.js";
import DrawerHandle from "../shared/DrawerHandle.jsx";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
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
    <dialog ref={ref} className="character-sheet salon-drawer" aria-labelledby="character-sheet-name"
      onClose={onClose} onCancel={event => {
        event.preventDefault();
        if (!matchMedia(MEDIA_QUERIES.phone).matches) onClose();
      }}
      onKeyDown={event => {
        if (event.key === "Escape") { event.stopPropagation(); return; }
        if (event.key !== "Tab") return;
        const controls = [...ref.current.querySelectorAll('button,a[href],input,textarea,select,[tabindex="0"]')]
          .filter(element => !element.disabled && element.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }}
      onClick={event => {
        if (event.target === event.currentTarget && !matchMedia(MEDIA_QUERIES.phone).matches) onClose();
      }}>
      <div className="salon-drawer-header">
        <DrawerHandle onDismiss={onClose} />
        <button type="button" className="character-sheet-close" aria-label="Close character portrait" onClick={onClose}>×</button>
      </div>
      <article className="character-sheet-card salon-drawer-body">
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
          <div className="character-sheet-identity">
            <h2 id="character-sheet-name">{profile.name}</h2>
            <p className="character-sheet-series">{guest.series}</p>
          </div>
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
