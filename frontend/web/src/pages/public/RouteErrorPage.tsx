import { isRouteErrorResponse, useRouteError } from 'react-router';
import ActionLink from '../../components/ui/ActionLink';
import Eyebrow from '../../components/ui/Eyebrow';
import '../../styles/pages/public/route-error-page.css';

export default function RouteErrorPage() {
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
        <Eyebrow className="route-error__eyebrow">[ Error ]</Eyebrow>

        <div className="route-error__message">
          <h1 id="route-error-title">{title}</h1>
          <p>{detail}</p>
        </div>

        <ActionLink to="/" className="route-error__link">
          Volver al inicio
        </ActionLink>
      </div>
    </section>
  );
}
