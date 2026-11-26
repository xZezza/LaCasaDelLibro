import { imageAsset } from "../../../lib/image-assets.js";

const shelfArtwork = imageAsset("/images/decorations/library-editorial/approved-cutout.png");

export default function MobileLibraryPreview({ openLibrary }) {
  return (
    <div className="library-mobile-preview">
      <button type="button" className="library-mobile-scene" onClick={openLibrary}
        aria-label="Open the full library" aria-haspopup="dialog">
        <span className="library-mobile-read" aria-hidden="true"><em>Read</em></span>
        <img src={shelfArtwork} width="1536" height="1024" alt="" loading="lazy" decoding="async" />
      </button>
      <p className="library-mobile-caption">Finished, and still with you.</p>
      <button type="button" onClick={openLibrary} aria-haspopup="dialog"
        className="library-mobile-open salon-marker-action salon-marker-primary">
        <span className="salon-marker-text">Open the full library</span>
      </button>
    </div>
  );
}
