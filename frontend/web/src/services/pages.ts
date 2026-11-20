/**Rol: lo básico que comparten todas las implementaciones del servicio de páginas: la lista de páginas publicadas y cómo se ve una página vacía. Sale de navigation.ts, no depende de ningún CMS. */
import { pageModels, type PublishedPage } from '../config/navigation';
import type { PageData, PageId, PagesById } from '../types/pagina';

function isPublishedPage(
  page: (typeof pageModels)[number],
): page is PublishedPage {
  return page.publicationStatus === 'published';
}

export const publishedPageIds: readonly PageId[] = pageModels
  .filter(isPublishedPage)
  .map((page) => page.id);

const publishedPageIdSet = new Set<string>(publishedPageIds);

export function isPageId(value: string): value is PageId {
  return publishedPageIdSet.has(value);
}

export function createEmptyPage(id: PageId): PageData {
  return {
    id,
    isPublished: false,
    summary: '',
    tags: [],
    projectDescription: [],
    seo: { title: null, description: null, imageUrl: null },
  };
}

/** Una entrada vacía por cada página publicada: así el resultado siempre tiene todas las claves. */
export function createEmptyPages(): PagesById {
  return Object.fromEntries(
    publishedPageIds.map((id) => [id, createEmptyPage(id)]),
  ) as PagesById;
}
