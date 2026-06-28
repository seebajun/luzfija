import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="y2k-header">
      <div className="band-name">
        <Link to="/" className="band-link">
          <h1 className="glitch-text" data-text="LUZ FIJA">
            LUZ FIJA
          </h1>
        </Link>
        <p className="single-title">「 VESPUCIO 」</p>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-btn">HOME</Link>
        <Link to="/gear" className="nav-btn">GEAR</Link>
        <a
          href="https://www.instagram.com/luz.fija/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn instagram"
        >
          INSTAGRAM
        </a>
        <a
          href="https://www.youtube.com/@luzfija"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn youtube"
        >
          YOUTUBE
        </a>
        <a
          href="https://open.spotify.com/intl-es/artist/6ZfDBdI1pxX9WDPW4ClMx9"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn spotify"
        >
          SPOTIFY (🤢)
        </a>
      </nav>
    </header>
  );
}

export default Header;
