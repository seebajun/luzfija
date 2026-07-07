import { useState, useEffect } from "react";
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
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((p) => (p === 0 ? photos.length - 1 : p - 1));
      if (e.key === "ArrowRight") setLightboxIndex((p) => (p === photos.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <div className="photo-gallery">
      <h3 className="section-title cyan">GALERÍA</h3>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <div key={i} className="photo-card" onClick={() => setLightboxIndex(i)}>
            <img src={photo.src} alt={photo.alt} className="photo-img" />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && createPortal(
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
            {photos.length > 1 && (
              <button className="lightbox-prev" onClick={() => setLightboxIndex((p) => (p === 0 ? photos.length - 1 : p - 1))}>‹</button>
            )}
            <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} className="lightbox-img" />
            {photos.length > 1 && (
              <button className="lightbox-next" onClick={() => setLightboxIndex((p) => (p === photos.length - 1 ? 0 : p + 1))}>›</button>
            )}
            {photos.length > 1 && (
              <span className="lightbox-counter">{lightboxIndex + 1} / {photos.length}</span>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default PhotoGallery;
