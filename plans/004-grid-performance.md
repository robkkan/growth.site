# 004 — Grid: stop the forever rAF loop, animate compositor properties

Base commit: `7f9169e`
Category: Performance · Impact: High · Effort: Small · Risk: Low
Affected: `components/ui/grid.tsx` (rendered on home `app/page.tsx` and `app/growth/page.tsx`).

## Problem

`components/ui/grid.tsx` has two compounding performance bugs:

1. **Unconditional `requestAnimationFrame` loop** (~line 24-45). The animate callback calls
   `setFallingCells(prev => prev.filter(...))` and re-schedules **every frame regardless of whether any
   falling cells exist**, forcing React to re-render all ~80 `motion.div` cells ~60×/second for the life
   of the page. Two grids exist (home + growth), so this runs continuously on both routes.

   ```tsx
   const animate = () => {
     setFallingCells(prev => prev.filter(/* ... */));   // runs even when empty
     animationFrameRef.current = requestAnimationFrame(animate);
   };
   ```

2. **Animating `backgroundColor`** on up to 80 nodes (~line 157-165). `backgroundColor` is a paint
   property, not a compositor property, so each highlighted cell forces a repaint every frame.

   ```tsx
   animate={{ backgroundColor: isHighlighted(...) ? '#FFFFFF' : 'var(--color-background)' }}
   ```

## Steps

1. Read `components/ui/grid.tsx` fully to confirm current structure and line numbers.
2. **Gate the rAF loop.** Only schedule the next frame while there is work:
   - In the `animate` callback, compute the next falling-cells array; if it is empty, **stop** —
     do not call `setState` with an unchanged value and do not re-schedule. Restart the loop only when
     a new falling cell is added (e.g. in the handler that pushes into `fallingCells`).
   - Ensure the `useEffect` cleanup still cancels any pending frame (`cancelAnimationFrame`).
3. **Avoid repaint-per-frame for the highlight.** Replace the animated `backgroundColor` with a
   cheaper mechanism:
   - Preferred: render a static-colored cell and toggle the `opacity` of a highlight overlay (compositor),
     or toggle a CSS class and let a CSS `transition` handle it (paint happens once on toggle, not per frame).
   - Do not animate `backgroundColor` via framer-motion across all cells.
4. Remove the large commented-out `playLoadingAnimation` block (~line 47-96) and its dead `nextId`
   state / `playLoadingAnimation` prop if they exist only to serve that dead feature. (This overlaps
   plan 008 — whoever runs first does it; the other skips.)

## Verification gate

- `npm run build` succeeds; `npm run lint` clean on `grid.tsx`.
- Manual profiler check (Chrome DevTools Performance, idle on `/`): with no hover interaction, there
  should be **no** continuous scripting/rendering activity from the grid (flat main thread when idle).
  Before the fix it shows ~60fps of React commits.
- Hover behavior and the falling-cell animation still look identical to before.

## Scope boundary

Only `components/ui/grid.tsx`. Preserve the visual feel of the hover highlight and falling cells.
