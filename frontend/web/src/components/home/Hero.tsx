import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router';
import { derivePath, getPublishedPages } from '../../config/navigation';

import portraitOne from '../../assets/img/foto-willi.png';
import portraitTwo from '../../assets/img/foto-el-negro.png';
import portraitThree from '../../assets/img/foto-oscar.png';

import playIcon from '../../assets/icons/nav-bar-play.svg';

import '../../styles/components/home/hero-styles.css';

// Zona central que revela el botón (en % del hero). Ajustala a gusto.
const REVEAL_ZONE = {
  xMin: 0.25,
  xMax: 0.75,
  yMin: 0.2,
  yMax: 0.8,
};

const portraits = [
  {
    id: 'portrait-one',
    src: portraitOne,
    alt: 'Willi Argarañaz',
    text: 'WILLI ARGARAÑAZ',
    className: 'hero-portrait--one',
  },
  {
    id: 'portrait-two',
    src: portraitTwo,
    alt: 'El Negro Olivera',
    text: 'EL NEGRO OLIVERA',
    className: 'hero-portrait--two',
  },
  {
    id: 'portrait-three',
    src: portraitThree,
    alt: 'Oscar Aredes',
    text: 'OSCAR AREDES',
    className: 'hero-portrait--three',
  },
];

export default function Hero() {
  const [isPlayActive, setIsPlayActive] = useState(false); // hover/foco sobre el botón
  const [isZoneActive, setIsZoneActive] = useState(false); // mouse en el centro del hero

  const peliculaPage = getPublishedPages().find(
    (page) => page.id === 'la-pelicula',
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const inside =
      x >= REVEAL_ZONE.xMin &&
      x <= REVEAL_ZONE.xMax &&
      y >= REVEAL_ZONE.yMin &&
      y <= REVEAL_ZONE.yMax;

    setIsZoneActive((prev) => (prev === inside ? prev : inside));
  };

  const handleMouseLeave = () => setIsZoneActive(false);

  const activate = () => setIsPlayActive(true);
  const deactivate = () => setIsPlayActive(false);

  const playClassName = `hero-play-button${isZoneActive || isPlayActive ? ' hero-play-button--visible' : ''
    }`;

  return (
    <section className="hero-content">
      <div
        className="hero-img-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hero-txt-container">
          <p className="hero-lado-a">[ Lado A ]</p>
          <h1 className="hero-title">
            Una cinta vuelve <span className="hero-title-agirar">a girar</span>
          </h1>
          <p className="hero-sub-title">Budge pregunta, seguirá preguntando</p>
        </div>

        {portraits.map((portrait) => (
          <figure
            key={portrait.id}
            className={`hero-portrait ${portrait.className}`}
          >
            <img
              src={portrait.src}
              alt={portrait.alt}
              className="hero-portrait-image"
            />
            <figcaption className="hero-portrait-caption">
              {portrait.text}
            </figcaption>
          </figure>
        ))}

        {/* Overlay: se activa con hover o foco del botón Play */}
        <div
          className={`hero-overlay${isPlayActive ? ' hero-overlay--active' : ''}`}
          aria-hidden="true"
        />

        {peliculaPage && (
          <Link
            to={derivePath(peliculaPage)}
            className={playClassName}
            aria-label="Ver la película"
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            onFocus={activate}
            onBlur={deactivate}
          >
            <img src={playIcon} alt="" className="hero-play-icon" />
          </Link>
        )}
      </div>
    </section>
  );
}
