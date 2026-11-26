import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalAccessibility from "../../../hooks/ModalAccessibility.jsx";
import ModalComingSoon from "../ModalComingSoon";

export default function ThreadsAction() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const host = open ? trigger.current?.closest(".salon-landing") : null;

  useEffect(() => {
    if (!open) return;
    function handleEscape(event) {
      if (event.key === "Escape" && !document.querySelector(".character-sheet[open]")) setOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" className="follow-social salon-marker-action salon-marker-secondary"
        aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <span className="salon-marker-text">Threads</span>
      </button>
      {host && createPortal(
        <>
          <ModalComingSoon name="Threads" onClose={() => setOpen(false)} />
          <ModalAccessibility open={open} returnFocus={trigger} />
        </>,
        host
      )}
    </>
  );
}
