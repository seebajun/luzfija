import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./pages/Gear.css";

import GlitchPixels from "./components/GlitchPixels";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <GlitchPixels />
      <Header />
      <Outlet />
      <MusicPlayer />
      <Footer />
    </>
  );
}

export default App;
