import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "LinkedIn Brand Kit — Robert Kan",
  description:
    "Case study on designing AI-enhanced, on-brand marketing assets for LinkedIn Accelerate campaigns — a product design internship Brand Kit feature.",
  path: "/projects/linkedin",
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
