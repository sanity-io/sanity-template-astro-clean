import { sanityClient } from "sanity:client";
import groq from "groq";
export async function getPosts() {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
  );
}
export async function getPost(slug) {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    },
  );
}
