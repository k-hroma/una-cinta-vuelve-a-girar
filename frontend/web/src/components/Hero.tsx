import portraitOne from '../assets/img/foto-willi.png'
import portraitTwo from '../assets/img/foto-el-negro.png'
import portraitThree from '../assets/img/foto-oscar.png'

import '../styles/components/hero-styles.css'

const portraits = [
  {
    id: 'portrait-one',
    src: portraitOne,
    alt: 'Retrato de archivo',
    text: 'WILLI ARGARAÑAZ',
    className: 'hero-portrait--one',
  },
  {
    id: 'portrait-two',
    src: portraitTwo,
    alt: 'Retrato de archivo',
    text: 'EL NEGRO OLIVERA',
    className: 'hero-portrait--two',
  },
  {
    id: 'portrait-three',
    src: portraitThree,
    alt: 'Retrato de archivo',
    text: 'OSCAR AREDES',
    className: 'hero-portrait--three',
  },
];


export default function Hero() {
  return (
    <section className="hero-content">
      <div className="hero-img-container">
        <div className='hero-txt-container'>
          <p className='hero-lado-a'>[ Lado A ]</p>
          <h1 className='hero-title'>Una cinta vuelve a girar</h1>
          <p className='hero-sub-title'>Budge pregunta, seguirá preguntando</p>
        </div>
        {portraits.map((portrait) => (
          <figure
            key={portrait.id}
            className={`hero-portrait ${portrait.className}`}
            tabIndex={0}
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
      </div>
    </section>
  )
};

