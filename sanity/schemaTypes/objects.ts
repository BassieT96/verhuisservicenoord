import { defineArrayMember, defineField, defineType } from "sanity";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Vraag",
      type: "string",
      validation: (rule) => rule.required().min(10).max(180),
    }),
    defineField({
      name: "answer",
      title: "Antwoord",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20).max(1200),
    }),
  ],
});

export const featureItemType = defineType({
  name: "featureItem",
  title: "Feature item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().min(3).max(90),
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(12).max(360),
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "iconKey",
      title: "Icoon",
      type: "string",
      options: {
        list: [
          { title: "Bestand", value: "file" },
          { title: "Kantoorgebouw", value: "building" },
          { title: "Klok", value: "clock" },
          { title: "Schild", value: "shield" },
          { title: "Route", value: "route" },
          { title: "Doos", value: "box" },
          { title: "Telefoon", value: "phone" },
          { title: "Vrachtwagen", value: "truck" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "iconKey",
    },
  },
});

export const benefitItemType = defineType({
  name: "benefitItem",
  title: "Voordeel item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel voorkant", type: "string", validation: (rule) => rule.required().min(3).max(90) }),
    defineField({ name: "text", title: "Tekst voorkant", type: "text", rows: 3, validation: (rule) => rule.required().min(10).max(220) }),
    defineField({ name: "backTitle", title: "Titel achterkant", type: "string", validation: (rule) => rule.required().min(3).max(90) }),
    defineField({ name: "backText", title: "Tekst achterkant", type: "text", rows: 4, validation: (rule) => rule.required().min(10).max(320) }),
    defineField({
      name: "iconKey",
      title: "Icoon",
      type: "string",
      options: {
        list: [
          { title: "Route", value: "route" },
          { title: "Schild", value: "shield" },
          { title: "Klok", value: "clock" },
          { title: "Doos", value: "box" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const linkItemType = defineType({
  name: "linkItem",
  title: "Link item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "href",
      title: "URL pad",
      type: "string",
      description: "Bijvoorbeeld /verhuisdiensten",
      validation: (rule) =>
        rule.required().custom((value) => (value && value.startsWith("/") ? true : "Pad moet beginnen met /")),
    }),
  ],
});

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Galerij item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required().min(2).max(80) }),
    defineField({ name: "text", title: "Tekst", type: "text", rows: 3, validation: (rule) => rule.required().min(8).max(260) }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "alt", title: "Alt tekst", type: "string", validation: (rule) => rule.required().min(4).max(160) }),
  ],
});

export const metricItemType = defineType({
  name: "metricItem",
  title: "Metric item",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Waarde", type: "number", validation: (rule) => rule.required().min(0) }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().min(3).max(80) }),
  ],
});

export const areaItemType = defineType({
  name: "areaItem",
  title: "Werkgebied item",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Plaatsnaam", type: "string", validation: (rule) => rule.required().min(2).max(80) }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3, validation: (rule) => rule.required().min(10).max(260) }),
    defineField({ name: "usp", title: "USP", type: "text", rows: 3, validation: (rule) => rule.required().min(8).max(220) }),
    defineField({ name: "statA", title: "Stat A waarde", type: "string", validation: (rule) => rule.required().min(1).max(30) }),
    defineField({ name: "statALabel", title: "Stat A label", type: "string", validation: (rule) => rule.required().min(3).max(80) }),
    defineField({ name: "statB", title: "Stat B waarde", type: "string", validation: (rule) => rule.required().min(1).max(30) }),
    defineField({ name: "statBLabel", title: "Stat B label", type: "string", validation: (rule) => rule.required().min(3).max(80) }),
  ],
});

export const stepItemType = defineType({
  name: "stepItem",
  title: "Stap item",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (rule) => rule.required().min(2).max(30) }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required().min(3).max(90) }),
    defineField({ name: "detail", title: "Detail", type: "text", rows: 4, validation: (rule) => rule.required().min(20).max(500) }),
    defineField({
      name: "iconKey",
      title: "Icoon",
      type: "string",
      options: {
        list: [
          { title: "Bestand", value: "file" },
          { title: "Route", value: "route" },
          { title: "Schild", value: "shield" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const serviceCardItemType = defineType({
  name: "serviceCardItem",
  title: "Dienst kaart",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required().min(3).max(90) }),
    defineField({ name: "text", title: "Tekst", type: "text", rows: 3, validation: (rule) => rule.required().min(10).max(260) }),
    defineField({ name: "quick", title: "Snelle tekst", type: "string", validation: (rule) => rule.required().min(5).max(120) }),
    defineField({ name: "href", title: "URL pad", type: "string", validation: (rule) => rule.required().custom((value) => (value && value.startsWith("/") ? true : "Pad moet beginnen met /")) }),
    defineField({
      name: "iconKey",
      title: "Icoon",
      type: "string",
      options: {
        list: [
          { title: "Bestand", value: "file" },
          { title: "Kantoorgebouw", value: "building" },
          { title: "Schild", value: "shield" },
          { title: "Klok", value: "clock" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const highlightItemType = defineType({
  name: "highlightItem",
  title: "Highlight item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required().min(3).max(90) }),
    defineField({ name: "text", title: "Tekst", type: "text", rows: 3, validation: (rule) => rule.required().min(10).max(260) }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({ name: "href", title: "URL pad", type: "string", validation: (rule) => rule.required().custom((value) => (value && value.startsWith("/") ? true : "Pad moet beginnen met /")) }),
    defineField({ name: "cta", title: "CTA label", type: "string", validation: (rule) => rule.required().min(2).max(60) }),
    defineField({
      name: "iconKey",
      title: "Icoon",
      type: "string",
      options: {
        list: [
          { title: "Bestand", value: "file" },
          { title: "Kantoorgebouw", value: "building" },
          { title: "Klok", value: "clock" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
