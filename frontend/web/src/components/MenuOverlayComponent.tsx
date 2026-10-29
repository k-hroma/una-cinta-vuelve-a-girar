import { Link } from 'react-router';
import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarRewindIcon from '../assets/icons/nav-bar-rewind.svg';

type MenuOverlayComponentProps = {
  onClose: () => void;
};

const MenuOverlayComponent = ({
  onClose,
}: MenuOverlayComponentProps) => {
  return (
    <nav
      id="site-menu"
      className="menu-overlay"
      aria-label="Menú principal"
    >
      <div className="menu-overlay-header">
        <div className="folder-txt-content">
          <img src={navBarFolderIcon} alt="" className="folder-icon" />
          <p>[ Una cinta vuelve a girar ]</p>
        </div>

        <button
          type="button"
          className="menu-content"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <span>Cerrar</span>
          <img src={navBarRewindIcon} alt="" className="play-icon" />
        </button>
      </div>

      <div className="menu-overlay-content">
        <section className="menu-section" aria-labelledby="menu-side-a">
          <h2 id="menu-side-a">[ Lado A ]</h2>
          <Link to="/" onClick={onClose}>
            Una cinta vuelve a girar
          </Link>

          <div className="menu-section-pages">
            <Link to="/lado-a/la-pelicula" onClick={onClose}>
              La película
            </Link>
            <Link
              to="/lado-a/volver-a-ver-escuchar-preguntar"
              onClick={onClose}
            >
              Volver a ver, escuchar, preguntar
            </Link>
            <Link
              to="/lado-a/la-cinta-y-el-soporte"
              onClick={onClose}
            >
              La cinta y el soporte
            </Link>
            <Link
              to="/lado-a/mario-celestino-realizador"
              onClick={onClose}
            >
              Mario Celestino, realizador
            </Link>
            <Link to="/lado-a/glosario" onClick={onClose}>
              Glosario
            </Link>
            <Link to="/lado-a/cuantas-masacres" onClick={onClose}>
              Cuántas masacres
            </Link>
            <Link to="/lado-a/con-el-cuerpo" onClick={onClose}>
              Con el cuerpo
            </Link>
          </div>
        </section>

        <section className="menu-section" aria-labelledby="menu-side-b">
          <h2 id="menu-side-b">[ Lado B ]</h2>
          <Link
            to="/lado-b/el-mundo-en-el-que-ocurrio"
            onClick={onClose}
          >
            El mundo en el que ocurrió
          </Link>

          <div className="menu-section-pages">
            <Link to="/lado-b/los-hechos" onClick={onClose}>
              Los hechos
            </Link>
            <Link
              to="/lado-b/lo-que-escucharon-vieron-vivieron"
              onClick={onClose}
            >
              Lo que escucharon, vieron, vivieron
            </Link>
            <Link to="/lado-b/vigilar" onClick={onClose}>
              Vigilar
            </Link>
            <Link
              to="/lado-b/organizarse-cuidarse-luchar"
              onClick={onClose}
            >
              Organizarse, cuidarse, luchar
            </Link>
            <Link
              to="/lado-b/las-pericias-y-la-justicia"
              onClick={onClose}
            >
              Las pericias y la justicia
            </Link>
            <Link to="/lado-b/la-prensa" onClick={onClose}>
              La prensa
            </Link>
            <Link to="/lado-b/las-madres" onClick={onClose}>
              Las madres
            </Link>
            <Link to="/lado-b/los-chicos-muertos" onClick={onClose}>
              Los chicos muertos
            </Link>
          </div>
        </section>

        <section className="menu-section" aria-labelledby="menu-side-c">
          <h2 id="menu-side-c">[ Lado C ]</h2>
          <Link
            to="/lado-c/fabulaciones-y-creaciones-personales"
            onClick={onClose}
          >
            Fabulaciones y creaciones personales
          </Link>
        </section>
      </div>
    </nav>
  );
};

export { MenuOverlayComponent };