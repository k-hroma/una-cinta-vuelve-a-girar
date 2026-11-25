/**Rol: ruta sin dirección propia que envuelve todas las páginas del sitio. Carga el contenido del CMS una vez por página, arma las etiquetas SEO de cada una y atrapa los errores de cualquier página para mostrarlos dentro del layout, con el menú y el pie a la vista. */
import { Outlet } from 'react-router';
import { SITE_NAME } from '../config/site';
import RouteErrorPage from '../pages/public/RouteErrorPage';
import { buildPageMeta } from '../seo/buildPageMeta';
import type { Route } from './+types/PagesLayout';
import { pagesLoader } from './pagesLoader';

export const loader = pagesLoader;

// Vale para todas las páginas hijas que no definan su propio `meta`. Si el contenido no cargó, queda solo el título del sitio.
export function meta({ loaderData, location }: Route.MetaArgs) {
  return loaderData
    ? buildPageMeta(loaderData.pages, location.pathname)
    : [{ title: SITE_NAME }];
}

export default function PagesLayout() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <RouteErrorPage />;
}