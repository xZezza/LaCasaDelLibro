import React from "react";

export default function ModalComingSoon(values) {
  const { closeSoon, soonName, soonOpen, stopSheet, x } = values;
  return (
    <>
      {Boolean(soonOpen) && (
        <>
          <div onClick={closeSoon} className={"salon-s303"}>
            <div
              onClick={stopSheet}
              role={"dialog"}
              aria-label={"Coming soon"}
              aria-modal="true"
              tabIndex={-1}
              className={"salon-s302 salon-dialog"}
            >
              <button
                onClick={closeSoon}
                aria-label={"Close"}
                type="button"
                className={"salon-s296 salon-hover324"}
              >
                {"×"}
              </button>
              <span aria-hidden={"true"} className={"salon-s297"}>
                {"✦ ✧ ✦"}
              </span>
              <div className={"salon-s298"}>{soonName}</div>
              <div className={"salon-s299"}>{"Coming soon"}</div>
              <p className={"salon-s300"}>
                {"Our page is still being written. Check back soon."}
              </p>
              <button
                onClick={closeSoon}
                type="button"
                className={"salon-s301 salon-hover330"}
              >
                {"Got it"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
