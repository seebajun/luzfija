import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import photo01 from "../../assets/photos/photo01.webp";
import photo05 from "../../assets/photos/photo05.webp";
import photo01Thumb from "../../assets/thumbs/photo01_thumb.webp";
import photo05Thumb from "../../assets/thumbs/photo05_thumb.webp";
import "./PhotoGallery.css";

const pactoPhotosModules = import.meta.glob(
  "../../assets/photos/photo_pacto*.webp",
  { eager: true, import: "default" },
);

const pactoThumbsModules = import.meta.glob(
  "../../assets/thumbs/photo_pacto*_thumb.webp",
  { eager: true, import: "default" },
);

const pactoPhotos = Object.entries(pactoPhotosModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const name = path.split("/").pop().replace(/\.webp$/, "");
    const thumbPath = `../../assets/thumbs/${name}_thumb.webp`;
    return {
      src,
      thumb: pactoThumbsModules[thumbPath] || src,
      alt: name,
    };
  });

const photos = [
  ...pactoPhotos,
  { src: photo01, thumb: photo01Thumb, alt: "Photo 01" },
  { src: photo05, thumb: photo05Thumb, alt: "Photo 05" },
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
            <img
              src={photo.thumb}
              alt={photo.alt}
              className="photo-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && createPortal(
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
            <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} className="lightbox-img" />
            {photos.length > 1 && (
              <div className="lightbox-controls">
                <button className="lightbox-prev" onClick={() => setLightboxIndex((p) => (p === 0 ? photos.length - 1 : p - 1))}>‹</button>
                <span className="lightbox-counter">{lightboxIndex + 1} / {photos.length}</span>
                <button className="lightbox-next" onClick={() => setLightboxIndex((p) => (p === photos.length - 1 ? 0 : p + 1))}>›</button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default PhotoGallery;
