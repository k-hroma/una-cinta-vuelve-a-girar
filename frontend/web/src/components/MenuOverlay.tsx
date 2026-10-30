import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarRewindIcon from '../assets/icons/nav-bar-rewind.svg';
import {
  HOME_PATH,
  SIDE_LABELS,
  SIDES,
  getSectionIntro,
  getSectionPages,
  type NavItem,
} from '../config/navigation';
import '../styles/components/menu-overlay-styles.css';

type MenuOverlayProps = {
  onClose: () => void;
};

function MenuEntry({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  if (!item.enabled) {
    return (
      <span className="menu-link menu-link--disabled" aria-disabled="true">
        {item.label}
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === HOME_PATH}
      onClick={onClose}
      className={({ isActive }) =>
        isActive ? 'menu-link menu-link--active' : 'menu-link'
      }
    >
      {item.label}
    </NavLink>
  );
}

const MenuOverlay = ({
  onClose,
}: MenuOverlayProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      id="site-menu"
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
    >
      <div className="menu-overlay-header">
        <div className="folder-txt-content">
          <img src={navBarFolderIcon} alt="" className="folder-icon" />
          <p>[ Una cinta vuelve a girar ]</p>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          className="menu-content"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <span>Cerrar</span>
          <img src={navBarRewindIcon} alt="" className="play-icon" />
        </button>
      </div>

      <nav className="menu-overlay-content" aria-label="Secciones del sitio">
        {SIDES.map((side) => {
          const intro = getSectionIntro(side);
          const pages = getSectionPages(side);
          const headingId = `menu-side-${side}`;

          return (
            <section
              key={side}
              className="menu-section"
              aria-labelledby={headingId}
            >
              <h2 id={headingId}>{SIDE_LABELS[side]}</h2>
              {intro ? <MenuEntry item={intro} onClose={onClose} /> : null}

              {pages.length > 0 ? (
                <div className="menu-section-pages">
                  {pages.map((item) => (
                    <MenuEntry key={item.id} item={item} onClose={onClose} />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </nav>
    </div>
  );
};

export { MenuOverlay };
