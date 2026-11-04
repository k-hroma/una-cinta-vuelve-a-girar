import { useEffect, useRef } from 'react';
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
  type PageModel,
} from '../config/navigation';
import '../styles/components/menu-overlay-styles.css';

type MenuOverlayProps = {
  onClose: () => void;
};

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

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

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
      <div className="menu-overlay-header">
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

          return (
            <section
              key={side}
              className={`menu-section menu-section--${side}`}
              aria-labelledby={headingId}
            >
              <p id={headingId} className="menu-section-label">
                {SIDE_LABELS[side]}
              </p>
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


