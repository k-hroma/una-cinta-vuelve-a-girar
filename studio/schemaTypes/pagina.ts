// Tipo de documento (pagina): una “plantilla” de contenido. Cada página del sitio va a ser un documento de este tipo.
// defineType y defineField: funciones de Sanity que no cambian nada al ejecutarse, pero le dan a TypeScript el molde para autocompletar y detectar errores.

import {defineField, defineType, type SanityDocument} from 'sanity'

import {pageOptions} from './pageOptions'

/** La Home es la única página que no lleva resumen y la única que lleva la descripción de El Proyecto. */
const esHome = (document?: SanityDocument) => document?.pageId === 'home'

type BloqueDeTexto = {children?: {text?: unknown}[]}

/** true si algún bloque tiene al menos un tramo con texto (no solo espacios). */
const tieneTexto = (bloques: BloqueDeTexto[]) =>
  bloques.some((bloque) =>
    bloque.children?.some((tramo) => typeof tramo.text === 'string' && tramo.text.trim() !== ''),
  )

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
            .getClient({apiVersion: '2026-03-01'})
            .withConfig({perspective: 'raw'})
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')

          const consulta =
            'count(*[_type == "pagina" && pageId == $pageId && ' +
            '!(_id in [$id, "drafts." + $id])])'
          const otras = await client.fetch<number>(consulta, {pageId: value, id})

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
        'Texto breve sobre la página. Se muestra en los índices del sitio, por ejemplo en la home. Escribirlo como un solo párrafo. La Home no lo necesita.',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (esHome(context.document)) return true
          if (typeof value === 'string' && value.trim().length > 0) return true
          return 'El resumen es obligatorio en todas las páginas menos la Home.'
        }),
    }),
    defineField({
      name: 'descripcionProyecto',
      title: 'Descripción de El Proyecto',
      type: 'descripcionProyecto',
      hidden: ({document}) => !esHome(document),
      description:
        'Texto que aparece en la sección El Proyecto de la home. Escribirlo como un solo párrafo y subrayar el título de la película (seleccionarlo y apretar Ctrl+U).',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!esHome(context.document)) return true

          const bloques = Array.isArray(value) ? (value as BloqueDeTexto[]) : []
          if (!tieneTexto(bloques)) {
            return 'La descripción de El Proyecto es obligatoria en la Home.'
          }
          if (bloques.length > 1) {
            return 'Escribir la descripción como un solo párrafo.'
          }
          return true
        }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Palabras clave de la página, por ejemplo: fotos, videos, documentos. Escribir una y apretar Enter. Es opcional.',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO y vista previa al compartir',
      type: 'seo',
    }),
  ],
  preview: {
    select: {pageId: 'pageId'},
    prepare({pageId}) {
      const opcion = pageOptions.find((item) => item.value === pageId)
      return {title: opcion ? opcion.title : 'Página sin elegir'}
    },
  },
})
