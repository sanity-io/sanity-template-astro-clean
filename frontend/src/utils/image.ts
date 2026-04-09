import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generates a responsive srcset string using Sanity's image CDN.
 * Widths should be in ascending order.
 */
export function buildSrcSet(
  source: SanityImageSource,
  widths: number[],
  quality = 80,
): string {
  return widths
    .map(
      (w) =>
        `${builder.image(source).width(w).auto("format").quality(quality).url()} ${w}w`,
    )
    .join(", ");
}
