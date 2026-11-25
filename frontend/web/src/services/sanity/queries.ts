/**Rol: consultas (en GROQ, el lenguaje de Sanity) que traen los documentos del CMS ya aplanados con los nombres de PaginaDoc y VideoDoc (ver types.ts). Es la única parte del sitio que conoce la estructura interna de los documentos. */
import { sanityClient } from './client';
import type { PaginaDoc, VideoDoc } from './types';

export const PAGINAS_QUERY = `*[_type == "pagina"] | order(pageId asc) {
  pageId,
  resumen,
  tags,
  descripcionProyecto,
  "seoTitulo": seo.titulo,
  "seoDescripcion": seo.descripcion,
  "seoImagenUrl": seo.imagen.asset->url
}`;

/** Trae los documentos publicados tal como están en el CMS. Los traduce mapper.ts. */
export function fetchPaginaDocs(): Promise<PaginaDoc[]> {
  return sanityClient.fetch<PaginaDoc[]>(PAGINAS_QUERY);
}

export const VIDEO_QUERY = `*[_type == "video"] | order(_updatedAt desc) [0] {
  urlHls
}`;

/** Trae el documento de la película publicado, o null si todavía no hay ninguno. Lo traduce videoMapper.ts. */
export function fetchVideoDoc(): Promise<VideoDoc | null> {
  return sanityClient.fetch<VideoDoc | null>(VIDEO_QUERY);
}