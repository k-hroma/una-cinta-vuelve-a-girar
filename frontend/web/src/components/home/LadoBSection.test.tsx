import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ladoBOrder } from '../../content/ladoB';
import { createFakePaginas } from '../../services/fake/fakePaginasService';
import type { PagesById } from '../../types/pagina';
import LadoBSection from './LadoBSection';

function render(pages: PagesById) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <LadoBSection pages={pages} />
    </MemoryRouter>,
  );
}

describe('LadoBSection', () => {
  it('muestra el resumen y los tags de cada tarjeta, con el formato de siempre', () => {
    const html = render(createFakePaginas());

    for (const id of ladoBOrder) {
      expect(html).toContain(
        `<p class="lado-b-section__item-description">Resumen de prueba de ${id}</p>`,
      );
    }
    expect(html.match(/<p class="lado-b-section__item-tags">\[ fotos, videos, etc\. \]<\/p>/g)).toHaveLength(8);
  });

  it('une todos los tags de una tarjeta', () => {
    const pages = createFakePaginas();
    pages['organizarse'] = {
      ...pages['organizarse'],
      tags: ['fotos', 'textos', 'documentos'],
    };

    const html = render(pages);

    expect(html).toContain('[ fotos, textos, documentos, etc. ]');
  });

  it('omite el párrafo de tags si no hay tags y el de resumen si no hay resumen', () => {
    const pages = createFakePaginas();
    pages['vigilar'] = { ...pages['vigilar'], tags: [] };
    pages['la-prensa'] = { ...pages['la-prensa'], summary: '' };

    const html = render(pages);

    expect(html.match(/lado-b-section__item-tags/g)).toHaveLength(7);
    expect(html.match(/lado-b-section__item-description/g)).toHaveLength(7);
    expect(html).not.toContain('Resumen de prueba de la-prensa');
  });

  it('mantiene el orden de las tarjetas definido en ladoBOrder', () => {
    const html = render(createFakePaginas());

    const posiciones = ladoBOrder.map((id) => html.indexOf(`Resumen de prueba de ${id}`));

    expect(posiciones).toEqual([...posiciones].sort((a, b) => a - b));
    expect(posiciones.every((posicion) => posicion >= 0)).toBe(true);
  });
});