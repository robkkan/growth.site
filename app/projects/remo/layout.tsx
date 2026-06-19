import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "ReMo Mobile — Robert Kan",
  description:
    "A mobile app connecting teachers and students through reading, designed to speed up teacher workflows and foster connection — my first product design experience.",
  path: "/projects/remo",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
