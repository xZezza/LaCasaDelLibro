// @refresh reset
import React, { useEffect, useState } from "react";
import CharacterSheet from "./CharacterSheet";
import ModalAccessibility from "../../hooks/ModalAccessibility";
import { MEDIA_QUERIES } from "../../config/breakpoints.js";
import LandingController from "./LandingController.js";
import "./styles.css";
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

function ReadingSections({ values }) {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(MEDIA_QUERIES.phone);
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const journal = <Journal key="journal" {...values} />;
  const community = <Community key="community" {...values} />;
  const quote = <QuoteStars key="star-quote" {...values} />;
  return phone ? [quote, journal, community] : [journal, quote, community];
}

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
          <Hero {...v} />
          <BooksCarousel {...v} />
          <QuoteHardDays {...v} />
          <Library {...v} />
          <ReadingSections values={v} />
          <Follow {...v} />
        </main>
        <Footer {...v} />
        <ModalLibrary {...v} />
        <ModalBookSheet {...v} />
        <ModalComingSoon {...v} />
        <CharacterSheet />
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
