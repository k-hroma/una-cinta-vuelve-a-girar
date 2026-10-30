/*router.config.tsx conecta los paths con sus componentes y construye las rutas.*/

import { lazy, type ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { HOME_PATH, getEnabledContentRoutes } from '../config/navigation';
import { RootLayout } from '../layout/RootLayout';
import NotFoundPage from '../pages/public/NotFoundPage';
import { RouteErrorPage } from '../pages/public/RouteErrorPage';

const HomePage = lazy(() => import('../pages/public/HomePage'));
const LaPeliculaPage = lazy(() => import('../pages/public/LadoA/LaPeliculaPage'),);
const VolverAVerPage = lazy(() => import('../pages/public/LadoA/VolverAVerPage'),);
const LaCintaYElSoportePage = lazy(() => import('../pages/public/LadoA/LaCintaYElSoportePage'),);
const MarioCelestinoPage = lazy(() => import('../pages/public/LadoA/MarioCelestinoPage'),);
const GlosarioPage = lazy(() => import('../pages/public/LadoA/GlosarioPage'));
const CuantasMasacresPage = lazy(() => import('../pages/public/LadoA/CuantasMasacresPage'),);
const ConElCuerpoPage = lazy(() => import('../pages/public/LadoA/ConElCuerpoPage'),);

const lazyPages: Record<string, ComponentType> = {
  [HOME_PATH]: HomePage,
  '/lado-a/la-pelicula': LaPeliculaPage,
  '/lado-a/volver-a-ver-escuchar-preguntar': VolverAVerPage,
  '/lado-a/la-cinta-y-el-soporte': LaCintaYElSoportePage,
  '/lado-a/mario-celestino-realizador': MarioCelestinoPage,
  '/lado-a/glosario': GlosarioPage,
  '/lado-a/cuantas-masacres': CuantasMasacresPage,
  '/lado-a/con-el-cuerpo': ConElCuerpoPage,
};

function pageElement(path: string) {
  const Page = lazyPages[path];

  if (!Page) {
    throw new Error(`No hay página lazy registrada para ${path}`);
  }

  return <Page />;
}

function nestedPath(path: string): { parent: string; child: string } | null {
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);

  if (segments.length < 2) {
    return null;
  }

  const [parent, ...rest] = segments;
  return { parent, child: rest.join('/') };
}

function buildSideRoutes(): RouteObject[] {
  const byParent = new Map<string, RouteObject[]>();

  for (const item of getEnabledContentRoutes()) {
    const nested = nestedPath(item.path);

    if (!nested) {
      continue;
    }

    const children = byParent.get(nested.parent) ?? [];
    children.push({
      path: nested.child,
      element: pageElement(item.path),
    });
    byParent.set(nested.parent, children);
  }

  // Padres como /lado-a coinciden sin hijo y dejarían <main> vacío.
  // No hay intro habilitada en ese path: el index muestra 404.
  // /lado-a/desconocido lo cubre el splat hermano, no hace falta * por lado.
  return [...byParent.entries()].map(([parent, children]) => ({
    path: parent,
    children: [
      {
        index: true,
        element: <NotFoundPage />,
      },
      ...children,
    ],
  }));
}

for (const item of getEnabledContentRoutes()) {
  if (!lazyPages[item.path]) {
    throw new Error(`Falta el loader de página para ${item.path}`);
  }
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          {
            index: true,
            element: pageElement(HOME_PATH),
          },
          ...buildSideRoutes(),
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
