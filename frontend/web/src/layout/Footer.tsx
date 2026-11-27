import { NavLink } from 'react-router';
import { HOME_PATH } from '../config/navigation';
import footerLogo from '../assets/logos/logo-footer.svg';
import '../styles/layout/footer.css';

const CROMA_INSTAGRAM_URL = 'https://www.instagram.com/cromix__/';
const RO_FUKS_INSTAGRAM_URL = 'https://www.instagram.com/rofuks/';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-contact">
          <NavLink to={HOME_PATH} className="footer-title">
            Una cinta vuelve a girar
          </NavLink>

          <p className="footer-copy footer-contact-copy">
            Podés escribirnos a
            <br />
            <a className="footer-link" href="mailto:contacto@unacintavuelveagirar.ar">
              contacto@unacintavuelveagirar.ar
            </a>
          </p>
        </section>

        <section className="footer-project">
          <p className="footer-copy">Un proyecto de: Victoria Irene</p>
          <p className="footer-copy">Tutoría: Margaux Chalançon</p>
          <p className="footer-copy">
            Desarrollo Web:{' '}
            <a
              className="footer-copy-link"
              href={CROMA_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Croma Mendonça
            </a>
            <br />
            Diseño:{' '}
            <a
              className="footer-copy-link"
              href={RO_FUKS_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ro Fuks
            </a>
          </p>
          <p className="footer-copy footer-date">Realizada en 2026</p>
        </section>

        <section className="footer-institution">
          <p className="footer-copy">
            Máster en Archivo Cinematográfico y Audiovisual
            <br />
            Elías Querejeta Zine Eskola (EQZE)
          </p>

          <img
            className="footer-logo"
            src={footerLogo}
            alt="Elías Querejeta Zine Eskola"
          />

          <p className="footer-copy footer-license">
            Este sitio y sus contenidos originales se publican bajo licencia
            Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC
            BY-SA 4.0).{' '}
            <a className="footer-link" href={LICENSE_URL}>
              Creative Commons BY-SA 4.0
            </a>
            <br />
            Los materiales de archivo reproducidos cuentan con las
            autorizaciones correspondientes. Los derechos pertenecen a sus
            titulares.
          </p>
        </section>
      </div>
    </footer>
  );
}