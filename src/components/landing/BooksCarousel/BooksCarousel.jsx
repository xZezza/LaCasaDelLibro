import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import { COVERS } from "../../../data/landing/books.js";
import ModalAccessibility from "../../../hooks/ModalAccessibility.jsx";
import MobileBooksCarousel from "../MobileBooksCarousel/index.jsx";
import ModalBookSheet from "../ModalBookSheet/index.jsx";
import DesktopBooksCarousel from "./DesktopBooksCarousel.jsx";

export default function BooksCarousel() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [overlayHost, setOverlayHost] = useState(null);
  const opener = useRef(null);
  const dialogOpen = selectedBook !== null;

  useEffect(() => {
    setOverlayHost(document.querySelector(".salon-landing"));
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;

    function onEscape(event) {
      if (event.key === "Escape" && !matchMedia(MEDIA_QUERIES.phone).matches && !document.querySelector(".character-sheet[open]")) {
        setSelectedBook(null);
      }
    }

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [dialogOpen]);

  function openBook(book, trigger) {
    opener.current = trigger;
    setSelectedBook(book);
  }

  return (
    <>
      <MobileBooksCarousel books={COVERS} onOpen={openBook} dialogOpen={dialogOpen} />
      <DesktopBooksCarousel books={COVERS} onOpen={openBook} dialogOpen={dialogOpen} />
      {overlayHost && createPortal(
        <>
          <ModalBookSheet
            sb={selectedBook}
            sheetOpen={dialogOpen}
            closeSheet={() => setSelectedBook(null)}
          />
          <ModalAccessibility open={dialogOpen} returnFocus={opener} />
        </>,
        overlayHost,
      )}
    </>
  );
}
