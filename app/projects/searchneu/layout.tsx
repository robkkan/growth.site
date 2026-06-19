import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "SearchNEU Alerts — Robert Kan",
  description:
    "As sole designer, I led product and design to launch a feature that informs students about notification usage, adding guardrails to meet funding requirements.",
  path: "/projects/searchneu",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
