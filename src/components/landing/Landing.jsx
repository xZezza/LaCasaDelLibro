import React from "react";
import ModalAccessibility from "./ModalAccessibility";
import LandingLogic from "./LandingLogic";
import "./landing.css";
import "./enhancements.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import BooksCarousel from "./BooksCarousel";
import QuoteHardDays from "./QuoteHardDays";
import Library from "./Library";
import Journal from "./Journal";
import QuoteStars from "./QuoteStars";
import Community from "./Community";
import Follow from "./Follow";
import Footer from "./Footer";
import ModalLibrary from "./ModalLibrary";
import ModalBookSheet from "./ModalBookSheet";
import ModalComingSoon from "./ModalComingSoon";
export default class Landing extends LandingLogic {
  render() {
    const v = this.renderVals();
    return (
      <div className="salon-landing">
        <a className="salon-skip" href="#main">
          Skip to content
        </a>
        <Navbar {...v} />
        <main id="main">
          <Hero {...v} />
          <BooksCarousel {...v} />
          <QuoteHardDays {...v} />
          <Library {...v} />
          <Journal {...v} />
          <QuoteStars {...v} />
          <Community {...v} />
          <Follow {...v} />
        </main>
        <Footer {...v} />
        <ModalLibrary {...v} />
        <ModalBookSheet {...v} />
        <ModalComingSoon {...v} />
        <ModalAccessibility
          open={
            v.libOpen
              ? "library"
              : v.sheetOpen
                ? "sheet"
                : v.soonOpen
                  ? "soon"
                  : null
          }
        />
      </div>
    );
  }
}
