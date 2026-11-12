import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
  SIDE_LABELS,
} from '../../config/navigation';

import folderIcon from '../../assets/icons/nav-bar-folder.svg';

import '../../styles/components/home/lado-b-section.css';

const FOLDERS_COUNT = 6;

type PageExtra = { description: string; tags: string };

const PAGE_EXTRAS: Record<string, PageExtra> = {
  'los-hechos': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'lo-que-escucharon': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  vigilar: {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  organizarse: {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, textos, documentos, etc.',
  },
  'las-pericias': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'la-prensa': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'las-madres': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'los-chicos-muertos': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
};

const LADO_B_ORDER = [
  'las-madres',
  'la-prensa',
  'los-chicos-muertos',
  'las-pericias',
  'los-hechos',
  'lo-que-escucharon',
  'vigilar',
  'organizarse',
] as const;

export default function LadoBSection() {
  const pages = getPublishedPages()
    .filter((page) => page.section === 'b' && page.kind === 'page')
    .sort((a, b) => {
      const indexA = LADO_B_ORDER.indexOf(a.id as (typeof LADO_B_ORDER)[number]);
      const indexB = LADO_B_ORDER.indexOf(b.id as (typeof LADO_B_ORDER)[number]);

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
            const extra = PAGE_EXTRAS[page.id];

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