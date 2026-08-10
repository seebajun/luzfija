import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Luzfija_Logo.webp";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setScrolled(true);
      else if (window.scrollY < 60) setScrolled(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = headerRef.current;
      if (!el) return;
      const hadScrolled = el.classList.contains("scrolled");
      const prevTransition = el.style.transition;
      el.style.transition = "none";
      if (hadScrolled) el.classList.remove("scrolled");
      const h = el.offsetHeight;
      if (hadScrolled) el.classList.add("scrolled");
      el.style.transition = prevTransition;
      document.documentElement.style.setProperty("--real-header-h", `${h}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`y2k-header${scrolled ? " scrolled" : ""}`}
    >
      <div className="band-name">
        <Link to="/" className="band-link">
          <img src={logo} alt="Luz Fija" className="header-logo" />
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
