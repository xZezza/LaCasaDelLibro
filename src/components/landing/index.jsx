// @refresh reset
import React from "react";
import CharacterSheet from "./CharacterSheet";
import LandingController from "./LandingController.js";
import "./styles.css";
import Navbar from "./Navbar";
import QuoteHardDays from "./QuoteHardDays";
import QuoteStars from "./QuoteStars";

export default class Landing extends LandingController {
  render() {
    const v = this.renderVals();
    return (
      <div className="salon-landing">
        <a className="salon-skip" href="#main">
          Skip to content
        </a>
        <Navbar {...v} />
        <main id="main">
          {this.props.hero}
          {this.props.carousel}
          <QuoteHardDays {...v} />
          {this.props.library}
          {this.props.journal}
          <QuoteStars {...v} />
          {this.props.salon}
          {this.props.follow}
        </main>
        {this.props.footer}
        <CharacterSheet />
      </div>
    );
  }
}
