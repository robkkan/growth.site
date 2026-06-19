import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Udemy Personal Plan — Robert Kan",
  description:
    "A concept feature that reduces decision fatigue by automating daily coursework, simulating a traditional classroom experience for online learning at home.",
  path: "/projects/udemy",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
