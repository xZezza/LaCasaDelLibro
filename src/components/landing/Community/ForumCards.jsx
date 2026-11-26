import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { MEDIA_QUERIES } from "../../../config/breakpoints.js";
import { COMMUNITY_FORUMS } from "../../../data/landing/community.js";
import "./forums.css";

function ForumReplies({ id, replies }) {
  return (
    <section className="community-forum-thread" aria-labelledby={id}>
      <h4 id={id}>{replies.length} replies</h4>
      <ul role="list">
        {replies.map(({ reader, text }) => (
          <li key={reader}>
            <p className="community-forum-reader">{reader}</p>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Chevron() {
  return <span className="community-forum-chevron" aria-hidden="true" />;
}

function ForumCard({ forum, active, hidden, open, onChoose, onFocus, onReveal, onHide }) {
  const id = useId();
  function reveal(event) {
    event.preventDefault();
    event.stopPropagation();
    onReveal(forum.id);
  }

  return (
    <article className={`community-forum-card community-forum-sheet community-forum-sheet-${forum.id}`}
      data-active={active} hidden={hidden} aria-labelledby={`${id}-title`}
      onClick={() => onChoose(forum.id)} onFocusCapture={() => onFocus(forum.id)}>
      <header className="community-forum-header">
        <div className="community-forum-meta"><p>{forum.label}</p><p>{forum.meta}</p></div>
        <h3 id={`${id}-title`}>
          <button type="button" className="community-forum-select" aria-pressed={active}>{forum.title}</button>
        </h3>
      </header>
      <details className="community-forum-spoilers" open={open}>
        <summary onClick={reveal} onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") reveal(event);
        }}>
          <span className="community-forum-warning">
            <span className="community-forum-warning-title">
              {forum.journal && <span className="community-icon-eye-off" aria-hidden="true" />}
              {forum.teaserTitle}
            </span>
            <span>{forum.teaser}</span>
          </span>
          <span className="community-forum-spoiler-action">
            <span className="community-forum-reveal">{forum.reveal}</span><Chevron />
          </span>
        </summary>
        <div className="community-forum-body">
          <h4 className="community-forum-question" tabIndex={-1}>{forum.question}</h4>
          {forum.intro && <p className="community-room-intro">{forum.intro}</p>}
          {forum.journal && <figure className="community-forum-journal">
            <figcaption>From a reader’s journal</figcaption>
            <blockquote>{forum.journal}</blockquote>
          </figure>}
          <ForumReplies id={`${id}-replies`} replies={forum.replies} />
          <p className="community-forum-prompt">{forum.prompt}</p>
          <button type="button" className="community-forum-close" onClick={event => {
            event.stopPropagation();
            onHide(forum.id);
          }}><span>Hide discussion</span><Chevron /></button>
        </div>
      </details>
    </article>
  );
}

export default function ForumCards() {
  const [selected, setSelected] = useState("book");
  const [expanded, setExpanded] = useState(false);
  const [discussion, setDiscussion] = useState(null);
  const hand = useRef(null);
  const interacted = useRef(false);
  const fanTop = useRef(null);
  const pendingReturn = useRef(null);

  function focusForum(id) {
    interacted.current = true;
    setSelected(id);
  }

  function chooseForum(id) {
    if (!expanded) fanTop.current = hand.current.getBoundingClientRect().top;
    focusForum(id);
    setExpanded(true);
  }

  function revealForum(id) {
    chooseForum(id);
    setDiscussion(id);
  }

  function returnToCards(id) {
    pendingReturn.current = id;
    setDiscussion(null);
    setExpanded(false);
    setSelected(id);
  }

  useLayoutEffect(() => {
    if (expanded || !pendingReturn.current) return;
    const id = pendingReturn.current;
    pendingReturn.current = null;
    if (fanTop.current !== null) {
      window.scrollBy({ top: hand.current.getBoundingClientRect().top - fanTop.current, behavior: "instant" });
    }
    hand.current.querySelector(`.community-forum-sheet-${id} .community-forum-select`)?.focus({ preventScroll: true });
    fanTop.current = null;
  }, [expanded, selected]);

  useEffect(() => {
    if (discussion) {
      hand.current.querySelector(".community-forum-sheet[data-active='true'] .community-forum-question")?.focus({ preventScroll: true });
    }
  }, [discussion]);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const phone = window.matchMedia(MEDIA_QUERIES.phone);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let played = false;
    let timers = [];
    const cancel = () => timers.forEach(window.clearTimeout);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        cancel();
        return;
      }
      if (played || interacted.current || !phone.matches || reduced.matches) return;
      played = true;
      timers = [[1800, "rooms"], [3600, "book"]].map(([delay, id]) => window.setTimeout(() => {
        if (!interacted.current && phone.matches && !reduced.matches) setSelected(id);
      }, delay));
    }, { threshold: .4 });

    observer.observe(hand.current);
    phone.addEventListener("change", cancel);
    reduced.addEventListener("change", cancel);
    return () => {
      cancel();
      observer.disconnect();
      phone.removeEventListener("change", cancel);
      reduced.removeEventListener("change", cancel);
    };
  }, []);

  return (
    <div ref={hand} className="community-forum-hand" data-expanded={expanded}
      role="group" aria-label="Explore the conversations" onPointerDownCapture={() => { interacted.current = true; }}>
      {expanded && <button type="button" className="community-forum-back" onClick={() => returnToCards(selected)}>
        <Chevron />Back to cards
      </button>}
      {COMMUNITY_FORUMS.map(forum => (
        <ForumCard key={forum.id} forum={forum} active={selected === forum.id} open={discussion === forum.id}
          hidden={expanded && selected !== forum.id} onChoose={chooseForum} onFocus={focusForum} onReveal={revealForum}
          onHide={id => returnToCards(id === "book" ? "rooms" : "book")} />
      ))}
    </div>
  );
}
