/**
 * Canonical production origin, used for metadataBase, sitemap, robots, and
 * Open Graph image resolution. Override per-environment with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://growth.site";

export const SITE_NAME = "Robert Kan";
export const SITE_DESCRIPTION =
  "Robert Kan's portfolio showcasing product design work and writing about growth";

/** Default Open Graph / Twitter share image (resolved against metadataBase). */
export const OG_IMAGE = "/other-assets/thumbnail.png";
