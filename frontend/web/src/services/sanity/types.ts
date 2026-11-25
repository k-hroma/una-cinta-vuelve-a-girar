/**Rol: forma de los documentos de Sanity ("pagina" y "video") tal como los devuelven las consultas (ver queries.ts). Es el único lugar que conoce los nombres de campos del CMS; el resto del sitio usa los tipos de src/types/. Sanity devuelve null en los campos vacíos. */

/** Un tramo de texto de un bloque de texto enriquecido (Portable Text). `marks` lista los decoradores aplicados, por ejemplo "underline". */
export type SpanDoc = {
  _type: string;
  text: string;
  marks: string[] | null;
};

/** Un bloque (párrafo) de texto enriquecido. */
export type BlockDoc = {
  _type: string;
  children: SpanDoc[] | null;
};

export type PaginaDoc = {
  pageId: string;
  resumen: string | null;
  tags: string[] | null;
  descripcionProyecto: BlockDoc[] | null;
  seoTitulo: string | null;
  seoDescripcion: string | null;
  seoImagenUrl: string | null;
};

/** Documento "video": la película del sitio. Solo guarda la lista de reproducción; el resto de los datos vive en el sitio. */
export type VideoDoc = {
  urlHls: string | null;
};