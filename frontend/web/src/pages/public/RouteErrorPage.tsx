import { useEffect } from 'react';
import { isRouteErrorResponse, useLocation, useRouteError } from 'react-router';
import ActionLink from '../../components/ui/ActionLink';
import Eyebrow from '../../components/ui/Eyebrow';
import { ContentUnavailableError } from '../../services';
import '../../styles/pages/public/route-error-page.css';

type ErrorMessage = {
  title: string;
  detail: string;
  /** true si tiene sentido ofrecer "Reintentar" en lugar de "Volver al inicio". */
  canRetry: boolean;
};

function describeError(error: unknown): ErrorMessage {
  if (error instanceof ContentUnavailableError) {
    return {
      title: 'No pudimos cargar el contenido.',
      detail: 'Puede ser un problema de conexión. Probá de nuevo en unos segundos.',
      canRetry: true,
    };
  }

  if (isRouteErrorResponse(error)) {
    return {
      title: 'No se pudo abrir esta página.',
      detail: `${error.status} ${error.statusText}`.trim(),
      canRetry: false,
    };
  }

  return {
    title: 'Algo salió mal al cargar esta página.',
    detail: 'Podés volver al inicio e intentarlo de nuevo.',
    canRetry: false,
  };
}

export default function RouteErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const { title, detail, canRetry } = describeError(error);

  // El visitante ve un mensaje simple; el error completo queda en la consola para quien lo investigue.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="route-error" aria-labelledby="route-error-title">
      <div className="route-error__content">
        <Eyebrow className="route-error__eyebrow">[ Error ]</Eyebrow>

        <div className="route-error__message">
          <h1 id="route-error-title">{title}</h1>
          <p>{detail}</p>
        </div>

        {/* Un link a la misma dirección vuelve a ejecutar el loader que falló. */}
        <ActionLink
          to={canRetry ? { pathname: location.pathname, search: location.search } : '/'}
          className="route-error__link"
        >
          {canRetry ? 'Reintentar' : 'Volver al inicio'}
        </ActionLink>
      </div>
    </section>
  );
}