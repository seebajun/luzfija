import gifCool03 from "../../assets/GIF/gif_cool03.gif";
import gifGoldensun01 from "../../assets/GIF/gif_goldensun01.gif";
import gifGoldensun02 from "../../assets/GIF/gif_goldensun02.gif";
import gifGoldensun03 from "../../assets/GIF/gif_goldensun03.gif";
import gifGoldensun04 from "../../assets/GIF/gif_goldensun04.gif";
import gifNew05 from "../../assets/GIF/gif_new05.gif";
import gifStar01 from "../../assets/GIF/gif_star01.gif";
import gifDiscografia01 from "../../assets/GIF/gif_discografia01.gif";
import gifNote01 from "../../assets/GIF/gif_note01.gif";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="news-card news-card-noticias">
        <div className="news-goldensun">
          <img src={gifGoldensun01} alt="" />
          <img src={gifGoldensun02} alt="" />
          <img src={gifGoldensun03} alt="" />
          <img src={gifGoldensun04} alt="" />
        </div>
        <h3 className="section-title cyan">
          <img className="news-title-gif" src={gifNew05} alt="" />
          NOTICIAS
        </h3>
        <div className="news-item">
          <span className="news-date">13.08.2026</span>
          <p>
            <img className="news-star-gif" src={gifStar01} alt="" />
            Nuevo Single "Vespucio" disponible en todas las plataformas.
          </p>
        </div>
        <div className="news-item">
          <span className="news-date">xx.xx.2026</span>
          <p>
            <img className="news-star-gif" src={gifStar01} alt="" />
            Live session en la bodega de la pega del Ale.
          </p>
        </div>
        <div className="news-item">
          <span className="news-date">31.08.2026</span>
          <p>
            <img className="news-star-gif" src={gifStar01} alt="" />
            Tocata Lanzamiento Vespucio con los amigos.
          </p>
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

      <div className="news-card discography-card">
        <img className="discography-gif" src={gifCool03} alt="" />
        <h3 className="section-title magenta">
          <img
            className="discografia-title-gif"
            src={gifDiscografia01}
            alt=""
          />
          DISCOGRAFÍA
        </h3>
        <ul className="discography">
          <li>
            <img className="discografia-note-gif" src={gifNote01} alt="" />
            Luz Fija - Vespucio Single 2026
          </li>
          <li>
            <img className="discografia-note-gif" src={gifNote01} alt="" />
            Luz Fija EP 2021
          </li>
          <li>
            <img className="discografia-note-gif" src={gifNote01} alt="" />
            Demo 2000
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
