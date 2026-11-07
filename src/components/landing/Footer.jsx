import React from "react";

export default function Footer(values) {
  const { x } = values;
  return (
    <>
      <footer className={"salon-s203"}>
        <span
          role={"img"}
          aria-label={"The Salon"}
          className={"salon-s202"}
        ></span>
        <span>{"A home for stories, and what they leave behind."}</span>
      </footer>
    </>
  );
}
