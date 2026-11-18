import { describe, expect, it } from 'vitest';

import { pageModels } from '../../config/navigation';
import { mapPaginas } from './mapper';
import type { PaginaDoc } from './types';

/** Arma un documento de prueba: todo vacío salvo lo que se indique. */
function doc(
  overrides: Partial<PaginaDoc> & Pick<PaginaDoc, 'pageId'>,
): PaginaDoc {
  return {
    resumen: null,
    tags: null,
    seoTitulo: null,
    seoDescripcion: null,
    seoImagenUrl: null,
    ...overrides,
  };
}

describe('mapPaginas', () => {
  it('devuelve una entrada por cada página publicada y ninguna de las borradores', () => {
    const expectedIds = pageModels
      .filter((page) => page.publicationStatus === 'published')
      .map((page) => page.id)
      .sort();

    const result = mapPaginas([]);

    expect(Object.keys(result).sort()).toEqual(expectedIds);
    expect(result).not.toHaveProperty('una-cinta-vuelve-a-girar');
  });

  it('deja las páginas sin documento como no publicadas y vacías', () => {
    const result = mapPaginas([]);

    expect(result['glosario']).toEqual({
      id: 'glosario',
      isPublished: false,
      summary: '',
      tags: [],
      seo: { title: null, description: null, imageUrl: null },
    });
  });

  it('traduce un documento completo a los tipos propios', () => {
    const result = mapPaginas([
      doc({
        pageId: 'vigilar',
        resumen: 'Texto de vigilar',
        tags: ['fotos', 'videos'],
        seoTitulo: 'Vigilar | Una cinta vuelve a girar',
        seoDescripcion: 'Descripción para buscadores',
        seoImagenUrl: 'https://cdn.sanity.io/images/abc/production/foto-1200x630.jpg',
      }),
    ]);

    expect(result['vigilar']).toEqual({
      id: 'vigilar',
      isPublished: true,
      summary: 'Texto de vigilar',
      tags: ['fotos', 'videos'],
      seo: {
        title: 'Vigilar | Una cinta vuelve a girar',
        description: 'Descripción para buscadores',
        imageUrl: 'https://cdn.sanity.io/images/abc/production/foto-1200x630.jpg',
      },
    });
  });

  it('normaliza valores nulos, espacios sobrantes y textos vacíos', () => {
    const result = mapPaginas([
      doc({
        pageId: 'la-prensa',
        resumen: '  Texto con espacios  ',
        tags: ['  fotos ', '', '   '],
        seoTitulo: '   ',
        seoDescripcion: '',
      }),
      doc({ pageId: 'las-madres' }),
    ]);

    expect(result['la-prensa'].summary).toBe('Texto con espacios');
    expect(result['la-prensa'].tags).toEqual(['fotos']);
    expect(result['la-prensa'].seo).toEqual({
      title: null,
      description: null,
      imageUrl: null,
    });

    expect(result['las-madres'].isPublished).toBe(true);
    expect(result['las-madres'].summary).toBe('');
    expect(result['las-madres'].tags).toEqual([]);
  });

  it.each(['no-existe', 'una-cinta-vuelve-a-girar'])(
    'falla con un mensaje claro si el pageId "%s" no es una página publicada',
    (pageId) => {
      expect(() => mapPaginas([doc({ pageId })])).toThrow(pageId);
    },
  );

  it('falla si hay dos documentos para la misma página', () => {
    expect(() =>
      mapPaginas([doc({ pageId: 'la-pelicula' }), doc({ pageId: 'la-pelicula' })]),
    ).toThrow('la-pelicula');
  });
});