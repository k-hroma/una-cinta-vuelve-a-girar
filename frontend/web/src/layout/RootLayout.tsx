/*RootLayout.tsx define la estructura común donde se renderiza el contenido.*/

import { Suspense } from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Header } from './Header';
import { Footer } from './Footer';
import { SectionErrorBoundary } from './SectionErrorBoundary';

export function RootLayout() {
  return (
    <div>
      <SectionErrorBoundary
        fallback={
          <header>
            <p>No se pudo cargar el menú.</p>
            <Link to="/">Volver al inicio</Link>
          </header>
        }
      >
        <Header />
      </SectionErrorBoundary>
      <main>
        <Suspense
          fallback={<LoadingSpinner fullScreen={false} text="Cargando" />}
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}