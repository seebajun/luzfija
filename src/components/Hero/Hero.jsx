import photo06 from "../../assets/photos/photo06_hero.webp";
import photo06Hero1080 from "../../assets/photos/photo06_hero_1080.webp";
import photo06Hero768 from "../../assets/photos/photo06_hero_768.webp";
import gifNav01 from "../../assets/GIF/gif_nav01.gif";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <img
          src={photo06}
          srcSet={`${photo06Hero768} 768w, ${photo06Hero1080} 1080w, ${photo06} 1400w`}
          sizes="(min-width: 1200px) 1090px, 100vw"
          alt="Luz Fija - Vespucio"
          className="hero-image"
          fetchPriority="high"
        />
        <div className="hero-glitch-overlay"></div>
        <img className="hero-gif" src={gifNav01} alt="" />
      </div>
    </section>
  );
}

export default Hero;
