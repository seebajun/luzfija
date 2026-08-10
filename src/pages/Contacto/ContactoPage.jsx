import gifWawa01 from "../../assets/GIF/gif_wawa01.gif";
import gifCloud06 from "../../assets/GIF/gif_cloud06.gif";
import gifCloud07 from "../../assets/GIF/gif_cloud07.gif";
import gifRo02 from "../../assets/GIF/gif_ro02.gif";
import gifRo01 from "../../assets/GIF/gif_ro01.gif";
import gofEva01 from "../../assets/GIF/gof_eva01.gif";
import "./ContactoPage.css";

function ContactoPage() {
  return (
    <div className="y2k-container">
      <section className="hero contacto-hero">
        <img
          className="contacto-hero-gif contacto-hero-gif-left"
          src={gifCloud06}
          alt=""
        />
        <img
          className="contacto-hero-gif contacto-hero-gif-right"
          src={gifCloud07}
          alt=""
        />
        <h1 className="glitch-text" data-text="CONTACTO">
          CONTACTO
        </h1>
      </section>

      <main className="main-content">
        <div className="bio-card">
          <img
            className="contacto-card-gif contacto-card-gif-right"
            src={gifRo02}
            alt=""
          />
          <h2 className="section-title magenta">CONTACTO</h2>
          <p>
            Para contactar a la banda, escribir a través de Instagram{" "}
            <a
              href="https://www.instagram.com/luz.fija/"
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-link"
            >
              @luz.fija
            </a>{" "}
            o por correo electrónico.
          </p>
          <p className="contacto-email">📧 contacto@luzfija.cl</p>
          <div className="contacto-gif-row">
            <img className="contacto-gif" src={gifWawa01} alt="" />
            <img className="contacto-gif" src={gofEva01} alt="" />
            <img className="contacto-gif" src={gifRo01} alt="" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactoPage;
