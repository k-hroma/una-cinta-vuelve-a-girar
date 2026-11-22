/**Rol: ruta sin dirección propia que envuelve todas las páginas del sitio. Existe para atrapar los errores de cada página (por ejemplo, que falle el contenido) y mostrarlos dentro del layout, con el menú y el pie a la vista. */
import { Outlet } from 'react-router';
import RouteErrorPage from '../pages/public/RouteErrorPage';

export default function PagesLayout() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <RouteErrorPage />;
}