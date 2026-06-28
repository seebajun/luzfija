import { useNavigate } from "react-router-dom";

const members = [
  { slug: "ariel", name: "Ariel", role: "Voz / Guitarra / Sintes / Secuencias" },
  { slug: "gonzalo", name: "Gonzalo", role: "Sintetizadores" },
  { slug: "guillermo", name: "Guillermo Palma", role: "Guitarra" },
  { slug: "alejandro", name: "Alejandro", role: "Bajo" },
  { slug: "monitoreo", name: "Monitoreo", role: "Monitoreo" },
];

function GearPage() {
  const navigate = useNavigate();

  return (
    <div className="y2k-container">
      <section className="gear-hero">
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
