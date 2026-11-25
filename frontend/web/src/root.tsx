/**Rol: ruta raíz del sitio en modo framework. Define el documento HTML (<html>, <head>, <body>) que envuelve todas las páginas, los estilos globales, el favicon y el título por defecto. Reemplaza a index.html y a main.tsx. */
import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Scripts,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';
import faviconUrl from './assets/icons/nav-bar-play.svg';
import RootLayout from './layout/RootLayout';
import RouteErrorPage from './pages/public/RouteErrorPage';

import './styles/index.css';
import './styles/fonts.css';

export const meta: MetaFunction = () => [{ title: 'una cinta vuelve a girar' }];

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: faviconUrl },
];

/** El documento HTML completo. React Router lo usa tanto al generar las páginas en el build como en el navegador. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Lo que va dentro del <body>: menú, contenido de la página y pie. */
export default function Root() {
  return <RootLayout />;
}

/** Último recurso: si falla el propio layout (menú o pie), se muestra el error sin ellos. Los errores de las páginas los atrapa PagesLayout. */
export function ErrorBoundary() {
  return <RouteErrorPage />;
}