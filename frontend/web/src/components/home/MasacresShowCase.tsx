import { Link } from 'react-router';
import { derivePath, getPublishedPages } from '../../config/navigation';


import cuantasMasacres from '../../assets/img/foto-cuantas-masacres.png';
import cuantasMasacresRetrato from '../../assets/img/foto-willi-tratamiento.png';

import '../../styles/components/home/masacres-showcase.css';


export default function MasacresShowCase() {
  const masacresNombrar = getPublishedPages().find(
    (page) => page.id === 'cuantas-masacres',
  );

  if (!masacresNombrar) return null;

  const masacresFilmar = getPublishedPages().find(
    (page) => page.id === 'cuantas-masacres',
  );

  if (!masacresFilmar) return null;

  return (
    <section className="masacres-showcase">
      {/* Panel izquierdo: foto de fondo + cuadrado amarillo */}
      <article className="masacres-showcase__panel masacres-showcase__panel--nombrar">
        <img
          src={cuantasMasacres}
          alt="foto de archivo"
          className="masacres-showcase__background"
        />

        <div className="masacres-showcase__content">
          <div
            className="masacres-showcase__media masacres-showcase__media--placeholder"
            aria-hidden="true"
          />
          <h2 className="masacres-showcase__title_first">
            Cuántas masacres podemos nombrar
          </h2>
          <Link
            to={derivePath(masacresNombrar)} className="masacres-showcase__link">
            Ver +
          </Link>
        </div>
      </article>

      {/* Panel derecho: fondo amarillo + retrato */}
      <article className="masacres-showcase__panel masacres-showcase__panel--filmar">
        <div className="masacres-showcase__content">
          <img
            src={cuantasMasacresRetrato}
            alt="retrato Willi Argarañaz"
            className="masacres-showcase__media"
          />
          <h2 className="masacres-showcase__title">
            Cuántas masacres podemos filmar
          </h2>
          <Link
            to={derivePath(masacresFilmar)}
            className="masacres-showcase__link">
            Ver +
          </Link>
        </div>
      </article>
    </section>
  );
}