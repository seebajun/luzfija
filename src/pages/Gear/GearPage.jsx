import { useNavigate } from "react-router-dom";
import "./Gear.css";
import gifAnime01 from "../../assets/GIF/gif_anime01.gif";
import gifAnime02 from "../../assets/GIF/gif_anime02.gif";
import gifCool04 from "../../assets/GIF/gif_cool04.gif";
import gifCloud01 from "../../assets/GIF/gif_cloud01.gif";
import gifCloud02 from "../../assets/GIF/gif_cloud02.gif";
import gifCloud03 from "../../assets/GIF/gif_cloud03.gif";
import gifCloud04 from "../../assets/GIF/gif_cloud04.gif";
import gifCloud05 from "../../assets/GIF/gif_cloud05.gif";

const members = [
  { slug: "ariel", name: "Ariel", role: "Voz / Guitarra / Sintes / Secuencias", gif: gifCloud01 },
  { slug: "gonzalo", name: "Gonzalo", role: "Sintetizadores", gif: gifCloud02 },
  { slug: "guillermo", name: "Guillermo Palma", role: "Guitarra", gif: gifCloud03 },
  { slug: "alejandro", name: "Alejandro", role: "Bajo", gif: gifCloud04 },
  { slug: "monitoreo", name: "Monitoreo", role: "Monitoreo", gif: gifCloud05 },
];

function GearPage() {
  const navigate = useNavigate();

  return (
    <div className="y2k-container">
      <section className="gear-hero">
        <img className="gear-hero-gif gear-hero-gif-left" src={gifAnime01} alt="" />
        <img className="gear-hero-gif gear-hero-gif-right" src={gifAnime02} alt="" />
        <img className="gear-hero-gif-center" src={gifCool04} alt="" />
        <h1 className="glitch-text" data-text="GEAR PARA NERDS">
          GEAR PARA NERDS
        </h1>
        <p className="single-title">⋆｡°✩ EQUIPO Y SONIDO ✩°｡⋆</p>
      </section>

      <div className="gear-grid">
        {members.map((member) => (
          <div
            key={member.slug}
            className="gear-card"
            onClick={() => navigate(`/gear/${member.slug}`)}
          >
            <img className="gear-card-gif" src={member.gif} alt="" />
            <div className="gear-card-image">
              <span className="gear-card-placeholder">📸</span>
            </div>
            <div className="gear-card-info">
              <h3 className="gear-card-name">{member.name}</h3>
              <span className="gear-card-role">{member.role}</span>
            </div>
            <div className="gear-card-arrow">▶</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GearPage;
