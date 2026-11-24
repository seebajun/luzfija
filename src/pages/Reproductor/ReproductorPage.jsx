import { useState, useCallback } from "react";
import { SKINS, DEFAULT_SKIN_ID } from "../../data/skins";
import WebampPlayer from "./WebampPlayer";
import "./ReproductorPage.css";

const STORAGE_KEY = "luzfija-winamp-skin";

function ReproductorPage() {
  const [activeSkinId, setActiveSkinId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SKINS.some((s) => s.id === saved)) return saved;
    } catch {
      // ignore storage errors
    }
    return DEFAULT_SKIN_ID;
  });
  const [skinFeedback, setSkinFeedback] = useState("");

  const activeSkin =
    SKINS.find((s) => s.id === activeSkinId) || SKINS[0];

  const handleSelectSkin = (skin) => {
    setSkinFeedback("");
    setActiveSkinId(skin.id);
    try {
      localStorage.setItem(STORAGE_KEY, skin.id);
    } catch {
      // ignore
    }
  };

  const handleWebampError = useCallback((msg) => {
    setSkinFeedback(`Error cargando skin: ${msg}`);
  }, []);

  return (
    <div className="y2k-container reproductor-page">
      <section className="skin-bar" aria-label="Selector de skins de Winamp">
        <div className="skin-bar-header">
          <span className="skin-bar-title">✦ WINAMP SKINS</span>
        </div>

        <div className="skin-pills">
          {SKINS.map((skin) => (
            <button
              key={skin.id}
              type="button"
              className={`skin-pill${activeSkinId === skin.id ? " active" : ""}`}
              onClick={() => handleSelectSkin(skin)}
              aria-pressed={activeSkinId === skin.id}
            >
              {skin.name}
            </button>
          ))}
        </div>

        {skinFeedback && <p className="skin-feedback">{skinFeedback}</p>}
      </section>

      <div className="winamp-stage">
        <WebampPlayer
          skinUrl={activeSkin.url}
          onSkinError={handleWebampError}
        />
      </div>
    </div>
  );
}

export default ReproductorPage;
