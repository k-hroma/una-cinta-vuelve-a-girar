import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import '../../styles/pages/route-error-page.css';

export function RouteErrorPage() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? 'No se pudo abrir esta página.'
    : 'Algo salió mal al cargar esta página.';

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`.trim()
    : 'Podés volver al inicio e intentarlo de nuevo.';

  return (
    <section className="route-error" aria-labelledby="route-error-title">
      <div className="route-error__content">
        <span className="route-error__eyebrow">[ Error ]</span>

        <div className="route-error__message">
          <h1 id="route-error-title">{title}</h1>
          <p>{detail}</p>
        </div>

        <Link to="/" className="route-error__link">
          <span>Volver al inicio</span>
          <span className="route-error__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
