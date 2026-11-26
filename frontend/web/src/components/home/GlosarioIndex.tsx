import { Link } from 'react-router';
import { derivePath, getPublishedPages } from '../../config/navigation';

import type { PagesById } from '../../types/pagina';

import '../../styles/components/home/glosario-index-teaser.css';

const WORD_ROWS = [
  'Masacre Víctima Testigo Fílmico',
  'Perpetrar Sobreviviente Testigo',
  'Masacre Víctima Testigo Fílmico',
  'Perpetrar Sobreviviente Testigo',
  'Masacre Víctima Testigo Fílmico',
  'Perpetrar Sobreviviente Testigo',
];

type GlosarioIndexProps = {
  pages: PagesById;
};

export default function GlosarioIndex({ pages }: GlosarioIndexProps) {
  const glosarioPage = getPublishedPages().find(
    (page) => page.id === 'glosario',
  );

  if (!glosarioPage) return null;

  return (
    <section className="glosario-teaser">
      {/* Capa 1: palabras de fondo (decorativas) */}
      <div className="glosario-teaser__words" aria-hidden="true">
        {WORD_ROWS.map((row, index) => (
          <p key={index} className="glosario-teaser__word-row">
            {row}
          </p>
        ))}
      </div>

      {/* Capa 2: velo oscuro a todo el ancho */}
      <div className="glosario-teaser__overlay" aria-hidden="true" />

      {/* Capas 3 y 4: rectángulo negro (::before) + contenido */}
      <div className="glosario-teaser__panel">
        <div className="glosario-teaser__header">
          <p className="glosario-teaser__label">[ Glosario ]</p>
          <Link
            to={derivePath(glosarioPage)}
            className="glosario-teaser__link"
          >
            Ver +
          </Link>
        </div>

        <p className="glosario-teaser__description">
          {pages.glosario.summary}
        </p>
      </div>
    </section>
  );
}