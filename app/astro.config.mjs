// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(import.meta.env.MODE, process.cwd(), "");
if (
  !PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET
) {
  throw new Error("Did you forget to run sanity init --env?");
}

import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: "2023-03-20", // date of setup
  })]
});