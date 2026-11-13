import type { PublishedPage } from '../config/navigation';

export type LadoBPageId = Extract<
  PublishedPage,
  { section: 'b'; kind: 'page' }
>['id'];

type PageExtra = { description: string; tags: string };

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

export const ladoBPageExtras = {
  'los-hechos': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'lo-que-escucharon': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  vigilar: {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  organizarse: {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, textos, documentos, etc.',
  },
  'las-pericias': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'la-prensa': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'las-madres': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
  'los-chicos-muertos': {
    description: 'Breve descripción. Lorem ipsum, delito la persona',
    tags: 'fotos, videos, etc.',
  },
} satisfies Record<LadoBPageId, PageExtra>;
