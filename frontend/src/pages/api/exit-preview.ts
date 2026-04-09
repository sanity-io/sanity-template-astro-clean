import type { APIRoute } from "astro";

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete("sanity-preview-session", { path: "/" });
  return redirect("/");
};
