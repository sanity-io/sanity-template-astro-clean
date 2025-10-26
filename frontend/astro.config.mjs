// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Adapter is required to support embedded Sanity Studio
  adapter: vercel({
    isr: {
      // Use SANITY_API_READ_TOKEN for both Sanity API auth and Vercel ISR bypass
      bypassToken: process.env.SANITY_API_READ_TOKEN,
      // Exclude draft mode endpoints from caching
      exclude: ["/api/draft/enable", "/api/draft/disable"],
    },
  }),
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2025-10-23", // Set to date of setup to use the latest API version
      stega: {
        studioUrl: "http://localhost:3333", // Update with your deployed Studio URL in production
      },
    }),
    react(), // Required for Sanity Studio
  ],
});
