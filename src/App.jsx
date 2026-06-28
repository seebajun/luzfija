import { Outlet } from "react-router-dom";
import "./App.css";
import "./pages/Gear.css";

import GlitchPixels from "./components/GlitchPixels";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlitchPixels />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
