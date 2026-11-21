import {defineArrayMember, defineType} from 'sanity'

export const descripcionProyecto = defineType({
  name: 'descripcionProyecto',
  title: 'Descripción de El Proyecto',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [{title: 'Subrayado', value: 'underline'}],
        annotations: [],
      },
    }),
  ],
})
