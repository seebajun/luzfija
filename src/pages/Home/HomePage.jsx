import Hero from "../../components/Hero/Hero";
import Sidebar from "../../components/Sidebar/Sidebar";
import BioCard from "../../components/BioCard/BioCard";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import gifNow01 from "../../assets/GIF/gif_now01.gif";
import gifCool01 from "../../assets/GIF/gif_cool01.gif";
import gifCool02 from "../../assets/GIF/gif_cool02.gif";
import gifFfix01 from "../../assets/GIF/gif_ffix01.gif";
import gifKof01 from "../../assets/GIF/gif_kof01.gif";
import gifNew05 from "../../assets/GIF/gif_new05.gif";
import gifStar01 from "../../assets/GIF/gif_star01.gif";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="y2k-container">
      <Hero />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <BioCard
            title="Pacto"
            dropcapLetter="P"
            gif={gifNew05}
            gifAlign="left"
          >
            Pacto es el segundo adelanto del próximo EP de Luzfija, una canción
            que despliega su faceta más frenética, combinando la intensidad del
            Postpunk con una marcada exploración electrónica, donde los recursos
            de manipulación glitch dialogan con guitarras distorsionadas,
            desembocando en una sonoridad abrasiva y dinámica.
            <br />
            <br />
            Líricamente inspirada en el poema «La palabra», de la poeta chilena
            Stella Díaz Varín, cuya temática gira en torno a la búsqueda
            obsesiva de una palabra oculta, vinculada a un pacto secreto de la
            infancia. El poema recorre la lucha por encontrarla y el triunfo que
            supone su hallazgo, para finalmente desembocar en una sensación de
            frustración y derrota al no encontrarla.
            <br />
            <br />
            'Pacto' articula tanto en lo musical y lírico la urgencia y la lucha
            personal, con una sensación de ansiedad frente al inexorable paso
            del tiempo
            <img
              className="expanded-gif"
              src={gifStar01}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </BioCard>

          <BioCard
            title="Vespucio"
            dropcapLetter="V"
            gif={gifCool02}
            gifAlign="right"
          >
            espucio es el regreso de LuzFija tras años de su EP debut editado en
            2021. El sencillo refleja una evolución tanto sonora como lírica:
            Elementos sintéticos más predominantes, como también guitarras que
            funcionan como una muralla de sonido, todo esto anclado a un beat
            electrónico y una letra que retrata a modo autobiográfico el paso
            del tiempo desde la perspectiva de un trabajador alienado producto
            de su quehacer laboral, poniendo en contradicción sus deseos de
            realizar una vida fuera del trabajo contra la necesidad y obligación
            de estar en este, entregando su vida sin la posibilidad de tener
            espacios personales por fuera. La canción abre con un bombo
            electrónico a modo de cuenta, desmarcandose desde el inicio del
            carácter más acústico y tradicional del trabajo percusivo del EP
            anterior, para luego de golpe entrar la banda completa. Una muralla
            de sonido distorsionado marcando la armonía, mientras el aspecto
            melódico se comparte entre la guitarra y el sintetizador, melodías
            distintas pero con el mismo carácter emocional, repetitivas y
            nostálgicas. Una caja cargada de reverb como tomada directamente de
            los años 80s y un hi-hat quebrado al borde del glitch. Acabada la
            intro las guitarras armónicas desaparecen para dar paso a la voz
            principal, la cual en primera persona va desarrollando el estado
            emocional del protagonista. El beat electrónico se mantiene
            predominante, la guitarra melódica ornamenta mucho más libre que en
            la intro, y en el sintetizador transita a unas clásicas campanas del
            sonido DX7. Llegados al coro las guitarras distorsionadas vuelven a
            aparecer, cubiertas de delay y reverb. Una encargada de la muralla
            armónica mientras el elemento melódico lo toma otra guitarra y el
            sintetizador, quienes tocan sus propias melodías, repetitivas y
            constantes, resaltando el momento lírico del coro, dónde el
            protagonista ve pasar el tiempo sintiéndose impotente sobre poder
            cambiar su propio presente. La canción termina tal como parte pero
            con pequeñas modificaciones menores, el sentimiento de estancamiento
            del protagonista es validado pero con el matiz que no todos los días
            son exactamente el mismo.
            <img
              className="expanded-gif"
              src={gifFfix01}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </BioCard>

          <BioCard title="BIOGRAFÍA" dropcapLetter="L" gif={gifCool01}>
            uzfija se forma en 2020 en la comuna de La Florida, Santiago, a
            partir de la amistad forjada entre cuatro compañeros de trabajo del
            rubro del retail. A fines de 2021, la banda debuta con un EP
            homónimo que explora el formato canción, envuelto en atmósferas
            sonoras propias del Dream Pop y el Shoegaze, sin dejar de lado la
            energía y el filo característicos del Postpunk. En 2024, tras la
            resaca de la pandemia y una serie de vaivenes personales, Luzfija
            inicia una nueva etapa marcada tanto por cambios en su formación
            como por una evolución en su propuesta musical. En este contexto,
            «Vespucio» surge como carta de presentación de esta renovada
            identidad sonora. La banda se adentra en territorios más oscuros y
            electrónicos, recogiendo influencias del Cold Wave y el Rock Gótico,
            pero sin abandonar los elementos del Shoegaze y el Postpunk que
            continúan siendo pilares fundamentales de su propuesta. Actualmente,
            Luzfija se encuentra ad-portas de estrenar su segundo EP, previsto
            para comienzos de 2027. Este nuevo trabajo profundiza en el universo
            sonoro que la banda ha venido desarrollando, expandiendo sus
            fronteras hacia estructuras más experimentales, cercanas al
            Post-Rock, y atmósferas de una oscuridad melódica que recoge
            influencias del Visual Kei japonés, particularmente de bandas como
            Buck-Tick. A su vez, incorpora una dimensión electrónica más
            pronunciada, donde destacan recursos derivados del Glitch producto
            de influencias como el IDM y el Hyperpop, configurando una propuesta
            que transita entre la intensidad, la experimentación y la
            melancolía. En este recorrido, «Pacto», segundo sencillo de adelanto
            del EP, representa una de sus facetas más frenéticas, poniendo en
            relieve la diversidad de matices que atraviesan esta nueva etapa
            creativa.
            <img
              className="expanded-gif expanded-gif-big"
              src={gifKof01}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </BioCard>

          <PhotoGallery />

          <div className="gif-banner">
            <span>
              <img
                src={gifNow01}
                className="gif-now"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <blink>El fan shop une a la familia Chilena</blink>
              <img
                src={gifNow01}
                className="gif-now"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
