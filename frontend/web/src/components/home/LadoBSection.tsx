import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
  SIDE_LABELS,
  type PublishedPage,
} from '../../config/navigation';
import { ladoBOrder, ladoBPageExtras } from '../../content/ladoB';

import folderIcon from '../../assets/icons/nav-bar-folder.svg';

import '../../styles/components/home/lado-b-section.css';

const FOLDERS_COUNT = 6;

export default function LadoBSection() {
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
            const extra = ladoBPageExtras[page.id];

            return (
              <li key={page.id} className="lado-b-section__item">
                <div className="lado-b-section__item-header">
                  <Link
                    to={derivePath(page)}
                    className="lado-b-section__item-link"
                    aria-label={`Ver ${page.title}`}
                  >
                    <h3 className="lado-b-section__item-title">{page.title}</h3>
                    <span className="lado-b-section__item-action">Ver +</span>
                  </Link>
                </div>

                {extra && (
                  <>
                    <p className="lado-b-section__item-description">
                      {extra.description}
                    </p>
                    <p className="lado-b-section__item-tags">
                      [ {extra.tags} ]
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
