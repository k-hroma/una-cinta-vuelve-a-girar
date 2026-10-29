import { useState } from 'react';
import { MenuOverlayComponent } from './MenuOverlayComponent';
import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarPlayIcon from '../assets/icons/nav-bar-play.svg';
import navBarPauseIcon from '../assets/icons/nav-bar-pause.svg';
import navBarRewindIcon from '../assets/icons/nav-bar-rewind.svg';
import '../styles/components/nav-bar-styles.css';

const NavBarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const icon = isMenuOpen
    ? navBarRewindIcon
    : isMenuHovered
      ? navBarPauseIcon
      : navBarPlayIcon;

  return (
    <>
      <div className="nav-bar-container">
        <div className="folder-txt-content">
          <img src={navBarFolderIcon} alt="" className="folder-icon" />
          <p>[ Una cinta vuelve a girar ]</p>
        </div>

        <button
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

      {isMenuOpen && (
        <MenuOverlayComponent onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export { NavBarComponent };
