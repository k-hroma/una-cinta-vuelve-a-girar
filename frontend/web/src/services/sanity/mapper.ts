/**Rol: traductor entre lo que devuelve Sanity (PaginaDoc) y los tipos propios del sitio (PagesById). Es una función pura: no consulta nada ni importa librerías de Sanity, por eso se puede probar sin el CMS. */
import { pageModels, type PublishedPage } from '../../config/navigation';
import type { PageData, PageId, PagesById } from '../../types/pagina';
import type { PaginaDoc } from './types';

function isPublishedPage(
  page: (typeof pageModels)[number],
): page is PublishedPage {
  return page.publicationStatus === 'published';
}

const publishedIds: readonly PageId[] = pageModels
  .filter(isPublishedPage)
  .map((page) => page.id);

const publishedIdSet = new Set<string>(publishedIds);

function isPageId(value: string): value is PageId {
  return publishedIdSet.has(value);
}

/** Devuelve el texto sin espacios sobrantes, o null si queda vacío. */
function textOrNull(value: string | null | undefined): string | null {
  const clean = value?.trim();
  return clean ? clean : null;
}

function emptyPage(id: PageId): PageData {
  return {
    id,
    isPublished: false,
    summary: '',
    tags: [],
    seo: { title: null, description: null, imageUrl: null },
  };
}

export function mapPaginas(docs: readonly PaginaDoc[]): PagesById {
  // Parte de una entrada vacía por cada página publicada de navigation.ts, así el resultado
  // siempre tiene todas las claves aunque falte el documento en el CMS.
  const pages = Object.fromEntries(
    publishedIds.map((id) => [id, emptyPage(id)]),
  ) as PagesById;
  const seen = new Set<PageId>();

  for (const doc of docs) {
    if (!isPageId(doc.pageId)) {
      throw new Error(
        `El CMS tiene una página con pageId desconocido: "${doc.pageId}". Revisá que studio/schemaTypes/pageOptions.ts y src/config/navigation.ts tengan las mismas páginas publicadas.`,
      );
    }
    if (seen.has(doc.pageId)) {
      throw new Error(
        `El CMS tiene más de un documento publicado para la página "${doc.pageId}". Hay que dejar solo uno.`,
      );
    }
    seen.add(doc.pageId);

    pages[doc.pageId] = {
      id: doc.pageId,
      isPublished: true,
      summary: doc.resumen?.trim() ?? '',
      tags: (doc.tags ?? []).map((tag) => tag.trim()).filter((tag) => tag !== ''),
      seo: {
        title: textOrNull(doc.seoTitulo),
        description: textOrNull(doc.seoDescripcion),
        imageUrl: textOrNull(doc.seoImagenUrl),
      },
    };
  }

  return pages;
}