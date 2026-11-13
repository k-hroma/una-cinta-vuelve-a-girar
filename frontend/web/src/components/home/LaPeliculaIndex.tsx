import { useState } from 'react';
import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
  type PublishedPage,
} from '../../config/navigation';

// TODO: ajustá las rutas de las fotos
import volverAVerImage from '../../assets/img/volver-a-ver.png';
import cintaSoporteImage from '../../assets/img/la-cinta-y-el-soporte.png';
import marioCelestinoImage from '../../assets/img/mario-celestino.png';

import '../../styles/components/home/la-pelicula-index-page.css';

const sectionIds = [
  'volver-a-ver',
  'la-cinta-y-el-soporte',
  'mario-celestino',
] as const satisfies readonly PublishedPage['id'][];

type SectionId = (typeof sectionIds)[number];

const sectionDescriptions = {
  'volver-a-ver':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
  'la-cinta-y-el-soporte':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
  'mario-celestino':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
} satisfies Record<SectionId, string>;

const sectionImages = {
  'volver-a-ver': volverAVerImage,
  'la-cinta-y-el-soporte': cintaSoporteImage,
  'mario-celestino': marioCelestinoImage,
} satisfies Record<SectionId, string>;

export default function LaPeliculaIndex() {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  const publishedPages = getPublishedPages();

  const filmPage = publishedPages.find((page) => page.id === 'la-pelicula');

  const sections = sectionIds.flatMap((id) => {
    const page = publishedPages.find((item) => item.id === id);

    if (!page) return [];

    return [
      {
        ...page,
        id,
        to: derivePath(page),
        description: sectionDescriptions[id],
        image: sectionImages[id],
      },
    ];
  });

  return (
    <main className="film-index">
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

      {filmPage && (
        <Link to={derivePath(filmPage)} className="film-index__eyebrow">
          [ La película ]
        </Link>
      )}

      <nav
        className="film-index__navigation"
        aria-label="Secciones de La película"
      >
        {sections.map((section) => (
          <article
            className="film-index__item"
            key={section.id}
            onFocus={() => setActiveId(section.id)}
            onBlur={() => setActiveId(null)}
          >
            <div className="film-index__content">
              <h2
                className={`film-index__title${activeId === section.id ? ' film-index__title--active' : ''
                  }`}
                onMouseEnter={() => setActiveId(section.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {section.title}
              </h2>

              <p className="film-index__description">{section.description}</p>
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
    </main>
  );
}