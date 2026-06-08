import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'result',
      title: 'Headline Result',
      type: 'string',
      description: 'e.g., 300% ROI Improvement',
    }),
    defineField({
      name: 'growthPercentage',
      title: 'Growth Percentage',
      type: 'number',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
