import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Fetchr App — Robert Kan",
  description:
    "Leading design as the sole designer at Fetchr, a pre-seed YC-backed startup, building an AI stylist that recommends clothes matching each user's unique style.",
  path: "/projects/fetchr",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
