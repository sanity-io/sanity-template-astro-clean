import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";

/**
 * This endpoint creates the preview secret in your Sanity dataset.
 * Visit this URL ONCE to set up the secret: http://localhost:4321/api/draft/setup-secret
 *
 * After running this once, you can delete this file.
 */
export const GET: APIRoute = async () => {
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN", { status: 500 });
  }

  const client = sanityClient.withConfig({ token });

  try {
    // Create or update the preview secret document
    const secret = await client
      .patch('preview.secret')
      .set({ secret: process.env.SANITY_STUDIO_PREVIEW_SECRET || 'default-preview-secret' })
      .commit({ autoGenerateArrayKeys: true });

    console.log('[Setup Secret] Created/updated preview secret:', secret);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Preview secret has been set up in your Sanity dataset",
        next: "You can now use the Presentation Tool. Delete this file (setup-secret.ts) after setup."
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('[Setup Secret] Error:', error);
    return new Response(
      JSON.stringify({
        error: "Failed to create preview secret",
        message: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
