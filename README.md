# Minimal Astro site with Sanity Studio

This starter uses [Astro](https://astro.build/) for the front end and [Sanity](https://sanity.io/) to handle its content.

![Screenshot of the SvelteKit and Sanity starter template](https://cdn.sanity.io/images/fkfgfb3d/production/bf19160e7b5f717e8f1e5dfd21d1cb65c9c0ecf6-841x405.png?w=2000&fit=max&auto=format)

## Features

- Fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- Render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- Manage and create content with the intuitive [Sanity Studio](https://www.sanity.io/docs/sanity-studio).
- Crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/presenting-images)

## Demo

[Try the live demo](https://template-astro-clean.sanity.build/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) - Astro requires v18.17.1 or v20.3.0, v22.0.0 or higher. ( v19 and v21 are not supported.)

### Installing the template

This template includes a Astro app and a Sanity Studio – an open-source React application that connects to your project’s hosted dataset. The Studio is configured locally and then deployed for content collaborators. Content and assets from the hosted dataset can be queried from Sanity’s APIs.

#### 1. Install the template

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

The template comes pre-defined with a schema containing a `Post` document type.

#### Publish your first document

From the Studio, click "+ Create" and select the `Post` document type. Go ahead and create and publish the document.

Your content should now appear in your Astro app ([http://localhost:3000](http://localhost:3000))

#### Extending the Sanity schema

The schema for the `Post` document type is defined in the `studio/src/schemaTypes/post.ts` file. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

### Deploying your application and inviting editors

Your Astro frontend (`/astro-app`) and Sanity Studio (`/studio`) are still only running on your local computer. It's time to deploy and get it into the hands of other content editors.

#### Deploy Sanity Studio

Back in your Studio directory (`/studio`), run the following command to deploy your Sanity Studio.

```shell
npx sanity deploy
```

#### Deploy Astro app to Vercel

You have the freedom to deploy your Astro app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your Astro app.
4. Configure your Environment Variables.

#### Invite a collaborator

Now that you’ve deployed your Astro application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.

## Resources

- [Sanity.io Documentation](https://www.sanity.io/docs/)
- [Astro Documentation](https://docs.astro.build/en/getting-started/)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)
- [Join the Sanity Community](https://slack.sanity.io)
