import {defineField, defineType} from 'sanity'

/**
 * La película del sitio: la lista de reproducción HLS que se reproduce en La película.
 * Se carga un solo documento de este tipo; el sitio lee la primera URL publicada.
 */
export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description:
        'Nombre de la película. Se usa para reconocer el documento en el Studio; no se muestra en el sitio.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'urlHls',
      title: 'URL de la lista de reproducción (HLS)',
      type: 'url',
      description:
        'Dirección de la lista .m3u8 que entrega Bunny Stream. Se copia del panel de Bunny. No es el archivo de video: es el índice que el reproductor va leyendo mientras se mira la película.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value) => {
            if (typeof value !== 'string' || value.trim() === '') return true
            if (value.includes('.m3u8')) return true
            return 'La dirección tiene que ser la lista de reproducción: termina en .m3u8.'
          }),
    }),
  ],
  preview: {
    select: {title: 'titulo', subtitle: 'urlHls'},
  },
})