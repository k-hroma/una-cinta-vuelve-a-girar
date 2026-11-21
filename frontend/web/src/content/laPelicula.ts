import type { PublishedPage } from '../config/navigation';
import volverAVerImage from '../assets/img/volver-a-ver.png';
import cintaSoporteImage from '../assets/img/la-cinta-y-el-soporte.png';
import marioCelestinoImage from '../assets/img/mario-celestino.png';

export const laPeliculaSectionIds = [
  'volver-a-ver',
  'la-cinta-y-el-soporte',
  'mario-celestino',
] as const satisfies readonly PublishedPage['id'][];

type LaPeliculaSectionId = (typeof laPeliculaSectionIds)[number];

// El texto de cada sección (la descripción) ya no está acá: viene del CMS (ver services/).
export const laPeliculaSections = {
  'volver-a-ver': {
    image: volverAVerImage,
  },
  'la-cinta-y-el-soporte': {
    image: cintaSoporteImage,
  },
  'mario-celestino': {
    image: marioCelestinoImage,
  },
} satisfies Record<LaPeliculaSectionId, { image: string }>;