# 008 — Remove dead code and tech debt

Base commit: `7f9169e`
Category: Tech debt · Impact: Medium · Effort: Medium · Risk: Low

## Problem — confirmed dead / no-op code

Each item below was verified during the audit. Quotes are current-state evidence.

1. **Debug `console.log` effect** — `app/page.tsx:96-101`. A `useEffect` whose only body is
   `console.log("Page State Changed", {...})`, firing on every selection change in production.
2. **No-op effect** — `app/page.tsx:46-48`: `useEffect(() => setSelectedButton("home"), [])` when
   `selectedButton` already initializes to `"home"`.
3. **Dead grid animation** — `components/ui/grid.tsx:47-96`: ~50 lines of commented-out
   `playLoadingAnimation` timer logic; the `playLoadingAnimation` prop is threaded from `app/page.tsx:271`
   but does nothing, and `nextId`/`setNextId` exist only for it. (If plan 004 ran first, this is already
   gone — skip.)
4. **Dead `AccordionContext` machinery** — `components/ui/accordion.tsx:62-107`. The homepage drives
   selection via its own `selectedProject` state and overrides `AccordionContent`'s `onClick`
   (`app/page.tsx:297`), so the context's `selectedContent`/`isSelected` highlight, `currentProject`,
   `selectedYear`, `hoveredProject` are never used in the primary usage. Pick one source of truth: either
   drive selection through the context, or strip the unused context. **Read carefully before deleting** —
   confirm no other consumer relies on it.
5. **Broken `/all-works` breadcrumb** — `components/ui/breadcrumbs.tsx:23`: `href: '/all-works'` but the
   real route is `/archive`. `fromAllWorks`/`backTo` are never passed by any caller. Remove the dead
   props + crumb, or fix the href to `/archive` if intended.
6. **Brittle history-back hack** — `components/ui/breadcrumbs.tsx:26-40`: `window.history.back()` + 100ms
   `setTimeout` polling `pathname`. Replace with `router.back()` guarded by `window.history.length`, or
   always `router.push(backTo)` when there is no referrer.
7. **No-op CSS classes / invalid utilities:**
   - `lib/mdx.tsx:12` — `<h3 className="t">`; no `.t` rule exists (typo/no-op).
   - `components/ui/button.tsx:15` — `shadow-inset-primary` referenced but never defined (handled fully
     in plan 009; here just flag).
   - `components/ui/accordionLikeButton.tsx:31,35` — `duration-400` is not on Tailwind's scale → no-op.
8. **No-op framer animation** — `app/page.tsx:259-265`: `initial` and `animate` both set
   `--grid-color: "#E6E6E6"` (identical), with three `as any` casts. Remove or give it a real start/end.
9. **Unused props / config:**
   - `components/staggerWrapper.tsx:7` — `index?` declared, never used.
   - `hooks/useStaggerAnimation.ts:2-5` — `staggerDelay`, `duration`, `y` declared, never consumed.
   - `components/fileSystemViz.tsx:8` — `selectedYear` prop passed (`app/page.tsx:313`) but unused; add a
     `displayName` to the `memo`'d component.
   - `app/page.tsx` — `isGridLeaving` state set but never read; `handleGridClick` never wired.
10. **Stale assets** — `public/images/folderOld.svg`, `public/images/folderFrontOld.svg`,
    `public/images/grid.png`, `public/images/grid2.png` are unreferenced (grep for usages is empty).
11. **Dead dark-mode config** — `tailwind.config.ts:5` sets `darkMode: ["class"]` but no `.dark` tokens
    or toggle exist. Remove the line (or open a separate plan to implement dark mode intentionally).
12. **Footer dead link** — `components/ui/footer.tsx:32-39`: PHOTOS is `href="#"` with `target="_blank"`.
    Point to the real URL or remove the item.

## Steps

1. Work through items 1-12 above. For each, **read the surrounding code first** to confirm it is still
   dead at execution time (the codebase may have moved since `7f9169e`).
2. Items 4 and 6 require judgment — if removing the AccordionContext or changing back-navigation risks
   behavior change, make the minimal safe edit and leave a short comment, rather than a large refactor.
3. After edits, run `npx knip` (add it as a dev tool if not present) to catch any remaining unused
   exports/files, and prune what it reports with confidence.

## Verification gate

- `npm run build` and `npm run lint` pass.
- `npx tsc --noEmit` shows no new errors (see plan 010 re: pre-existing SVG-import type errors).
- Grep confirms removals, e.g.: `grep -rn "playLoadingAnimation\|/all-works\|folderOld\|Page State Changed" .`
  (excluding `node_modules`, `plans/`) returns nothing.
- The site looks and behaves identically — these are all no-ops/dead paths.

## Scope boundary

Do not change visible behavior. If any item turns out to be load-bearing on inspection, skip it and note
why in the commit message. This plan is strictly subtractive plus the breadcrumb robustness fix.
