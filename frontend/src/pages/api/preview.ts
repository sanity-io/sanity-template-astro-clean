import type { APIRoute } from "astro";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { sanityClient } from "sanity:client";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const clientWithToken = sanityClient.withConfig({
    useCdn: false,
    token: import.meta.env.SANITY_API_READ_TOKEN,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    url.href,
  );

  if (!isValid) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  // sameSite: 'none' + secure: true required for cross-origin iframes (production).
  // Falls back to 'lax' on HTTP for local development.
  const isSecure = url.protocol === "https:";
  cookies.set("sanity-preview-session", "1", {
    httpOnly: true,
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure,
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return redirect(redirectTo);
};
