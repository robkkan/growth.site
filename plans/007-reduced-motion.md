# 007 — Respect prefers-reduced-motion

Base commit: `7f9169e`
Category: Accessibility / Motion · Impact: Medium · Effort: Small · Risk: Low

## Problem

The site is animation-heavy (stagger reveals, hover effects, a spring "bubble" on tabs, a 3D folder
flip, a falling-cell grid, a grid intro animation) and has **zero** reduced-motion handling.
`grep -rn "prefers-reduced-motion\|useReducedMotion"` over the repo returns nothing. Users with
vestibular sensitivity get the full motion regardless of OS settings.

Affected: `components/staggerWrapper.tsx`, `components/hoverEffectWrapper.tsx`,
`components/fileSystemViz.tsx`, `components/ui/tabs.tsx`, `components/ui/accordion.tsx`,
`components/ui/grid.tsx`, `app/page.tsx` (grid intro), `app/growth/page.tsx` (expanding grid).

## Steps

1. **CSS backstop** in `app/globals.css`: add a global block that neutralizes CSS transitions/animations
   under reduced motion, e.g.:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
2. **framer-motion** does not respect that media query automatically. In the shared motion wrappers
   (`staggerWrapper.tsx`, `hoverEffectWrapper.tsx`) and the heavier component animations
   (`fileSystemViz.tsx` 3D flip, `tabs.tsx` spring bubble, `grid.tsx` falling cells, the two grid
   intro/expand animations), read `useReducedMotion()` from `framer-motion` and, when true, render the
   final/resting state directly — skip the entrance stagger, disable the hover transform, and render the
   grid without the falling-cell loop.
   - Prefer doing this once in the reusable wrappers so most pages inherit it. For component-local
     animations, gate the `animate`/`transition` props on the hook value.
3. Where an animation is purely decorative (grid intro, falling cells), reduced motion should mean "show
   the end state immediately, no motion."

## Verification gate

- `npm run build` succeeds.
- Manual: enable "Reduce motion" (macOS: System Settings → Accessibility → Display → Reduce motion; or
  DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce"). Reload `/` — content appears
  with no stagger/fall/flip motion, fully usable. Disable it — animations return.
- `grep -rn "useReducedMotion" components/ app/` shows the hook is wired into the shared wrappers.

## Scope boundary

Do not remove animations for default users. The goal is parity: full motion by default, calm under the
OS preference.
