import React from "react";
import StoryGuests from "./StoryGuests";

export default function Journal(values) {
  const {
    bookColor,
    bookColors,
    c,
    chars,
    i,
    jGridRef,
    jSummary,
    l,
    linksRef,
    pvAbout,
    pvBoxRef,
    pvChars,
    pvCovers,
    pvKind,
    pvLinks,
    pvMeta,
    pvThread,
    pvTitle,
    q6Cap,
    q6Words,
    quote6Ref,
    r,
    ratings,
    sh,
    showNotes,
    thread,
    w,
    x,
  } = values;
  return (
    <>
      <section id={"journal"} className={"salon-s161 salon-journal"}>
        <div className={"salon-s85"}>
          <p
            aria-label={
              "Keep the memory of every story. Find your own words again, months or years later. Share the feelings with people who understand."
            }
            className={"salon-s81"}
          >
            <span className={"salon-s80"}>
              {"Keep the memory of every story."}
            </span>
            <span className={"salon-s80"}>
              {"Find your own words again, months or years later."}
            </span>
            <span className={"salon-s80"}>
              {"Share the feelings with people who understand."}
            </span>
          </p>
          <div className={"salon-s84"}>
            <span className={"salon-s82"}></span>
            <span className={"salon-s83"}></span>
            <span className={"salon-s82"}></span>
          </div>
        </div>
        <div ref={jGridRef} className={"salon-s160"}>
          {"\n    "}
          {thread}
          {"\n    "}
          <div className={"salon-s132"}>
            <div className={"salon-s87"}>
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
                  fill={"oklch(0.74 0.09 350)"}
                  opacity={".88"}
                  transform={"rotate(0 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"38"}
                  rx={"11"}
                  ry={"22"}
                  fill={"oklch(0.74 0.09 350)"}
                  opacity={".88"}
                  transform={"rotate(72 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"38"}
                  rx={"11"}
                  ry={"22"}
                  fill={"oklch(0.74 0.09 350)"}
                  opacity={".88"}
                  transform={"rotate(144 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"38"}
                  rx={"11"}
                  ry={"22"}
                  fill={"oklch(0.74 0.09 350)"}
                  opacity={".88"}
                  transform={"rotate(216 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"38"}
                  rx={"11"}
                  ry={"22"}
                  fill={"oklch(0.74 0.09 350)"}
                  opacity={".88"}
                  transform={"rotate(288 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"44"}
                  rx={"6"}
                  ry={"13"}
                  fill={"oklch(0.88 0.05 350)"}
                  opacity={".6"}
                  transform={"rotate(36 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"44"}
                  rx={"6"}
                  ry={"13"}
                  fill={"oklch(0.88 0.05 350)"}
                  opacity={".6"}
                  transform={"rotate(108 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"44"}
                  rx={"6"}
                  ry={"13"}
                  fill={"oklch(0.88 0.05 350)"}
                  opacity={".6"}
                  transform={"rotate(180 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"44"}
                  rx={"6"}
                  ry={"13"}
                  fill={"oklch(0.88 0.05 350)"}
                  opacity={".6"}
                  transform={"rotate(252 60 60)"}
                ></ellipse>
                <ellipse
                  cx={"60"}
                  cy={"44"}
                  rx={"6"}
                  ry={"13"}
                  fill={"oklch(0.88 0.05 350)"}
                  opacity={".6"}
                  transform={"rotate(324 60 60)"}
                ></ellipse>
                <circle
                  cx={"60"}
                  cy={"60"}
                  r={"8"}
                  fill={"oklch(0.72 0.12 80)"}
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
            <div className={"salon-s131"}>
              <div className={"salon-s88"}></div>
              <div className={"salon-s89"}></div>
              <div className={"salon-s130"}>
                <div
                  className={"salon-s90"}
                  style={{ background: bookColor }}
                ></div>
                <div className={"salon-s97"}>
                  <div
                    className={"salon-s91"}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,.25), transparent 12%), " +
                        bookColor,
                    }}
                  ></div>
                  <div className={"salon-s96"}>
                    <div className={"salon-s92"}>{"The Ember Crown"}</div>
                    <div className={"salon-s94"}>
                      {"M. Hale · 512 pages · Romantasy"}
                      <br />
                      {"Book 1 of "}
                      <span className={"salon-s93"}>{"The Ashborn Saga"}</span>
                    </div>
                    <div className={"salon-s95"}>
                      {"Filled in automatically"}
                    </div>
                  </div>
                </div>
                <div className={"salon-s98"}></div>
                <div className={"salon-s106"}>
                  <div>
                    <div className={"salon-s99"}>{"My colour for it"}</div>
                    <div className={"salon-s101"}>
                      {bookColors.map((c, index6) => (
                        <React.Fragment key={index6}>
                          <button
                            onClick={c.pick}
                            aria-label={c.name}
                            title={c.name}
                            type="button"
                            className={"salon-s100"}
                            style={{
                              background: c.v,
                              boxShadow:
                                "0 0 0 1.5px oklch(0.99 0.006 85), 0 0 0 2.5px " +
                                c.ring,
                            }}
                          ></button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={"salon-s99"}>{"Its song"}</div>
                    <div className={"salon-s104"}>
                      <span
                        className={"salon-s102"}
                        style={{
                          background:
                            "radial-gradient(circle, " +
                            bookColor +
                            " 0 5px, oklch(0.2 0.02 305) 5.5px 8px, oklch(0.3 0.02 305) 8.5px 9.5px, oklch(0.2 0.02 305) 10px)",
                        }}
                      ></span>
                      <span className={"salon-s103"}>
                        {"Ashes of Us · Wildwood"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className={"salon-s99"}>{"Reading time"}</div>
                    <div className={"salon-s105"}>
                      {"11 days, mostly at night"}
                    </div>
                  </div>
                  <div>
                    <div className={"salon-s99"}>{"Read in"}</div>
                    <div className={"salon-s105"}>{"English"}</div>
                  </div>
                </div>
                <div className={"salon-s110"}>
                  {chars.map((c, index7) => (
                    <React.Fragment key={index7}>
                      <div
                        className={"salon-s109"}
                        style={{ background: c.bg }}
                      >
                        <div className={"salon-s99"}>{c.label}</div>
                        <div className={"salon-s107"}>{c.name}</div>
                        <div className={"salon-s108"}>{c.note}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className={"salon-s115"}>
                  <div className={"salon-s113"}>
                    <div>
                      <div className={"salon-s99"}>
                        {"The part to remember"}
                      </div>
                      <div className={"salon-s111"}>
                        {
                          "The bridge scene. Corin turning back for her when the whole city was burning."
                        }
                      </div>
                    </div>
                    <button
                      onClick={sh.best.toggle}
                      type="button"
                      className={"salon-s112"}
                      style={{
                        border: "1px solid " + sh.best.border,
                        background: sh.best.bg,
                        color: sh.best.fg,
                      }}
                    >
                      {sh.best.state}
                    </button>
                  </div>
                  <div className={"salon-s113"}>
                    <div>
                      <div className={"salon-s99"}>{"My review"}</div>
                      <div className={"salon-s114"}>
                        {
                          "Slow start, then I couldn’t put it down. The magic system finally makes sense in part three, and the ending broke me a little. Already planning a reread."
                        }
                      </div>
                    </div>
                    <button
                      onClick={sh.review.toggle}
                      type="button"
                      className={"salon-s112"}
                      style={{
                        border: "1px solid " + sh.review.border,
                        background: sh.review.bg,
                        color: sh.review.fg,
                      }}
                    >
                      {sh.review.state}
                    </button>
                  </div>
                </div>
                <div className={"salon-s98"}></div>
                <div>
                  <div className={"salon-s118"}>
                    <div className={"salon-s116"}>{"Rating"}</div>
                    <div className={"salon-s117"}>
                      {"tap to fill, pick your colour"}
                    </div>
                  </div>
                  <div className={"salon-s126"}>
                    {ratings.map((r, index10) => (
                      <React.Fragment key={index10}>
                        <div className={"salon-s125"}>
                          <div
                            className={"salon-s119"}
                            style={{ fontWeight: r.weight }}
                          >
                            {r.name}
                          </div>
                          <div className={"salon-s122"}>
                            {r.icons.map((i, index8) => (
                              <React.Fragment key={index8}>
                                <button
                                  onClick={i.set}
                                  aria-label={i.label}
                                  type="button"
                                  className={"salon-s121 salon-hover133"}
                                >
                                  <svg
                                    viewBox={"0 0 24 24"}
                                    width={"24"}
                                    height={"24"}
                                    className={"salon-s120"}
                                  >
                                    <path
                                      d={r.path}
                                      fill={i.fill}
                                      stroke={i.stroke}
                                      strokeWidth={r.sw}
                                      strokeLinecap={"round"}
                                      strokeLinejoin={"round"}
                                    ></path>
                                  </svg>
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                          <div className={"salon-s124"}>
                            {r.colors.map((c, index9) => (
                              <React.Fragment key={index9}>
                                <button
                                  onClick={c.pick}
                                  aria-label={"Colour"}
                                  type="button"
                                  className={"salon-s123"}
                                  style={{
                                    background: c.v,
                                    boxShadow:
                                      "0 0 0 1.5px oklch(0.95 0.018 82), 0 0 0 2.5px " +
                                      c.ring,
                                  }}
                                ></button>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <p className={"salon-s127"}>{jSummary}</p>
                <div ref={linksRef} className={"salon-s129"}>
                  {pvLinks.map((l, index11) => (
                    <React.Fragment key={index11}>
                      <button
                        onClick={l.pick}
                        type="button"
                        className={"salon-s128 salon-hover141"}
                        style={{
                          color: l.fg,
                          borderBottom: "1px solid " + l.line,
                        }}
                      >
                        {l.name}
                        {" →"}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={"salon-s159"}>
            <figure
              ref={quote6Ref}
              className="salon-s136 quote-with-guest quote-guest-potter"
            >
              <StoryGuests group="potter" placement="potter" />
              <blockquote
                aria-label={"I solemnly swear that I am up to no good."}
                className={"salon-s134"}
              >
                {q6Words.map((w, index12) => (
                  <React.Fragment key={index12}>
                    <span
                      aria-hidden={"true"}
                      className={"salon-s133"}
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
              <figcaption className={"salon-s135"} style={{ opacity: q6Cap }}>
                {"J.K. Rowling · "}
                <span className={"salon-s28"}>
                  {"Harry Potter and the Prisoner of Azkaban"}
                </span>
              </figcaption>
            </figure>
            <div className={"salon-s57"}>{"II · The Journal"}</div>
            <h2 className={"salon-s58"}>{"A private diary for every book."}</h2>
            <p className={"salon-s59"}>
              {
                "Collect your thoughts, favourite characters, quotes, impressions and ratings. Everything stays private until you decide otherwise, and you share only the thoughts you choose."
              }
            </p>
            {Boolean(showNotes) && (
              <>
                <p className={"salon-s137"}>
                  {"tap “Private” in the journal to share just that one"}
                </p>
              </>
            )}
            <div className={"salon-s158"}>
              <div ref={pvBoxRef} className={"salon-s157"}>
                <div className={"salon-s143"}>
                  <div className={"salon-s139"}>
                    {pvCovers.map((c, index13) => (
                      <React.Fragment key={index13}>
                        <div
                          className={"salon-s138"}
                          style={{
                            width: c.w + "px",
                            height: c.h + "px",
                            background:
                              "linear-gradient(90deg, rgba(0,0,0,.25), transparent 14%), " +
                              c.bg,
                          }}
                        ></div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className={"salon-s96"}>
                    <div className={"salon-s140"}>{pvKind}</div>
                    <div className={"salon-s141"}>{pvTitle}</div>
                    <div className={"salon-s142"}>{pvMeta}</div>
                  </div>
                </div>
                <div className={"salon-s146"}>
                  <span className={"salon-s144"}>{"About"}</span>
                  <span className={"salon-s145"}>{"Characters"}</span>
                  <span className={"salon-s145"}>{"Forum"}</span>
                  <span className={"salon-s145"}>{"Thoughts"}</span>
                </div>
                <p className={"salon-s147"}>{pvAbout}</p>
                <div className={"salon-s156"}>
                  <div className={"salon-s152"}>
                    <div className={"salon-s148"}>{"Characters"}</div>
                    <div className={"salon-s150"}>
                      {pvChars.map((c, index14) => (
                        <React.Fragment key={index14}>
                          <span className={"salon-s149"}>{c}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <span className={"salon-s151"}>
                      {"Open the fan wiki ↗"}
                    </span>
                  </div>
                  <div className={"salon-s152"}>
                    <div className={"salon-s148"}>{"Forum"}</div>
                    <div className={"salon-s153"}>{pvThread}</div>
                    <span className={"salon-s154"}>{"Start a discussion"}</span>
                  </div>
                  <div className={"salon-s152"}>
                    <div className={"salon-s148"}>{"Leave a thought"}</div>
                    <div className={"salon-s155"}>
                      {"Write something about this book…"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
