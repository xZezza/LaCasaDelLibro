import React, { useEffect, useRef, useState } from "react";
import QuoteText from "../QuoteText";
import StoryGuests from "../StoryGuests";
import BookPreview from "./BookPreview";
import DesktopNotebook from "./DesktopNotebook";
import MobileNotebook from "./MobileNotebook";
import ReadingThread from "./ReadingThread";
import { useJournal } from "./useJournal.js";

function JournalQuote({ label }) {
  const quote = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: [0, 0.15],
    });
    observer.observe(quote.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={quote} className="journal-quote quote-with-guest quote-guest-potter quote-reveal" data-visible={visible}>
      {label}
      <StoryGuests group="potter" placement="potter" />
      <QuoteText text="I solemnly swear that I am up to no good." className="journal-quote-text" />
      <figcaption className="journal-quote-credit">
        J.K. Rowling · <cite className="salon-s28">Harry Potter and the Prisoner of Azkaban</cite>
      </figcaption>
    </figure>
  );
}

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
          <JournalQuote label={label} />
          {editorial}
          <BookPreview preview={preview} previewRef={previewBox} />
        </div>
        <ReadingThread grid={grid} links={links} preview={previewBox} activePreview={activePreview} />
      </div>
    </>
  );
}
