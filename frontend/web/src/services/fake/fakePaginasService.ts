/**Rol: implementación del servicio de páginas con datos de ejemplo en memoria. Se usa en los tests de componentes y pantallas para no depender del CMS ni de internet. */
import type { PageId, PagesById } from '../../types/pagina';
import { createEmptyPages } from '../pages';
import type { PaginasService } from '../paginasService';

/** Páginas del Lado B: llevan resumen y tags. */
const paginasLadoB: PageId[] = [
  'ingeniero-budge',
  'la-amistad-en-una-esquina',
  'los-hechos',
  'testigxs',
  'vigilar',
  'las-pruebas',
  'la-prensa',
  'los-chicos-muertos',
  'las-madres',
  'la-cav',
];

/** Páginas de "La película" que aparecen como tarjetas en el índice: llevan resumen. */
const paginasIndiceLaPelicula: PageId[] = [
  'volver-a-ver',
  'la-cinta-y-el-soporte',
  'mario-celestino',
];

/** Datos de ejemplo: las 13 páginas que muestran su resumen en la home y la propia home tienen contenido; el resto queda vacío, como en el CMS real. */
export function createFakePaginas(): PagesById {
  const pages = createEmptyPages();

  for (const id of [...paginasIndiceLaPelicula, ...paginasLadoB]) {
    pages[id] = {
      id,
      isPublished: true,
      summary: `Resumen de prueba de ${id}`,
      tags: paginasLadoB.includes(id) ? ['fotos', 'videos'] : [],
      projectDescription: [],
      seo: { title: null, description: null, imageUrl: null },
    };
  }

  // La home no tiene resumen (no lo necesita) pero sí el texto de "El Proyecto", con el título de la película subrayado.
  pages['home'] = {
    ...pages['home'],
    isPublished: true,
    projectDescription: [
      [
        { text: 'Texto de prueba de El Proyecto sobre la película ', underline: false },
        { text: 'Budge pregunta, seguirá preguntando', underline: true },
        { text: ' (1987, Argentina).', underline: false },
      ],
    ],
  };

  pages['la-prensa'] = {
    ...pages['la-prensa'],
    seo: {
      title: 'La prensa | Una cinta vuelve a girar',
      description: 'Descripción de prueba de La prensa',
      imageUrl: 'https://example.com/la-prensa.jpg',
    },
  };

  return pages;
}

export function createFakePaginasService(
  pages: PagesById = createFakePaginas(),
): PaginasService {
  return {
    async getPaginas() {
      return pages;
    },
  };
}