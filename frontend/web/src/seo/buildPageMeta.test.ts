import { describe, expect, it } from 'vitest';

import { SITE_NAME, SITE_URL } from '../config/site';
import { createFakePaginas } from '../services/fake/fakePaginasService';
import type { PagesById } from '../types/pagina';
import { buildNotFoundMeta, buildPageMeta } from './buildPageMeta';

const IMAGE = 'https://cdn.sanity.io/images/abc12345/production/foto-2000x1000.png';
const IMAGE_FOR_SHARING = `${IMAGE}?w=1200&h=630&fit=crop&fm=jpg`;

/** Páginas de prueba con los datos de SEO de una página y de la home. */
function pagesWith(changes: Partial<PagesById> = {}): PagesById {
  return { ...createFakePaginas(), ...changes };
}

describe('buildPageMeta', () => {
  it('usa los datos de SEO de la página cuando están cargados', () => {
    const pages = pagesWith();
    pages['la-prensa'] = {
      ...pages['la-prensa'],
      seo: { title: 'La prensa y la masacre', description: 'Cómo se contó.', imageUrl: IMAGE },
    };

    const meta = buildPageMeta(pages, '/lado-b/la-prensa');

    expect(meta).toContainEqual({ title: 'La prensa y la masacre' });
    expect(meta).toContainEqual({ name: 'description', content: 'Cómo se contó.' });
    expect(meta).toContainEqual({ property: 'og:title', content: 'La prensa y la masacre' });
    expect(meta).toContainEqual({ property: 'og:description', content: 'Cómo se contó.' });
    expect(meta).toContainEqual({ property: 'og:image', content: IMAGE_FOR_SHARING });
    expect(meta).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' });
    expect(meta).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: `${SITE_URL}/lado-b/la-prensa`,
    });
    expect(meta).toContainEqual({ property: 'og:url', content: `${SITE_URL}/lado-b/la-prensa` });
  });

  it('sin SEO propio usa el título de la página, su resumen y la imagen de la home', () => {
    const pages = pagesWith();
    pages['home'] = { ...pages['home'], seo: { title: null, description: null, imageUrl: IMAGE } };

    const meta = buildPageMeta(pages, '/lado-b/vigilar');

    expect(meta).toContainEqual({ title: `Vigilar | ${SITE_NAME}` });
    expect(meta).toContainEqual({
      name: 'description',
      content: 'Resumen de prueba de vigilar',
    });
    expect(meta).toContainEqual({ property: 'og:image', content: IMAGE_FOR_SHARING });
    expect(meta).toContainEqual({ property: 'og:image:width', content: '1200' });
    expect(meta).toContainEqual({ property: 'og:image:height', content: '630' });
  });

  it('sin imagen en ningún lado no pone og:image y usa la tarjeta chica', () => {
    const meta = buildPageMeta(pagesWith(), '/lado-b/vigilar');

    expect(meta.some((tag) => 'property' in tag && tag.property === 'og:image')).toBe(false);
    expect(meta).toContainEqual({ name: 'twitter:card', content: 'summary' });
  });

  it('en la home el título es el del sitio y la descripción sale del texto de El Proyecto', () => {
    const meta = buildPageMeta(pagesWith(), '/');

    expect(meta).toContainEqual({ title: SITE_NAME });
    expect(meta).toContainEqual({
      name: 'description',
      content:
        'Texto de prueba de El Proyecto sobre la película Budge pregunta, seguirá preguntando (1987, Argentina).',
    });
    expect(meta).toContainEqual({ tagName: 'link', rel: 'canonical', href: `${SITE_URL}/` });
  });

  it('acorta las descripciones muy largas sin cortar palabras', () => {
    const pages = pagesWith();
    pages['vigilar'] = { ...pages['vigilar'], summary: 'palabra '.repeat(60).trim() };

    const meta = buildPageMeta(pages, '/lado-b/vigilar');
    const description = meta.find((tag) => 'name' in tag && tag.name === 'description');

    expect(description).toBeDefined();
    const content = (description as { content: string }).content;
    expect(content.length).toBeLessThanOrEqual(160);
    expect(content.endsWith('…')).toBe(true);
    expect(content.slice(0, -1).endsWith('palabra')).toBe(true);
  });

  it('trata igual una dirección con y sin barra final', () => {
    const pages = pagesWith();

    expect(buildPageMeta(pages, '/lado-b/vigilar/')).toEqual(
      buildPageMeta(pages, '/lado-b/vigilar'),
    );
  });

  it('respeta los parámetros que ya tenga la URL de la imagen', () => {
    const pages = pagesWith();
    pages['home'] = {
      ...pages['home'],
      seo: { title: null, description: null, imageUrl: `${IMAGE}?auto=format` },
    };

    const meta = buildPageMeta(pages, '/lado-b/vigilar');
    const image = meta.find((tag) => 'property' in tag && tag.property === 'og:image');

    expect((image as { content: string }).content).toContain('auto=format');
    expect((image as { content: string }).content).toContain('w=1200');
  });

  it('si la dirección no es una página del sitio, deja solo el título del sitio', () => {
    expect(buildPageMeta(pagesWith(), '/nada')).toEqual([{ title: SITE_NAME }]);
  });
});

describe('buildNotFoundMeta', () => {
  it('pone un título propio y pide que no se indexe', () => {
    expect(buildNotFoundMeta()).toEqual([
      { title: `Página no encontrada | ${SITE_NAME}` },
      { name: 'robots', content: 'noindex' },
    ]);
  });
});