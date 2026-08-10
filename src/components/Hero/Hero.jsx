import photo06Hero1080 from "../../assets/hero/photo06_hero_1080.webp";
import photo06Hero664 from "../../assets/hero/photo06_hero_664.webp";
import photo06Hero480 from "../../assets/hero/photo06_hero_480.webp";
import gifNav01 from "../../assets/GIF/gif_nav01.gif";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <img
          src={photo06Hero1080}
          srcSet={`${photo06Hero480} 480w, ${photo06Hero664} 664w, ${photo06Hero1080} 1080w`}
          sizes="(min-width: 1200px) 1080px, 100vw"
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
