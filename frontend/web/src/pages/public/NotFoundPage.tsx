import { Link } from 'react-router';
import '../../styles/pages/not-found-page.css';

export default function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__content">
        <span className="not-found__eyebrow">[ Error 404 ]</span>

        <span className="not-found__code" aria-hidden="true">
          404
        </span>

        <div className="not-found__message">
          <h1 id="not-found-title">Esta página se perdió en el camino.</h1>
          <p>
            La dirección que intentaste abrir no existe o ya no está disponible.
            Pero todavía hay mucho por descubrir.
          </p>
        </div>

        <Link to="/" className="not-found__link">
          <span>Volver al inicio</span>
          <span className="not-found__arrow" aria-hidden="true">
            →
          </span>
        </Link>

        <span className="not-found__footer">
          NO HAY NADA POR AQUÍ. POR AHORA.
        </span>
      </div>
    </section>
  );
}
