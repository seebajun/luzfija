import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Luzfija_Logo.webp";
import logo284 from "../../assets/logo/Luzfija_Logo_284.webp";
import logo166 from "../../assets/logo/Luzfija_Logo_166.webp";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 160) setScrolled(true);
      else if (window.scrollY < 60) setScrolled(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`y2k-header${scrolled ? " scrolled" : ""}`}>
      <div className="band-name">
        <Link to="/" className="band-link">
          <img
            src={logo}
            srcSet={`${logo166} 166w, ${logo284} 284w, ${logo} 475w`}
            sizes="(min-width: 768px) 237px, 95px"
            alt="Luz Fija"
            className="header-logo"
          />
        </Link>
        <p className="single-title">「 VESPUCIO 」</p>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-btn home-nav">HOME</Link>
        <Link to="/gear" className="nav-btn gear-nav">GEAR</Link>
        <Link to="/contacto" className="nav-btn contacto-nav">CONTACTO</Link>
        <a
          href="https://www.instagram.com/luz.fija/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn instagram"
        >
          INSTA
        </a>
        <a
          href="https://www.youtube.com/@luzfija"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn youtube"
        >
          YT
        </a>
        <a
          href="https://open.spotify.com/intl-es/artist/6ZfDBdI1pxX9WDPW4ClMx9"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn spotify"
        >
          SPF
        </a>
      </nav>
    </header>
  );
}

export default Header;
