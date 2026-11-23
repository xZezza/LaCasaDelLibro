import "../shared/typography.css";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import "./styles.css";

const hogwartsReplies = [
  { reader: "Maya", text: "I’d have gone back just to see them wave again." },
  { reader: "Leo", text: "I think I’d ask a friend to come with me, so I’d remember to leave." },
];

const recommendationReplies = [
  { reader: "Maya", text: "The Night Circus. I loved the atmosphere and the feeling of stepping into another world." },
  { reader: "Leo", text: "Piranesi, if you want something mysterious to get lost in for an afternoon." },
];

function ForumReplies({ id, replies }) {
  return <section className="community-forum-thread" aria-labelledby={id}>
    <h4 id={id}>{replies.length} replies</h4>
    <ul role="list">{replies.map(({ reader, text }) => <li key={reader}>
      <p className="community-forum-reader">{reader}</p>
      <p>{text}</p>
    </li>)}</ul>
  </section>;
}

function CommunityForums() {
  const [selected, setSelected] = useState("book");
  const [expanded, setExpanded] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const hand = useRef(null);
  const interacted = useRef(false);
  const fanScroll = useRef(null);
  const pendingReturn = useRef(null);
  const chooseForum = id => {
    if (!expanded) fanScroll.current = window.scrollY;
    interacted.current = true;
    setSelected(id);
    setExpanded(true);
  };
  const focusForum = id => {
    interacted.current = true;
    setSelected(id);
  };
  const returnToFan = id => {
    pendingReturn.current = id;
    setBookOpen(false);
    setRoomOpen(false);
    setExpanded(false);
    setSelected(id);
  };
  const closeDiscussion = (id, event) => {
    event.stopPropagation();
    interacted.current = true;
    returnToFan(id === "book" ? "rooms" : "book");
  };
  const backToCards = () => returnToFan(selected);
  useLayoutEffect(() => {
    if (expanded || !pendingReturn.current) return;
    const id = pendingReturn.current;
    pendingReturn.current = null;
    window.scrollTo({ top: fanScroll.current ?? window.scrollY, behavior: "instant" });
    hand.current?.querySelector(`.community-forum-sheet-${id} .community-forum-select`)?.focus({ preventScroll: true });
    fanScroll.current = null;
  }, [expanded, selected]);
  useEffect(() => {
    const open = selected === "book" ? bookOpen : roomOpen;
    if (expanded && open) hand.current?.querySelector(".community-forum-sheet[data-active='true'] .community-forum-question")?.focus({ preventScroll: true });
  }, [expanded, selected, bookOpen, roomOpen]);
  useEffect(() => {
    const node = hand.current;
    if (!node) return;
    const phone = window.matchMedia(MEDIA_QUERIES.phone);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let played = false;
    const timers = [];
    const cancel = () => timers.forEach(window.clearTimeout);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { cancel(); return; }
      if (played || interacted.current || !phone.matches || reduced.matches) return;
      played = true;
      [[1800, "rooms"], [3600, "book"]].forEach(([delay, id]) => {
        timers.push(window.setTimeout(() => {
          if (!interacted.current && phone.matches && !reduced.matches) setSelected(id);
        }, delay));
      });
    }, { threshold: 0.4 });
    observer.observe(node);
    phone.addEventListener("change", cancel);
    reduced.addEventListener("change", cancel);
    return () => {
      cancel();
      observer.disconnect();
      phone.removeEventListener("change", cancel);
      reduced.removeEventListener("change", cancel);
    };
  }, []);
  return <div className="community-forum-phone" data-expanded={expanded}>
    <div ref={hand} className="community-forum-hand" role="group" aria-label="Explore the conversations" onPointerDownCapture={() => { interacted.current = true; }}>
      {expanded && <button type="button" className="community-forum-back" onClick={backToCards}><span className="community-forum-chevron" aria-hidden="true" />Back to cards</button>}
      <article className="community-forum-card community-forum-sheet community-forum-sheet-book" data-active={selected === "book"} hidden={expanded && selected !== "book"} onClick={() => chooseForum("book")} onFocusCapture={() => focusForum("book")} aria-labelledby="hogwarts-forum-title">
        <span className="community-forum-edge" aria-hidden="true">Book Forum</span>
        <header className="community-forum-header">
          <div className="community-forum-meta"><p>Book Forum</p><p>Book 1</p></div>
          <h3 id="hogwarts-forum-title"><button type="button" className="community-forum-select" aria-pressed={selected === "book"} onClick={() => chooseForum("book")}>Harry Potter and the Philosopher’s Stone</button></h3>
        </header>
        <details className="community-forum-spoilers" open={selected === "book" && bookOpen}>
          <summary onClick={event => { event.preventDefault(); chooseForum("book"); setBookOpen(open => !open); }}>
            <span className="community-forum-warning">
              <span className="community-forum-warning-title"><span className="community-icon-eye-off" aria-hidden="true" />Spoilers ahead</span>
              <span>This discussion contains spoilers for book 1.</span>
            </span>
            <span className="community-forum-spoiler-action">
              <span className="community-forum-reveal">Reveal discussion</span>
              <span className="community-forum-chevron" aria-hidden="true" />
            </span>
          </summary>
          <div className="community-forum-body">
            <h4 className="community-forum-question" tabIndex={-1}>Would you have gone back to the Mirror of Erised?</h4>
            <figure className="community-forum-journal">
              <figcaption>From a reader’s journal</figcaption>
              <blockquote>The first time Harry sees his family is the moment I keep coming back to.</blockquote>
            </figure>
            <ForumReplies id="hogwarts-forum-replies" replies={hogwartsReplies} />
            <p className="community-forum-prompt">What would you see in the mirror?</p>
            <button type="button" className="community-forum-close" onClick={event => closeDiscussion("book", event)}><span>Hide discussion</span><span className="community-forum-chevron" aria-hidden="true" /></button>
          </div>
        </details>
      </article>
      <article className="community-forum-card community-general-room community-forum-sheet community-forum-sheet-rooms" data-active={selected === "rooms"} hidden={expanded && selected !== "rooms"} onClick={() => chooseForum("rooms")} onFocusCapture={() => focusForum("rooms")} aria-labelledby="general-room-title">
        <span className="community-forum-edge" aria-hidden="true">General Rooms</span>
        <header className="community-forum-header">
          <div className="community-forum-meta"><p>General Rooms</p><p>Next reads</p></div>
          <h3 id="general-room-title"><button type="button" className="community-forum-select" aria-pressed={selected === "rooms"} onClick={() => chooseForum("rooms")}>Reading recommendations</button></h3>
        </header>
        <details className="community-forum-spoilers" open={selected === "rooms" && roomOpen}>
          <summary onClick={event => { event.preventDefault(); chooseForum("rooms"); setRoomOpen(open => !open); }}>
            <span className="community-forum-warning">
              <span className="community-forum-warning-title">Looking for your next read?</span>
              <span>Share the stories you always recommend.</span>
            </span>
            <span className="community-forum-spoiler-action">
              <span className="community-forum-reveal">Open discussion</span>
              <span className="community-forum-chevron" aria-hidden="true" />
            </span>
          </summary>
        <div className="community-forum-body">
          <h4 className="community-forum-question" tabIndex={-1}>What’s the book you always recommend?</h4>
          <p className="community-room-intro">I’m looking for a story with a little magic and a world I won’t want to leave. What should I read next?</p>
          <ForumReplies id="general-room-replies" replies={recommendationReplies} />
          <p className="community-forum-prompt">Which book would you put in their hands?</p>
          <button type="button" className="community-forum-close" onClick={event => closeDiscussion("rooms", event)}><span>Hide discussion</span><span className="community-forum-chevron" aria-hidden="true" /></button>
        </div>
        </details>
      </article>
    </div>
    <p className="salon-s186">Illustrative conversations with fictional readers.</p>
  </div>;
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
        <p className="salon-s59"><span className="community-copy-wide">A forum for every book, and open rooms for everything in between. Talk about the stories that stay with you, or find your next read together.</span><span className="community-copy-phone">Talk about a book you love, or find your next read together.</span></p>
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
      <CommunityForums />
    </section>
  );
}
