import React, { useEffect, useRef, useState } from "react";
import StoryGuests from "../StoryGuests";
import QuoteText from "./index.jsx";

export default function GuestQuote({ name, placement, text, author, book, children }) {
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
    <figure ref={quote} className={`${name} quote-with-guest quote-guest-${placement} quote-reveal`} data-visible={visible}>
      {children}
      <StoryGuests group={placement} placement={placement} />
      <QuoteText text={text} className={`guest-quote-text ${name}-text`} />
      <figcaption className={`guest-quote-credit ${name}-credit`}>
        {author} · <cite className="salon-s28">{book}</cite>
      </figcaption>
    </figure>
  );
}
