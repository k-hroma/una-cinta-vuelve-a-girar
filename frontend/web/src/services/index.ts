/**Rol: punto de entrada público de la capa de servicios. Los componentes y loaders importan desde acá y nunca desde services/sanity/. */
import type { PaginasService } from './paginasService';
import { createSanityPaginasService } from './sanity/sanityPaginasService';

export type { PaginasService } from './paginasService';

/** Servicio real, respaldado por Sanity. El cliente se carga recién en la primera consulta, así importar este archivo no exige las variables de entorno. */
export const paginasService: PaginasService = createSanityPaginasService({
  fetchDocs: async () => {
    const { fetchPaginaDocs } = await import('./sanity/queries');
    return fetchPaginaDocs();
  },
});