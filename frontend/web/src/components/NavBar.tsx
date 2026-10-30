import { useEffect, useRef, useState } from 'react';
import { MenuOverlay } from './MenuOverlay';
import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarPlayIcon from '../assets/icons/nav-bar-play.svg';
import navBarPauseIcon from '../assets/icons/nav-bar-pause.svg';
import navBarRewindIcon from '../assets/icons/nav-bar-rewind.svg';
import '../styles/components/nav-bar-styles.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const icon = isMenuOpen
    ? navBarRewindIcon
    : isMenuHovered
      ? navBarPauseIcon
      : navBarPlayIcon;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const menuButton = menuButtonRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButton?.focus();
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="nav-bar-container">
        <div className="folder-txt-content">
          <img src={navBarFolderIcon} alt="" className="folder-icon" />
          <p>[ Una cinta vuelve a girar ]</p>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-content"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
          onFocus={() => setIsMenuHovered(true)}
          onBlur={() => setIsMenuHovered(false)}
        >
          <span>{isMenuOpen ? 'Cerrar' : 'Menú'}</span>
          <img src={icon} alt="" className="play-icon" />
        </button>
      </div>

      {isMenuOpen ? <MenuOverlay onClose={closeMenu} /> : null}
    </>
  );
};

export { NavBar };
