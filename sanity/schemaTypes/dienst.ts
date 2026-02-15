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
    defineField({
      name: 'quick',
      title: 'Korte highlight',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'href',
      title: 'URL pad',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => (value && value.startsWith('/') ? true : 'Pad moet beginnen met /')),
    }),
    defineField({
      name: 'iconKey',
      title: 'Icoon',
      type: 'string',
      options: {
        list: [
          { title: 'Bestand', value: 'file' },
          { title: 'Kantoorgebouw', value: 'building' },
          { title: 'Klok', value: 'clock' },
          { title: 'Schild', value: 'shield' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
      media: 'icon',
    },
  },
})
