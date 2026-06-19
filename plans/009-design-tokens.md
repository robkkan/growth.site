# 009 — Reconcile design tokens vs arbitrary values

Base commit: `7f9169e`
Category: Design system · Impact: Medium · Effort: Medium · Risk: Low

## Problem

A custom spacing scale exists (`--spacing-0..5`, mapped in `tailwind.config.ts:35-42`) but the codebase
overwhelmingly uses arbitrary values that bypass it, and several referenced classes are undefined.

1. **Arbitrary values everywhere instead of the scale.** Examples (non-exhaustive):
   `button.tsx:8`, `tabs.tsx:41,67,78`, `breadcrumbs.tsx:43,46,63,64`, `itemEntry.tsx:14,19`,
   `accordion.tsx:126,212,221`, `app/page.tsx:214,237-243`, all `app/projects/*`. Patterns seen:
   `gap-[5rem]`, `gap-[3rem]`, `gap-[0.75rem]`, `px-[0.875rem]`, `pt-[0.33rem]`, `h-[0.0625rem]`,
   `rounded-[0.375rem]`, `mt-[0.625rem]`. Some don't map to any scale step at all (`gap-[5rem]`,
   `gap-[3rem]`), and some duplicate an existing step (`gap-[1rem]` when `gap-2` = 1rem).
2. **`shadow-inset-primary` is referenced but never defined** — `components/ui/button.tsx:15` (the
   "selected" variant used by the current breadcrumb crumb). Only `shadow-inset-tertiary` exists in
   `globals.css`. The selected button silently renders with no inset border.
3. **`duration-400`** (`accordionLikeButton.tsx:31,35`) is not a Tailwind scale step → no-op class.
4. **`className="t"`** on the MDX `<h3>` (`lib/mdx.tsx:12`) has no matching rule.
5. **Numeric labels** (`itemEntry.tsx:16,22` — the `num`/`date` columns, accordion year triggers) don't
   use `tabular-nums`, so proportional contexts shift.
6. **Inconsistent transition durations** sitewide: `duration-300`, `duration-400` (invalid),
   `duration-500`, plus framer springs at `0.6`/`0.34`/`0.4`s. No shared tokens.
7. **Whitespace bug** — `app/page.tsx:125` hero copy contains double/triple spaces
   ("...with  thoughtful..." / "...familiarity.   Previously").

## Steps

1. **Add the missing definitions first** (quick wins, also referenced by other plans):
   - Define `.shadow-inset-primary` in `globals.css` (mirror `.shadow-inset-tertiary` with the primary
     color), or change `button.tsx:15` to the intended existing class.
   - Fix `duration-400` → a real value (e.g. `duration-300`/`duration-500`) or extend Tailwind's
     `transitionDuration` with a `400` step.
   - Replace `className="t"` in `lib/mdx.tsx` with the intended heading style (or remove it).
2. **Reconcile the spacing scale.** Decide whether to (a) extend the Tailwind theme with the real values
   the design uses (e.g. named tokens for the 3rem/5rem gaps, a `rounded-md` token, an `h-px` divider) and
   replace arbitrary classes with them, or (b) keep arbitrary values but standardize them. Prefer (a):
   add named tokens for the recurring values, then sweep the highest-traffic components
   (`button.tsx`, `tabs.tsx`, `breadcrumbs.tsx`, `itemEntry.tsx`, `accordion.tsx`, `app/page.tsx`) to use
   them. Do **not** mass-rewrite every page in one commit — do it component-by-component so diffs stay
   reviewable and visual regressions are easy to bisect.
3. **Standardize transitions.** Pick two duration tokens (e.g. a fast `200ms` and a standard `300ms`) and
   use them consistently for CSS transitions; leave framer spring configs alone unless trivially unifiable.
4. **Add `tabular-nums`** to the `num`/`date` label spans in `itemEntry.tsx` and the accordion year
   triggers.
5. **Fix the hero whitespace** in `app/page.tsx:125`.

## Verification gate

- `npm run build` succeeds; `npm run lint` clean.
- `grep -rn "shadow-inset-primary" components/` — class now resolves (defined in `globals.css`).
- `grep -rn "duration-400\|className=\"t\"" .` (excluding node_modules/plans) returns nothing.
- Visual spot-check of `/`, `/archive`, a project page, and the writing list: spacing/typography
  unchanged (token swaps must be visually identical — verify side by side).

## Scope boundary

This is a refactor toward tokens, **not** a redesign. Pixel-for-pixel output must match before/after.
If a token swap changes rendering even slightly, the value wasn't equivalent — revert that one.
