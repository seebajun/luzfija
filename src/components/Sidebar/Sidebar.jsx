import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="news-card">
        <h3 className="section-title cyan">📰 NOTICIAS</h3>
        <div className="news-item">
          <span className="news-date">15.01.2026</span>
          <p>✨ Nuevo single "Vespucio" disponible pronto</p>
        </div>
        <div className="news-item">
          <span className="news-date">10.01.2026</span>
          <p>Grabaciones en la sala de Luz Fija</p>
        </div>
        <div className="news-item">
          <span className="news-date">05.01.2026</span>
          <p>Videoclip en producción</p>
        </div>

        <div className="construction-box">
          <span>UNDER CONSTRUCTION</span>
          <marquee className="y2k-marquee-small"> PRÓXIMAS FECHAS</marquee>
        </div>

        <div className="counter">
          <span>VISITAS: 00012345</span>
          <div className="counter-bars">||||||||||</div>
        </div>
      </div>

      <div className="news-card">
        <h3 className="section-title magenta">💿 DISCOGRAFÍA</h3>
        <ul className="discography">
          <li>🎵 Vespucio (Single 2025)</li>
          <li>🎵 Demo 2000</li>
          <li>🎵 Luz Fija EP</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
