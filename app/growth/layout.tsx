import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "My Growth — Robert Kan",
  description: "A look at how Robert Kan's work and craft have grown over time.",
  path: "/growth",
});

export default function GrowthLayout({ children }: { children: ReactNode }) {
  return children;
}
