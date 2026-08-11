import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

import GlitchPixels from "./components/GlitchPixels/GlitchPixels";
import Header from "./components/Header/Header";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./components/Footer/Footer";

import Fondo01 from "./assets/fondos/Fondo01.webp";
import Fondo02 from "./assets/fondos/Fondo02.webp";
import Fondo01Mobile from "./assets/fondos/Fondo01_480.webp";
import Fondo02Mobile from "./assets/fondos/Fondo02_480.webp";

const FONDOS = [Fondo01, Fondo02];
const FONDOS_MOBILE = [Fondo01Mobile, Fondo02Mobile];

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)");
    const setFondo = () => {
      const pool = isMobile.matches ? FONDOS_MOBILE : FONDOS;
      const fondo = pool[Math.floor(Math.random() * pool.length)];
      document.getElementById("root").style.backgroundImage = `url("${fondo}")`;
    };
    setFondo();
    isMobile.addEventListener("change", setFondo);
    return () => isMobile.removeEventListener("change", setFondo);
  }, []);

  return (
    <div className="app-layout">
      <GlitchPixels />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;