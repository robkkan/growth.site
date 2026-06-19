import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F7",
    theme_color: "#F7F7F7",
    icons: [
      { src: "/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
