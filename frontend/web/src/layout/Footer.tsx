import { Link } from 'react-router';
import { HOME_PATH } from '../config/navigation';
import '../styles/layout/footer.css';

// TODO: reemplazar por las URLs reales de Instagram
const CROMA_INSTAGRAM_URL = 'https://www.instagram.com/cromix__/';
const RO_FUKS_INSTAGRAM_URL = 'https://www.instagram.com/rofuks/';

const SIDES = ['Lado A', 'Lado B', 'Lado C'];

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <ul className="footer-sides">
            {SIDES.map((label) => (
              <li key={label} className="footer-text">
                <Link to={HOME_PATH} className="footer-link">
                  {label}
                </Link>
                :
              </li>
            ))}
          </ul>

          <div className="footer-credits">
            <p className="footer-text">
              — Irene Barco
              <br />
              Directora de la tesis de Investigación...
            </p>
            <p className="footer-text">
              Desarrollo Web:{' '}
              <a
                href={CROMA_INSTAGRAM_URL}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Croma
              </a>
              <br />
              Diseño y maquetación:{' '}
              <a
                href={RO_FUKS_INSTAGRAM_URL}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ro Fuks
              </a>
            </p>
          </div>

          <p className="footer-text footer-date">
            Realizada
            <br />
            2026
          </p>
        </div>
      </div>
    </footer>
  );
}