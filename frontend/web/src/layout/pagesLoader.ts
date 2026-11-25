/**Rol: loader de PagesLayout. React Router lo ejecuta al generar cada página del sitio: pide al servicio el contenido de todas las páginas y se lo entrega al layout, a las etiquetas SEO y a las páginas que lo necesiten. */
import { paginasService, type PaginasService } from '../services';
import type { PagesById } from '../types/pagina';

export type PagesLoaderData = {
  pages: PagesById;
};

export function createPagesLoader(service: PaginasService = paginasService) {
  return async function pagesLoader(): Promise<PagesLoaderData> {
    return { pages: await service.getPaginas() };
  };
}

export const pagesLoader = createPagesLoader();