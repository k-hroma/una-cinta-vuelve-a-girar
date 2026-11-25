/**Rol: lista de rutas del sitio para React Router (modo framework). Las URLs salen de navigation.ts; acá solo se dice qué archivo muestra cada página. Si se publica una página nueva en navigation.ts, TypeScript obliga a registrar su archivo. */
import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';
import {
  derivePath,
  getPublishedPages,
  HOME_PATH,
  type PublishedPage,
} from './config/navigation';

// Archivo (relativo a src/) que muestra cada página publicada.
// Record<PublishedPage['id'], ...> exige exactamente una entrada por cada id publicado en navigation.ts:
// si falta una o sobra una, tsc falla. Es la misma red de seguridad que tenía router.config.tsx.
const pageFileById: Record<PublishedPage['id'], string> = {
  home: 'pages/public/HomePage.tsx',
  'la-pelicula': 'pages/public/LadoA/LaPeliculaPage.tsx',
  'volver-a-ver': 'pages/public/LadoA/VolverAVerPage.tsx',
  'la-cinta-y-el-soporte': 'pages/public/LadoA/LaCintaYElSoportePage.tsx',
  'mario-celestino': 'pages/public/LadoA/MarioCelestinoPage.tsx',
  glosario: 'pages/public/LadoA/GlosarioPage.tsx',
  'cuantas-masacres': 'pages/public/LadoA/CuantasMasacresPage.tsx',
  'con-el-cuerpo': 'pages/public/LadoA/ConElCuerpoPage.tsx',
  'los-hechos': 'pages/public/LadoB/LosHechosPage.tsx',
  'lo-que-escucharon': 'pages/public/LadoB/LoQueEscucharonPage.tsx',
  vigilar: 'pages/public/LadoB/VigilarPage.tsx',
  organizarse: 'pages/public/LadoB/OrganizarsePage.tsx',
  'las-pericias': 'pages/public/LadoB/LasPericiasPage.tsx',
  'la-prensa': 'pages/public/LadoB/LaPrensaPage.tsx',
  'las-madres': 'pages/public/LadoB/LasMadresPage.tsx',
  'los-chicos-muertos': 'pages/public/LadoB/LosChicosMuertosPage.tsx',
};

const publishedPages = getPublishedPages();
const homePage = publishedPages.find((page) => derivePath(page) === HOME_PATH);

if (!homePage) {
  throw new Error(`No hay una ruta de inicio habilitada para ${HOME_PATH}`);
}

export default [
  // Ruta sin dirección que envuelve todas las páginas: carga el contenido del CMS, arma sus etiquetas SEO y atrapa sus errores sin perder el menú (ver PagesLayout.tsx).
  layout('layout/PagesLayout.tsx', [
    index(pageFileById[homePage.id]),
    ...publishedPages
      .filter((page) => page.id !== homePage.id)
      // derivePath devuelve '/lado-a/la-pelicula'; las rutas de React Router van sin la barra inicial.
      .map((page) => route(derivePath(page).slice(1), pageFileById[page.id])),
  ]),
  // Cualquier otra dirección: página 404. Va fuera del layout a propósito: con ssr:false, una ruta con loader
  // solo puede usarse en direcciones que se pre-renderizan, y el 404 no es una dirección concreta.
  route('*', 'pages/public/NotFoundPage.tsx'),
] satisfies RouteConfig;