import type { PublishedPage } from '../config/navigation';

export type LadoBPageId = Extract<
  PublishedPage,
  { section: 'b'; kind: 'page' }
>['id'];

// Orden en que se muestran las tarjetas del Lado B en la home (decisión de diseño, no del CMS).
// El texto y los tags de cada tarjeta ya no están acá: vienen del CMS (ver services/).
export const ladoBOrder = [
  'las-madres',
  'la-prensa',
  'los-chicos-muertos',
  'las-pericias',
  'los-hechos',
  'lo-que-escucharon',
  'vigilar',
  'organizarse',
] as const satisfies readonly LadoBPageId[];