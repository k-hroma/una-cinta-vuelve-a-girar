import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { createFakePaginas } from '../../services/fake/fakePaginasService';
import type { PagesById } from '../../types/pagina';
import LaPeliculaIndex from './LaPeliculaIndex';

function render(pages: PagesById) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <LaPeliculaIndex pages={pages} />
    </MemoryRouter>,
  );
}

describe('LaPeliculaIndex', () => {
  it('muestra en cada sección el resumen que viene del servicio', () => {
    const html = render(createFakePaginas());

    for (const id of ['volver-a-ver', 'la-cinta-y-el-soporte', 'mario-celestino']) {
      expect(html).toContain(
        `<p class="film-index__description">Resumen de prueba de ${id}</p>`,
      );
    }
  });

  it('omite el párrafo de una sección que no tiene resumen', () => {
    const pages = createFakePaginas();
    pages['mario-celestino'] = { ...pages['mario-celestino'], summary: '' };

    const html = render(pages);

    expect(html).not.toContain('Resumen de prueba de mario-celestino');
    expect(html.match(/film-index__description/g)).toHaveLength(2);
  });
});