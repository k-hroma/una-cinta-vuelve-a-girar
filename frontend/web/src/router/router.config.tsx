/*router.config.tsx conecta los paths con sus componentes y construye las rutas.*/

import { lazy, type ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import {
  HOME_PATH,
  type EnabledNavItem,
  getEnabledContentRoutes,
  navItems,
} from '../config/navigation';
import RootLayout from '../layout/RootLayout';
import NotFoundPage from '../pages/public/NotFoundPage';
import RouteErrorPage from '../pages/public/RouteErrorPage';


// Lado A
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LaPeliculaPage = lazy(() => import('../pages/public/LadoA/LaPeliculaPage'),);
const VolverAVerPage = lazy(() => import('../pages/public/LadoA/VolverAVerPage'),);
const LaCintaYElSoportePage = lazy(() => import('../pages/public/LadoA/LaCintaYElSoportePage'),);
const MarioCelestinoPage = lazy(() => import('../pages/public/LadoA/MarioCelestinoPage'),);
const GlosarioPage = lazy(() => import('../pages/public/LadoA/GlosarioPage'));
const CuantasMasacresPage = lazy(() => import('../pages/public/LadoA/CuantasMasacresPage'),);
const ConElCuerpoPage = lazy(() => import('../pages/public/LadoA/ConElCuerpoPage'),);

//Lado B

const ElMundoEnElQueOcurrio = lazy(() => import('../pages/public/LadoB/ElMundoEnElQueOcurrio'));
const LosHechos = lazy(() => import('../pages/public/LadoB/LosHechos'));
const LoQueEscucharon = lazy(() => import('../pages/public/LadoB/LoQueEscucharon'));
const Vigilar = lazy(() => import('../pages/public/LadoB/Vigilar'));
const Organizarse = lazy(() => import('../pages/public/LadoB/Organizarse'));
const LasPericias = lazy(() => import('../pages/public/LadoB/LasPericias'));
const LaPrensa = lazy(() => import('../pages/public/LadoB/LaPrensa'));
const LasMadres = lazy(() => import('../pages/public/LadoB/LasMadres'));
const LosChicosMuertos = lazy(() => import('../pages/public/LadoB/LosChicosMuertos'));

//Lado C

const FabulacionesYCreacionesPersonales = lazy(() => import('../pages/public/LadoC/FabulacionesYCreacionesPersonales'));

type EnabledRouteId = EnabledNavItem['id'];

// Al agregar una ruta habilitada, definí su path en navItems y asociá su id a un loader aquí.
// El tipo detecta loaders faltantes o sobrantes al compilar; deshabilitar una ruta requiere quitar su loader.
const lazyPagesById: Record<EnabledRouteId, ComponentType> = {
  home: HomePage,
  'la-pelicula': LaPeliculaPage,
  'volver-a-ver': VolverAVerPage,
  'la-cinta-y-el-soporte': LaCintaYElSoportePage,
  'mario-celestino': MarioCelestinoPage,
  glosario: GlosarioPage,
  'cuantas-masacres': CuantasMasacresPage,
  'con-el-cuerpo': ConElCuerpoPage,
  'el-mundo-en-el-que-ocurrio': ElMundoEnElQueOcurrio,
  'los-hechos': LosHechos,
  'lo-que-escucharon': LoQueEscucharon,
  vigilar: Vigilar,
  organizarse: Organizarse,
  'las-pericias': LasPericias,
  'la-prensa': LaPrensa,
  'las-madres': LasMadres,
  'los-chicos-muertos': LosChicosMuertos,
  fabulaciones: FabulacionesYCreacionesPersonales,
};

function pageElement(id: EnabledRouteId) {
  const Page = lazyPagesById[id];

  if (!Page) {
    throw new Error(`No hay página lazy registrada para el id ${id}`);
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
      element: pageElement(item.id),
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

const enabledRoutes = navItems.filter(
  (item): item is EnabledNavItem => item.enabled,
);

for (const item of enabledRoutes) {
  if (!lazyPagesById[item.id]) {
    throw new Error(`Falta el loader de página para ${item.id} (${item.path})`);
  }
}

for (const id of Object.keys(lazyPagesById)) {
  if (!enabledRoutes.some((item) => item.id === id)) {
    throw new Error(`El loader ${id} no corresponde a una ruta habilitada`);
  }
}

const homeRoute = enabledRoutes.find((item) => item.path === HOME_PATH);

if (!homeRoute) {
  throw new Error(`No hay una ruta de inicio habilitada para ${HOME_PATH}`);
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
            element: pageElement(homeRoute.id),
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
