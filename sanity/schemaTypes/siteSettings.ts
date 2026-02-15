import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site-instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Bedrijfsnaam',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(30),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp nummer',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(30),
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(200),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero titel',
      type: 'string',
      validation: (rule) => rule.required().min(6).max(120),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitel',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(12).max(260),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer beschrijving',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(20).max(260),
    }),
    defineField({
      name: 'openingHours',
      title: 'Openingstijden',
      type: 'string',
      validation: (rule) => rule.required().min(6).max(80),
    }),
    defineField({
      name: 'trustPoints',
      title: 'Trust points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(3).max(4),
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Werkgebieden',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(3).max(12),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site-instellingen',
        media: selection.media,
      }
    },
  },
})
