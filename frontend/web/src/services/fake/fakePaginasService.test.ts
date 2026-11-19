import { describe, expect, it } from 'vitest';

import { publishedPageIds } from '../pages';
import { createFakePaginas, createFakePaginasService } from './fakePaginasService';

describe('createFakePaginasService', () => {
  it('devuelve una entrada por cada página publicada, con su id', async () => {
    const pages = await createFakePaginasService().getPaginas();

    expect(Object.keys(pages).sort()).toEqual([...publishedPageIds].sort());
    for (const id of publishedPageIds) {
      expect(pages[id].id).toBe(id);
    }
  });

  it('da contenido a las páginas de la home y deja vacías las demás', async () => {
    const pages = await createFakePaginasService().getPaginas();

    expect(pages['volver-a-ver'].isPublished).toBe(true);
    expect(pages['volver-a-ver'].summary).toBe('Resumen de prueba de volver-a-ver');
    expect(pages['glosario']).toMatchObject({ isPublished: false, summary: '' });
  });

  it('el Lado B trae tags y las tarjetas de La película no', async () => {
    const pages = await createFakePaginasService().getPaginas();

    expect(pages['vigilar'].tags).toEqual(['fotos', 'videos']);
    expect(pages['mario-celestino'].tags).toEqual([]);
  });

  it('permite inyectar datos propios para un caso puntual', async () => {
    const custom = createFakePaginas();
    custom['vigilar'] = { ...custom['vigilar'], summary: 'Texto a medida' };

    const pages = await createFakePaginasService(custom).getPaginas();

    expect(pages['vigilar'].summary).toBe('Texto a medida');
  });
});