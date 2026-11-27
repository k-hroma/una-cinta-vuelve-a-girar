import { describe, expect, it } from 'vitest';

import { publishedPageIds } from '../pages';

// Prueba contra el CMS real: consulta Sanity por internet con las variables de .env.local.
// Se omite en `npm test` y corre solo con `npm run test:cms` (modo "cms").
describe.skipIf(import.meta.env.MODE !== 'cms')('CMS real (Sanity)', () => {
  it(
    'trae las páginas publicadas y las traduce a PagesById',
    async () => {
      const { paginasService } = await import('../index');

      const pages = await paginasService.getPaginas();

      // Siempre están todas las páginas publicadas de navigation.ts.
      expect(Object.keys(pages).sort()).toEqual([...publishedPageIds].sort());

      // Páginas que hoy tienen contenido en el CMS (todas menos la home).
      const conContenido = [
        'la-pelicula',
        'volver-a-ver',
        'la-cinta-y-el-soporte',
        'mario-celestino',
        'glosario',
        'masacres-filmadas',
        'masacres-nombradas',
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
      ] as const;
      for (const id of conContenido) {
        expect(pages[id].isPublished, `${id} debería estar publicada`).toBe(true);
        expect(pages[id].summary, `${id} debería tener resumen`).not.toBe('');
      }

      // La home no necesita resumen, pero sí el texto de "El Proyecto" con el título subrayado.
      expect(pages['home'].isPublished, 'home debería estar publicada').toBe(true);
      const fragmentosHome = pages['home'].projectDescription.flat();
      expect(fragmentosHome.length).toBeGreaterThan(0);
      expect(
        fragmentosHome.some((fragmento) => fragmento.underline),
        'el título de la película debería llegar marcado para subrayarse',
      ).toBe(true);

      // Los tags del Lado B llegan como lista.
      expect(pages['vigilar'].tags).toEqual(['fotos', 'videos']);
      expect(pages['testigxs'].tags).toEqual(['fotos', 'videos', 'documentos']);

      const publicadas = Object.values(pages).filter((page) => page.isPublished);
      console.info(`Páginas con documento publicado en el CMS: ${publicadas.length}`);
    },
    20_000,
  );
});