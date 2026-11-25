/**Rol: implementación del servicio de video con datos de ejemplo en memoria. Se usa en los tests de componentes y pantallas para no depender del CMS ni de internet. */
import type { Video } from '../../types/video';
import type { VideoService } from '../videoService';

/** Dirección de prueba: no existe, pero tiene la forma de una lista HLS. */
export const FAKE_HLS_URL = 'https://cdn-de-prueba.b-cdn.net/pelicula/playlist.m3u8';

export function createFakeVideoService(
  video: Video | null = { hlsUrl: FAKE_HLS_URL },
): VideoService {
  return {
    async getVideo() {
      return video;
    },
  };
}