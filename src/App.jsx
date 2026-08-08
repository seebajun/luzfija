import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

import GlitchPixels from "./components/GlitchPixels/GlitchPixels";
import Header from "./components/Header/Header";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./components/Footer/Footer";

import Fondo01 from "./assets/logo/Fondo01.webp";
import Fondo02 from "./assets/logo/Fondo02.webp";

const FONDOS = [Fondo01, Fondo02];

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fondo = FONDOS[Math.floor(Math.random() * FONDOS.length)];
    document.body.style.backgroundImage = `url("${fondo}")`;
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
