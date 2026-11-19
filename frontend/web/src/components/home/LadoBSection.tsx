import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
  SIDE_LABELS,
  type PublishedPage,
} from '../../config/navigation';
import { ladoBOrder } from '../../content/ladoB';
import type { PagesById } from '../../types/pagina';

import folderIcon from '../../assets/icons/nav-bar-folder.svg';

import '../../styles/components/home/lado-b-section.css';

const FOLDERS_COUNT = 6;

type LadoBSectionProps = {
  pages: PagesById;
};

//El componente ya tenía una variable local llamada pages (la lista de páginas del Lado B, sacada de navigation.ts). Para no tocar esa lógica, al recibir la prop la renombro al desestructurar: { pages: pagesData }.
export default function LadoBSection({ pages: pagesData }: LadoBSectionProps) {
  const pages = getPublishedPages()
    .filter(
      (page): page is Extract<PublishedPage, { section: 'b'; kind: 'page' }> =>
        page.section === 'b' && page.kind === 'page',
    )
    .sort((a, b) => {
      const indexA = ladoBOrder.indexOf(a.id);
      const indexB = ladoBOrder.indexOf(b.id);

      // los ids que no estén en la lista van al final, en su orden original
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });


  if (pages.length === 0) return null;

  return (
    <section className="lado-b-section">
      {/* Carpetas decorativas */}
      <div className="lado-b-section__folders" aria-hidden="true">
        <div className="lado-b-section__folders-track">
          {Array.from({ length: FOLDERS_COUNT }, (_, index) => (
            <img
              key={index}
              src={folderIcon}
              alt="folder-icon"
              className="lado-b-section__folder"
            />
          ))}
        </div>
      </div>

      <div className="lado-b-section__content">
        <p className="lado-b-section__label">{SIDE_LABELS.b}</p>

        <ul className="lado-b-section__list">
          {pages.map((page) => {
            const { summary, tags } = pagesData[page.id];

            return (
              <li key={page.id} className="lado-b-section__item">
                <div className="lado-b-section__item-header">
                  <h3 className="lado-b-section__item-title">{page.title}</h3>
                  <Link
                    to={derivePath(page)}
                    className="lado-b-section__item-link"
                    aria-label={`Ver ${page.title}`}
                  >
                    Ver +
                  </Link>
                </div>

                {summary && (
                  <p className="lado-b-section__item-description">{summary}</p>
                )}
                {tags.length > 0 && (
                  <p className="lado-b-section__item-tags">
                    [ {tags.join(', ')}, etc. ]
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}