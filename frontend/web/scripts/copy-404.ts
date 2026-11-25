/**Rol: copia la página de respaldo que genera React Router a 404.html, para que el sitio publicado responda con estado 404 en las direcciones que no existen. Uso: node scripts/copy-404.ts (lo corre npm run build después de react-router build). */
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BUILD_DIR = 'build/client';
const FALLBACK = join(BUILD_DIR, '__spa-fallback.html');
const NOT_FOUND = join(BUILD_DIR, '404.html');

if (!existsSync(FALLBACK)) {
  console.error(`No existe ${FALLBACK}. Corré primero: npm run build`);
  process.exit(1);
}

copyFileSync(FALLBACK, NOT_FOUND);
console.log(`✓ ${NOT_FOUND} es una copia de ${FALLBACK}`);