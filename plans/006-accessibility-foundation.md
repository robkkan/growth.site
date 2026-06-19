# 006 — Accessibility foundation

Base commit: `7f9169e`
Category: Accessibility (WCAG) · Impact: High · Effort: Medium · Risk: Low

## Problem (independently confirmed by multiple audit passes)

1. **No `<h1>` on most pages.** All `app/projects/*/page.tsx` use `<h2>` as the top heading;
   `app/writing/[slug]/page.tsx:58` uses `<h2>` for the post title; `app/archive` and `app/growth` have
   no heading. Only `components/ui/header.tsx:25` emits an `<h1>` (home/writing list). Case studies and
   blog posts have no `<h1>`, breaking document outline.
2. **Clickable `<div>`s with no keyboard support.** `components/ui/accordion.tsx:208-217` — an inner
   `<div onClick onMouseEnter>` navigates to a project but is not focusable and has no `role`/`onKeyDown`.
   Grid cells (`components/ui/grid.tsx:153-156`) are `cursor-pointer` with `onHoverStart` and no keyboard
   equivalent (these are decorative — mark the container `aria-hidden`).
3. **No focus-visible styles / no skip link / undefined ring color.** `app/globals.css` has zero
   `:focus-visible`, `sr-only`, or skip-link rules. `components/ui/button.tsx:8` uses
   `focus-visible:ring-ring` but the `ring` color / `--ring` (a.k.a. `--color-ring`) is never defined in
   `tailwind.config.ts` or `globals.css`, so the focus ring is invisible. Several elements set
   `outline:none` (`app/page.tsx:232,235`; `tabs.tsx:69`) with no replacement.
4. **Breadcrumb not semantic.** `components/ui/breadcrumbs.tsx` "BACK" is a `<button>` using
   `history.back()` + a 100ms `setTimeout` hack; crumbs aren't an `<ol>` and the nav isn't labelled.
5. **Tabs ARIA half-wired.** `components/ui/tabs.tsx` triggers have `role="tab"`/`aria-selected` but no
   `role="tablist"`, no `aria-controls`, no `role="tabpanel"`. These actually navigate routes
   (`header.tsx`) — so they are navigation, not tabs.
6. **Incorrect / placeholder alt text.** `app/projects/linkedin/page.tsx:85,373,382` have
   `alt="ClubsNEU main interface"` (copy-paste from another project). Generic alts ("Entry point 1",
   "Brand", "Create image") throughout. Decorative icon SVGs (breadcrumb arrows, chevrons) are not
   `aria-hidden`.
7. **`alert()` + unlabeled input** for the linkedin password — superseded if plan 001 removes the gate;
   otherwise add a visually-hidden `<label>` and an inline `role="alert"` error region.

## Steps

1. **Define the focus ring.** Add `--ring` / `ring` color to `tailwind.config.ts` + `globals.css` (use
   the primary `#0F0F0F` or a clearly visible accent). Add a global `:focus-visible` outline rule and an
   `.sr-only` utility (or rely on Tailwind's). Remove gratuitous `outline:none` where no replacement
   exists.
2. **Skip link.** Add a visually-hidden "Skip to content" `<a href="#main">` at the top of
   `app/layout.tsx`, and ensure the primary `<main>` has `id="main"`.
3. **Headings.** Promote each page's primary title to `<h1>` (project pages, writing posts). Ensure one
   `<h1>` per page and no skipped levels. Reconcile with `header.tsx` so two `<h1>`s don't appear on
   list pages.
4. **Keyboard-accessible navigation.** Convert the clickable accordion content `<div>`
   (`accordion.tsx:208-217`) into a `<button>` or `<Link>` so it is focusable and Enter/Space-activatable.
   Mark the decorative grid container `aria-hidden="true"`.
5. **Breadcrumb semantics.** Wrap in `<nav aria-label="Breadcrumb">` with an `<ol>`; make crumb items
   real `<Link>`s. (The history-back hack is addressed for robustness in plan 008; here just fix
   semantics — at minimum give the BACK control an accessible name.)
6. **Tabs vs nav.** Since these navigate routes, either complete the tablist/tabpanel ARIA or drop the
   `role="tab"` roles and treat them as a labelled `<nav>`. Prefer the latter (simpler, honest).
7. **Decorative icons.** Add `aria-hidden="true"` to decorative SVG icons (breadcrumb arrows, chevrons,
   accordion arrows).
8. **Alt text.** Fix the wrong `alt="ClubsNEU main interface"` on the LinkedIn page and write accurate,
   descriptive alt text for the placeholder/generic ones. Audit other project pages for the same
   copy-paste pattern.

## Verification gate

- `npm run build` succeeds.
- Keyboard walk-through: Tab from page top reaches the skip link, then every interactive control shows a
  **visible** focus ring; the accordion project row is reachable and activates with Enter.
- `grep -rn 'alt="ClubsNEU main interface"' app/projects/linkedin/` returns nothing.
- Each audited page has exactly one `<h1>`.
- Optional: run `npx @axe-core/cli` or Lighthouse a11y on `/`, `/projects/remo`, `/writing/<slug>` and
  confirm no critical violations remain.

## Scope boundary

Visual design should remain essentially unchanged apart from the (intentionally visible) focus ring and
skip link. Do not restyle components beyond what accessibility requires.
