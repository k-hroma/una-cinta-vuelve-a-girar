import type { PublishedPage } from '../config/navigation';

/** Id de una página publicada del sitio (el mismo que usa navigation.ts). */
export type PageId = PublishedPage['id'];

/** Datos de SEO de una página. `null` significa "no cargado": el sitio usa un valor de respaldo. */
export type PageSeo = {
  title: string | null;
  description: string | null;
  /** URL absoluta de la imagen para compartir, o null si no hay. */
  imageUrl: string | null;
};

/** Contenido editorial de una página, tal como lo usan los componentes. */
export type PageData = {
  id: PageId;
  /** true si el CMS tiene un documento publicado para esta página. */
  isPublished: boolean;
  /** Texto breve que se muestra en los índices. Vacío si la página no tiene documento. */
  summary: string;
  /** Palabras clave. Lista vacía si no hay. */
  tags: string[];
  seo: PageSeo;
};

/** Todas las páginas publicadas del sitio, indexadas por id. */
export type PagesById = Record<PageId, PageData>;