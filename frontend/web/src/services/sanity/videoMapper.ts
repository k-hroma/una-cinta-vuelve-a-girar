/**Rol: traductor entre el documento "video" de Sanity (VideoDoc) y el tipo propio (Video). Es una función pura: no consulta nada ni importa librerías de Sanity, por eso se puede probar sin el CMS. */
import type { Video } from '../../types/video';
import type { VideoDoc } from './types';

/** Devuelve la película con la dirección limpia, o null si no hay dirección cargada. */
export function mapVideo(doc: VideoDoc | null): Video | null {
  const hlsUrl = doc?.urlHls?.trim();
  return hlsUrl ? { hlsUrl } : null;
}