# 010 — Dependency & toolchain health

Base commit: `7f9169e`
Category: Dependencies / DX · Impact: Medium · Effort: Medium · Risk: Medium (dep bumps)

## Problem

1. **`next` pinned to a vulnerable version.** `package.json` `"next": "^15.1.7"`, locked to `15.1.7`.
   `npm audit` flags the `next 9.3.4 – 16.3.0-canary.5` range for several advisories (middleware
   authorization bypass, SSRF via middleware redirects, RCE in the React flight protocol, Server Actions
   source exposure, cache/DoS). This is a static portfolio with no middleware or Server Actions, so real
   exposure is low — but the version is objectively vulnerable and should be patched.
2. **`@types/react` / `@types/react-dom` are v18 while React is v19.** `package.json:48-49` (`^18`) vs
   `react`/`react-dom` `^19.0.0`. Causes type drift and several `as any` casts (`app/page.tsx:257-260`,
   `grid.tsx:21`).
3. **20 transitive vulnerabilities** from `npm audit` (1 critical / 7 high / 11 moderate / 1 low):
   `glob`, `minimatch`, `js-yaml` (via `gray-matter`), `mdast-util-to-hast`, `svgo` (via `@svgr/webpack`),
   `brace-expansion`, `yaml`. Mostly build/transform-time, not runtime request paths.
4. **TypeScript can't typecheck outside `next build`.** `npx tsc --noEmit` emits ~38 `TS2307 Cannot find
   module` errors for `*.svg` (SVGR) and `*.png` imports — there is no ambient `*.d.ts` declaring these
   modules.
5. **No DX guardrails.** `package.json` scripts are only `dev/build/start/lint`. No `typecheck`, no
   `format` (despite `prettier` being a dependency with no config), no `.eslintrc`/`.prettierrc`, no
   `.github/` CI. No `CLAUDE.md`/`AGENTS.md`; the only guidance is a generic `.cursorrules` that
   misdescribes the stack (says React 18, references Vercel AI SDK / `nuqs` / `useActionState` — none
   used here). `README.md` is flavor text with no setup/run docs. `.context/notes.md` and
   `.context/todos.md` are both 0 bytes.

## Steps

1. **Add ambient module declarations** so `tsc --noEmit` works (do this first — it makes the typecheck
   gate meaningful for every other plan). Create `global.d.ts` at the repo root:
   ```ts
   declare module "*.svg" {
     import type { FC, SVGProps } from "react";
     const content: FC<SVGProps<SVGSVGElement>>;
     export default content;
   }
   ```
   Confirm `next-env.d.ts` is generated (run `next build` once) for `*.png`/static-image typing.
2. **Bump types to v19:** `@types/react@^19`, `@types/react-dom@^19`. Then run `npx tsc --noEmit` and fix
   the type errors this surfaces (some `as any` casts in `app/page.tsx`/`grid.tsx` should now be
   removable — e.g. React 19 `useRef<number>(null)`).
3. **Patch `next`** within the 15.x line: `npm i next@^15` (take the latest patched 15.x; defer a 16.x
   major to a separate, tested change). Re-run `npm run build` and click through every route.
4. **`npm audit fix`** for the transitive issues; do **not** use `--force` (it can pull majors). Document
   anything left unfixable (transitive pins) rather than forcing it.
5. **Scripts + config:**
   - Add `"typecheck": "tsc --noEmit"` and `"format": "prettier --write ."` to `package.json`.
   - Add `.prettierrc` and an `.eslintrc.json` (extends `next/core-web-vitals`).
6. **CI:** add `.github/workflows/ci.yml` running `npm ci`, `npm run lint`, `npm run typecheck`,
   `npm run build` on push/PR.
7. **Docs:**
   - Add a project `CLAUDE.md` documenting: the design-token system + `page-container` utilities, the
     `lib/data/projectData.ts` model and how to add a project, the MDX `/writing` content flow, and the
     file-naming convention (camelCase component files). Supersede/remove the stale `.cursorrules`.
   - Expand `README.md` with Getting Started (install / dev / build), Node version, and content structure.
   - Either populate `.context/notes.md`+`todos.md` with real content or delete the empty files.

## Verification gate

- `npm run typecheck` exits 0 (no `TS2307` module errors).
- `npm run build` succeeds on the bumped `next` and types; every route renders.
- `npm audit` shows the critical/high count reduced; remaining items are documented as transitive/dev-only.
- `npm run lint` and `npm run format -- --check` pass.
- CI workflow file present and green on a test push.

## Scope boundary

Stay within `next` 15.x for this plan (no major upgrade to 16). Dependency bumps are the only
behavior-affecting change — verify the full site after each bump and revert any bump that breaks the build
rather than patching around it.
