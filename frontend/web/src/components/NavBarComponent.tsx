import navBarFolderIcon from '../assets/icons/nav-bar-folder.svg';
import navBarPlayMenuIcon from '../assets/icons/nav-bar-play.svg';
import '../styles/components/nav-bar-styles.css';

const NavBarComponent = () => {
  return (
    <div className='nav-bar-container'>
      <div className='folder-txt-content'>
        <img src={navBarFolderIcon} alt="Folder" className='folder-icon' />
        <p>[ Una cinta vuelve a girar ]</p>
      </div>
      <div className='menu-content'>
        <p>Menú</p>
        <img src={navBarPlayMenuIcon} alt="PlaMenu" className='play-icon' />
      </div>
    </div>
  );
};


export { NavBarComponent }