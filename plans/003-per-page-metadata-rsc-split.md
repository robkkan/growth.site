# 003 — Per-page metadata via RSC + client-island split

Base commit: `7f9169e`
Category: SEO / Performance · Impact: High · Effort: Large · Risk: Medium
Depends on: 002 (metadataBase must exist first). Coordinate with 001 (linkedin) and 005 (images).

## Problem

Every route is a top-level `"use client"` component:
`app/page.tsx`, `app/growth/page.tsx`, `app/archive/page.tsx`, `app/writing/writingClient.tsx`
(wrapped by `app/writing/page.tsx`), and all six `app/projects/*/page.tsx`.

Two consequences:
- **SEO:** a `"use client"` module cannot `export const metadata`. So all six case studies and the list
  pages inherit only the root `"Robert Kan"` title/description — duplicate titles sitewide, zero unique
  descriptions or OG tags. The six detailed case studies are effectively invisible to search/social.
- **Performance:** large static article markup ships as client JS. Most project pages are `"use client"`
  *solely* to call `useSearchParams()` for one breadcrumb (`?from=all-works`).

## Pattern to apply (RSC shell + client island)

For each page, split into:

```tsx
// app/projects/<slug>/page.tsx   — Server Component (no "use client")
import type { Metadata } from "next";
import { ProjectBody } from "./project-body";   // the existing client markup

export const metadata: Metadata = {
  title: "<Project Name> — Robert Kan",
  description: "<one-sentence case-study summary>",
  alternates: { canonical: "/projects/<slug>" },
  openGraph: { title: "...", description: "...", images: ["<og image>"] },
};

export default function Page() {
  return <ProjectBody />;
}
```

```tsx
// app/projects/<slug>/project-body.tsx — "use client"
"use client";
// move the existing component body here verbatim
```

The breadcrumb's `?from=all-works` read via `useSearchParams()` must stay in a client child wrapped in
`<Suspense>` (already the pattern in the repo). Keep the island as small as possible — ideally only the
breadcrumb + any framer-motion stagger wrapper needs `"use client"`, and the static article prose can
remain server-rendered. If fully isolating the breadcrumb is too invasive, it is acceptable for this
plan to keep the whole body client-side and only extract the RSC metadata shell — capturing the SEO win
now and leaving the JS-shipping optimization as a follow-up (note it explicitly if you stop there).

## Steps

1. Inventory the routes needing metadata: six `app/projects/*`, `app/page.tsx` (home), `app/writing`
   (list), `app/archive`, `app/growth`.
2. For each, create the RSC shell `page.tsx` with a unique `metadata` (or `generateMetadata`), and move
   the current client component into a sibling `*-body.tsx`/`*Client.tsx` (writing already uses
   `writingClient.tsx` — give it an RSC `page.tsx` that exports metadata and renders it).
3. Write genuinely distinct titles/descriptions per page. Pull the description from each case study's own
   intro copy — do not generate generic boilerplate.
4. Add `alternates.canonical` per page.
5. Ensure every moved client child that reads `useSearchParams()` is inside `<Suspense>` (build will
   fail otherwise).
6. Add JSON-LD where high value (defer if time-boxed; see plan note): `Person` schema on home,
   `BlogPosting` on writing posts. Inject via `<script type="application/ld+json">` in the RSC.

## Verification gate

- `npm run build` succeeds with **no** "useSearchParams() should be wrapped in a suspense boundary" errors.
- Each route's built HTML `<head>` has a unique `<title>` and `<meta name="description">`:
  spot-check `/projects/remo`, `/projects/udemy`, `/writing`, `/` differ.
- `grep -rln '"use client"' app/**/page.tsx` ideally returns nothing (pages are now RSC). At minimum the
  six project `page.tsx` files export `metadata`.

## Scope boundary

Do not change visual output or animations — this is a structural move of code, not a redesign. Behavior
must be byte-identical to users. If a page's interactivity makes a clean split risky, capture the SEO
shell only and leave a `// TODO(003): isolate client island` marker rather than forcing it.
