# A minimal Astro site with Sanity Studio

This starter uses [Astro](https://astro.build/) for the front end and [Sanity](https://sanity.io/) to handle its content.

It's intended to give a smooth on-ramp, to all the advantages of Astro with Sanity, and includes a feature to help when you'd like to have illustrated content, possibly brought over from a previous site.

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

Your Astro app should now be running on [http://localhost:4321/](http://localhost:4321/) and Studio on [http://localhost:4321/admin](http://localhost:4321/admin).

### Add content

1. Visit the Studio and create and publish a new `Post` document
2. Visit the homepage and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/schema` folder. You can [add more document types](https://www.sanity.io/docs/schema-types) to the Studio to suit your needs.

## Images in Portable Text

In order to make things easier for writing your own content with illustrations, as well as conversions from other platforms such as WordPress, embedded Images are included for Portable Text, in both the Studio and the app example.

This feature does automatic wrapping of words around the images, each taking half the column on the browser.

## Extending Portable Text

The Image addition just described is in `src/components/portabletext`.

You can find in that folder also a `Readme.md` which explains how it was done, and how you might do others as simply, aided by the `PTExtended.astro` file there, as used in the example app.

## TypeScript

TypeScript is always active in Astro, and you can  use it as much as you'd prefer in code you write in this starter.

If you want more strictness than the easy entry in the example app, you can provide this at any preferred level, by adding your own `d.ts` files appropriately, and possibly modifying tsconfig.json. These are the normal ways with TypeScript.

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
