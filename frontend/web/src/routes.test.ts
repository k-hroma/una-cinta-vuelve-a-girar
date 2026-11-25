import { matchRoutes, type RouteObject } from 'react-router';
import type { RouteConfigEntry } from '@react-router/dev/routes';
import { describe, expect, it } from 'vitest';

import { derivePath, getPublishedPages, HOME_PATH } from './config/navigation';
import routes from './routes';
import { flattenRoutes } from './test-utils/flattenRoutes';

// Todos los archivos .tsx de src/, con rutas como './pages/public/HomePage.tsx'.
const existingFiles = Object.keys(import.meta.glob('./**/*.tsx'));

const allRoutes = flattenRoutes(routes);
const pageRoutes = allRoutes.filter((entry) => entry.file !== 'layout/PagesLayout.tsx');

/** Convierte la configuración de routes.ts en rutas que matchRoutes entiende, usando el archivo como id. */
function toRouteObjects(entries: readonly RouteConfigEntry[]): RouteObject[] {
  return entries.map(
    (entry) =>
      ({
        id: entry.file,
        path: entry.path,
        index: entry.index,
        children: entry.children ? toRouteObjects(entry.children) : undefined,
      }) as RouteObject,
  );
}

/** Archivo de la página que se mostraría para una dirección. */
function fileFor(pathname: string) {
  const matches = matchRoutes(toRouteObjects(routes), pathname);
  return matches?.at(-1)?.route.id;
}

describe('routes', () => {
  it('tiene una ruta por cada página publicada, con la URL que dice navigation.ts', () => {
    const expectedPaths = getPublishedPages()
      .map((page) => derivePath(page))
      .sort();

    const actualPaths = pageRoutes
      .filter((entry) => entry.path !== '*')
      .map((entry) => (entry.index ? HOME_PATH : `/${entry.path}`))
      .sort();

    expect(actualPaths).toEqual(expectedPaths);
  });

  it('envuelve las páginas del sitio en un layout sin dirección propia', () => {
    expect(routes[0].file).toBe('layout/PagesLayout.tsx');
    expect(routes[0].path).toBeUndefined();
    expect(routes[0].children).toHaveLength(getPublishedPages().length);
  });

  it('usa la home como ruta índice del layout', () => {
    const children = routes[0].children ?? [];

    expect(children[0].index).toBe(true);
    expect(children[0].file).toBe('pages/public/HomePage.tsx');
  });

  it('deja la página 404 al final y fuera del layout, porque el layout tiene loader', () => {
    expect(routes).toHaveLength(2);
    expect(routes[1]).toMatchObject({
      path: '*',
      file: 'pages/public/NotFoundPage.tsx',
    });
    expect(routes[1].children).toBeUndefined();
  });

  it('apunta siempre a archivos que existen', () => {
    for (const entry of allRoutes) {
      expect(existingFiles, `no existe src/${entry.file}`).toContain(`./${entry.file}`);
    }
  });

  it('no repite archivos entre rutas', () => {
    const files = allRoutes.map((entry) => entry.file);

    expect(new Set(files).size).toBe(files.length);
  });

  it('muestra cada página en su dirección', () => {
    expect(fileFor('/')).toBe('pages/public/HomePage.tsx');
    expect(fileFor('/lado-b/las-madres')).toBe('pages/public/LadoB/LasMadresPage.tsx');
    expect(fileFor('/lado-a/volver-a-ver-escuchar-preguntar')).toBe(
      'pages/public/LadoA/VolverAVerPage.tsx',
    );
  });

  it.each(['/lado-a', '/lado-b', '/lado-a/no-existe', '/lado-b/las-madres/extra', '/nada'])(
    'muestra la página 404 en la dirección inexistente %s',
    (pathname) => {
      expect(fileFor(pathname)).toBe('pages/public/NotFoundPage.tsx');
    },
  );
});