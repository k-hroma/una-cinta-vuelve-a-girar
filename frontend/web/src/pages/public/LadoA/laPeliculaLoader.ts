/**Rol: loader de La película. React Router lo ejecuta al generar la página (y en el servidor de desarrollo): pide al servicio la lista de reproducción HLS y se la entrega al reproductor. */
import { videoService, type VideoService } from '../../../services';
import type { Video } from '../../../types/video';

export type LaPeliculaLoaderData = {
  video: Video | null;
};

export function createLaPeliculaLoader(service: VideoService = videoService) {
  return async function laPeliculaLoader(): Promise<LaPeliculaLoaderData> {
    return { video: await service.getVideo() };
  };
}

export const laPeliculaLoader = createLaPeliculaLoader();