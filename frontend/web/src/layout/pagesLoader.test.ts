import { describe, expect, it } from 'vitest';

import { createFakePaginasService } from '../services/fake/fakePaginasService';
import type { PaginasService } from '../services';
import { createPagesLoader } from './pagesLoader';

describe('createPagesLoader', () => {
  it('entrega las páginas que devuelve el servicio', async () => {
    const pagesLoader = createPagesLoader(createFakePaginasService());

    const { pages } = await pagesLoader();

    expect(pages['volver-a-ver'].summary).toBe('Resumen de prueba de volver-a-ver');
    expect(pages['vigilar'].tags).toEqual(['fotos', 'videos']);
  });

  it('propaga el error si el servicio falla', async () => {
    const failing: PaginasService = {
      getPaginas: async () => {
        throw new Error('sin conexión con el CMS');
      },
    };

    await expect(createPagesLoader(failing)()).rejects.toThrow('sin conexión con el CMS');
  });
});