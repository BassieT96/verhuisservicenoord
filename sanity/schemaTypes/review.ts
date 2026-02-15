import { defineField, defineType } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Klantreview',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'rating',
      title: 'Beoordeling',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).precision(1),
    }),
    defineField({
      name: 'text',
      title: 'Reviewtekst',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(20).max(800),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
    },
    prepare(selection) {
      const rating = typeof selection.subtitle === 'number' ? selection.subtitle : undefined
      return {
        title: selection.title || 'Onbekende klant',
        subtitle: rating ? `${rating}/5 sterren` : 'Geen beoordeling',
      }
    },
  },
})
