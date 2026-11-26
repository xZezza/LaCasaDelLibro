import React from "react";
import { createPortal } from "react-dom";
import ModalAccessibility from "../../../hooks/ModalAccessibility.jsx";
import ModalLibrary from "../ModalLibrary/index.jsx";
import DesktopLibraryPreview from "./DesktopLibraryPreview.jsx";
import LibraryController from "./LibraryController.js";
import MobileLibraryPreview from "./MobileLibraryPreview.jsx";
import "./LibraryPreview.css";

export default class LibraryPreview extends LibraryController {
  opener = React.createRef();

  componentDidMount() {
    super.componentDidMount();
    this.setState({ overlayHost: document.querySelector(".salon-landing") });
  }

  openLibrary = (event) => {
    this.opener.current = event.currentTarget;
    this.setState({ libOpen: true });
  };

  render() {
    const { libOpen, overlayHost } = this.state;
    return (
      <>
        <div>
          {this.props.intro}
          <div className="salon-s62">
            <button type="button" className="salon-s60 salon-marker-action salon-marker-primary" onClick={this.openLibrary} aria-haspopup="dialog">
              <span className="salon-marker-text">Open the full library</span>
            </button>
            <span className="salon-s61">drag to arrange</span>
          </div>
        </div>
        <MobileLibraryPreview openLibrary={this.openLibrary} />
        <DesktopLibraryPreview openLibrary={this.openLibrary} />
        {overlayHost && createPortal(
          <>
            <ModalLibrary {...this.renderVals()} />
            <ModalAccessibility open={libOpen} returnFocus={this.opener} />
          </>,
          overlayHost,
        )}
      </>
    );
  }
}
