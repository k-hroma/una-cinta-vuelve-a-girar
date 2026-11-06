/*
Rol: construye el árbol de rutas a partir de navigation.ts y lo convierte en un router.
Exporta: routes (array de RouteObject) y router (resultado de createBrowserRouter).
*/

import { lazy, type ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import {
  HOME_PATH,
  derivePath,
  type PublishedPage,
  getPublishedContentRoutes,
  getPublishedPages,
} from '../config/navigation';
import RootLayout from '../layout/RootLayout';
import NotFoundPage from '../pages/public/NotFoundPage';
import RouteErrorPage from '../pages/public/RouteErrorPage';

// lazy(() => import(...)) hace code splitting: el código de cada página se descarga recién cuando se la visita. 
// Mientras tanto, el <Suspense> de RootLayout muestra el spinner.

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


const LosHechosPage = lazy(() => import('../pages/public/LadoB/LosHechosPage'));
const LoQueEscucharonPage = lazy(() => import('../pages/public/LadoB/LoQueEscucharonPage'));
const VigilarPage = lazy(() => import('../pages/public/LadoB/VigilarPage'));
const OrganizarsePage = lazy(() => import('../pages/public/LadoB/OrganizarsePage'));
const LasPericiasPage = lazy(() => import('../pages/public/LadoB/LasPericiasPage'));
const LaPrensaPage = lazy(() => import('../pages/public/LadoB/LaPrensaPage'));
const LasMadresPage = lazy(() => import('../pages/public/LadoB/LasMadresPage'));
const LosChicosMuertosPage = lazy(() => import('../pages/public/LadoB/LosChicosMuertosPage'));

//Lado C


// Al agregar una página publicada, asociá su id al loader correspondiente aquí.
// Record<PublishedPage['id'], ...> exige exactamente una entrada por cada id publicado en navigation.ts:
// si falta una o sobra una, tsc falla.Es una red de seguridad de tipos.

const lazyPagesById: Record<PublishedPage['id'], ComponentType> = {
  home: HomePage,
  'la-pelicula': LaPeliculaPage,
  'volver-a-ver': VolverAVerPage,
  'la-cinta-y-el-soporte': LaCintaYElSoportePage,
  'mario-celestino': MarioCelestinoPage,
  glosario: GlosarioPage,
  'cuantas-masacres': CuantasMasacresPage,
  'con-el-cuerpo': ConElCuerpoPage,
  'los-hechos': LosHechosPage,
  'lo-que-escucharon': LoQueEscucharonPage,
  vigilar: VigilarPage,
  organizarse: OrganizarsePage,
  'las-pericias': LasPericiasPage,
  'la-prensa': LaPrensaPage,
  'las-madres': LasMadresPage,
  'los-chicos-muertos': LosChicosMuertosPage,

};

// Recibe un id, busca el componente en el diccionario y devuelve <Page />, es decir, el elemento listo para poner en una ruta.
function pageElement(id: string) {
  const Page = lazyPagesById[id as PublishedPage['id']];

  if (!Page) {
    throw new Error(`No hay página lazy registrada para el id ${id}`);
  }

  return <Page />;
}

// separar una ruta URL en una parte principal (parent) y una parte secundaria (child). Si la ruta no tiene al menos dos segmentos, devuelve null.
function nestedPath(path: string): { parent: string; child: string } | null {
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);

  if (segments.length < 2) {
    return null;
  }

  const [parent, ...rest] = segments;
  return { parent, child: rest.join('/') };
}

// Objetivo: que las URLs queden anidadas, o sea una ruta lado-a que contenga sus hijas.
function buildSideRoutes(): RouteObject[] {
  const byParent = new Map<string, RouteObject[]>();

  for (const item of getPublishedContentRoutes()) {
    const nested = nestedPath(derivePath(item));

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

const publishedPages = getPublishedPages();

/*
Son tres alarmas:

Toda página publicada tiene su componente.
Todo componente registrado corresponde a una página publicada.
Existe una página que cae en /.
*/

for (const item of publishedPages) {
  if (!(item.id in lazyPagesById)) {
    throw new Error(`Falta el loader de página para ${item.id} (${derivePath(item)})`);
  }
}

for (const id of Object.keys(lazyPagesById)) {
  if (!publishedPages.some((item) => item.id === id)) {
    throw new Error(`El loader ${id} no corresponde a una página publicada`);
  }
}

const homeRoute = publishedPages.find((item) => derivePath(item) === HOME_PATH);

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
