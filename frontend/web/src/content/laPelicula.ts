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

export const laPeliculaSections = {
  'volver-a-ver': {
    description:
      'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
    image: volverAVerImage,
  },
  'la-cinta-y-el-soporte': {
    description:
      'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
    image: cintaSoporteImage,
  },
  'mario-celestino': {
    description:
      'palabras específicas, términos legales o nombres claves relacionados con La Masacre de Ingeniero Budge',
    image: marioCelestinoImage,
  },
} satisfies Record<LaPeliculaSectionId, { description: string; image: string }>;
