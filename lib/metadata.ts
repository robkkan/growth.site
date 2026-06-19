import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/siteConfig";

interface PageMetadataInput {
  /** Full document title, e.g. "ReMo Mobile — Robert Kan". */
  title: string;
  description: string;
  /** Route path used for both the canonical link and the Open Graph URL. */
  path: string;
  openGraphType?: "website" | "article";
}

/**
 * Single source of truth for per-page metadata. Derives canonical, Open Graph,
 * and Twitter card fields from one title/description so they can never drift.
 * Relative paths/images resolve against the root layout's metadataBase.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: openGraphType, title, description, url: path, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}
