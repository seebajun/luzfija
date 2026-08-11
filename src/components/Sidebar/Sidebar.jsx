import gifCool03 from "../../assets/GIF/gif_cool03.gif";
import gifGoldensun01 from "../../assets/GIF/gif_goldensun01.gif";
import gifGoldensun02 from "../../assets/GIF/gif_goldensun02.gif";
import gifGoldensun03 from "../../assets/GIF/gif_goldensun03.gif";
import gifGoldensun04 from "../../assets/GIF/gif_goldensun04.gif";
import gifNew05 from "../../assets/GIF/gif_new05.gif";
import gifStar01 from "../../assets/GIF/gif_star01.gif";
import gifDiscografia01 from "../../assets/GIF/gif_discografia01.gif";
import gifNote01 from "../../assets/GIF/gif_note01.gif";
import gifBand01 from "../../assets/GIF/gif_band01.gif";
import gifBand02 from "../../assets/GIF/gif_band02.gif";
import gifBand03 from "../../assets/GIF/gif_band03.gif";
import gifBand04 from "../../assets/GIF/gif_band04.gif";
import gifBand05 from "../../assets/GIF/gif_band05.gif";
import gifRodo from "../../assets/GIF/gif_rodo.gif";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="news-card news-card-noticias">
        <div className="news-goldensun">
          <img src={gifGoldensun01} alt="" loading="lazy" decoding="async" />
          <img src={gifGoldensun02} alt="" loading="lazy" decoding="async" />
          <img src={gifGoldensun03} alt="" loading="lazy" decoding="async" />
          <img src={gifGoldensun04} alt="" loading="lazy" decoding="async" />
        </div>
        <h3 className="section-title cyan">
          <img
            className="news-title-gif"
            src={gifNew05}
            alt=""
            loading="lazy"
            decoding="async"
          />
          NOTICIAS
        </h3>
        <div className="news-item">
          <span className="news-date">13.08.2026</span>
          <p>
            <img
              className="news-star-gif"
              src={gifStar01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Nuevo Single "Vespucio" disponible en todas las plataformas.
          </p>
        </div>
        <div className="news-item">
          <span className="news-date">xx.xx.2026</span>
          <p>
            <img
              className="news-star-gif"
              src={gifStar01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Live session en la bodega de la pega del Ale.
          </p>
        </div>
        <div className="news-item">
          <span className="news-date">31.08.2026</span>
          <p>
            <img
              className="news-star-gif"
              src={gifStar01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Tocata Lanzamiento Vespucio con los amigos.
          </p>
        </div>

        <div className="construction-box">
          <span>UNDER CONSTRUCTION</span>
          <marquee className="y2k-marquee-small"> PRÓXIMAS FECHAS</marquee>
        </div>
      </div>

      <div className="news-card discography-card">
        <img
          className="discography-gif"
          src={gifCool03}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <h3 className="section-title magenta">
          <img
            className="discografia-title-gif"
            src={gifDiscografia01}
            alt=""
            loading="lazy"
            decoding="async"
          />
          DISCOGRAFÍA
        </h3>
        <ul className="discography">
          <li>
            <img
              className="discografia-note-gif"
              src={gifNote01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Luz Fija - Vespucio Single 2026
          </li>
          <li>
            <img
              className="discografia-note-gif"
              src={gifNote01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Luz Fija EP 2021
          </li>
          <li>
            <img
              className="discografia-note-gif"
              src={gifNote01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Demo 2000
          </li>
        </ul>
      </div>

      <div className="news-card banda-card">
        <h3 className="section-title cyan">
          <img
            className="banda-title-gif"
            src={gifBand05}
            alt=""
            loading="lazy"
            decoding="async"
          />
          LA BANDA
        </h3>
        <ul className="discography">
          <li>
            <img
              className="discografia-note-gif"
              src={gifBand01}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Ariel — Voz / Guitarra / Sintes / Secuencias
          </li>
          <li>
            <img
              className="discografia-note-gif"
              src={gifBand02}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Gonzalo — Sintetizadores
          </li>
          <li>
            <img
              className="discografia-note-gif"
              src={gifBand03}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Guillermo Palma — Guitarra
          </li>
          <li>
            <img
              className="discografia-note-gif"
              src={gifBand04}
              alt=""
              loading="lazy"
              decoding="async"
            />
            Alejandro — Bajo
          </li>
          <li className="banda-item-separator">
            <img
              className="discografia-note-gif"
              src={gifRodo}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <a
              href="https://www.instagram.com/azulyblancoph"
              target="_blank"
              rel="noopener noreferrer"
              className="banda-item-link"
            >
              Rodolfo Blanco — Director de arte y otras cosas
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
