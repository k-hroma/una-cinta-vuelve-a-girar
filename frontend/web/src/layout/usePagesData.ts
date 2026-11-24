/**Rol: permite a cualquier página leer el contenido de todas las páginas que cargó el loader de PagesLayout. */
import { useRouteLoaderData } from 'react-router';
import type { PagesLoaderData } from './pagesLoader';

/** Identificador de la ruta de PagesLayout: React Router lo arma con el archivo (ver routes.ts). */
export const PAGES_LAYOUT_ID = 'layout/PagesLayout';

export function usePagesData(): PagesLoaderData {
  const data = useRouteLoaderData<PagesLoaderData>(PAGES_LAYOUT_ID);

  if (!data) {
    throw new Error('usePagesData solo se puede usar dentro de PagesLayout.');
  }

  return data;
}