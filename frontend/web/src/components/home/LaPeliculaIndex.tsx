import { useState } from 'react';
import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
} from '../../config/navigation';
import {
  laPeliculaSectionIds,
  laPeliculaSections,
} from '../../content/laPelicula';
import type { PagesById } from '../../types/pagina';

import '../../styles/components/home/la-pelicula-index.css';

type SectionId = (typeof laPeliculaSectionIds)[number];

type LaPeliculaIndexProps = {
  pages: PagesById;
};

export default function LaPeliculaIndex({ pages }: LaPeliculaIndexProps) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  const publishedPages = getPublishedPages();


  const sections = laPeliculaSectionIds.flatMap((id) => {
    const page = publishedPages.find((item) => item.id === id);

    if (!page) return [];

    return [
      {
        ...page,
        id,
        to: derivePath(page),
        description: pages[id].summary,
        image: laPeliculaSections[id].image,
      },
    ];
  });

  return (
    <section className="film-index">
      {/* Fotos del hover: una por sección, todas en el centro */}
      <div className="film-index__previews" aria-hidden="true">
        {sections.map((section) => (
          <img
            key={section.id}
            src={section.image}
            alt=""
            className={`film-index__preview${activeId === section.id ? ' film-index__preview--active' : ''
              }`}
          />
        ))}
      </div>
      <p className="film-index__eyebrow">
        [ La película ]
      </p>

      <nav
        className="film-index__navigation"
        aria-label="Secciones de La película"
      >
        {sections.map((section) => (
          <article
            className="film-index__item"
            key={section.id}
          >
            <div className="film-index__content">
              <h2 className="film-index__heading">
                <Link
                  to={section.to}
                  className={`film-index__title${activeId === section.id ? ' film-index__title--active' : ''
                    }`}
                  onMouseEnter={() => setActiveId(section.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(section.id)}
                  onBlur={() => setActiveId(null)}
                  aria-label={section.title}
                >
                  {section.title}
                </Link>
              </h2>

              {section.description && (
                <p className="film-index__description">{section.description}</p>
              )}
            </div>

            <Link
              to={section.to}
              className="film-index__link"
              aria-label={`Ver ${section.title}`}
            >
              Ver +
            </Link>
          </article>
        ))}
      </nav>
    </section>
  );
}