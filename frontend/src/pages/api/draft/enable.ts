import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import crypto from "crypto";

// Generate a random secret at runtime (same pattern as SvelteKit)
const previewSecret = crypto.randomBytes(16).toString("hex");
const previewCookieName = "__sanity_preview";

export const GET: APIRoute = async ({ cookies, url }) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN", { status: 500 });
  }

  // TODO: Re-enable validation once secrets are set up
  // For now, skip validation to test the flow

  /* Validation code (commented out for now):
  const clientWithToken = sanityClient.withConfig({ token });

  try {
    const result = await validatePreviewUrl(
      clientWithToken,
      url.toString()
    );

    console.log('[Draft Enable] Validation result:', result);

    if (!result.isValid) {
      console.error('[Draft Enable] Validation failed');
      return new Response("Invalid preview URL", { status: 401 });
    }
  } catch (error) {
    console.error('[Draft Enable] Validation error:', error);
    return new Response("Validation error", { status: 500 });
  }
  */

  // Set the preview cookie with security flags
  const isDev = import.meta.env.DEV;

  cookies.set(previewCookieName, previewSecret, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Get the redirect URL from query params (sent by Presentation Tool)
  const redirectTo = url.searchParams.get('sanity-preview-pathname') || '/';

  // Redirect to the requested page
  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
    },
  });
};
