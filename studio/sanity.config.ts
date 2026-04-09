import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Presentation Preview URL
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/preview',
        },
      },
      resolve: {
        // Maps a URL in the preview to the corresponding Sanity document,
        // so opening /post/my-slug in Presentation opens that post in the sidebar.
        mainDocuments: defineDocuments([
          {
            route: '/post/:slug',
            filter: ({params}) => `_type == "post" && slug.current == "${params.slug}"`,
          },
        ]),
        // Maps a post document to its preview URL,
        // so editors can jump straight to the preview from any post in the Studio.
        locations: {
          post: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: doc?.slug
                ? [{title: doc?.title || 'Untitled', href: `/post/${doc.slug}`}]
                : [],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
