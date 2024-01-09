import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
// import { useSanityClient } from "@narration-sd/sanity-astro";
import { sanityClient } from 'sanity:client'

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Image) {
  return builder.image(source);
}
