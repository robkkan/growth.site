# growth.site — project guide

Personal portfolio for Robert Kan. Next.js 15 (App Router) + React 19 + TypeScript +
Tailwind CSS v3 + shadcn/ui primitives + framer-motion. Statically exported pages (no DB,
no server actions).

## Commands

```bash
npm run dev         # local dev server
npm run build       # production build (also typechecks + lints)
npm run typecheck   # tsc --noEmit
npm run lint        # next lint (next/core-web-vitals)
npm run format      # prettier --write .
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for correct canonical/OG URLs; it defaults
to `https://growth.site` via `lib/siteConfig.ts`.

## Layout

- `app/` — App Router routes.
  - `page.tsx` (home), `archive/`, `growth/`, `writing/` (MDX blog list + `[slug]`),
    `projects/<slug>/` (six case studies).
  - Per-route `layout.tsx` files exist only to export page-specific `metadata` while the
    page body stays a client component. Root `app/layout.tsx` holds fonts, base metadata,
    `metadataBase`, the skip link, and analytics.
  - `sitemap.ts`, `robots.ts`, `manifest.ts` are generated from `lib/siteConfig.ts`.
- `components/` — shared components; `components/ui/` holds the shadcn-style primitives.
- `hooks/` — `useStaggerAnimation` (load-in stagger transitions), `useHoverEffect` (list dimming).
- `lib/` — `data/projectData.ts` (the project list model), `mdx.tsx` (MDX compile + components),
  `siteConfig.ts`, `utils.ts` (`cn`).
- `public/images/projectCard/` — project card art. Heavy raster mockups are stored as `.webp`;
  pure-vector cards are SVGO-optimized `.svg`.

## Conventions

- Component files are camelCase (`fileSystemViz.tsx`, `projectCard.tsx`). UI primitives live in
  `components/ui/`.
- Design tokens are CSS variables in `app/globals.css` (`--color-*`, `--spacing-*`) mapped into
  Tailwind in `tailwind.config.ts`. Prefer the Tailwind scale over arbitrary `[Npx]` values.
  Typography is driven by base element styles (`h1`–`h4`, `.b_mono`, `.b_serif`) in `globals.css`.
- `--color-ring` powers the focus-visible ring; links/`[tabindex]` get a global focus outline.
  Keep keyboard focus visible — don't add bare `outline-none`.
- Motion: gate non-trivial framer-motion animations behind `useReducedMotion()`; a CSS
  `prefers-reduced-motion` backstop in `globals.css` covers CSS transitions.
- Page metadata: add unique `title`/`description`/`canonical` for any new route (via a route
  `layout.tsx` if the page is a client component, or directly if it's an RSC).

## Adding content

- **A project**: add an entry to `lib/data/projectData.ts`, create `app/projects/<slug>/page.tsx`
  (case-study body) and `app/projects/<slug>/layout.tsx` (metadata), drop card art in
  `public/images/projectCard/`, and add the route to `app/sitemap.ts`.
- **A writing post**: add `app/writing/content/<slug>.mdx` with `title`/`date`/`description`
  frontmatter. Listing, numbering, routing, metadata, and the sitemap pick it up automatically.
