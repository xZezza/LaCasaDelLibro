import "../shared/actions.css";
import React, { useEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./styles.css";

const links = [
  { href: "#library", label: "Library" },
  { href: "#journal", label: "Journal" },
  { href: "#salon", label: "Community" },
  { href: "#follow", label: "Follow along" },
];

// Keep the existing theme icons shared between the header and the mobile sheet.
function ThemeIcon({ dark }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dark ? <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : <path d="M20.1 14.1A8.4 8.4 0 0 1 9.9 3.9 8.4 8.4 0 1 0 20.1 14.1Z"/>}</svg>;
}

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef(null);
  const backdropPress = useRef(false);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "ink" : "light";
  };
  const closeMenu = () => dialogRef.current?.close();
  const openMenu = () => {
    dialogRef.current.showModal();
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // A native modal supplies focus containment, background inertness and return focus.
    const phone = window.matchMedia(MEDIA_QUERIES.phone);
    const closeOnResize = () => { if (!phone.matches) dialogRef.current?.close(); };
    phone.addEventListener("change", closeOnResize);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      phone.removeEventListener("change", closeOnResize);
    };
  }, [menuOpen]);

  const isBackdrop = (event) => {
    if (event.target !== event.currentTarget) return false;
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };

  return (
    <>
      <nav aria-label="Main navigation" className="salon-s5 salon-nav">
        <a href="#top" aria-label="The Salon" className="salon-s1">
          <span role="img" aria-label="The Salon" className="salon-s0" />
        </a>
        <div className="salon-s4">
          <button type="button" className="theme-toggle" aria-label="Dark mode" aria-pressed={dark} onClick={toggleTheme}>
            <ThemeIcon dark={dark} />
          </button>
          {links.map(({ href, label }, index) => (
            <a key={href} href={href} className={`${index === 3 ? "salon-s3" : "salon-s2"} salon-marker-action salon-marker-nav salon-desktop-link`}>
              <span className="salon-marker-text">{label}</span>
            </a>
          ))}
          <button type="button" className="salon-menu-trigger" aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={openMenu}>
            <span className="salon-nav-icon salon-nav-icon-menu" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <dialog ref={dialogRef} id="mobile-navigation" className="salon-mobile-menu" aria-labelledby="mobile-navigation-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [...event.currentTarget.querySelectorAll('button, a[href]')];
          const first = controls[0], last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }}
        onClose={() => setMenuOpen(false)}
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onPointerDown={(event) => { backdropPress.current = isBackdrop(event); }}
        onClick={(event) => { if (backdropPress.current && isBackdrop(event)) closeMenu(); backdropPress.current = false; }}>
        <div className="salon-mobile-menu-handle" aria-hidden="true" />
        <div className="salon-mobile-menu-heading">
          <h2 id="mobile-navigation-title">Menu</h2>
          <button type="button" className="salon-menu-close" aria-label="Close menu" onClick={closeMenu} autoFocus>
            <span className="salon-nav-icon salon-nav-icon-close" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="salon-mobile-menu-links">
          {links.map(({ href, label }) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        </nav>
        <button type="button" className="salon-mobile-menu-theme" aria-label="Dark mode" aria-pressed={dark} onClick={toggleTheme}>
          <ThemeIcon dark={dark} /><span>Light / Dark</span>
        </button>
      </dialog>
    </>
  );
}
