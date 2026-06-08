import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
      description: 'e.g., CEO at Company',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
  ],
})
