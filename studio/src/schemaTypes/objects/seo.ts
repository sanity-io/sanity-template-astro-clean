import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Overrides the post title in search results and browser tabs. Recommended: 50–60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles over 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Overrides the excerpt in search results and social previews. Recommended: 120–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions over 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Overrides the main image when sharing on social media. Recommended size: 1200×630px.',
      options: {
        hotspot: true,
      },
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
