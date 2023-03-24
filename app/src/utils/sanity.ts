import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getPosts(): Promise<Post[]> {
  return await client.fetch('*[_type == "post"]');
}

export async function getPost(slug: string): Promise<Post> {
  return await client.fetch('*[_type == "post" && slug.current == $slug][0]', {
    slug,
  });
}

export interface Post {
  _type: "post";
  title?: string;
  slug?: Slug;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
