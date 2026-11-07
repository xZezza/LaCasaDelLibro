import React from "react";
import StoryGuests from "./StoryGuests";

export default function Follow(values) {
  const { q5Cap, q5Words, quote5Ref, s, showNotes, socials, w, x } = values;
  return (
    <>
      <section id={"follow"} className={"salon-s201 salon-follow"}>
        <div className={"salon-s200"}>
          <div className={"salon-s189"}></div>
          <div className={"salon-s190"}>
            <svg
              viewBox={"0 0 120 120"}
              width={"100%"}
              height={"100%"}
              className={"salon-s86"}
            >
              <path
                d={"M60 64 C 58 84, 50 98, 38 114"}
                fill={"none"}
                stroke={"oklch(0.55 0.07 130)"}
                strokeWidth={"2.2"}
                strokeLinecap={"round"}
              ></path>
              <path
                d={"M50 92 C 36 88, 28 94, 22 102 C 34 104, 44 100, 50 92 Z"}
                fill={"oklch(0.66 0.07 135)"}
                opacity={".85"}
              ></path>
              <path
                d={"M56 80 C 68 72, 80 74, 88 80 C 78 88, 66 88, 56 80 Z"}
                fill={"oklch(0.62 0.07 135)"}
                opacity={".8"}
              ></path>
              <ellipse
                cx={"60"}
                cy={"38"}
                rx={"11"}
                ry={"22"}
                fill={"oklch(0.7 0.08 295)"}
                opacity={".88"}
                transform={"rotate(0 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"38"}
                rx={"11"}
                ry={"22"}
                fill={"oklch(0.7 0.08 295)"}
                opacity={".88"}
                transform={"rotate(72 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"38"}
                rx={"11"}
                ry={"22"}
                fill={"oklch(0.7 0.08 295)"}
                opacity={".88"}
                transform={"rotate(144 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"38"}
                rx={"11"}
                ry={"22"}
                fill={"oklch(0.7 0.08 295)"}
                opacity={".88"}
                transform={"rotate(216 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"38"}
                rx={"11"}
                ry={"22"}
                fill={"oklch(0.7 0.08 295)"}
                opacity={".88"}
                transform={"rotate(288 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"44"}
                rx={"6"}
                ry={"13"}
                fill={"oklch(0.86 0.05 295)"}
                opacity={".6"}
                transform={"rotate(36 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"44"}
                rx={"6"}
                ry={"13"}
                fill={"oklch(0.86 0.05 295)"}
                opacity={".6"}
                transform={"rotate(108 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"44"}
                rx={"6"}
                ry={"13"}
                fill={"oklch(0.86 0.05 295)"}
                opacity={".6"}
                transform={"rotate(180 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"44"}
                rx={"6"}
                ry={"13"}
                fill={"oklch(0.86 0.05 295)"}
                opacity={".6"}
                transform={"rotate(252 60 60)"}
              ></ellipse>
              <ellipse
                cx={"60"}
                cy={"44"}
                rx={"6"}
                ry={"13"}
                fill={"oklch(0.86 0.05 295)"}
                opacity={".6"}
                transform={"rotate(324 60 60)"}
              ></ellipse>
              <circle
                cx={"60"}
                cy={"60"}
                r={"8"}
                fill={"oklch(0.74 0.12 85)"}
              ></circle>
              <circle
                cx={"57"}
                cy={"57"}
                r={"2"}
                fill={"oklch(0.95 0.06 90)"}
                opacity={".8"}
              ></circle>
            </svg>
          </div>
          <figure
            ref={quote5Ref}
            className="salon-s194 quote-with-guest quote-guest-throne"
          >
            <StoryGuests group="throne" placement="throne" />
            <blockquote
              aria-label={
                "You could rattle the stars. You could do anything, if only you dared."
              }
              className={"salon-s192"}
            >
              {q5Words.map((w, index17) => (
                <React.Fragment key={index17}>
                  <span
                    aria-hidden={"true"}
                    className={"salon-s191"}
                    style={{
                      opacity: w.op,
                      filter: w.blur,
                      transform: w.tf,
                      transition:
                        "opacity 1.1s ease " +
                        w.d +
                        ", filter 1.1s ease " +
                        w.d +
                        ", transform 1.2s cubic-bezier(.2,.8,.2,1) " +
                        w.d,
                    }}
                  >
                    {w.t}
                  </span>
                </React.Fragment>
              ))}
            </blockquote>
            <figcaption className={"salon-s193"} style={{ opacity: q5Cap }}>
              {"Sarah J. Maas · "}
              <span className={"salon-s28"}>{"Throne of Glass"}</span>
            </figcaption>
          </figure>
          <div className={"salon-s57"}>{"The doors are still being built"}</div>
          <h2 className={"salon-s195"}>{"Be there from the first chapter."}</h2>
          <p className={"salon-s196"}>
            {
              "The Salon is in development. Follow along on social to watch it take shape, share what you’d love to find inside, and be the first to know when the doors open."
            }
          </p>
          <div className={"salon-s198"}>
            {socials.map((s, index18) => (
              <React.Fragment key={index18}>
                <a
                  href={s.href}
                  onClick={s.open}
                  className={"salon-s197 salon-hover212"}
                >
                  <span className={"salon-s83"}></span>
                  {s.name}
                  {"\n        "}
                </a>
              </React.Fragment>
            ))}
          </div>
          {Boolean(showNotes) && (
            <>
              <p className={"salon-s199"}>{"see you inside"}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
