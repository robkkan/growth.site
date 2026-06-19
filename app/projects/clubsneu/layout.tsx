import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "ClubsNEU Database — Robert Kan",
  description:
    "As founding designer, I shipped a community database that helps Northeastern students discover and connect with clubs through better search and discovery.",
  path: "/projects/clubsneu",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
