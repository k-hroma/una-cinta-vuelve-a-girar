/**Rol: implementación del servicio de páginas respaldada por Sanity. Recibe la función que trae los documentos en lugar de importarla, así se prueba sin red y no exige variables de entorno al importarse. */
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
      return mapPaginas(await fetchDocs());
    },
  };
}