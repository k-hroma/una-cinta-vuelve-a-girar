/**Rol: implementación del servicio de video respaldada por Sanity. Recibe la función que trae el documento en lugar de importarla, así se prueba sin red y no exige variables de entorno al importarse. */
import { ContentUnavailableError } from '../errors';
import type { VideoService } from '../videoService';
import { mapVideo } from './videoMapper';
import type { VideoDoc } from './types';

type Dependencias = {
  fetchDoc: () => Promise<VideoDoc | null>;
};

export function createSanityVideoService({ fetchDoc }: Dependencias): VideoService {
  return {
    async getVideo() {
      try {
        return mapVideo(await fetchDoc());
      } catch (error) {
        // Cualquier falla (red, CMS caído, datos inválidos) llega al sitio como el mismo error; el original queda en `cause`.
        throw new ContentUnavailableError(error);
      }
    },
  };
}