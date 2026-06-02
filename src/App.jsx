// App.jsx
import { useState, useRef } from "react";
import "./App.css";

import photo00 from "./assets/photos/photo00.jpeg";
import photo01 from "./assets/photos/photo01.jpeg";
import photo02 from "./assets/photos/photo02.jpeg";
import photo03 from "./assets/photos/photo03.jpeg";
import photo04 from "./assets/photos/photo04.jpeg";
import photo05 from "./assets/photos/photo05.jpeg";
import photo06 from "./assets/photos/photo06.jpeg";

import gif01 from "./assets/icons/gif01.gif";
// import vespucioAudio from './assets/music/Vespucio.wav';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      git;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const width = progressBar.clientWidth;
    const newTime = (clickPosition / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="y2k-container">
      {/* AUDIO ELEMENT */}
      {/* <audio
        ref={audioRef}
        src={vespucioAudio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      /> */}

      {/* HEADER */}
      <header className="y2k-header">
        <div className="band-name">
          <img src={gif01} alt="animated gif" className="header-gif" />

          <h1 className="glitch-text" data-text="LUZ FIJA">
            LUZ FIJA
          </h1>
          <p className="single-title">「 VESPUCIO 」</p>
        </div>

        <div className="social-buttons">
          <a
            href="https://www.instagram.com/luz.fija/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn instagram"
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.youtube.com/@luzfija"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn youtube"
          >
            YOUTUBE
          </a>

          <a
            href="https://open.spotify.com/intl-es/artist/6ZfDBdI1pxX9WDPW4ClMx9"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn spotify"
          >
            SPOTIFY (🤢)
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-image-wrapper">
          <img src={photo06} alt="Luz Fija - Vespucio" className="hero-image" />
          <div className="hero-glitch-overlay"></div>
        </div>
      </section>

      {/* MAIN CONTENT: 2 COLUMNAS */}
      <div className="main-layout">
        {/* SIDEBAR IZQUIERDO - NOTICIAS */}
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

        {/* CONTENIDO PRINCIPAL - BIO + REPRODUCTOR */}
        <main className="main-content">
          <div className="bio-card">
            <h3 className="section-title yellow">BIOGRAFÍA</h3>
            <p className="bio-text">
              <span className="dropcap">L</span>uzFija es una banda Chilena
              formada en Santiago, comuna de La Florida, en el año 2020 por 4
              amigos que coinciden en un trabajo de retail en un centro
              comercial de la capital. A fines de 2021 debutan con su EP
              homónimo, trabajo que movieron en espacios limitados y que tuvo
              una cálida recepción, marcado por atmósferas DreamPop y Shoegaze
              como también el filo y energía del Post Punk. Luego de un periodo
              de inactividad debido a la pandemia, sumado al ir y venir
              personal, el proyecto se reactiva en 2024 con pequeños cambios de
              integrantes y nuevas composiciones, con un foco sónico evolutivo
              respecto a su trabajo anterior. Es así como ‘Vespucio’ se erige
              como carta de presentación de este nuevo proceso, acudiendo a una
              sonoridad más oscura, heredera del cold wave y el rock gótico, sin
              abandonar el Shoegaze ni el Post Punk, elementos que siguen siendo
              pilares de la propuesta. Actualmente la banda se encuentra
              trabajando en su disco debut, abarcando un espectro más amplio de
              influencias a las ya mencionadas, destacando los elementos
              electrónicos glitch tipo hyper-pop, sonoridades oscuras
              referenciadas de bandas visual kei como Buck-Thick y estructuras
              compositivas cercanas al post-rock.
            </p>
          </div>

          <div className="bio-card">
            <h3 className="section-title yellow">Vespucio</h3>
            <p className="bio-text">
              <span className="dropcap">V</span>espucio es el regreso de LuzFija
              tras años de su EP debut editado en 2021. El sencillo refleja una
              evolución tanto sonora como lírica: Elementos sintéticos más
              predominantes, como también guitarras que funcionan como una
              muralla de sonido, todo esto anclado a un beat electrónico y una
              letra que retrata a modo autobiográfico el paso del tiempo desde
              la perspectiva de un trabajador alienado producto de su quehacer
              laboral, poniendo en contradicción sus deseos de realizar una vida
              fuera del trabajo contra la necesidad y obligación de estar en
              este, entregando su vida sin la posibilidad de tener espacios
              personales por fuera. La canción abre con un bombo electrónico a
              modo de cuenta, desmarcandose desde el inicio del carácter más
              acústico y tradicional del trabajo percusivo del EP anterior, para
              luego de golpe entrar la banda completa. Una muralla de sonido
              distorsionado marcando la armonía, mientras el aspecto melódico se
              comparte entre la guitarra y el sintetizador, melodías distintas
              pero con el mismo carácter emocional, repetitivas y nostálgicas.
              Una caja cargada de reverb como tomada directamente de los años
              80s y un hi-hat quebrado al borde del glitch. Acabada la intro las
              guitarras armónicas desaparecen para dar paso a la voz principal,
              la cual en primera persona va desarrollando el estado emocional
              del protagonista. El beat electrónico se mantiene predominante, la
              guitarra melódica ornamenta mucho más libre que en la intro, y en
              el sintetizador transita a unas clásicas campanas del sonido DX7.
              Llegados al coro las guitarras distorsionadas vuelven a aparecer,
              cubiertas de delay y reverb. Una encargada de la muralla armónica
              mientras el elemento melódico lo toma otra guitarra y el
              sintetizador, quienes tocan sus propias melodías, repetitivas y
              constantes, resaltando el momento lírico del coro, dónde el
              protagonista ve pasar el tiempo sintiéndose impotente sobre poder
              cambiar su propio presente. La canción termina tal como parte pero
              con pequeñas modificaciones menores, el sentimiento de
              estancamiento del protagonista es validado pero con el matiz que
              no todos los días son exactamente el mismo.
            </p>
          </div>

          {/* REPRODUCTOR DE MÚSICA */}
          <div className="player-card">
            <h3 className="section-title cyan">🎧 ESCUCHA VESPUCIO</h3>
            <div className="music-player">
              <div className="player-visualizer">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>

              <div className="player-controls">
                <button className="control-btn">⏮</button>
                <button className="control-btn play" onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn">⏭</button>
                <button className="control-btn">🔊</button>
              </div>

              <div className="track-info">
                <span className="track-name"> LUZ FIJA - VESPUCIO </span>
                <div className="progress-bar" onClick={handleProgressClick}>
                  <div
                    className="progress"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <div className="time-info">
                  <span className="time">{formatTime(currentTime)}</span>
                  <span className="time">{formatTime(duration)}</span>
                </div>
              </div>

              <div className="winamp-visual">
                <span>═◄ WINAMP ►═</span>
                <div className="equalizer">
                  <span>🎵</span>
                  <span>🎶</span>
                  <span>🎵</span>
                </div>
              </div>
            </div>
          </div>

          {/* GIF ANIMADO 2000s */}
          <div className="gif-banner">
            <span>⚡ BEST VIEWED WITH 1024x768 ⚡</span>
            <span>
              🐱 <blink>NOW HIRING WEBMASTERS</blink> 🐱
            </span>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="y2k-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            <img src={gif01} alt="animated gif" className="header-gif" />
            <span>© 2021-{new Date().getFullYear()} LUZ FIJA</span>
            <span>✧ TODOS LOS DERECHOS RESERVADOS ✧</span>
            <span className="blink-text">★ Hecho con ♥ en La Florida ★</span>
            <img src={gif01} alt="animated gif" className="header-gif" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
