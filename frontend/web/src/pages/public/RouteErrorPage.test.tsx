import { renderToStaticMarkup } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
  type RouteObject,
} from 'react-router';
import { describe, expect, it } from 'vitest';

import { ContentUnavailableError } from '../../services';
import RouteErrorPage from './RouteErrorPage';

/** Renderiza la pantalla de error como la vería el visitante cuando falla el loader de la ruta. */
async function renderFailingRoute(loader: () => never, url: string) {
  const routes: RouteObject[] = [
    {
      path: '*',
      loader,
      element: <p>CONTENIDO</p>,
      errorElement: <RouteErrorPage />,
    },
  ];
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${url}`));
  if (context instanceof Response) throw new Error('Se esperaba un contexto, no una respuesta');

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToStaticMarkup(
    <StaticRouterProvider router={router} context={context} hydrate={false} />,
  );
}

describe('RouteErrorPage', () => {
  it('si el CMS no responde, explica el problema y ofrece reintentar en la misma dirección', async () => {
    const html = await renderFailingRoute(() => {
      throw new ContentUnavailableError(new Error('Failed to fetch'));
    }, '/lado-b/las-madres');

    expect(html).toContain('No pudimos cargar el contenido.');
    expect(html).toContain('Reintentar');
    expect(html).toContain('href="/lado-b/las-madres"');
    expect(html).not.toContain('CONTENIDO');
    expect(html).not.toContain('Failed to fetch');
  });

  it('ante cualquier otro error mantiene el mensaje genérico y vuelve al inicio', async () => {
    const html = await renderFailingRoute(() => {
      throw new Error('algo inesperado');
    }, '/lado-b/las-madres');

    expect(html).toContain('Algo salió mal al cargar esta página.');
    expect(html).toContain('Volver al inicio');
    expect(html).toContain('href="/"');
    expect(html).not.toContain('Reintentar');
  });
});