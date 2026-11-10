import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import IconTextButton from './ui/IconTextButton';
import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarRewindIcon from '../assets/icons/nav-bar-rewind.svg';
import {
  HOME_PATH,
  SIDE_LABELS,
  SIDES,
  derivePath,
  getSectionIntro,
  getSectionPages,
  type SiteSide,
  type PageModel,
} from '../config/navigation';
import '../styles/components/menu-overlay-styles.css';


/*
* Describe lo que MenuOverlay recibe del padre. Solo una cosa: onClose.
* () => void es el tipo de una función que no recibe nada y no devuelve nada.
* Quien lo usa (NavBar, línea 83) pasa closeMenu, que hace setIsMenuOpen(false).
*/
type MenuOverlayProps = {
  onClose: () => void;
};

// { item, onClose } es desestructuración
// { item: PageModel; onClose: () => void } es el tipo, escrito ahí mismo (en este componente no se creó un type aparte).
function MenuEntry({
  item,
  onClose,
}: {
  item: PageModel;
  onClose: () => void;
}) {
  if (item.kind === 'intro') {
    return (
      <span className="menu-section-intro">
        {item.title}
      </span>
    );
  }

  const path = derivePath(item);

  return (
    <NavLink
      to={path}
      end={path === HOME_PATH}
      onClick={onClose}
      className={({ isActive }) => {
        const classes = ['menu-link'];

        if (isActive) classes.push('menu-link--active');
        if (item.nav?.emphasis === 'large') classes.push('menu-link--large');
        if (item.nav?.hasBullet) classes.push('menu-link--bullet');
        if (item.nav?.needMargin?.bottom) classes.push('menu-link--margin-bottom')
        if (item.nav?.needMargin?.top) classes.push('menu-link--margin-top')
        if (item.nav?.needMargin?.right) classes.push('menu-link--margin-right')

        return classes.join(' ');
      }}
    >
      {item.title}
    </NavLink>
  );
}

export default function MenuOverlay({
  onClose,
}: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [openSide, setOpenSide] = useState<SiteSide | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      ref={dialogRef}
      id="site-menu"
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;

        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter((element) => element.getClientRects().length > 0);

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }}
    >
      <div className="nav-bar-container menu-overlay-header">
        <NavLink
          to={HOME_PATH}
          className="folder-txt-content">
          <img src={navBarFolderIcon} alt="" className="folder-icon" />
          <p>[ Una cinta vuelve a girar ]</p>
        </NavLink>

        <IconTextButton
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          iconSrc={navBarRewindIcon}
        >
          Cerrar
        </IconTextButton>
      </div>

      <nav className="menu-overlay-content" aria-label="Secciones del sitio">
        {SIDES.map((side) => {
          const intro = getSectionIntro(side);
          const pages = getSectionPages(side);
          const headingId = `menu-side-${side}`;
          const pagesId = `menu-side-${side}-pages`;
          const isExpanded = openSide === side;

          return (
            <section
              key={side}
              className={`menu-section menu-section--${side}`}
              aria-labelledby={headingId}
            >
              <p id={headingId} className="menu-section-label">
                <span className="menu-section-label--desktop">
                  {SIDE_LABELS[side]}
                </span>
                <span className="menu-section-label--mobile">
                  {SIDE_LABELS[side].replace(/\[|\]/g, '').trim()}
                </span>
              </p>
              {intro && pages.length > 0 ? (
                <>
                  <span className="menu-section-intro menu-section-intro--desktop">
                    {intro.title}
                  </span>
                  <button
                    type="button"
                    className="menu-section-intro menu-section-intro--mobile"
                    aria-expanded={isExpanded}
                    aria-controls={pagesId}
                    onClick={() => setOpenSide(isExpanded ? null : side)}
                  >
                    {intro.title}
                  </button>
                </>
              ) : intro ? (
                <MenuEntry item={intro} onClose={onClose} />
              ) : null}

              {pages.length > 0 ? (
                <div
                  id={pagesId}
                  className={`menu-section-pages${isExpanded ? ' menu-section-pages--expanded' : ''}`}
                >
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


