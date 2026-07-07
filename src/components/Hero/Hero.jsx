import photo06 from "../../assets/photos/photo06.webp";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <img src={photo06} alt="Luz Fija - Vespucio" className="hero-image" />
        <div className="hero-glitch-overlay"></div>
      </div>
    </section>
  );
}

export default Hero;
