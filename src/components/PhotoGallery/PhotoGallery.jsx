import { useState } from "react";
import { createPortal } from "react-dom";
import photo01 from "../../assets/photos/photo01.webp";
import photo02 from "../../assets/photos/photo02.webp";
import photo03 from "../../assets/photos/photo03.webp";
import photo04 from "../../assets/photos/photo04.webp";
import photo05 from "../../assets/photos/photo05.webp";
import photo06 from "../../assets/photos/photo06.webp";
import "./PhotoGallery.css";

const photos = [
  { src: photo01, alt: "Photo 01" },
  { src: photo02, alt: "Photo 02" },
  { src: photo03, alt: "Photo 03" },
  { src: photo04, alt: "Photo 04" },
  { src: photo05, alt: "Photo 05" },
  { src: photo06, alt: "Photo 06" },
];

function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="photo-gallery">
      <h3 className="section-title cyan">GALERÍA</h3>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <div key={i} className="photo-card" onClick={() => setLightbox(photo.src)}>
            <img src={photo.src} alt={photo.alt} className="photo-img" />
          </div>
        ))}
      </div>

      {lightbox && createPortal(
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox} alt="Foto ampliada" className="lightbox-img" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default PhotoGallery;
