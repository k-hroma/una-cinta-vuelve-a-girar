import ActionLink from '../../components/ui/ActionLink';
import Eyebrow from '../../components/ui/Eyebrow';
import '../../styles/pages/public/not-found-page.css';

export default function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__content">
        <Eyebrow className="not-found__eyebrow">[ Error 404 ]</Eyebrow>

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

        <ActionLink to="/" className="not-found__link">
          Volver al inicio
        </ActionLink>

        <span className="not-found__footer">
          NO HAY NADA POR AQUÍ. POR AHORA.
        </span>
      </div>
    </section>
  );
}
