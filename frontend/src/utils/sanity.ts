import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

// Check if visual editing is enabled
const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';
const token = import.meta.env.SANITY_API_READ_TOKEN;

// Helper function to fetch with visual editing support
async function loadQuery<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  const perspective = visualEditingEnabled ? 'drafts' : 'published';

  const result = await sanityClient.fetch<T>(
    query,
    params,
    {
      perspective,
      useCdn: !visualEditingEnabled,
      ...(visualEditingEnabled && token ? {
        token,
        stega: true,
      } : {}),
    }
  );

  return result;
}

export async function getPosts(): Promise<Post[]> {
  return await loadQuery<Post[]>(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await loadQuery<Post>(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    { slug }
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
