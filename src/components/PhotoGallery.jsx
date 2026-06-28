import photo00 from "../assets/photos/photo00.jpeg";
import photo01 from "../assets/photos/photo01.jpeg";
import photo02 from "../assets/photos/photo02.jpeg";
import photo03 from "../assets/photos/photo03.jpeg";
import photo04 from "../assets/photos/photo04.jpeg";
import photo05 from "../assets/photos/photo05.jpeg";
import photo06 from "../assets/photos/photo06.jpeg";

const photos = [
  { src: photo00, alt: "Photo 00" },
  { src: photo01, alt: "Photo 01" },
  { src: photo02, alt: "Photo 02" },
  { src: photo03, alt: "Photo 03" },
  { src: photo04, alt: "Photo 04" },
  { src: photo05, alt: "Photo 05" },
  { src: photo06, alt: "Photo 06" },
];

function PhotoGallery() {
  return (
    <div className="photo-gallery">
      <h3 className="section-title cyan">📷 GALERÍA</h3>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <div key={i} className="photo-card">
            <img src={photo.src} alt={photo.alt} className="photo-img" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
