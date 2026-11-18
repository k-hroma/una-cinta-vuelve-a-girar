/**Rol: forma de los documentos "pagina" tal como los devuelve la consulta a Sanity (ver queries.ts). Es el único lugar que conoce los nombres de campos del CMS; el resto del sitio usa los tipos de src/types/. Sanity devuelve null en los campos vacíos. */
export type PaginaDoc = {
  pageId: string;
  resumen: string | null;
  tags: string[] | null;
  seoTitulo: string | null;
  seoDescripcion: string | null;
  seoImagenUrl: string | null;
};