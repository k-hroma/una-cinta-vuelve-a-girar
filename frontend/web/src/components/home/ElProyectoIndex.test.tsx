import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { createFakePaginas } from '../../services/fake/fakePaginasService';
import type { RichParagraph } from '../../types/pagina';
import ElProyectoIndex from './ElProyectoIndex';

function render(projectDescription: RichParagraph[]) {
  return renderToStaticMarkup(
    <ElProyectoIndex projectDescription={projectDescription} />,
  );
}

describe('ElProyectoIndex', () => {
  it('muestra el texto y subraya solo el fragmento marcado, con el mismo HTML de siempre', () => {
    const html = render([
      [
        { text: 'Proyecto sobre la película ', underline: false },
        { text: 'Budge pregunta, seguirá preguntando', underline: true },
        { text: ' (1987).', underline: false },
      ],
    ]);

    expect(html).toContain(
      '<p class="description-el-proyect-index">Proyecto sobre la película <span class="sub-description-el-proyect-index">Budge pregunta, seguirá preguntando</span> (1987).</p>',
    );
    expect(html).not.toContain('<em>');
    expect(html).not.toContain('<strong>');
  });

  it('no interpreta como HTML el texto que viene del CMS', () => {
    const html = render([
      [{ text: '<script>alert(1)</script> <b>negrita</b>', underline: false }],
    ]);

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('muestra un párrafo por cada bloque', () => {
    const html = render([
      [{ text: 'Primero.', underline: false }],
      [{ text: 'Segundo.', underline: false }],
    ]);

    expect(html.match(/class="description-el-proyect-index"/g)).toHaveLength(2);
  });

  it('omite el párrafo cuando no hay contenido del CMS', () => {
    const html = render([]);

    expect(html).not.toContain('description-el-proyect-index');
    expect(html).toContain('label-el-proyecto-index');
  });

  it('muestra el texto de la home de los datos de ejemplo', () => {
    const html = render(createFakePaginas()['home'].projectDescription);

    expect(html).toContain(
      '<span class="sub-description-el-proyect-index">Budge pregunta, seguirá preguntando</span>',
    );
  });
});
