import React from "react";

export default function BookPreview({ preview, previewRef }) {
  const { kind, title, meta, about, covers, chars, thread } = preview;
  return (
    <div className="journal-preview">
      <div ref={previewRef} className="salon-s157">
        <div className="salon-s143">
          <div className="salon-s139" aria-hidden="true">
            {covers.map(({ w, h, bg }) => (
              <div key={h} className="salon-s138" style={{ width: w, height: h, "--journal-cover-colour": bg }} />
            ))}
          </div>
          <div className="salon-s96">
            <div className="salon-s140">{kind}</div>
            <div className="salon-s141">{title}</div>
            <div className="salon-s142">{meta}</div>
          </div>
        </div>
        <div className="salon-s146">
          <span className="salon-s144">About</span>
          <span className="salon-s145">Characters</span>
          <span className="salon-s145">Forum</span>
          <span className="salon-s145">Thoughts</span>
        </div>
        <p className="salon-s147">{about}</p>
        <div className="salon-s156">
          <div className="salon-s152">
            <div className="salon-s148">Characters</div>
            <div className="salon-s150">
              {chars.map(character => <span key={character} className="salon-s149">{character}</span>)}
            </div>
            <span className="salon-s151">Open the fan wiki ↗</span>
          </div>
          <div className="salon-s152">
            <div className="salon-s148">Forum</div>
            <div className="salon-s153">{thread}</div>
            <span className="salon-s154">Start a discussion</span>
          </div>
          <div className="salon-s152">
            <div className="salon-s148">Leave a thought</div>
            <div className="salon-s155">Write something about this book…</div>
          </div>
        </div>
      </div>
    </div>
  );
}
