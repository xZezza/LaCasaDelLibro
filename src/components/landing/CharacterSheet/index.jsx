import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import guests from "../../../data/library-visitors.json";
import frames from "../../../data/character-art-frames.json";
import profiles from "../../../data/character-profiles.json";
import portraitFrames from "../../../data/character-portrait-frames.json";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import { imageAsset } from "../../../lib/image-assets.js";
import "./styles.css";

export function openCharacterSheet(id, trigger) {
  window.dispatchEvent(new CustomEvent("salon:character", { detail: { id, trigger } }));
}

function CharacterDialog({ guest, trigger, onClose }) {
  const ref = useRef(null);
  const [turn, setTurn] = useState(0);
  const [openTrait, setOpenTrait] = useState(null);
  const profile = profiles[guest.id];
  const frame = frames[guest.id];
  const portrait = portraitFrames[guest.id];
  const traits = [
    { key: "personality", label: "Personality", title: profile.personality },
    { key: "strength", label: "Strengths", title: profile.strength, detail: profile.strengthDetail },
    { key: "vulnerability", label: "Vulnerability", title: profile.vulnerability, detail: profile.vulnerabilityDetail },
  ];
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const phone = matchMedia(MEDIA_QUERIES.phone);
    const focusClose = () => dialog.querySelector(phone.matches ? ".character-mobile-close" : ".character-sheet-close")?.focus({ preventScroll: true });
    phone.addEventListener("change", focusClose);
    return () => {
      phone.removeEventListener("change", focusClose);
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);
  return createPortal(
    <dialog ref={ref} className="character-sheet" aria-labelledby="character-sheet-name" style={{ "--character-paper": `url("${imageAsset("/images/decorations/ivory-paper-texture.png")}")` }}
      onClose={onClose} onCancel={event => { event.preventDefault(); onClose(); }}
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
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <header className="character-mobile-toolbar">
        <img className="character-mobile-bookmark" src="/images/decorations/journal-bookmark.svg" alt="" width="18" height="43" />
        <span>Character preview</span>
        <button type="button" className="character-mobile-close" aria-label="Close character portrait" onClick={onClose}><span aria-hidden="true" /></button>
      </header>
      <article className="character-sheet-card">
        <button type="button" className="character-sheet-close" aria-label="Close character portrait" onClick={onClose}>×</button>
        <button type="button" className="character-sheet-art" data-tone={profile.tone}
          aria-label={`Rotate ${profile.name}`} title="Tap to rotate"
          onClick={() => setTurn(current => current + 1)}>
          <span className="character-sheet-arch" aria-hidden="true" />
          <svg key={turn} className="character-sheet-figure character-sheet-figure-wide" aria-hidden="true"
            viewBox={`0 0 ${frame.cut} ${frame.height}`} preserveAspectRatio="xMidYMid meet">
            <image href={imageAsset(guest.image)} width={frame.width} height={frame.height} />
          </svg>
          <svg key={`mobile-${turn}`} className="character-sheet-figure character-sheet-figure-mobile" aria-hidden="true"
            viewBox={`${portrait.x} ${portrait.y} ${portrait.width} ${portrait.height}`} preserveAspectRatio="xMidYMid meet">
            <image href={imageAsset(guest.image)} width={frame.width} height={frame.height} />
          </svg>
        </button>
        <div className="character-sheet-copy">
          <div className="character-sheet-identity">
            <h2 id="character-sheet-name" data-long-name={profile.name.length > 10}>{profile.name}</h2>
            <p className="character-sheet-series">{guest.series}</p>
          </div>
          <p className="character-sheet-description">{profile.description}</p>
          <dl className="character-sheet-traits">
            <div><dt>Personality</dt><dd>{profile.personality}</dd></div>
            <div><dt>Strengths</dt><dd>{profile.strength}<span>{profile.strengthDetail}</span></dd></div>
            <div><dt>Vulnerability</dt><dd>{profile.vulnerability}<span>{profile.vulnerabilityDetail}</span></dd></div>
          </dl>
          <div className="character-mobile-traits">
            {traits.map(trait => <section className="character-mobile-trait" key={trait.key}>
              <h3><button type="button" id={`character-${guest.id}-${trait.key}-toggle`}
                aria-expanded={openTrait === trait.key} aria-controls={`character-${guest.id}-${trait.key}-content`}
                onClick={() => setOpenTrait(current => current === trait.key ? null : trait.key)}>
                {trait.label}<span className="character-mobile-chevron" aria-hidden="true" />
              </button></h3>
              <div className="character-mobile-trait-content" id={`character-${guest.id}-${trait.key}-content`}
                role="region" aria-labelledby={`character-${guest.id}-${trait.key}-toggle`} hidden={openTrait !== trait.key}>
                <p>{trait.title}</p>{trait.detail && <p className="character-mobile-trait-detail">{trait.detail}</p>}
              </div>
            </section>)}
          </div>
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
