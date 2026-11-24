import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

import GlitchPixels from "./components/GlitchPixels/GlitchPixels";
import Header from "./components/Header/Header";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./components/Footer/Footer";

import Fondo03 from "./assets/fondos/Fondo03.webp";
import Fondo03Mobile from "./assets/fondos/Fondo03_480.webp";

function App() {
  const { pathname } = useLocation();
  const isReproductorPage = pathname.replace(/\/+$/, "") === "/reproductor";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-bottom-player", isReproductorPage);
    return () => document.body.classList.remove("no-bottom-player");
  }, [isReproductorPage]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)");
    const setFondo = () => {
      const fondo = isMobile.matches ? Fondo03Mobile : Fondo03;
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
      {!isReproductorPage && <MusicPlayer />}
      <Footer />
    </div>
  );
}

export default App;