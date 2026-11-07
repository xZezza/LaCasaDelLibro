import "../shared/typography.css";
import React from "react";
import "./styles.css";

export default function Community(values) {
  const {
    forums,
  } = values;
  return (
    <>
      <section id={"salon"} className={"salon-s188 salon-salon"}>
        <div>
          <div className={"salon-s57"}>{"III · The Salon"}</div>
          <h2 className={"salon-s58"}>{"Find the people who felt it too."}</h2>
          <p className={"salon-s59"}>
            {
              "Personal profiles and forums dedicated to books and sagas. A place to talk about the twist you didn’t see coming, the character you can’t let go of, and the next book you’ll read together."
            }
          </p>
          <div className={"salon-s171"}>
            <div className={"salon-s167"}></div>
            <div className={"salon-s169"}>
              <div
                role={"img"}
                aria-label={"Readers gathered around a table of books, talking"}
                className={"salon-s168"}
              ></div>
            </div>
            <div className={"salon-s170"}>{"your people"}</div>
          </div>
        </div>
        <div className={"salon-s187"}>
          {forums.map((f, index16) => (
            <React.Fragment key={index16}>
              <div
                className={"salon-s185 salon-hover199"}
                style={{
                  borderTop: "3px solid " + f.edge,
                  transform: "rotate(" + f.rot + ")",
                }}
              >
                <div
                  className={"salon-s172"}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,.25), transparent 14%), " +
                      f.bg,
                  }}
                ></div>
                <div className={"salon-s184"}>
                  <div className={"salon-s174"}>
                    <div className={"salon-s99"}>{f.kind}</div>
                    <div className={"salon-s173"}>{f.meta}</div>
                  </div>
                  <div className={"salon-s175"}>{f.name}</div>
                  <div className={"salon-s176"}>{f.thread}</div>
                  {Boolean(f.hasQuote) && (
                    <>
                      <div className={"salon-s179"}>
                        <div className={"salon-s177"}>
                          {"Shared from your journal"}
                        </div>
                        <div className={"salon-s178"}>{f.quote}</div>
                      </div>
                    </>
                  )}
                  {Boolean(f.hasProgress) && (
                    <>
                      <div className={"salon-s183"}>
                        <div className={"salon-s181"}>
                          <div
                            className={"salon-s180"}
                            style={{ width: f.pct }}
                          ></div>
                        </div>
                        <div className={"salon-s182"}>
                          <span>{f.progress}</span>
                          <span>{f.next}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
          <p className={"salon-s186"}>
            {"Illustrative preview. Titles are placeholders."}
          </p>
        </div>
      </section>
    </>
  );
}
