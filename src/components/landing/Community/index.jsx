import "../shared/typography.css";
import React, { useEffect, useRef } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./styles.css";

const hogwartsReplies = [
  { reader: "Maya", text: "I’d have gone back just to see them wave again." },
  { reader: "Leo", text: "I think I’d ask a friend to come with me, so I’d remember to leave." },
];

function HogwartsForum() {
  return (
    <div className="community-forum-phone">
      <article className="community-forum-card" aria-labelledby="hogwarts-forum-title">
        <header className="community-forum-header">
          <div className="community-forum-meta">
            <p>Book Forum</p>
            <p>Spoilers · book 1</p>
          </div>
          <h3 id="hogwarts-forum-title">Harry Potter and the Philosopher’s Stone</h3>
        </header>
        <details className="community-forum-spoilers">
          <summary>
            <span className="community-forum-veil" aria-hidden="true" />
            <span className="community-forum-spoiler-action">
              <span className="community-forum-reveal">Open to discover more</span>
              <span className="community-forum-hide">Hide discussion</span>
              <span className="community-forum-chevron" aria-hidden="true" />
            </span>
          </summary>
          <div className="community-forum-body">
            <h4 className="community-forum-question">Would you have gone back to the Mirror of Erised?</h4>
            <figure className="community-forum-journal">
              <figcaption>From a reader’s journal</figcaption>
              <blockquote>The first time Harry sees his family is the moment I keep coming back to.</blockquote>
            </figure>
            <section className="community-forum-thread" aria-labelledby="hogwarts-forum-replies">
              <h4 id="hogwarts-forum-replies">{hogwartsReplies.length} replies</h4>
              <ul role="list">
                {hogwartsReplies.map(({ reader, text }) => (
                  <li key={reader}>
                    <p className="community-forum-reader">{reader}</p>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
            </section>
            <p className="community-forum-prompt">What would you see in the mirror?</p>
          </div>
        </details>
      </article>
      <p className="salon-s186">Illustrative conversation with fictional readers.</p>
    </div>
  );
}

export default function Community() {
  const postcard = useRef(null);
  const photograph = useRef(null);
  const replayPostcard = () => {
    const node = postcard.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia(MEDIA_QUERIES.phone).matches && !photograph.current?.naturalWidth) return;
    node.classList.remove("community-postcard-lift");
    void node.offsetWidth;
    node.classList.add("community-postcard-lift");
  };
  useEffect(() => {
    const node = postcard.current;
    const image = photograph.current;
    if (!node || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false;
    const playWhenReady = () => {
      if (!inView || (window.matchMedia(MEDIA_QUERIES.phone).matches && !image.naturalWidth)) return;
      replayPostcard();
      observer.disconnect();
      image.removeEventListener("load", playWhenReady);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      playWhenReady();
    }, { threshold: 0.55 });
    image.addEventListener("load", playWhenReady);
    observer.observe(node);
    return () => {
      observer.disconnect();
      image.removeEventListener("load", playWhenReady);
    };
  }, []);
  return (
    <section id="salon" className="salon-s188 salon-salon">
      <div>
        <div className="salon-s57">III · The Salon</div>
        <h2 className="salon-s58">Find the people who felt it too.</h2>
        <p className="salon-s59">A forum on every book page. A place to talk about the twist you didn’t see coming, the character you can’t let go of, and the passages that stay with you.</p>
        <div className="community-postcard-stage">
          <div ref={postcard} className="salon-s171" onMouseEnter={() => {
            if (!window.matchMedia(MEDIA_QUERIES.phone).matches) replayPostcard();
          }}>
            <div className="salon-s167" aria-hidden="true" />
            <div className="salon-s169">
              <picture>
                <source media={MEDIA_QUERIES.phone} srcSet="/images/community/hogwarts-banquet.webp" width="1200" height="900" />
                <img ref={photograph} className="salon-s168" src="/images/community/reading-circle.jpg" alt="Readers gathered around a table, discussing an open book." loading="lazy" />
              </picture>
              <span className="community-ceiling" aria-hidden="true" />
            </div>
            <div className="salon-s170">your people</div>
            <button type="button" className="community-postcard-replay" aria-label="Replay the enchanted postcard" onClick={replayPostcard}>↻</button>
          </div>
        </div>
      </div>
      <div className="salon-s187 community-forum-wide">
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
      <HogwartsForum />
    </section>
  );
}
