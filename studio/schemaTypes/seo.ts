import {defineField, defineType, type ImageValue} from 'sanity'

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
    defineField({
      name: 'imagen',
      title: 'Imagen para compartir',
      type: 'image',
      description:
        'Imagen que aparece al compartir el link en redes o WhatsApp. Tamaño recomendado: 1200 × 630 píxeles (horizontal). Si se deja vacía, el sitio usa una imagen por defecto.',
      validation: (rule) =>
        rule
          .custom<ImageValue>((value) => {
            // El id del archivo subido incluye sus medidas: image-<hash>-<ancho>x<alto>-<formato>
            const ref = value?.asset?._ref
            const medidas = ref ? /-(\d+)x(\d+)-[a-z0-9]+$/.exec(ref) : null
            if (!medidas) return true

            const ancho = Number(medidas[1])
            const alto = Number(medidas[2])
            if (ancho < 1200 || alto < 630) {
              return `La imagen mide ${ancho} × ${alto} px. Para verse bien al compartir conviene que mida al menos 1200 × 630 px.`
            }
            return true
          })
          .warning(),
    }),
  ],
})