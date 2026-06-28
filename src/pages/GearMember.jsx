import { useParams, useNavigate } from "react-router-dom";

const gearData = {
  ariel: {
    name: "Ariel",
    role: "Voz / Guitarra / Sintetizadores / Secuencias",
    categories: [
      {
        title: "Guitarra",
        items: [
          { gear: "Fender Jaguar Johnny Marr" },
        ],
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
        items: [
          { gear: "Behringer JT 4000" },
        ],
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
        items: [
          { gear: "Akai MPC One" },
        ],
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
        items: [
          { gear: "G&L Legacy Special USA 93'" },
        ],
      },
      {
        title: "Pedales Guitarra",
        items: [
          { gear: "ISP Technologies Decimator II G-String" },
          { gear: "Boss ES-8" },
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
        items: [
          { gear: "Squier PJB" },
        ],
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
        items: [
          { gear: "Behringer X AIR XR18 (Formato Rack)" },
        ],
      },
      {
        title: "Monitoreo Inalámbrico",
        items: [
          { gear: "Bolanle P2 IEM Amplificador de Audífonos personal" },
        ],
      },
    ],
  },
};

function GearMember() {
  const { member } = useParams();
  const navigate = useNavigate();
  const data = gearData[member];

  if (!data) {
    return (
      <div className="y2k-container">
        <div className="gear-error">
          <h1 className="glitch-text" data-text="404">
            404
          </h1>
          <p>MIEMBRO NO ENCONTRADO</p>
          <button className="control-btn" onClick={() => navigate("/gear")}>
            ← VOLVER A GEAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="y2k-container">
      <div className="gear-member-header">
        <button className="control-btn" onClick={() => navigate("/gear")}>
          ← GEAR
        </button>
        <div className="gear-member-title">
          <h1 className="glitch-text" data-text={data.name.toUpperCase()}>
            {data.name.toUpperCase()}
          </h1>
          <p className="single-title">{data.role}</p>
        </div>
      </div>

      <div className="gear-member-photos">
        <div className="gear-photo-placeholder">
          <span>📸 FOTO DEL MIEMBRO</span>
        </div>
      </div>

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
    </div>
  );
}

export default GearMember;
