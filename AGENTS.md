# AGENTS.md

Sanity + Astro starter. npm workspaces: `studio/` (Sanity Studio) and `frontend/` (Astro, server output, Vercel adapter). Node >= 22.12. Setup, deployment and visual editing notes are in [README.md](README.md).

## Layout

- `studio/sanity.config.ts`: Studio config (structure, presentation, vision, code-input plugins)
- `studio/src/schemaTypes/`: schema types, registered in `index.ts` (`documents/post.ts`, `objects/blockContent.tsx`, `objects/seo.ts`)
- `frontend/astro.config.mjs`: `@sanity/astro` integration (project ID, dataset, API version, stega)
- `frontend/src/utils/sanity.ts`: GROQ queries, the `loadQuery` helper and result types, using the `sanity:client` module from `@sanity/astro`
- `frontend/src/utils/image.ts`: image URL builder
- `frontend/src/pages/`: routes (`index.astro`, `post/[slug].astro`, `404.astro`)

## Setup and commands

- Env: copy `studio/.env.example` to `studio/.env` and `frontend/.env.example` to `frontend/.env`, then set the project ID and dataset (both files) and `SANITY_API_READ_TOKEN` (frontend).
- `npm install` at the repo root
- `npm run dev`: frontend on http://localhost:4321 and Studio on http://localhost:3333
- `npm run build --workspace=frontend`: `astro check`, `tsc --noEmit`, `astro build`
- `npm run build --workspace=studio`, `npm run deploy --workspace=studio`

There are no test, lint or typegen scripts. Types for query results are hand-written in `frontend/src/utils/sanity.ts`; keep them in sync with the schema.

## Current docs

Your training data may be out of date. Check these first:

- Sanity: https://www.sanity.io/docs/llms.txt
- Astro: https://docs.astro.build
- Sanity MCP server: `npx sanity@latest mcp configure`
