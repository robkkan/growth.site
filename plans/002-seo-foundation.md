# 002 — SEO foundation: metadataBase, sitemap, robots, manifest, OG fixes

Base commit: `7f9169e`
Category: SEO · Impact: High · Effort: Medium · Risk: Low

## Problem

The site has no crawl/share infrastructure and its social previews are broken:

1. **No `metadataBase`** in `app/layout.tsx` (metadata block ~line 54-76). The root OG image is a
   relative path `/other-assets/thumbnail.png`, so Next cannot resolve it to an absolute URL —
   Facebook/Slack/iMessage previews fail. No `twitter` card block, no `alternates.canonical`.
2. **Writing OG/Twitter images 404.** `app/writing/[slug]/page.tsx` (~line 26-42) references
   `/images/og/${slug}.png` and `/images/twitter/${slug}.png`, but `public/images/og` and
   `public/images/twitter` do not exist. Every blog share preview 404s.
3. **No `sitemap.ts`, `robots.ts`, or `manifest.ts`** anywhere. PWA icons (`public/favicon/icon-192.png`,
   `icon-512.png`) exist but are not referenced by any manifest.
4. **Placeholder fallbacks** in writing `generateMetadata`: literal `'Default Title'` /
   `'A description for your post goes here.'` could ship to production.

Note: `app/writing/[slug]/page.tsx:23` already references `process.env.NEXT_PUBLIC_SITE_URL` — reuse it.

## Steps

1. **Establish the canonical site URL.** Confirm the production domain. Add
   `NEXT_PUBLIC_SITE_URL=https://<domain>` to `.env.example` (create it) and document it.
2. **Root metadata** (`app/layout.tsx`): add to the exported `metadata` object:
   - `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://<domain>")`
   - `alternates: { canonical: "/" }`
   - a `twitter` block: `{ card: "summary_large_image", title, description, images: ["/other-assets/thumbnail.png"] }`
   - keep the existing `openGraph` but verify `images` resolves now that `metadataBase` is set.
3. **`app/sitemap.ts`** — export a `MetadataRoute.Sitemap` listing: `/`, `/archive`, `/growth`,
   `/writing`, each `/projects/<slug>` (udemy, remo, fetchr, searchneu, clubsneu, linkedin), and each
   writing post (derive slugs from `app/writing/content/*.mdx` the same way `generateStaticParams`
   does — read `lib/mdx.tsx` for the existing slug helper and reuse it).
4. **`app/robots.ts`** — allow all, point `sitemap` at `${SITE_URL}/sitemap.xml`.
5. **`app/manifest.ts`** — name, short_name, theme/background color (use `--background` from
   `globals.css`), and the existing 192/512 icons.
6. **Fix writing OG images** (`app/writing/[slug]/page.tsx`): either
   (a) point `openGraph.images`/`twitter.images` at the existing `/other-assets/thumbnail.png` fallback, OR
   (b) add a dynamic `app/writing/[slug]/opengraph-image.tsx` route. Prefer (a) for this plan; note (b)
   as a future enhancement. Replace the `'Default Title'`/placeholder fallbacks with the site name and
   a sensible description.
7. Add `alternates: { canonical: `/writing/${slug}` }` to each post's metadata.

## Verification gate

- `npm run build` succeeds and lists `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` in output.
- `npx next build && npx next start` then `curl -s localhost:3000/sitemap.xml` lists every route.
- No reference to `/images/og/` or `/images/twitter/` remains:
  `grep -rn "images/og/\|images/twitter/" app/` returns nothing.
- Validate one OG URL resolves absolute (contains the domain) in the built `<head>`.

## Scope boundary

Does NOT require converting pages to RSC (plan 003). This plan only adds root + writing metadata and
the route files. Per-page metadata for the six project pages and list pages depends on 003 — do not
attempt it here.
