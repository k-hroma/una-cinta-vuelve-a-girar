/**Rol: loader de la ruta de inicio. React Router lo ejecuta antes de mostrar la home: pide al servicio el contenido de todas las páginas y se lo entrega a HomePage. */
import { paginasService, type PaginasService } from '../../services';
import type { PagesById } from '../../types/pagina';

export type HomeLoaderData = {
  pages: PagesById;
};

export function createHomeLoader(service: PaginasService = paginasService) {
  return async function homeLoader(): Promise<HomeLoaderData> {
    return { pages: await service.getPaginas() };
  };
}

export const homeLoader = createHomeLoader();