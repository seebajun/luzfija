import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import "./Gear.css";
import gifAnime03 from "../../assets/GIF/gif_anime03.gif";
import gifAnime04 from "../../assets/GIF/gif_anime04.gif";
import gifAnime05 from "../../assets/GIF/gif_anime05.gif";
import photoAriel from "../../assets/photos_gear/photo_ariel_gear.webp";
import photoAriel2 from "../../assets/photos_gear/photo_ariel_gear_others.webp";
import photoGonzalo01 from "../../assets/photos_gear/photo_gonzalo_gear01.webp";
import photoGonzalo02 from "../../assets/photos_gear/photo_gonzalo_gear02.webp";
import photoGonzalo03 from "../../assets/photos_gear/photo_gonzalo_gear03.webp";
import photoGuillermo from "../../assets/photos_gear/photo_guillermo_gear.webp";
import photoGuillermoBag from "../../assets/photos_gear/photo_guillermo_gear_bag.webp";
import photoGuillermoStrap from "../../assets/photos_gear/photo_guillermo_gear_strap.webp";
import photoAlejandro from "../../assets/photos_gear/photo_alejandro_gear_pedales.webp";
import photoMonitoreo from "../../assets/photos_gear/photo_gear_monitoreo.webp";
import photoMonitoreo02 from "../../assets/photos_gear/photo_gear_monitoreo02.webp";

const gearData = {
  ariel: {
    name: "Ariel",
    role: "Voz / Guitarra / Sintetizadores / Secuencias",
    categories: [
      {
        title: "Guitarra",
        items: [{ gear: "Fender Jaguar Johnny Marr" }],
      },
      {
        title: "Pedales Guitarra",
        items: [
          { gear: "Korg Pitchblack PB-01" },
          { gear: "Boss PS6" },
          { gear: "Ibanez TS808" },
          { gear: "JHS Muffaletta" },
          { gear: "Boss DD-500" },
          { gear: "GFI Skylar" },
        ],
      },
      {
        title: "Amplificador",
        items: [
          { gear: "Roland JC-50" },
          { gear: "DSM/HUMBOLDT Simplifier MK-II" },
        ],
      },
      {
        title: "Sintetizadores",
        items: [{ gear: "Behringer JT 4000" }],
      },
      {
        title: "Pedales Sintetizadores",
        items: [
          { gear: "Behringer HM2" },
          { gear: "Hotone Krush" },
          { gear: "Zoom MS70 cdr+" },
        ],
      },
      {
        title: "Secuenciador / Sampler",
        items: [{ gear: "Akai MPC One" }],
      },
    ],
  },
  gonzalo: {
    name: "Gonzalo",
    role: "Sintetizadores",
    categories: [
      {
        title: "Sintetizadores",
        items: [
          { gear: "Dave Smith Instruments Prophet Rev2 module" },
          { gear: "Roland JU-06" },
          { gear: "Volca FM2" },
          { gear: "Arturia Keystep Pro (MIDI controller)" },
        ],
      },
      {
        title: "Pedales",
        items: [
          { gear: "Electro-Harmonix Little Big Muff" },
          { gear: "Laney Black Country Customs Steelpark" },
          { gear: "Digitech Digital Delay" },
          { gear: "Boss DD7" },
          { gear: "Walrus Audio Reverb Fathom Kakamura Edition" },
        ],
      },
    ],
  },
  guillermo: {
    name: "Guillermo Palma",
    role: "Guitarra",
    categories: [
      {
        title: "Guitarra",
        items: [{ gear: "G&L Legacy Special USA 93'" }],
      },
      {
        title: "Pedales Guitarra",
        items: [
          { gear: "ISP Technologies Decimator II G-String" },
          { gear: "Boss ES-8" },
          { gear: "TC Electonic Polytune V1" },
          { gear: "Walrus Audio Deep Six" },
          { gear: "Electro Harmonix POG2" },
          { gear: "JHS Morning Glory V4" },
          { gear: "Walrus Audio Jupiter V1" },
          { gear: "Strymon Mobius" },
          { gear: "Strymon Timeline" },
          { gear: "Strymon Bigsky" },
        ],
      },
      {
        title: "Amplificador",
        items: [
          { gear: "Fender 65 Super Reverb Reissue" },
          { gear: "DSM/HUMBOLDT Simplifier MK-II" },
        ],
      },
    ],
  },
  alejandro: {
    name: "Alejandro",
    role: "Bajo",
    categories: [
      {
        title: "Bajo",
        items: [{ gear: "Squier PJB" }],
      },
      {
        title: "Pedales Bajo",
        items: [
          { gear: "Futuro compresor (?)" },
          { gear: "Joyo Tidalwave" },
          { gear: "DS rng" },
          { gear: "Chorus rng" },
          { gear: "Two Notes Torpedo C.A.B." },
        ],
      },
    ],
  },
  monitoreo: {
    name: "Monitoreo",
    role: "Monitoreo",
    categories: [
      {
        title: "Mezcladora",
        items: [{ gear: "Behringer X AIR XR18 (Formato Rack)" }],
      },
      {
        title: "Monitoreo Inalámbrico",
        items: [{ gear: "Bolanle P2 IEM Amplificador de Audífonos personal" }],
      },
    ],
  },
};

function GearMember() {
  const { member } = useParams();
  const navigate = useNavigate();
  const data = gearData[member];
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const memberPhotos = {
    ariel: [photoAriel, photoAriel2],
    gonzalo: [photoGonzalo01, photoGonzalo02, photoGonzalo03],
    guillermo: [photoGuillermo, photoGuillermoBag, photoGuillermoStrap],
    alejandro: [photoAlejandro],
    monitoreo: [photoMonitoreo, photoMonitoreo02],
  };

  const photos = memberPhotos[member] || [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((p) => (p === 0 ? photos.length - 1 : p - 1));
      if (e.key === "ArrowRight") setLightboxIndex((p) => (p === photos.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos.length]);

  function renderPhotos() {
    const photos = memberPhotos[member];
    if (!photos) {
      return (
        <div className="gear-photo-placeholder">
          <span>📸 FOTO DEL MIEMBRO</span>
        </div>
      );
    }
    if (photos.length === 1) {
      return (
        <img src={photos[0]} alt={data.name} className="gear-photo" onClick={() => setLightboxIndex(0)} />
      );
    }
    return (
      <div className="gear-carousel">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${data.name} ${i + 1}`}
            className="gear-photo"
            style={{ display: i === carouselIndex ? "block" : "none" }}
            onClick={() => { setCarouselIndex(i); setLightboxIndex(i); }}
          />
        ))}
        <div className="gear-carousel-controls">
          <button className="gear-carousel-btn" onClick={() => setCarouselIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}>‹</button>
          <span className="gear-carousel-dots">
            {photos.map((_, i) => (
              <span key={i} className={`gear-carousel-dot${i === carouselIndex ? " active" : ""}`} onClick={() => setCarouselIndex(i)} />
            ))}
          </span>
          <button className="gear-carousel-btn" onClick={() => setCarouselIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}>›</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="y2k-container">
        <div className="gear-error">
          <h1 className="glitch-text" data-text="404">
            404
          </h1>
          <p>MIEMBRO NO ENCONTRADO</p>
          <button className="nav-btn gear-nav" onClick={() => navigate("/gear")}>
            ← GEAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="y2k-container">
      <div className="gear-member-header">
        <button className="nav-btn gear-nav" onClick={() => navigate("/gear")}>
          ← GEAR
        </button>
        <div className="gear-member-title">
          <div className="gear-member-title-row">
            <img className="gear-member-gif" src={gifAnime03} alt="" />
            <h1 className="glitch-text" data-text={data.name.toUpperCase()}>
              {data.name.toUpperCase()}
            </h1>
            <img className="gear-member-gif" src={gifAnime04} alt="" />
          </div>
          <p className="single-title">{data.role}</p>
        </div>
      </div>

      <div className="gear-member-photos">
        <img className="gear-member-photos-gif" src={gifAnime05} alt="" />
        {renderPhotos()}
      </div>

      {lightboxIndex !== null && createPortal(
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
            {photos.length > 1 && (
              <button className="lightbox-prev" onClick={() => setLightboxIndex((p) => (p === 0 ? photos.length - 1 : p - 1))}>‹</button>
            )}
            <img src={photos[lightboxIndex]} alt={`${data.name} ${lightboxIndex + 1}`} className="lightbox-img" />
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

      {data.categories.map((cat, i) => (
        <div key={i} className="gear-list">
          <h3 className="section-title cyan">{cat.title}</h3>
          {cat.items.map((item, j) => (
            <div key={j} className="gear-item">
              <div className="gear-item-bullet">◆</div>
              <div className="gear-item-info">
                <span className="gear-item-name">{item.gear}</span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="gear-back-bottom">
        <button className="nav-btn gear-nav" onClick={() => navigate("/gear")}>
          ← GEAR
        </button>
      </div>
    </div>
  );
}

export default GearMember;
