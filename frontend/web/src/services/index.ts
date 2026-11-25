/**Rol: punto de entrada público de la capa de servicios. Los componentes y loaders importan desde acá y nunca desde services/sanity/. */
import type { PaginasService } from './paginasService';
import type { VideoService } from './videoService';
import { createSanityPaginasService } from './sanity/sanityPaginasService';
import { createSanityVideoService } from './sanity/sanityVideoService';

export { ContentUnavailableError } from './errors';
export type { PaginasService } from './paginasService';
export type { VideoService } from './videoService';

/** Servicio real, respaldado por Sanity. El cliente se carga recién en la primera consulta, así importar este archivo no exige las variables de entorno. */
export const paginasService: PaginasService = createSanityPaginasService({
  fetchDocs: async () => {
    const { fetchPaginaDocs } = await import('./sanity/queries');
    return fetchPaginaDocs();
  },
});

/** Servicio de la película, también respaldado por Sanity y con la misma carga diferida. */
export const videoService: VideoService = createSanityVideoService({
  fetchDoc: async () => {
    const { fetchVideoDoc } = await import('./sanity/queries');
    return fetchVideoDoc();
  },
});