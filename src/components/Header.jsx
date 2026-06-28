function Header() {
  return (
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
  );
}

export default Header;
