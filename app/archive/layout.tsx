import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "All Works — Robert Kan",
  description:
    "A complete archive of Robert Kan's product design projects and case studies.",
  path: "/archive",
});

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
