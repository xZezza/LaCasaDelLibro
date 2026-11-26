// @refresh reset
import React from "react";
import CharacterSheet from "./CharacterSheet";
import ModalAccessibility from "../../hooks/ModalAccessibility";
import LandingController from "./LandingController.js";
import "./styles.css";
import Navbar from "./Navbar";
import QuoteHardDays from "./QuoteHardDays";
import Journal from "./Journal";
import QuoteStars from "./QuoteStars";
import Community from "./Community";
import Follow from "./Follow";
import Footer from "./Footer";
import ModalComingSoon from "./ModalComingSoon";

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
          <Journal {...v} />
          <QuoteStars {...v} />
          <Community {...v} />
          <Follow {...v} />
        </main>
        <Footer {...v} />
        <ModalComingSoon {...v} />
        <CharacterSheet />
        <ModalAccessibility
          open={v.soonOpen ? "soon" : null}
        />
      </div>
    );
  }
}
