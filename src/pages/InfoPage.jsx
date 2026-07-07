import "./InfoPage.css";

function InfoPage() {
  return (
    <div className="y2k-container">
      <section className="hero">
        <h1 className="glitch-text" data-text="INFO">
          INFO
        </h1>
        <p className="single-title">「 LUZ FIJA 」</p>
      </section>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="news-card">
            <h3 className="section-title cyan">🎸 LA BANDA</h3>
            <ul className="discography">
              <li>Ariel — Voz / Guitarra / Sintes / Secuencias</li>
              <li>Gonzalo — Sintetizadores</li>
              <li>Guillermo Palma — Guitarra</li>
              <li>Alejandro — Bajo</li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <div className="bio-card">
            <h2 className="section-title magenta">BIOGRAFÍA</h2>
            <p>
              Luz Fija es una banda chilena formada en Santiago, comuna de La Florida, en el año 2020.
              Su sonido fusiona rock, sintetizadores y texturas electrónicas, creando una atmósfera
              única que han denominado como "rock sintético".
            </p>
            <p>
              Su primer EP homónimo fue lanzado de forma independiente, seguido por el single
              "Vespucio" que marcó una evolución en su propuesta sonora.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InfoPage;
