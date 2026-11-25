/**Rol: revisa el sitio construido y comprueba que hls.js se descargue solo en La película: un único archivo con la librería, pedido desde el código de esa página y por ninguna otra, y sin precarga en el HTML. Uso: npm run build && npm run check:hls. Termina con error si la librería aparece en otro lado. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const BUILD_DIR = 'build/client';
const ASSETS_DIR = join(BUILD_DIR, 'assets');

// Marca que solo existe en el código de La película: el nombre de la clase del mensaje del reproductor.
const FILM_MARKER = 'la-pelicula-page__message';
// Textos propios de hls.js: el nombre de un detalle de error y las menciones a la propia librería.
const HLS_MARKERS = ['manifestLoadError', 'hls.js'];
// La página de la película es la única que puede pedir la librería al abrirse.
const FILM_PAGE_HTML = 'lado-a/la-pelicula/index.html';

const errors: string[] = [];

if (!existsSync(ASSETS_DIR)) {
  console.error(`No existe ${ASSETS_DIR}. Corré primero: npm run build`);
  process.exit(1);
}

function findFiles(dir: string, extension: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return findFiles(path, extension);
    return entry.name.endsWith(extension) ? [path] : [];
  });
}

function buildPath(path: string): string {
  return relative(BUILD_DIR, path).replaceAll('\\', '/');
}

const scripts = findFiles(ASSETS_DIR, '.js');
const contents = new Map(scripts.map((path) => [path, readFileSync(path, 'utf-8')]));

const hlsChunks = scripts.filter((path) =>
  HLS_MARKERS.every((marker) => contents.get(path)?.includes(marker)),
);
const filmChunks = scripts.filter((path) => contents.get(path)?.includes(FILM_MARKER));

const [hlsChunk] = hlsChunks;
const [filmChunk] = filmChunks;
const hlsName = hlsChunk?.split(/[\\/]/).pop() ?? '';

if (hlsChunks.length === 1 && hlsChunk) {
  const sizeKb = Math.round(readFileSync(hlsChunk).length / 1024);
  console.log(`✓ hls.js está en un solo archivo: ${buildPath(hlsChunk)} (${sizeKb} KB)`);
} else {
  errors.push(
    hlsChunks.length === 0
      ? 'No se encontró el archivo con hls.js: ¿la película sigue usándolo?'
      : `hls.js aparece en ${hlsChunks.length} archivos: ${hlsChunks.map(buildPath).join(', ')}`,
  );
}

if (filmChunks.length === 1 && filmChunk && hlsChunk) {
  if (contents.get(filmChunk)?.includes(hlsName)) {
    console.log(`✓ La película lo pide desde ${buildPath(filmChunk)}`);
  } else {
    errors.push(`El código de La película (${buildPath(filmChunk)}) no pide ${hlsName}.`);
  }
} else if (filmChunks.length !== 1) {
  errors.push(
    `Se esperaba un solo archivo con el código de La película y hay ${filmChunks.length}.`,
  );
}

if (hlsChunk) {
  const otherChunks = scripts.filter(
    (path) => path !== hlsChunk && path !== filmChunk && contents.get(path)?.includes(hlsName),
  );
  for (const path of otherChunks) {
    errors.push(`${buildPath(path)} también pide ${hlsName}.`);
  }
  if (otherChunks.length === 0) {
    console.log('✓ Ningún otro archivo del sitio lo pide');
  }
}

const pages = findFiles(BUILD_DIR, '.html');
const pagesWithHls = pages.filter(
  (path) => hlsName && readFileSync(path, 'utf-8').includes(hlsName),
);
for (const path of pagesWithHls) {
  if (buildPath(path) !== FILM_PAGE_HTML) {
    errors.push(`${buildPath(path)} lo referencia: esa página lo descargaría al abrirse.`);
  }
}
if (pagesWithHls.length === 0) {
  console.log(`✓ Ninguna de las ${pages.length} páginas HTML lo precarga`);
}

for (const message of errors) console.error(`✗ ${message}`);

console.log(
  `\n${scripts.length} archivos JavaScript y ${pages.length} páginas revisados: ${errors.length} errores.`,
);
process.exit(errors.length > 0 ? 1 : 0);