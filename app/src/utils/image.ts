import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { client } from "./sanity";

const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}
