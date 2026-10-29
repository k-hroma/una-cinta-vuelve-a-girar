import { createBrowserRouter, type RouteObject } from "react-router";
import { RootLayout } from "../layout/RootLayout";
import { PageWrapper } from "../common/PageWrapper";

import { lazy } from "react";

// Páginas públicas (lazy loading)

const HomePage = lazy(() => import('../pages/public/HomePage'));
const LaPeliculaPage = lazy(() => import('../pages/public/LadoA/LaPeliculaPage'));
const VolverAVerPage = lazy(() => import('../pages/public/LadoA/VolverAVerPage'));
const LaCintaYElSoportePage = lazy(() => import('../pages/public/LadoA/LaCintaYElSoportePage'));
const MarioCelestinoPage = lazy(() => import('../pages/public/LadoA/MarioCelestinoPage'));
const GlosarioPage = lazy(() => import('../pages/public/LadoA/GlosarioPage'));
const CuantasMasacresPage = lazy(() => import('../pages/public/LadoA/CuantasMasacresPage'));
const ConElCuerpoPage = lazy(() => import('../pages/public/LadoA/ConElCuerpoPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));


export const routes: RouteObject[] = [{
  path: "/",
  element: <RootLayout />,
  children: [
    {
      index: true,
      element: (
        <PageWrapper>
          <HomePage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/la-pelicula',
      element: (
        <PageWrapper>
          <LaPeliculaPage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/volver-a-ver-escuchar-preguntar',
      element: (
        <PageWrapper>
          <VolverAVerPage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/la-cinta-y-el-soporte',
      element: (
        <PageWrapper>
          <LaCintaYElSoportePage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/mario-celestino-realizador',
      element: (
        <PageWrapper>
          <MarioCelestinoPage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/glosario',
      element: (
        <PageWrapper>
          <GlosarioPage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/cuantas-masacres',
      element: (
        <PageWrapper>
          <CuantasMasacresPage />
        </PageWrapper>
      ),
    },
    {
      path: 'lado-a/con-el-cuerpo',
      element: (
        <PageWrapper>
          <ConElCuerpoPage />
        </PageWrapper>
      ),
    },
    {
      path: '*',
      element: (
        <PageWrapper>
          <NotFoundPage />
        </PageWrapper>
      ),
    },
  ]
}];

export const router = createBrowserRouter(routes);