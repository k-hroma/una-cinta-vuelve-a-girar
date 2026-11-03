
import { NavLink } from 'react-router';
import { HOME_PATH } from '../../config/navigation';
import navBarRewindIcon from '../../assets/icons/nav-bar-rewind.svg';
import '../../styles/pages/public/construction-page.css';

export default function ConstructionPage() {
  return (
    <div className="construction-page">
      <div className="construction-page__content">
        <div className="construction-page__header">
          <span className="construction-page__eyebrow">
            [ SEÑAL EN PROCESO ]
          </span>

          <img
            src={navBarRewindIcon}
            alt=""
            aria-hidden="true"
            className="construction-page__rewind-icon"
          />
        </div>

        <section
          className="construction-page__main"
          aria-labelledby="construction-title"
        >
          <div className="construction-page__cassette" aria-hidden="true">
            <div className="construction-page__cassette-label">
              <span className="construction-page__cassette-side">
                LADO B
              </span>

              <span className="construction-page__cassette-title">
                EN PROCESO
              </span>

              <div className="construction-page__reels">
                <span className="construction-page__reel" />
                <span className="construction-page__tape-line" />
                <span className="construction-page__reel" />
              </div>
            </div>

            <div className="construction-page__cassette-bottom">
              <span>PLAY</span>
              <span>PAUSE</span>
              <span>REWIND</span>
            </div>
          </div>

          <div className="construction-page__message">
            <p className="construction-page__overline">
              PÁGINA  /  001
            </p>

            <h1
              id="construction-title"
              className="construction-page__title"
            >
              Esta parte todavía está girando.
            </h1>

            <p className="construction-page__description">
              Estamos preparando este lado de la cinta.
              Por ahora, la señal queda en pausa.
            </p>

            <NavLink
              to={HOME_PATH}
              end
              className="construction-page__home-link"
            >
              <span>Volver al inicio</span>
              <span
                className="construction-page__link-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </NavLink>
          </div>
        </section>

        <footer className="construction-page__footer">
          <span>UNA CINTA VUELVE A GIRAR</span>
          <span>FIN DE SEÑAL — POR AHORA</span>
        </footer>
      </div>
    </div>
  );
};


