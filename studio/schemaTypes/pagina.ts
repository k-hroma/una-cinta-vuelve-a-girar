// Tipo de documento (pagina): una “plantilla” de contenido. Cada página del sitio va a ser un documento de este tipo.
// defineType y defineField: funciones de Sanity que no cambian nada al ejecutarse, pero le dan a TypeScript el molde para autocompletar y detectar errores.

import {defineField, defineType} from 'sanity'

import {pageOptions} from './pageOptions'

export const pagina = defineType({
  name: 'pagina',
  title: 'Página',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Página del sitio',
      type: 'string',
      options: {
        list: pageOptions,
        layout: 'dropdown',
      },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          if (!value) return true

          const client = context
            .getClient({ apiVersion: '2026-03-01' })
            .withConfig({ perspective: 'raw' })
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')

          const consulta =
            'count(*[_type == "pagina" && pageId == $pageId && ' +
            '!(_id in [$id, "drafts." + $id])])'
          const otras = await client.fetch<number>(consulta, { pageId: value, id })

          if (otras > 0) {
            return 'Ya existe otra página cargada para esta sección del sitio.'
          }
          return true
        }),
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      rows: 4,
      description:
        'Texto breve sobre la página. Se muestra en los índices del sitio, por ejemplo en la home. Escribirlo como un solo párrafo.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description:
        'Palabras clave de la página, por ejemplo: fotos, videos, documentos. Escribir una y apretar Enter. Es opcional.',
      validation: (rule) => 
        rule.custom((tags) => {
          if (!tags) return true; // Si no hay tags, la validación pasa
          
          // Verificamos si hay duplicados comparando el índice de la primera aparición
          const hasDuplicates = tags.some(
            (tag, index) => tags.indexOf(tag) !== index
          );
          
          return hasDuplicates ? 'tag repetido' : true;
        }),
}),
  ],
  preview: {
    select: { pageId: 'pageId' },
    prepare({ pageId }) {
      const opcion = pageOptions.find((item) => item.value === pageId)
      return { title: opcion ? opcion.title : 'Página sin elegir' }
    },
  },
});