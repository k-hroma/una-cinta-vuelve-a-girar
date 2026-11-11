
import { Link } from 'react-router';
import {
  derivePath,
  getPublishedPages,
  type PublishedPage,
} from '../../config/navigation';
import '../../styles/components/home/la-pelicula-index-page.css';

const sectionDescriptions = {
  'volver-a-ver':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
  'la-cinta-y-el-soporte':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
  'mario-celestino':
    'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
} satisfies Record<
  'volver-a-ver' | 'la-cinta-y-el-soporte' | 'mario-celestino',
  string
>;

const sectionIds = [
  'volver-a-ver',
  'la-cinta-y-el-soporte',
  'mario-celestino',
] as const satisfies readonly PublishedPage['id'][];

export default function LaPeliculaIndexPage() {
  const publishedPages = getPublishedPages();

  const filmPage = publishedPages.find(
    (page) => page.id === 'la-pelicula',
  );

  const sections = sectionIds.flatMap((id) => {
    const page = publishedPages.find((item) => item.id === id);

    if (!page) return [];

    return [{
      ...page,
      to: derivePath(page),
      description: sectionDescriptions[id],
    }];
  });

  return (
    <main className="film-index">
      {filmPage && (
        <Link
          to={derivePath(filmPage)}
          className="film-index__eyebrow"
        >
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
          >
            <div className="film-index__content">
              <h2 className="film-index__title">
                {section.title}
              </h2>

              <p className="film-index__description">
                {section.description}
              </p>
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
