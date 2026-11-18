import { describe, expect, it } from 'vitest';

import { derivePath, pageModels } from './navigation';

describe('navigation', () => {
  it('no repite ids entre páginas', () => {
    const ids = pageModels.map((page) => page.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('no repite URLs entre páginas', () => {
    const paths = pageModels.map((page) => derivePath(page));
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('deriva la URL de la home y la de una página de un lado', () => {
    expect(derivePath({ section: null, slug: '' })).toBe('/');
    expect(derivePath({ section: 'a', slug: 'la-pelicula' })).toBe(
      '/lado-a/la-pelicula',
    );
  });
});