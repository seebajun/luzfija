import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import BioCard from "./components/BioCard";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="y2k-container">
      <Header />

      <Hero />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <BioCard title="BIOGRAFÍA" dropcapLetter="L">
            uzFija es una banda Chilena
            formada en Santiago, comuna de La Florida, en el año 2020 por 4
            amigos que coinciden en un trabajo de retail en un centro
            comercial de la capital. A fines de 2021 debutan con su EP
            homónimo, trabajo que movieron en espacios limitados y que tuvo
            una cálida recepción, marcado por atmósferas DreamPop y Shoegaze
            como también el filo y energía del Post Punk. Luego de un periodo
            de inactividad debido a la pandemia, sumado al ir y venir
            personal, el proyecto se reactiva en 2024 con pequeños cambios de
            integrantes y nuevas composiciones, con un foco sónico evolutivo
            respecto a su trabajo anterior. Es así como ‘Vespucio’ se erige
            como carta de presentación de este nuevo proceso, acudiendo a una
            sonoridad más oscura, heredera del cold wave y el rock gótico, sin
            abandonar el Shoegaze ni el Post Punk, elementos que siguen siendo
            pilares de la propuesta. Actualmente la banda se encuentra
            trabajando en su disco debut, abarcando un espectro más amplio de
            influencias a las ya mencionadas, destacando los elementos
            electrónicos glitch tipo hyper-pop, sonoridades oscuras
            referenciadas de bandas visual kei como Buck-Thick y estructuras
            compositivas cercanas al post-rock.
          </BioCard>

          <BioCard title="Vespucio" dropcapLetter="V">
            espucio es el regreso de LuzFija
            tras años de su EP debut editado en 2021. El sencillo refleja una
            evolución tanto sonora como lírica: Elementos sintéticos más
            predominantes, como también guitarras que funcionan como una
            muralla de sonido, todo esto anclado a un beat electrónico y una
            letra que retrata a modo autobiográfico el paso del tiempo desde
            la perspectiva de un trabajador alienado producto de su quehacer
            laboral, poniendo en contradicción sus deseos de realizar una vida
            fuera del trabajo contra la necesidad y obligación de estar en
            este, entregando su vida sin la posibilidad de tener espacios
            personales por fuera. La canción abre con un bombo electrónico a
            modo de cuenta, desmarcandose desde el inicio del carácter más
            acústico y tradicional del trabajo percusivo del EP anterior, para
            luego de golpe entrar la banda completa. Una muralla de sonido
            distorsionado marcando la armonía, mientras el aspecto melódico se
            comparte entre la guitarra y el sintetizador, melodías distintas
            pero con el mismo carácter emocional, repetitivas y nostálgicas.
            Una caja cargada de reverb como tomada directamente de los años
            80s y un hi-hat quebrado al borde del glitch. Acabada la intro las
            guitarras armónicas desaparecen para dar paso a la voz principal,
            la cual en primera persona va desarrollando el estado emocional
            del protagonista. El beat electrónico se mantiene predominante, la
            guitarra melódica ornamenta mucho más libre que en la intro, y en
            el sintetizador transita a unas clásicas campanas del sonido DX7.
            Llegados al coro las guitarras distorsionadas vuelven a aparecer,
            cubiertas de delay y reverb. Una encargada de la muralla armónica
            mientras el elemento melódico lo toma otra guitarra y el
            sintetizador, quienes tocan sus propias melodías, repetitivas y
            constantes, resaltando el momento lírico del coro, dónde el
            protagonista ve pasar el tiempo sintiéndose impotente sobre poder
            cambiar su propio presente. La canción termina tal como parte pero
            con pequeñas modificaciones menores, el sentimiento de
            estancamiento del protagonista es validado pero con el matiz que
            no todos los días son exactamente el mismo.
          </BioCard>

          <MusicPlayer />

          <div className="gif-banner">
            <span>⚡ BEST VIEWED WITH 1024x768 ⚡</span>
            <span>
              🐱 <blink>NOW HIRING WEBMASTERS</blink> 🐱
            </span>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
