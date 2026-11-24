/**Rol: arma las etiquetas del <head> de una página (título, descripción, Open Graph y X/Twitter) a partir del contenido del CMS. 
 * Es una función pura: recibe el contenido y la dirección, y devuelve la lista de etiquetas. Cuando el CMS no trae un dato, usa un valor de respaldo. */

import type { MetaDescriptor } from 'react-router';
import { derivePath, getPublishedPages } from '../config/navigation';
import { SITE_NAME, SITE_URL } from '../config/site';
import type { PagesById } from '../types/pagina';

const DESCRIPTION_MAX_LENGTH = 160;
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/** '/lado-b/vigilar/' y '/lado-b/vigilar' son la misma página; '/' se mantiene. */
function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Pide a la CDN de Sanity la imagen recortada a 1200x630 y en JPEG, el formato que mejor aceptan las redes y WhatsApp. */
function toShareImageUrl(imageUrl: string): string {
  const url = new URL(imageUrl);
  url.searchParams.set('w', String(OG_IMAGE_WIDTH));
  url.searchParams.set('h', String(OG_IMAGE_HEIGHT));
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('fm', 'jpg');
  return url.toString();
}

/** Etiquetas de la página 404: título propio y fuera de los buscadores. */
export function buildNotFoundMeta(): MetaDescriptor[] {
  return [
    { title: `Página no encontrada | ${SITE_NAME}` },
    { name: 'robots', content: 'noindex' },
  ];
}

export function buildPageMeta(pages: PagesById, pathname: string): MetaDescriptor[] {
  const path = normalizePath(pathname);
  const page = getPublishedPages().find((item) => derivePath(item) === path);

  // PagesLayout solo envuelve páginas del sitio; si llegara otra dirección, queda el título del sitio.
  if (!page) {
    return [{ title: SITE_NAME }];
  }

  const data = pages[page.id];
  const isHome = path === '/';

  const title = data.seo.title ?? (isHome ? SITE_NAME : `${page.title} | ${SITE_NAME}`);

  const homeText = data.projectDescription
    .flat()
    .map((fragment) => fragment.text)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  const fallbackDescription = isHome ? homeText : data.summary;
  const description = data.seo.description ?? (fallbackDescription || null);
  const shortDescription = description ? truncate(description, DESCRIPTION_MAX_LENGTH) : null;

  // La imagen de la página; si no tiene, la de la home, que hace de imagen del sitio.
  const rawImage = data.seo.imageUrl ?? pages['home'].seo.imageUrl;
  const image = rawImage ? toShareImageUrl(rawImage) : null;

  const canonicalUrl = `${SITE_URL}${path}`;

  return [
    { title },
    ...(shortDescription ? [{ name: 'description', content: shortDescription }] : []),
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'es_AR' },
    { property: 'og:title', content: title },
    ...(shortDescription ? [{ property: 'og:description', content: shortDescription }] : []),
    { property: 'og:url', content: canonicalUrl },
    ...(image
      ? [
          { property: 'og:image', content: image },
          { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
          { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
        ]
      : []),
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
  ];
}