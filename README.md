# A minimal Astro site with Sanity Studio

This starter uses [Astro](https://astro.build/) for the front end and [Sanity](https://sanity.io/) to handle its content.

## Featuring

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- How to crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/presenting-images)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v16.12 or later)

## Getting started

Run the following commands

1. `npm install` to install dependencies
2. `npx sanity@latest init --env`, this will:

   - ask you to select or create a Sanity project and dataset
   - output a `.env` file with appropriate variables
   - _(or use `sanity init --env` if you have the CLI installed)_

3. Rename the variables in the .env file:

   - ~~SANITY_STUDIO_PROJECT_ID~~ → PUBLIC_SANITY_STUDIO_PROJECT_ID
   - ~~SANITY_STUDIO_DATASET~~ → PUBLIC_SANITY_STUDIO_DATASET

4. `npm run dev` to start the development server

Your Astro app should now be running on [http://localhost:4321/](http://localhost:4321/) and Studio on [http://localhost:4321/admin](http://localhost:4321/).

### Add content

1. Visit the Studio and create and publish a new `Post` document
2. Visit the homepage and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/schema` folder. You can [add more document types](https://www.sanity.io/docs/schema-types) to the Studio to suit your needs.

## Removing TypeScript

If you do not wish to use TypeScript, we've included a `remove-typescript.mjs` file in the root of this repository. You can run this file with `node remove-typescript.mjs` to strip all types from this project. Please run this before tampering with any code to ensure that all types are properly removed.

If you intend to use TypeScript, you can safely remove the `remove-typescript.mjs` file.

## Removing the embedded Studio

If you wish to manage and host the Studio separately, you remove the `studioBasePath` property for the `sanity` configuration in `astro.config.mjs`. You can also remove the following dependencies:

- `output` in `astro.config.mjs`…
  - …and `adapter` in `astro.config.mjs`
- `react()` in `astro.config.mjs`
- `@sanity/vision` `react` `react-dom` `@types/react` `@types/react-dom` from `package.json`
- `schema` folder (you might want to copy this to the new Studio location)
- `sanity.config.ts` (you might want to copy this to the new Studio location)

## Deployments

Feel free to deploy the App to whichever hosting provider you prefer ([Vercel](https://vercel.com/), [Netlify](https://netlify.com), [Cloudflare](https://pages.cloudflare.com/), etc). Remember [to change the adapter](https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter) in the `astro.config.mjs` file to match your hosting provider.

### Deploying the Studio on \*\.sanity.studio

You can also deploy the Sanity Studio on its own URL by running `npx sanity deploy`, provided you have added a [`sanity.cli.ts` configuration file](https://www.sanity.io/docs/cli):

```ts
// sanity.cli.ts
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "<your-project-id>",
    dataset: "<your-dataset-name>",
  },
});
```
