import type { APIRoute } from "astro";

const previewCookieName = "__sanity_preview";

export const GET: APIRoute = async ({ cookies }) => {
  // Delete the preview cookie
  cookies.delete(previewCookieName, { path: "/" });

  // Return success
  return new Response("Draft mode disabled", { status: 200 });
};
