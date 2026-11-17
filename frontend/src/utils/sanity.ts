import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

// visualEditingEnabled=true: fetch draft content with stega encoding (local/staging with Presentation tool)
// visualEditingEnabled=false: fetch published content from CDN (production)
async function loadQuery<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  return sanityClient.fetch<T>(
    query,
    params,
    {
      perspective: visualEditingEnabled ? 'drafts' : 'published',
      useCdn: !visualEditingEnabled,
      ...(visualEditingEnabled && token ? { token, stega: true } : {}),
    }
  );
}

// Image fields with the crop, hotspot and asset data <SanityImage> needs for cropping and blur placeholders
const imageFunctions = groq`
  fn image::asset($asset) = $asset->{url, metadata{lqip}};
  fn image::field($image) = $image{crop, hotspot, alt, "asset": image::asset(asset)};
`;

export async function getPosts(): Promise<Post[]> {
  return loadQuery<Post[]>(
    groq`${imageFunctions}
    *[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
      ...,
      "mainImage": image::field(mainImage)
    }`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return loadQuery<Post>(
    groq`${imageFunctions}
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      "mainImage": image::field(mainImage),
      seo {
        ...,
        "ogImage": image::field(ogImage)
      }
    }`,
    { slug },
  );
}

export interface ImageField {
  asset: { url: string; metadata?: { lqip?: string } } | null;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageField | null;
}

export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageField | null;
  body: PortableTextBlock[];
  seo?: Seo;
}
