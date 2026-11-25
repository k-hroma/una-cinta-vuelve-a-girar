# Una cinta vuelve a girar

Sitio web del proyecto «Una cinta vuelve a girar», sobre la película «Budge pregunta, seguirá preguntando» (1987, Argentina). El contenido editorial se carga en Sanity Studio y el sitio se publica como HTML estático en Cloudflare Workers.

- Sitio publicado: https://una-cinta-vuelve-a-girar.khroma87.workers.dev
- Studio: se publica con `npm run deploy` desde `studio/`; la dirección queda en `https://<nombre>.sanity.studio` y figura en Sanity Manage → Studios.

## Estado actual

Funciona de punta a punta:

- Las 16 páginas del sitio se generan como HTML estático, con su título, descripción, canónica y etiquetas para compartir.
- El contenido de las páginas (resumen, tags, texto de El Proyecto, SEO) viene de Sanity.
- La película se reproduce en HLS: nativo en Safari moderno y con `hls.js` en el resto, cargado solo en esa página.
- El sitio responde 404 en las direcciones que no existen.
- Publicar en Sanity reconstruye y publica el sitio solo, en uno a cuatro minutos.
- Cada push a `main` reconstruye y publica el sitio.

Falta:

- El diseño de las páginas y sus textos definitivos. Hoy las páginas interiores muestran una pantalla de relleno («Esta parte todavía está girando»).
- El modelado del cuerpo de cada página en Sanity, que depende de ese diseño.
- La parte de operación: roles para editores, guía de uso, CI, backup del contenido y monitoreo.
- El lanzamiento: dominio `.ar`, sitemap y quitar el `noindex` provisorio.

## Stack

- React 19 y React Router 8 en modo framework, con `ssr: false` y prerender.
- Vite 8 y TypeScript 6.
- Sanity 6 para el Studio y `@sanity/client` 8 para leer el contenido.
- `hls.js` 1.7 para el video HLS.
- Vitest 5 para los tests y oxlint para el lint.
- Cloudflare Workers con assets estáticos para publicar.

## Estructura del repositorio

```text
frontend/web/            Sitio (React + Vite + React Router)
  src/                   Código del sitio
  scripts/               Verificadores y tareas de build
  public/                Archivos que se copian tal cual (robots.txt, íconos)
studio/                  Sanity Studio (esquemas y configuración)
```

Archivos importantes del sitio:

- `frontend/web/src/config/navigation.ts`: la fuente de verdad de qué páginas existen, cómo se llaman y en qué dirección viven. De acá salen las rutas y el menú.
- `frontend/web/src/config/site.ts`: el nombre del sitio y la dirección definitiva (`SITE_URL`), que se usa en las URL canónicas aunque el sitio esté publicado en otra dirección.
- `frontend/web/src/routes.ts`: la lista de rutas de React Router, derivada de `navigation.ts`. Si se publica una página nueva, TypeScript obliga a registrar su archivo.
- `frontend/web/src/root.tsx`: el documento HTML (head, body), los estilos globales y el favicon.
- `frontend/web/src/layout/PagesLayout.tsx`: envuelve todas las páginas, carga el contenido del CMS una vez por página, arma las etiquetas SEO y atrapa los errores.
- `frontend/web/src/services/`: la capa de datos. `index.ts` es el punto de entrada; adentro están las interfaces (`paginasService.ts`, `videoService.ts`), las implementaciones de Sanity (`sanity/`) y los servicios falsos para tests (`fake/`).
- `frontend/web/src/types/`: los tipos propios del sitio (`pagina.ts`, `video.ts`).
- `frontend/web/src/seo/buildPageMeta.ts`: arma el título, la descripción, la canónica y las etiquetas de Open Graph de cada página.
- `frontend/web/src/hooks/useHls.ts`: conecta el reproductor con la lista HLS, elige el camino nativo o `hls.js` y maneja los errores.
- `frontend/web/scripts/check-seo.ts`, `check-hls-chunk.ts` y `copy-404.ts`: los verificadores del build y la copia que genera el `404.html`.
- `frontend/web/wrangler.jsonc`: la configuración del Worker que publica el sitio.

Archivos importantes del Studio:

- `studio/sanity.config.ts`: proyecto, dataset, plugins y lista de esquemas.
- `studio/sanity.cli.ts`: configuración del CLI (actualizaciones automáticas del Studio).
- `studio/schemaTypes/`: los esquemas `pagina`, `video`, `seo` y `descripcionProyecto`, más `pageOptions.ts`, que lista las páginas disponibles.

## Cómo funciona

- **El sitio es estático.** En el build, React Router ejecuta el loader de cada página en Node, lee el contenido de Sanity, genera el HTML y lo guarda en `build/client`. El visitante recibe HTML ya escrito, con el contenido y las etiquetas SEO adentro.
- **El navegador hidrata, no consulta el CMS.** El cliente de Sanity se carga solo si algo lo pide explícitamente; el contenido ya viene en el HTML.
- **El video es la excepción.** La página de La película pide la lista HLS y, en los navegadores que no reproducen HLS solos, descarga `hls.js` con una importación dinámica. Ese archivo no viaja al resto del sitio.
- **Los errores de contenido se ven dentro del layout.** Si el CMS no responde, se muestra la pantalla de error con el menú y el botón de reintentar, no una página en blanco.
- **Las direcciones inexistentes responden 404 de verdad.** El build copia la página de respaldo a `404.html` y Workers la devuelve con estado 404.

## Puesta en marcha local

Requiere Node 22.22 o superior y npm.

Sitio:

```sh
cd frontend/web
npm ci
cp .env.example .env.local
npm run dev
```

Completá `.env.local` con los valores de Sanity. El servidor de desarrollo queda en http://localhost:5173 y genera el HTML de cada página en el servidor, igual que el build.

Studio:

```sh
cd studio
npm ci
cp .env.example .env
npm run dev
```

El Studio queda en http://localhost:3333.

## Variables de entorno

Sitio (`frontend/web/.env.local`, no se versiona):

- `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`: públicas. Terminan dentro del JavaScript que baja el navegador y en las variables de build de Cloudflare.

Studio (`studio/.env`, no se versiona):

- `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`: públicas por naturaleza.

No hay secretos hoy. Si alguna vez hace falta un token de lectura, va como secreto, sin el prefijo `VITE_`.

## Comandos

En `frontend/web`:

- `npm run dev`: servidor de desarrollo.
- `npm run build`: verifica tipos, genera el sitio y crea el `404.html`.
- `npm run preview`: sirve el resultado del build en http://127.0.0.1:4173.
- `npm test`: los tests que no usan red.
- `npm run test:cms`: el test que consulta el CMS real. Necesita `.env.local` y conexión.
- `npm run check`: lint y tipos.
- `npm run check:seo`: revisa las etiquetas SEO del build. Requiere `npm run build` antes.
- `npm run check:hls`: revisa que `hls.js` esté en un solo archivo y que solo lo pida La película. Requiere `npm run build` antes.

En `studio`:

- `npm run dev`: Studio local.
- `npm run build`: compila el Studio.
- `npm run deploy`: publica el Studio en Sanity.

## Contenido en Sanity

Dos tipos de documento:

- **Página** (`pagina`): una por cada página del sitio. Campos: `Página del sitio` (el identificador, que no se cambia), `Resumen` (obligatorio salvo en la Home), `Tags` (opcionales), `Descripción de El Proyecto` (solo en la Home, un párrafo, con el título de la película subrayado) y `SEO y vista previa al compartir` (título, descripción e imagen de 1200 × 630).
- **Video** (`video`): la película. Campos: título y `URL de la lista de reproducción (HLS)`, que tiene que ser una dirección `https` terminada en `.m3u8`.

Reglas que conviene respetar:

- Un solo documento por página. La validación del campo lo impide duplicar.
- El resumen se escribe como un solo párrafo corto.
- La imagen para compartir, de 1200 × 630 y liviana.
- El contenido es público: el dataset es de lectura pública y todo lo publicado se ve en el sitio.

## Publicar contenido y rebuild

1. Se edita en el Studio y se apreta **Publish**.
2. Sanity manda un webhook (solo para documentos `pagina` y `video`, y solo cuando se publica, no en cada cambio de borrador).
3. El webhook llama al deploy hook de Cloudflare.
4. Cloudflare reconstruye y publica. Tarda entre uno y cuatro minutos.
5. El cambio aparece en el sitio.

Los borradores no disparan nada. Si un cambio no aparece, el orden para revisar es: intentos del webhook en Sanity Manage, fecha del último disparo en Deploy Hooks, y estado del build en Deployments.

## Deploy

- Plataforma: Cloudflare Workers con assets estáticos.
- Worker: `una-cinta-vuelve-a-girar`.
- Root directory: `frontend/web`.
- Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
- Variable de build: `NODE_VERSION = 24`.
- Variables de build: las tres `VITE_SANITY_*`.
- Carpeta publicada: `build/client`, declarada en `wrangler.jsonc`.
- Manejo de direcciones inexistentes: `not_found_handling: "404-page"`, con el `404.html` que genera el build.

## Pruebas y verificadores

- `npm test` corre 98 tests y omite 1 (el que consulta el CMS real).
- `npm run test:cms` corre ese test contra Sanity.
- `npm run check:seo` revisa, sobre el HTML generado, que cada página tenga un solo título, una descripción de hasta 160 caracteres, la canónica correcta, las etiquetas de Open Graph y la tarjeta de Twitter, y que hoy todas lleven `noindex`.
- `npm run check:hls` revisa que `hls.js` esté en un solo archivo, que solo lo pida el código de La película y que ninguna página HTML lo precargue.

Los dos verificadores necesitan un build previo y no corren en Cloudflare: se corren a mano.

## Git

- `main` es producción: todo push a `main` reconstruye y publica el sitio.
- El trabajo se hace en ramas `feat/...` y se une a `main` con `--no-ff`.
- Hay etiquetas de punto de retorno por fase: `fase-3-sanity-conectado`, `fase-4-prerender`, `fase-5-video-hls`.

## Qué falta

Contenido y diseño:

- El diseño de las páginas interiores y sus textos definitivos. Hoy esas páginas muestran una pantalla de relleno.
- Modelar en Sanity el cuerpo de cada página cuando el diseño esté: es el cambio de esquema más grande que queda, y después hay que migrar el contenido.
- Cargar las imágenes definitivas y reemplazar los placeholders.

Operación (fase 8 del plan, pendiente):

- Roles y personas del equipo. En el plan Free de Sanity hay dos roles: `Administrator` y `Viewer`. `Editor` y `Contributor` son del plan Growth.
- Guía corta de uso para editores.
- CI en GitHub Actions: lint, tests y build en cada push o pull request.
- Export programado del contenido (backup). Conviene hacerlo cuando el contenido sea el definitivo.
- Monitoreo básico del sitio y de los builds.

Lanzamiento (fase 9 del plan, pendiente):

- Agregar la zona del dominio `.ar` en Cloudflare y delegar los nameservers desde nic.ar.
- Dominio personalizado, HTTPS y redirección de `www`.
- Sitemap, revisar canónicas y quitar el `noindex` de todas las páginas. Ese cambio obliga a invertir la comprobación de `npm run check:seo`.
- Checklist final de lanzamiento.

Rendimiento y detalles técnicos:

- Las tarjetas de La película todavía usan PNG de unos 120 KB para mostrarse a 240 px, y las tres imágenes de 345 × 235 pesan 95 KB cada una. Pasarlas a un formato y tamaño acordes ahorra unos 400 KB.
- El hero de la home es una imagen de fondo en CSS: un teléfono descarga los mismos 400 KB aunque la muestre a 390 px. Lo ideal es servirla con `srcset` en varios tamaños.
- El video no tiene imagen de portada: hasta que se aprieta play se ve negro.
- El build emite un archivo `queries-*.js` con el cliente de Sanity que nunca se descarga, porque `RouteErrorPage` importa desde `services/index`. Se puede eliminar importando solo `services/errors`.
- `robots.txt` no incluye sitemap todavía.

## Notas

- La dirección canónica del sitio es `https://unacintavuelveagirar.ar`, aunque hoy el sitio esté publicado en `workers.dev`. Está en `src/config/site.ts`.
- Todas las páginas llevan `noindex` mientras el sitio no esté lanzado. Es provisorio y se quita en la fase 9.
- El sitio es estático: un cambio de código necesita un push; un cambio de contenido necesita publicar en el Studio.
- El contenido publicado es de lectura pública; los borradores no.
