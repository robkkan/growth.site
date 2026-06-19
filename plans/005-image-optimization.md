# 005 — Optimize oversized images + image-tag hygiene

Base commit: `7f9169e`
Category: Performance · Impact: High · Effort: Medium · Risk: Low

## Problem

1. **A 3.1 MB SVG is used as an above-the-fold project-card image.**
   `public/images/projectCard/remo.svg` = **3.1 MB** (verified via `du -h`). Others are heavy too:
   `clubsneu.svg` 236 KB, `searchneu.svg` 208 KB, `udemy.svg` 144 KB. `next/image` does **not** optimize
   SVGs, so the raw bytes ship. They render via `ProjectCard` with `priority loading="eager"`, and
   `components/ui/accordion.tsx` (~line 90-94) additionally `preloadImage()`s **every** project's svgSrc
   on accordion mount — so all of them download eagerly on the homepage.
2. **Broken blur placeholder.** `components/ui/projectCard.tsx:25`:
   `blurDataURL={`data:image/svg+xml;base64,...`}` — the literal `...` is not valid base64, so
   `placeholder="blur"` renders a broken/empty placeholder on the most prominent image.
3. **`priority` overused.** Every project image in every case-study page and both `fileSystemViz.tsx`
   folder SVGs carry `priority`/`loading="eager"`, defeating lazy-loading and hurting LCP. The global
   convention says use `priority` sparingly. `fileSystemViz` is `hidden md:flex` yet still preloads on mobile.
4. **Deprecated `layout="responsive"`** on `next/image` across all `app/projects/*/page.tsx` — a Next 12
   prop that is ignored (and warns) under Next 15.

## Steps

1. **Shrink the SVGs.**
   - Run SVGO on the heavy ones: `npx svgo --multipass public/images/projectCard/remo.svg` (and clubsneu,
     searchneu, udemy). If `remo.svg` is large because of an embedded raster, **rasterize** instead:
     export to an optimized WebP/PNG at the displayed dimensions and update `lib/data/projectData.ts`
     (the `svgSrc` field) + any references. Target: every card asset < ~80 KB.
   - Re-check sizes with `du -h public/images/projectCard/*`. Note the before/after in the commit.
2. **Stop preloading everything.** In `components/ui/accordion.tsx` (~line 90-94), remove the
   `allProjects.forEach(p => preloadImage(p.svgSrc))` blanket preload, or limit it to the single
   featured/visible card only.
3. **Fix the blur placeholder** (`components/ui/projectCard.tsx:25`): supply a real tiny base64
   blur for the featured image, or remove `placeholder="blur"` + `blurDataURL` entirely. Also drop the
   redundant `loading="eager"` where `priority` is already set (priority implies eager).
4. **Trim `priority`.** Keep `priority` only on the one above-the-fold hero/featured card. Remove it
   from non-featured project cards, all in-article case-study images, and the `fileSystemViz.tsx` folder
   SVGs (the visualizer is desktop-only via `hidden md:flex`; let it lazy-load).
5. **Replace `layout="responsive"`** in every `app/projects/*/page.tsx` `<Image>` with
   `className="w-full h-auto"` plus an appropriate `sizes` attribute and explicit `width`/`height`
   (or `fill` with a sized parent). Remove the legacy `layout` prop entirely.

## Verification gate

- `du -sh public/images/projectCard/*` shows no asset above ~80 KB (or document why one must stay).
- `npm run build` succeeds with **no** `next/image` `layout` deprecation warnings in the output.
- `grep -rn 'layout="responsive"' app/` returns nothing.
- `grep -rn 'base64,\.\.\.' components/` returns nothing (broken blur removed).
- Manual: homepage renders cards correctly; Network tab shows only the visible card image as `priority`,
  the rest lazy-loaded.

## Scope boundary

Do not change the visual design or crop of any image; only optimize bytes and loading hints. If
rasterizing `remo.svg`, match its current rendered size and aspect ratio exactly.
