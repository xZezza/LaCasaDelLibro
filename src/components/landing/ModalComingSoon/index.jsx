import "../shared/actions.css";
import "../shared/dialog.css";
import React from "react";
import "./styles.css";

export default function ModalComingSoon({ name, onClose }) {
  return (
    <div className="salon-s303" onClick={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div role="dialog" aria-label="Coming soon" aria-modal="true" tabIndex={-1} className="salon-s302 salon-dialog">
        <button onClick={onClose} aria-label="Close" type="button" className="salon-s296 salon-hover324">×</button>
        <span aria-hidden="true" className="salon-s297">✦ ✧ ✦</span>
        <div className="salon-s298">{name}</div>
        <div className="salon-s299">Coming soon</div>
        <p className="salon-s300">Our page is still being written. Check back soon.</p>
        <button onClick={onClose} type="button" className="salon-s301 salon-marker-action salon-marker-primary">
          <span className="salon-marker-text">Got it</span>
        </button>
      </div>
    </div>
  );
}
