import photo06 from "../../assets/photos/photo06.webp";
import gifNav01 from "../../assets/GIF/gif_nav01.gif";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <img src={photo06} alt="Luz Fija - Vespucio" className="hero-image" />
        <div className="hero-glitch-overlay"></div>
        <img className="hero-gif" src={gifNav01} alt="" />
      </div>
    </section>
  );
}

export default Hero;
