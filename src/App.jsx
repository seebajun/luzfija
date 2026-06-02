// App.jsx
import { useState, useRef } from 'react';
import './App.css';

import photo00 from './assets/photos/photo00.jpeg';
import photo01 from './assets/photos/photo01.jpeg';
import photo02 from './assets/photos/photo02.jpeg';
import photo03 from './assets/photos/photo03.jpeg';
import photo04 from './assets/photos/photo04.jpeg';
import photo05 from './assets/photos/photo05.jpeg';
import photo06 from './assets/photos/photo06.jpeg';

// import vespucioAudio from './assets/music/Vespucio.wav';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {git
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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
              <span className="dropcap">L</span>uzFija es una banda Chilena formada en Santiago, comuna de La Florida, en el año 2020 por 4 amigos que coinciden en un trabajo de retail en un centro comercial de la capital. A fines de 2021 debutan con su EP homónimo, trabajo que movieron en espacios limitados y que tuvo una cálida recepción, marcado por atmósferas DreamPop y Shoegaze como también el filo y energía del Post Punk.
Luego de un periodo de inactividad debido a la pandemia, sumado al ir y venir personal, el proyecto se reactiva en 2024 con pequeños cambios de integrantes y nuevas composiciones, con un foco sónico evolutivo respecto a su trabajo anterior.
Es así como ‘Vespucio’ se erige como carta de presentación de este nuevo proceso, acudiendo a una sonoridad más oscura, heredera del cold wave y el rock gótico, sin abandonar el Shoegaze ni el Post Punk, elementos que siguen siendo pilares de la propuesta. 
Actualmente la banda se encuentra trabajando en su disco debut, abarcando un espectro más amplio de influencias a las ya mencionadas, destacando los elementos electrónicos glitch tipo hyper-pop, sonoridades oscuras referenciadas de bandas  visual kei como Buck-Thick y estructuras compositivas cercanas al post-rock. 
            </p>

            <div className="quotes">
              <span className="quote">"Vespucio"</span>
              <span className="quote-author">- Luz Fija</span>
            </div>
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
                  {isPlaying ? '⏸' : '▶'}
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
            <span>🐱 <blink>NOW HIRING WEBMASTERS</blink> 🐱</span>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="y2k-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            <span>© 2000-{new Date().getFullYear()} LUZ FIJA</span>
            <span>✧ TODOS LOS DERECHOS RESERVADOS ✧</span>
            <span className="blink-text">★ Hecho con ♥ en La Florida ★</span>
          </div>
          <div className="footer-buttons">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='31' viewBox='0 0 88 31'%3E%3Crect width='88' height='31' fill='black'/%3E%3Ctext x='5' y='20' fill='lime' font-size='10'%3ENETSCAPE%3C/text%3E%3C/svg%3E" alt="netscape" />
            <span>IE 6.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;