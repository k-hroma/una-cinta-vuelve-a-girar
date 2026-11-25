import type { Video } from '../types/video';

/**Rol: contrato que usan los componentes y loaders para pedir la película del sitio. No dice de dónde salen los datos (CMS real, datos de prueba, etc.). */
export interface VideoService {
  /**
   * Devuelve la película publicada, o null si todavía no hay ninguna cargada.
   * Si el contenido no se puede obtener, rechaza con un ContentUnavailableError.
   */
  getVideo(): Promise<Video | null>;
}