import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import type { AstroCookies } from "astro";
import groq from "groq";

const previewCookieName = "__sanity_preview";
const token = import.meta.env.SANITY_API_READ_TOKEN;

// Helper function to fetch with draft mode support
async function loadQuery<T>(
  query: string,
  params: Record<string, any> = {},
  cookies?: AstroCookies
): Promise<T> {
  // Check if draft mode is enabled via cookie
  const draftMode = cookies?.has(previewCookieName) ?? false;
  const perspective = draftMode ? 'drafts' : 'published';

  const result = await sanityClient.fetch<T>(
    query,
    params,
    {
      perspective,
      useCdn: !draftMode,
      ...(draftMode && token ? {
        token,
        stega: true,
      } : {}),
    }
  );

  return result;
}

export async function getPosts(cookies?: AstroCookies): Promise<Post[]> {
  return await loadQuery<Post[]>(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
    {},
    cookies
  );
}

export async function getPost(slug: string, cookies?: AstroCookies): Promise<Post> {
  return await loadQuery<Post>(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    { slug },
    cookies
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}
