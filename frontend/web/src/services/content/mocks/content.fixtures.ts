import type { ContentDocument } from '../../../types/content';

export const contentFixtures = [
  {
    id: 'demo-content',
    title: 'Documento de ejemplo',
    body: [
      {
        type: 'paragraph',
        text: 'Este contenido de muestra permite desarrollar la interfaz sin una API.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Bloques tipados',
      },
      {
        type: 'paragraph',
        text: 'El adaptador entrega el mismo modelo de dominio que usaría un proveedor real.',
      },
    ],
  },
] satisfies ContentDocument[];
