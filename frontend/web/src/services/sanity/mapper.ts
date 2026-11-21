/**Rol: traductor entre lo que devuelve Sanity (PaginaDoc) y los tipos propios del sitio (PagesById). Es una función pura: no consulta nada ni importa librerías de Sanity, por eso se puede probar sin el CMS. */
import type { PageId, PagesById, RichParagraph } from '../../types/pagina';
import { createEmptyPages, isPageId } from '../pages';
import type { BlockDoc, PaginaDoc } from './types';

/** Devuelve el texto sin espacios sobrantes, o null si queda vacío. */
function textOrNull(value: string | null | undefined): string | null {
  const clean = value?.trim();
  return clean ? clean : null;
}

/**
 * Convierte los bloques de texto enriquecido de Sanity en párrafos propios.
 * Solo se conserva el texto y si va subrayado: cualquier otra marca se ignora y
 * nunca se genera HTML a partir del CMS. Los datos vienen de la red, por eso se
 * descarta lo que no tenga la forma esperada en lugar de fallar.
 */
function mapRichText(blocks: readonly BlockDoc[] | null): RichParagraph[] {
  return (blocks ?? [])
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children ?? [])
        .filter((child) => child._type === 'span' && child.text !== '')
        .map((child) => ({
          text: child.text,
          underline: (child.marks ?? []).includes('underline'),
        })),
    )
    .filter((paragraph) => paragraph.length > 0);
}

export function mapPaginas(docs: readonly PaginaDoc[]): PagesById {
  // Parte de una entrada vacía por cada página publicada de navigation.ts, así el resultado
  // siempre tiene todas las claves aunque falte el documento en el CMS.
  const pages = createEmptyPages();
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
      projectDescription: mapRichText(doc.descripcionProyecto),
      seo: {
        title: textOrNull(doc.seoTitulo),
        description: textOrNull(doc.seoDescripcion),
        imageUrl: textOrNull(doc.seoImagenUrl),
      },
    };
  }

  return pages;
}
