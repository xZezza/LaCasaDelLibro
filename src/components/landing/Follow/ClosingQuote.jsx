import React, { useEffect, useRef, useState } from "react";
import QuoteText from "../QuoteText";
import StoryGuests from "../StoryGuests";

export default function ClosingQuote() {
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
    <figure ref={quote} className="follow-quote quote-with-guest quote-guest-throne quote-reveal" data-visible={visible}>
      <StoryGuests group="throne" placement="throne" />
      <QuoteText text="You could rattle the stars. You could do anything, if only you dared." className="follow-quote-text" />
      <figcaption className="follow-quote-credit">
        Sarah J. Maas · <cite className="salon-s28">Throne of Glass</cite>
      </figcaption>
    </figure>
  );
}
