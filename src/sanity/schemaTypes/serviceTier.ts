import {defineField, defineType} from 'sanity'

export const serviceTier = defineType({
  name: 'serviceTier',
  title: 'Service Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tier Title',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Starting Price',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
