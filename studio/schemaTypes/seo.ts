import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO y vista previa al compartir',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description:
        'Título que muestra Google y que aparece al compartir el link en redes o WhatsApp. Si se deja vacío, el sitio usa el título de la página.',
      validation: (rule) =>
        rule.max(60).warning('Más de 60 caracteres: Google puede cortar el título en los resultados.'),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description:
        'Frase corta que aparece debajo del título en Google y al compartir el link. Si se deja vacía, el sitio usa el resumen de la página.',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Más de 160 caracteres: Google puede cortar la descripción en los resultados.'),
    }),
  ],
})