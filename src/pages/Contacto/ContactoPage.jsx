import gifWawa01 from "../../assets/GIF/gif_wawa01.gif";
import "./ContactoPage.css";

function ContactoPage() {
  return (
    <div className="y2k-container">
      <section className="hero">
        <h1 className="glitch-text" data-text="CONTACTO">
          CONTACTO
        </h1>
        <p className="single-title">「 LUZ FIJA 」</p>
      </section>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="news-card">
            <h3 className="section-title cyan">🎸 LA BANDA</h3>
            <ul className="discography">
              <li>Ariel — Voz / Guitarra / Sintes / Secuencias</li>
              <li>Gonzalo — Sintetizadores</li>
              <li>Guillermo Palma — Guitarra</li>
              <li>Alejandro — Bajo</li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <div className="bio-card">
            <h2 className="section-title magenta">CONTACTO</h2>
            <p>
              Para contactar a la banda, escribir a través de Instagram{" "}
              <a href="https://www.instagram.com/luz.fija/" target="_blank" rel="noopener noreferrer" className="contacto-link">
                @luz.fija
              </a>
              {" "}o por correo electrónico.
            </p>
            <p className="contacto-email">
              📧 contacto@luzfija.cl
            </p>
            <img className="contacto-gif" src={gifWawa01} alt="" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContactoPage;
