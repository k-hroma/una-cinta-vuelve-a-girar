/**Rol: consulta (en GROQ, el lenguaje de Sanity) que trae todos los documentos "pagina" ya aplanados con los nombres de PaginaDoc (ver types.ts). 
 * Es la única parte del sitio que conoce la estructura interna de los documentos. */
import { sanityClient } from './client';
import type { PaginaDoc } from './types';

export const PAGINAS_QUERY = `*[_type == "pagina"] | order(pageId asc) {
  pageId,
  resumen,
  tags,
  "seoTitulo": seo.titulo,
  "seoDescripcion": seo.descripcion,
  "seoImagenUrl": seo.imagen.asset->url
}`;

/** Trae los documentos publicados tal como están en el CMS. Los traduce mapper.ts. */
export function fetchPaginaDocs(): Promise<PaginaDoc[]> {
  return sanityClient.fetch<PaginaDoc[]>(PAGINAS_QUERY);
}