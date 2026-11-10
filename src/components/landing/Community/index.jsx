import "../shared/typography.css";
import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function Community() {
  const postcard = useRef(null);
  const replayPostcard = () => {
    const node = postcard.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.remove("community-postcard-lift");
    void node.offsetWidth;
    node.classList.add("community-postcard-lift");
  };
  useEffect(() => {
    const node = postcard.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        replayPostcard();
        observer.disconnect();
      }
    }, { threshold: 0.55 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="salon" className="salon-s188 salon-salon">
      <div>
        <div className="salon-s57">III · The Salon</div>
        <h2 className="salon-s58">Find the people who felt it too.</h2>
        <p className="salon-s59">A forum on every book page. A place to talk about the twist you didn’t see coming, the character you can’t let go of, and the passages that stay with you.</p>
        <div className="community-postcard-stage">
          <div ref={postcard} className="salon-s171" onMouseEnter={replayPostcard}>
            <div className="salon-s167" />
            <div className="salon-s169"><div role="img" aria-label="Readers gathered around a table of books, talking" className="salon-s168" /></div>
            <div className="salon-s170">your people</div>
          </div>
        </div>
      </div>
      <div className="salon-s187">
        <article className="salon-s185 community-conversation" aria-label="Illustrative Book Forum conversation">
          <div className="salon-s172 community-book" aria-hidden="true" />
          <div className="salon-s184">
            <div className="salon-s174"><div className="salon-s99">Book Forum</div><div className="salon-s173">Spoilers · book 1</div></div>
            <h3 className="salon-s175">The Ashborn Saga</h3>
            <p className="salon-s176 community-question">Was the bridge scene a betrayal or a rescue?</p>
            <div className="salon-s179"><div className="salon-s177">From a reader’s journal</div><div className="salon-s178">“He turned back while the whole city was burning.”</div></div>
            <div className="community-replies">
              <div><div className="salon-s177">Maya · 2 hours ago</div><p className="salon-s178">A rescue. He had nothing left to gain by going back.</p></div>
              <div><div className="salon-s177">Clara · 1 hour ago</div><p className="salon-s178">Unless he needed her to trust him again…</p></div>
              <div><div className="salon-s177">Leo · 25 min ago</div><p className="salon-s178">That’s what makes this scene so hard to let go of.</p></div>
            </div>
            <div className="community-prompt salon-s178">And how did you read it?</div>
            <div className="community-footer salon-s173"><span>12 replies</span></div>
          </div>
        </article>
        <p className="salon-s186">Illustrative conversation. Names, book title and replies are placeholders.</p>
      </div>
    </section>
  );
}
