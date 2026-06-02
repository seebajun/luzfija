// App.jsx
import { useState, useRef } from 'react';
import './App.css';
import photo01 from './assets/photos/photo01.jpeg';
import vespucioAudio from './assets/music/Vespucio.wav';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
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
      <audio
        ref={audioRef}
        src={vespucioAudio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

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
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn instagram"
          >
            📷 INSTAGRAM
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn youtube"
          >
            ▶ YOUTUBE
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-image-wrapper">
          <img src={photo01} alt="Luz Fija - Vespucio" className="hero-image" />
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
              <span className="news-date">15.01.2000</span>
              <p>✨ Nuevo single "Vespucio" disponible pronto</p>
            </div>
            <div className="news-item">
              <span className="news-date">10.01.2000</span>
              <p>🎸 Grabaciones en Estudio Sur</p>
            </div>
            <div className="news-item">
              <span className="news-date">05.01.2000</span>
              <p>📺 Videoclip en producción</p>
            </div>
            
            <div className="construction-box">
              <span>🚧 UNDER CONSTRUCTION 🚧</span>
              <marquee className="y2k-marquee-small">⚡ PRÓXIMAS FECHAS ⚡</marquee>
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
            <h3 className="section-title yellow">📖 BIOGRAFÍA</h3>
            <p className="bio-text">
              <span className="dropcap">L</span>uz Fija emerge desde las entrañas de la 
              autopista Vespucio, fusionando shoegaze con la estética digital del 
              nuevo milenio. Su sonido oscila entre guitarras saturadas y sintetizadores 
              analógicos, creando atmósferas que capturan la nostalgia de los 2000 
              con una visión futurista.
            </p>
            <p className="bio-text">
              <strong>Vespucio</strong> es su primer single, un viaje sónico por las 
              calles de Santiago cuando el sol se pone y las luces de neón comienzan 
              a brillar. Producido por <em>Luz Fija</em> y masterizado en cinta DAT.
            </p>
            
            <div className="quotes">
              <span className="quote">"El futuro es ahora"</span>
              <span className="quote-author">- Rockaxis</span>
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
                <span className="track-name">🎸 LUZ FIJA - VESPUCIO 🎸</span>
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
          <div className="footer-links">
            <a href="#">📧 CONTACT</a>
            <a href="#">📜 PRESS KIT</a>
            <a href="#">🎫 SHOWS</a>
            <a href="#">💿 MERCH</a>
          </div>
          <div className="footer-copyright">
            <span>© 2000-{new Date().getFullYear()} LUZ FIJA</span>
            <span>✧ TODOS LOS DERECHOS RESERVADOS ✧</span>
            <span className="blink-text">★ HEcho con ♥ en SANTIAGO ★</span>
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