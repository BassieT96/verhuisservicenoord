import { defineField, defineType } from 'sanity'

export const dienstType = defineType({
  name: 'dienst',
  title: 'Verhuisdienst',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20).max(500),
    }),
    defineField({
      name: 'icon',
      title: 'Icoon',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prijsindicatie',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'icon',
    },
  },
})
