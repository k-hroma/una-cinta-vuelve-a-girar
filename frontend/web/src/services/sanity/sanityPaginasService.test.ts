import { describe, expect, it } from 'vitest';

import { ContentUnavailableError } from '../errors';
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

  it('si falla la consulta al CMS, rechaza con ContentUnavailableError y conserva la causa', async () => {
    const original = new Error('sin conexión');
    const service = createSanityPaginasService({
      fetchDocs: async () => {
        throw original;
      },
    });

    const error: unknown = await service.getPaginas().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentUnavailableError);
    expect((error as ContentUnavailableError).message).toContain('sin conexión');
    expect((error as ContentUnavailableError).cause).toBe(original);
  });

  it('si los datos del CMS son inválidos, también rechaza con ContentUnavailableError', async () => {
    const service = createSanityPaginasService({
      fetchDocs: async () => [{ ...docVigilar, pageId: 'no-existe' }],
    });

    await expect(service.getPaginas()).rejects.toBeInstanceOf(ContentUnavailableError);
  });
});