import { describe, expect, it } from 'vitest';

import { derivePath, getPublishedPages, HOME_PATH } from './config/navigation';
import routes from './routes';

// Todos los archivos .tsx de src/, con rutas como './pages/public/HomePage.tsx'.
const existingFiles = Object.keys(import.meta.glob('./**/*.tsx'));

describe('routes', () => {
  it('tiene una ruta por cada página publicada, con la URL que dice navigation.ts', () => {
    const expectedPaths = getPublishedPages()
      .map((page) => derivePath(page))
      .sort();

    const actualPaths = routes
      .filter((entry) => entry.path !== '*')
      .map((entry) => (entry.index ? HOME_PATH : `/${entry.path}`))
      .sort();

    expect(actualPaths).toEqual(expectedPaths);
  });

  it('usa la home como ruta índice y deja la página 404 al final', () => {
    expect(routes[0].index).toBe(true);
    expect(routes[0].file).toBe('pages/public/HomePage.tsx');
    expect(routes.at(-1)).toMatchObject({
      path: '*',
      file: 'pages/public/NotFoundPage.tsx',
    });
  });

  it('apunta siempre a archivos que existen', () => {
    for (const entry of routes) {
      expect(existingFiles, `no existe src/${entry.file}`).toContain(`./${entry.file}`);
    }
  });

  it('no repite archivos entre rutas', () => {
    const files = routes.map((entry) => entry.file);

    expect(new Set(files).size).toBe(files.length);
  });
});