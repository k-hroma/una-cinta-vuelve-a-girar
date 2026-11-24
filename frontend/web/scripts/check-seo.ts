/**Rol: revisa el HTML generado en build/client y comprueba que cada página del sitio tenga las etiquetas SEO y de vista previa al compartir (título, descripción, canónica, Open Graph, tarjeta de X/Twitter). Con --images también descarga cada imagen para compartir y mide su peso. Uso: npm run build && npm run check:seo (o npm run check:seo -- --images). Termina con error si algo obligatorio falta. */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { derivePath, getPublishedPages } from '../src/config/navigation.ts';
import { SITE_URL } from '../src/config/site.ts';

const BUILD_DIR = 'build/client';
const DESCRIPTION_MAX_LENGTH = 160;
// Las apps de mensajería suelen ignorar imágenes de vista previa muy pesadas; ~300 KB es la recomendación habitual.
const IMAGE_MAX_BYTES = 300 * 1024;
const checkImages = process.argv.includes('--images');

type Issue = { level: 'error' | 'warn'; message: string };

function decode(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function readAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const [, name, value] of tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)) {
    attributes[name] = decode(value);
  }
  return attributes;
}

/** Valor de cada <meta name="..."> y <meta property="...">, por nombre. */
function readMeta(html: string): Map<string, string[]> {
  const found = new Map<string, string[]>();
  for (const [tag] of html.matchAll(/<meta\s[^>]*>/g)) {
    const attributes = readAttributes(tag);
    const key = attributes.name ?? attributes.property;
    if (key && attributes.content !== undefined) {
      found.set(key, [...(found.get(key) ?? []), attributes.content]);
    }
  }
  return found;
}

function readCanonicals(html: string): string[] {
  return [...html.matchAll(/<link\s[^>]*rel="canonical"[^>]*>/g)].map(
    ([tag]) => readAttributes(tag).href ?? '',
  );
}

async function checkImage(url: string): Promise<Issue[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [{ level: 'error', message: `la imagen para compartir responde ${response.status}: ${url}` }];
    }
    const issues: Issue[] = [];
    const type = response.headers.get('content-type') ?? '';
    const bytes = (await response.arrayBuffer()).byteLength;
    if (!type.startsWith('image/')) {
      issues.push({ level: 'error', message: `la imagen para compartir no es una imagen (${type})` });
    }
    if (bytes > IMAGE_MAX_BYTES) {
      issues.push({
        level: 'warn',
        message: `la imagen para compartir pesa ${Math.round(bytes / 1024)} KB (conviene menos de ${IMAGE_MAX_BYTES / 1024} KB)`,
      });
    }
    return issues;
  } catch (error) {
    return [{ level: 'error', message: `no se pudo descargar la imagen para compartir: ${String(error)}` }];
  }
}

async function checkPage(path: string): Promise<Issue[]> {
  const file = join(BUILD_DIR, path === '/' ? '' : path, 'index.html');
  if (!existsSync(file)) {
    return [{ level: 'error', message: `no existe ${file}` }];
  }

  const html = await readFile(file, 'utf-8');
  const meta = readMeta(html);
  const issues: Issue[] = [];
  const one = (key: string) => meta.get(key)?.[0];

  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  if (titles.length !== 1) {
    issues.push({ level: 'error', message: `tiene ${titles.length} etiquetas <title> (tiene que haber una)` });
  } else if (decode(titles[0][1]).trim() === '') {
    issues.push({ level: 'error', message: 'el <title> está vacío' });
  }

  const description = one('description');
  if (!description) {
    issues.push({ level: 'warn', message: 'no tiene descripción (cargá el resumen o el SEO de la página en Sanity)' });
  } else if (description.length > DESCRIPTION_MAX_LENGTH) {
    issues.push({ level: 'error', message: `la descripción mide ${description.length} caracteres (máximo ${DESCRIPTION_MAX_LENGTH})` });
  }

  const expectedUrl = `${SITE_URL}${path}`;
  const canonicals = readCanonicals(html);
  if (canonicals.length !== 1 || canonicals[0] !== expectedUrl) {
    issues.push({ level: 'error', message: `la URL canónica debería ser ${expectedUrl} y es ${canonicals.join(', ') || '(ninguna)'}` });
  }

  for (const key of ['og:title', 'og:type', 'og:site_name', 'og:url', 'twitter:card']) {
    if (!one(key)) issues.push({ level: 'error', message: `falta ${key}` });
  }
  if (one('og:url') && one('og:url') !== expectedUrl) {
    issues.push({ level: 'error', message: `og:url debería ser ${expectedUrl} y es ${one('og:url')}` });
  }
  if (meta.get('robots')?.some((value) => value.includes('noindex'))) {
    issues.push({ level: 'error', message: 'tiene noindex: Google no la va a indexar' });
  }

  const image = one('og:image');
  if (!image) {
    issues.push({ level: 'warn', message: 'no tiene imagen para compartir (cargala en Sanity, en el SEO de la página o de la Home)' });
  } else if (!image.startsWith('https://')) {
    issues.push({ level: 'error', message: `la imagen para compartir tiene que ser una URL https absoluta: ${image}` });
  } else if (checkImages) {
    issues.push(...(await checkImage(image)));
  }

  return issues;
}

if (!existsSync(BUILD_DIR)) {
  console.error(`No existe ${BUILD_DIR}. Corré primero: npm run build`);
  process.exit(1);
}

let errors = 0;
let warnings = 0;
const pages = getPublishedPages().map((page) => derivePath(page));

for (const path of pages) {
  const issues = await checkPage(path);
  const failed = issues.some((issue) => issue.level === 'error');
  console.log(`${failed ? '✗' : issues.length > 0 ? '!' : '✓'} ${path}`);
  for (const issue of issues) {
    console.log(`    ${issue.level === 'error' ? 'error' : 'aviso'}: ${issue.message}`);
    if (issue.level === 'error') errors++;
    else warnings++;
  }
}

console.log(`\n${pages.length} páginas revisadas: ${errors} errores, ${warnings} avisos.`);
process.exit(errors > 0 ? 1 : 0);