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

      // Contenido cargado a mano en la prueba mínima (pasos 14 a 20).
      const conContenido = [
        'la-pelicula',
        'volver-a-ver',
        'la-cinta-y-el-soporte',
        'mario-celestino',
        'los-hechos',
        'lo-que-escucharon',
      ] as const;
      for (const id of conContenido) {
        expect(pages[id].isPublished, `${id} debería estar publicada`).toBe(true);
        expect(pages[id].summary, `${id} debería tener resumen`).not.toBe('');
      }

      // Los tags del Lado B llegan como lista.
      expect(pages['los-hechos'].tags).toEqual(['fotos', 'videos']);
      expect(pages['lo-que-escucharon'].tags).toEqual(['fotos', 'videos']);

      const publicadas = Object.values(pages).filter((page) => page.isPublished);
      console.info(`Páginas con documento publicado en el CMS: ${publicadas.length}`);
    },
    20_000,
  );
});