import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { SITE_URL } from "@/lib/siteConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/archive",
    "/growth",
    "/writing",
    "/projects/remo",
    "/projects/udemy",
    "/projects/fetchr",
    "/projects/searchneu",
    "/projects/clubsneu",
    "/projects/linkedin",
  ];

  const posts = await getAllPosts();
  const postRoutes = posts.map((post) => `/writing/${post.slug}`);

  return [...staticRoutes, ...postRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
