import { useState } from "react";
import "./BioCard.css";

function BioCard({ title, dropcapLetter, children, gif, gifAlign = "left" }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`bio-card${expanded ? " expanded" : ""}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {gif && (
        <img className={`bio-card-gif bio-card-gif-${gifAlign}`} src={gif} alt="" />
      )}
      <h3 className="section-title yellow">{title}</h3>
      <p className="bio-text">
        <span className="dropcap">{dropcapLetter}</span>
        {children}
      </p>
      <span className="bio-expand-hint">{expanded ? "▲ CERRAR" : "▼ VER MÁS"}</span>
    </div>
  );
}

export default BioCard;
