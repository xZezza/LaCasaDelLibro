import React, { useRef } from "react";
import GuestQuote from "../QuoteText/GuestQuote.jsx";
import BookPreview from "./BookPreview";
import DesktopNotebook from "./DesktopNotebook";
import MobileNotebook from "./MobileNotebook";
import ReadingThread from "./ReadingThread";
import { useJournal } from "./useJournal.js";
import "./DesktopJournal.css";

export default function Journal({ label, editorial, caption }) {
  const { preview, previewLinks, activePreview, ...notebook } = useJournal();
  const grid = useRef(null);
  const links = useRef(null);
  const previewBox = useRef(null);

  return (
    <>
      <MobileNotebook {...notebook} caption={caption} />
      <div ref={grid} className="journal-grid">
        <DesktopNotebook {...notebook} linksRef={links} previewLinks={previewLinks} />
        <div className="journal-story">
          <GuestQuote
            name="journal-quote"
            placement="potter"
            text="I solemnly swear that I am up to no good."
            author="J.K. Rowling"
            book="Harry Potter and the Prisoner of Azkaban"
          >
            {label}
          </GuestQuote>
          {editorial}
          <BookPreview preview={preview} previewRef={previewBox} />
        </div>
        <ReadingThread grid={grid} links={links} preview={previewBox} activePreview={activePreview} />
      </div>
    </>
  );
}
