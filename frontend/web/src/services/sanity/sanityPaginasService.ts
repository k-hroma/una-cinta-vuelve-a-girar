/**Rol: implementación del servicio de páginas respaldada por Sanity. Recibe la función que trae los documentos en lugar de importarla, así se prueba sin red y no exige variables de entorno al importarse. */
import { ContentUnavailableError } from '../errors';
import type { PaginasService } from '../paginasService';
import { mapPaginas } from './mapper';
import type { PaginaDoc } from './types';

type Dependencias = {
  fetchDocs: () => Promise<PaginaDoc[]>;
};

export function createSanityPaginasService({
  fetchDocs,
}: Dependencias): PaginasService {
  return {
    async getPaginas() {
      try {
        return mapPaginas(await fetchDocs());
      } catch (error) {
        // Cualquier falla (red, CMS caído, datos inválidos) llega al sitio como el mismo error; el original queda en `cause`.
        throw new ContentUnavailableError(error);
      }
    },
  };
}