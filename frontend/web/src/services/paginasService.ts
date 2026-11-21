import type { PagesById } from '../types/pagina';

/**Rol: contrato que usan los componentes y loaders para pedir el contenido de las páginas. No dice de dónde salen los datos (CMS real, datos de prueba, etc.). */
export interface PaginasService {
  /**
   * Devuelve todas las páginas publicadas del sitio: siempre trae una entrada por cada una, haya o no documento en el CMS.
   * Si el contenido no se puede obtener, rechaza con un ContentUnavailableError.
   */
  getPaginas(): Promise<PagesById>;
}