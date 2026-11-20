import { describe, expect, it } from 'vitest';

import { createSanityPaginasService } from './sanityPaginasService';
import type { PaginaDoc } from './types';

const docVigilar: PaginaDoc = {
  pageId: 'vigilar',
  resumen: 'Texto de vigilar',
  tags: ['fotos', 'videos'],
  descripcionProyecto: null,
  seoTitulo: null,
  seoDescripcion: null,
  seoImagenUrl: null,
};

describe('createSanityPaginasService', () => {
  it('traduce los documentos que trae fetchDocs a PagesById', async () => {
    const service = createSanityPaginasService({
      fetchDocs: async () => [docVigilar],
    });

    const pages = await service.getPaginas();

    expect(pages['vigilar'].isPublished).toBe(true);
    expect(pages['vigilar'].summary).toBe('Texto de vigilar');
    expect(pages['vigilar'].tags).toEqual(['fotos', 'videos']);
    expect(pages['glosario'].isPublished).toBe(false);
  });

  it('propaga el error si falla la consulta al CMS', async () => {
    const service = createSanityPaginasService({
      fetchDocs: async () => {
        throw new Error('sin conexión');
      },
    });

    await expect(service.getPaginas()).rejects.toThrow('sin conexión');
  });
});
