import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import { loadQuery } from "./load-query";

export async function getPosts(): Promise<Post[]> {
  const { data: posts } = await loadQuery<Array<Post>>({
    query: `*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
  });

  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const { data: post } = await loadQuery<Post>({
    query: `*[_type == "post" && slug.current == $slug][0]`,
    params: {
      slug,
    },
  });

  return post;
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
