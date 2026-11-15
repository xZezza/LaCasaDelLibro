import { imageAsset } from "../../../lib/image-assets.js";
import "../shared/actions.css";
import "./styles.css";

const ART = imageAsset("/images/decorations/library-editorial/approved-cutout.png");
const CROPS = {
  shelf: [80, 732, 1375, 181],
  acotar: [185, 278, 184, 465],
  fourth: [368, 287, 151, 456],
  crows: [659, 287, 137, 456],
  prince: [793, 286, 137, 457],
  ivy: [50, 552, 140, 423],
  vase: [1265, 364, 206, 374],
};

function Artwork({ part }) {
  const [x, y, width, height] = CROPS[part];
  return <span className={`library-mobile-art library-mobile-art-${part}`} style={{
    backgroundImage: `url("${ART}")`,
    backgroundSize: `${1536 / width * 100}% ${1024 / height * 100}%`,
    backgroundPosition: `${x / (1536 - width) * 100}% ${y / (1024 - height) * 100}%`,
  }} />;
}

export default function MobileLibraryPreview({ openLib }) {
  return <div className="library-mobile-preview">
    <h3>A shelf of your own</h3>
    <p className="library-mobile-intro">The books you keep coming back to.</p>
    <button type="button" className="library-mobile-scene" onClick={openLib}
      aria-label="Open the full library" aria-haspopup="dialog">
      <span aria-hidden="true">
        <Artwork part="acotar" />
        <Artwork part="fourth" />
        <Artwork part="crows" />
        <Artwork part="prince" />
        <Artwork part="shelf" />
        <Artwork part="ivy" />
        <Artwork part="vase" />
      </span>
    </button>
    <p className="library-mobile-caption">Finished, and still with you.</p>
    <button type="button" onClick={openLib} aria-haspopup="dialog"
      className="library-mobile-open salon-marker-action salon-marker-primary">
      <span className="salon-marker-text">Open the full library</span>
    </button>
    <p className="library-mobile-hint">Tap the shelf to step inside.</p>
  </div>;
}
