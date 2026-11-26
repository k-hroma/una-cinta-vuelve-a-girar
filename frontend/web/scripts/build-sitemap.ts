/**Rol: genera el sitemap del sitio con las direcciones publicadas en navigation.ts, para que no se desincronice. Uso: node scripts/build-sitemap.ts (lo corre npm run build después de react-router build). */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { derivePath, getPublishedPages } from '../src/config/navigation.ts';
import { SITE_URL } from '../src/config/site.ts';

const BUILD_DIR = 'build/client';
const OUTPUT = join(BUILD_DIR, 'sitemap.xml');

const urls = getPublishedPages().map((page) => `${SITE_URL}${derivePath(page)}`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT, sitemap, 'utf-8');
console.log(`✓ ${OUTPUT} con ${urls.length} direcciones`);