import type { PublishedPage } from '../config/navigation';

export type LadoBPageId = Extract<
  PublishedPage,
  { section: 'b'; kind: 'page' }
>['id'];

// Orden en que se muestran las tarjetas del Lado B en la home (decisión de diseño, no del CMS).
// El texto y los tags de cada tarjeta ya no están acá: vienen del CMS (ver services/).
export const ladoBOrder = [
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
] as const satisfies readonly LadoBPageId[];