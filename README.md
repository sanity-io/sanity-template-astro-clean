# Clean Astro + Sanity app

This template includes an [Astro](https://astro.build/) app with a [Sanity Studio](https://www.sanity.io/) – an open-source React application that connects to your Sanity project’s hosted dataset. The Studio is configured locally and can then be deployed for content collaboration.

## Features

- Fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- [Visual Editing](https://www.sanity.io/docs/visual-editing) with click-to-edit overlays powered by the [Presentation tool](https://www.sanity.io/docs/presentation-tool)
- Render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- Manage and create content with the intuitive [Sanity Studio](https://www.sanity.io/docs/sanity-studio)
- Crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/presenting-images)
- Optimized images with automatic WebP/AVIF format selection, responsive `srcset`, and no layout shift
- SEO-ready with `<meta>` description, Open Graph, and Twitter Card tags on every page, with per-post overrides via a dedicated SEO field in the Studio
- Custom 404 page for missing posts and invalid routes

## Demo

https://template-astro-clean.sanity.build

## Getting Started

### Install the template

#### 1. Initialize template with Sanity CLI

Run the command in your Terminal to initialize this template on your local computer.

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

```shell
npm create sanity@latest -- --template sanity-io/sanity-template-astro-clean
```

#### 2. Run Studio and Astro app locally

Navigate to the template directory using `cd <your app name>`, and start the development servers by running the following command

```shell
npm run dev
```

#### 3. Open the app and sign in to the Studio

Open the Astro app running locally in your browser on [http://localhost:4321](http://localhost:4321).

Open the Studio running locally in your browser on [http://localhost:3333](http://localhost:3333). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

### Adding content with Sanity

#### 1. Publish your first document

The template comes pre-defined with a schema containing a `Post` document type.

From the Studio, click "+ Create" and select the `Post` document type. Go ahead and create and publish the document.

Your content should now appear in your Astro app ([http://localhost:4321](http://localhost:4321))

#### 2. Extending the Sanity schema

The schema for the `Post` document type is defined in the `studio/src/schemaTypes/documents/post.ts` file. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

### Deploying your application and inviting editors

#### 1. Deploy Sanity Studio

Your Astro frontend (`/frontend`) and Sanity Studio (`/studio`) are still only running on your local computer.

Back in your Studio directory (`/studio`), run the following command to deploy your Sanity Studio.

```shell
cd studio/
npx sanity deploy
```

#### 2. Deploy Astro app to Vercel

You have the freedom to deploy your Astro app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your Astro app.
4. Configure your Environment Variables.

#### 3. Invite a collaborator

Now that you’ve deployed your Astro application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.

## Environment variables

`PUBLIC_SANITY_STUDIO_URL` in `frontend/.env` is intentionally blank for local development (it defaults to `http://localhost:3333`). Before deploying to production, set it to your deployed Studio URL (e.g. `https://your-studio.sanity.studio`). Stega encoding uses this value to generate "Open in Studio" links from the visual editing overlays — leaving it blank in production will cause those links to point to localhost instead of the live Studio.

`PUBLIC_SANITY_VISUAL_EDITING_ENABLED` controls the entire visual editing system. Set it to `"true"` for local development and staging environments where editors use the Presentation tool. **In production, omit it or set it to `"false"` — this switches to the published content perspective, disables stega encoding, and removes `data-sanity` attributes from the rendered HTML.**

## Visual Editing notes

Stega encoding handles **string fields** (e.g. `title`, `excerpt`) automatically — invisible metadata is embedded in the string values returned by the Sanity client, and the visual editing overlay detects them in the DOM.

**Non-string fields** (objects and arrays) are not stega-encodable and require explicit `data-sanity` attributes on their rendered elements. Use `createDataAttribute` from `@sanity/visual-editing-csm` to generate these:

```ts
import { createDataAttribute } from "@sanity/visual-editing-csm";

const dataAttr = createDataAttribute({
  projectId: "your-project-id",
  dataset: "production",
  baseUrl: "http://localhost:3333", // studio URL
  id: post._id,
  type: post._type,
});
```

Then attach to the relevant element:

```html
<!-- image (object reference) -->
<img data-sanity={dataAttr.scope("mainImage").toString()} ... />

<!-- body (PortableText array) -->
<div data-sanity={dataAttr.scope("body").toString()}>...</div>
```

## Resources

- [Sanity documentation](https://www.sanity.io/docs/)
- [Astro documentation](https://docs.astro.build/en/getting-started/)
- [Join the Sanity Community](https://snty.link/community)
- [Learn Sanity](https://www.sanity.io/learn)
- [Visual Editing with Astro and Sanity](https://www.sanity.io/guides/sanity-astro-blog)
