import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { useSanityClient } from "@sanity/astro";

const builder = imageUrlBuilder(useSanityClient());

export function urlFor(source: Image) {
  return builder.image(source);
}
