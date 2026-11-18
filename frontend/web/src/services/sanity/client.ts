/**Rol: único lugar donde se crea el cliente de Sanity. Solo lo importan otros archivos de src/services/sanity/; los componentes nunca lo ven. */
import { createClient } from '@sanity/client';

import { sanityEnv } from '../../config/env';

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  // Sin CDN: cada consulta lee lo último publicado, así lo que se publica en el Studio se ve de inmediato.
  useCdn: false,
  // Solo documentos publicados: los borradores nunca llegan al sitio.
  perspective: 'published',
});