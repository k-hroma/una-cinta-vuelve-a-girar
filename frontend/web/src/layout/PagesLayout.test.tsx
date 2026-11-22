import { renderToStaticMarkup } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
  type RouteObject,
} from 'react-router';
import { describe, expect, it } from 'vitest';

import { ContentUnavailableError } from '../services';
import * as pagesLayout from './PagesLayout';

/** Renderiza una página cuyo loader falla, dentro del layout real, como la vería el visitante. */
async function renderPageWithFailingLoader(error: Error) {
  const routes: RouteObject[] = [
    {
      path: '/',
      Component: pagesLayout.default,
      ErrorBoundary: pagesLayout.ErrorBoundary,
      children: [
        {
          index: true,
          loader: () => {
            throw error;
          },
          Component: () => <p>CONTENIDO</p>,
        },
      ],
    },
  ];
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request('http://localhost/'));
  if (context instanceof Response) throw new Error('Se esperaba un contexto, no una respuesta');

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToStaticMarkup(
    <StaticRouterProvider router={router} context={context} hydrate={false} />,
  );
}

describe('PagesLayout', () => {
  it('si falla el contenido de una página, muestra el error con reintento en lugar de la página', async () => {
    const html = await renderPageWithFailingLoader(
      new ContentUnavailableError(new Error('sin conexión')),
    );

    expect(html).toContain('No pudimos cargar el contenido.');
    expect(html).toContain('Reintentar');
    expect(html).not.toContain('CONTENIDO');
  });

  it('ante un error inesperado muestra el mensaje genérico', async () => {
    const html = await renderPageWithFailingLoader(new Error('algo inesperado'));

    expect(html).toContain('Algo salió mal al cargar esta página.');
  });
});